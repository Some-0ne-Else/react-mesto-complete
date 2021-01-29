const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: true,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator(str) { return str.match(/https?:\/\/[a-zA-Z0-9\/.\-]+\.+[a-zA-Z0-9\/.-]+#?/g); },
    },
    message: 'Ошибка проверки url',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'error email'],
    message: 'Ошибка проверки email',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
