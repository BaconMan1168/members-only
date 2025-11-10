const userRouter = require('./routes/userRouter')
const indexRouter = require('./routes/indexRouter')
const path = require('node:path')
const express = require('express');
const app = express();
const pool = require('./models/pool')
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));




app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
        pool: pool,
        tableName: 'sessions',
        createTableIfMissing: true
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    },
}));

app.use(passport.session());

require('./config/passport');

app.use('/', indexRouter);
app.use('/users', userRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Members Only - listening on port ${PORT}!`);
});
