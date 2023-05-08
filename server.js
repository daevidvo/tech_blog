const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");

const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Wg0n@0B<6.",
  cookie: {},
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








// ROUTES
// =========================
// hompage: include existing posts, have links for (dashboard, home, login, logout)
// - If user is not logged in, then when they click on any other page (other than home), then they are prompted to login
// dashboard: has user posts
// - edit the post info (title and text)
// users: login, logout, signup
// - posts
// posts: create(taken to home page with new blog post there), edit (taken back to dashboard on delete), and delete (taken back to dashboard on delete)
// comments: create, 
// 

// JS SCRIPTS
// =========================
// login
// logout
// sign up
// edit
// delete
// comment
// click on a post

// LAYOUTS
// =========================
// main template
// home
// dashboard
// sign up page
// login page
// 404 page
// create post page
// comments partial
// post partial
// 










