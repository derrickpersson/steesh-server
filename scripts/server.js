const {
  express,
  bodyParser,
  parseTitle,
  knexLogger,
  knex,
  dataHelpers,
  convertToPDF,
  emailService,
  analytics,
  morgan,
  winston,
  healthCheck
} = require("../config/appConfig.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(knexLogger(knex));

app.use(bodyParser.json());

app.use(morgan('combined', { stream: winston.stream }));

app.use('/health', healthCheck());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `chrome-extension://${process.env.CHROME_EXTENSION_ID}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/info', async function(req, res) {
  const packageJson = require("./package.json");
  res.send({
    name: packageJson.name,
    description: packageJson.description,
    version: packageJson.version
  });
})

app.post('/getPDF', async (req, res) => {
  const url = req.body.URL;
  let parsedTitle = parseTitle(url);
  try {
    await convertToPDF(url, parsedTitle);
    const user = await dataHelpers.getUserByID(req.body.userID);
    const data = emailService.createKindleData(user, parsedTitle);
    await emailService.sendPDF(data);
    analytics.track('send PDF', {
      distinct_id: user.id,
      article_title: parsedTitle,
      article_url: url
    });
    res.send(200);
  } catch (error) {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(500);
  }

});

app.post('/signup', async (req, res) => {
  let data = req.body;
  const userID = await dataHelpers.insertUser(data);
  res.send(JSON.stringify({ userID }));
  analytics.track('user sign up', {
    distinct_id: userID
  });
});

module.exports = app;