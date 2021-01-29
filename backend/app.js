const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('./routers/cards');
const usersRouter = require('./routers/users');
const errorRouter = require('./routers/error');
const errorHandler = require('./middlewares/error-handler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');

const whitelist = ['https://some0neelse.tk', 'http://some0neelse.tk', 'http://localhost:3001'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
const { PORT = 3000 } = process.env;

const app = express();
app.use(cors(corsOptions));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for x-www-form-encoded (postman)
app.use(requestLogger);
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/https?:\/\/[a-zA-Z0-9\/.\-]+\.+[a-zA-Z0-9\/.-]+#?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', errorRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
