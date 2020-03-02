
const express=require('express');
const router=require('./routes/router');
const MONGO_URI= 'mongodb://localhost:27017/todo';
const mongoose=require('mongoose');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  console.log("reqURL**",req.url)
  return res.status(200).json({ message: `API is now available.` });
});

app.use('/todo', router);

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log('MongoDB Connection Failure');
    } else {
      console.log('Successfully connected TO MongoDB');
    }
  }
);
app.use((req, res) => {
  res.status(404);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};
  // render the error page
  res.status(err.status || 500, () => {});
  res.json(err);
});

module.exports= app;
