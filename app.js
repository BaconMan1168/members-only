const userRouter = require('./routes/userRouter')
const indexRouter = require('./routes/indexRouter')
const path = require('node:path')
const express = require('express');
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


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
