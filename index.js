const app = require("./src");
const { PORT } = require("./config");

app.listen(PORT, () => console.log(`Application server listening on port ${PORT}!`));
