const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require('./utils/helpers.js')

const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 8080;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Wg0n@0B<6.",
  cookie: {
    maxAge: 180000
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

async function startServer() {
  await sequelize.sync({ force: false });
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
}

startServer();








// todo
// ===============
// leave a comment functionality
// 









