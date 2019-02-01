const app = require("./scripts/server");
const { PORT } = require("./config/appConfig");

app.listen(PORT, () => console.log(`Application server listening on port ${PORT}!`));
