const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const passport = require("passport");
var multer = require('multer');

const app = express();

const users = require('./routes/user/info');
const depts = require('./routes/dept/info');
const questions = require('./routes/coordinator/question/info');
const admin = require('./routes/admin/info')


// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//for logs

app.use(morgan('dev'));



//for cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-WIth, Content-Typem Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
})

//Routes
app.use('/users', users);
app.use('/depts', depts);
app.use('/coordinator', questions);

//app.use('/uploads', express.static('uploads'));
app.use('/admin', admin);

//Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


app.use((req, res, next) => {
  const error = new Error("Not FOund");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});




// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));