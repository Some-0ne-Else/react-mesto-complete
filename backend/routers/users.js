const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), auth, getUsers);

// router.get('/:id', celebrate({
//   headers: Joi.object().keys({
//     authorization: Joi.string().required(),
//   }).unknown(true),
// }), auth, getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, updateProfile);

router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), auth, getUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/https?:\/\/[a-zA-Z0-9\/.\-]+\.+[a-zA-Z0-9\/.-]+#?/),
  }),
}), auth, updateAvatar);
module.exports = router;
