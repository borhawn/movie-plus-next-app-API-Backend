const { body, query, check } = require("express-validator");

const signupValidationMiddleware = [
  body("email")
    .exists()
    .withMessage("ایمیل خود را به درستی وارد کنید")
    .isEmail()
    .withMessage("یک ایمیل معتبر وارد کنید")
    .normalizeEmail()
    .trim()
    .escape(),
  body("username")
    .exists()
    .withMessage("نام کاربری نباید خالی باشد")
    .isString()
    .withMessage("یک نام کاربری معتبر وارد کنید")
    .isLength({ min: 5 })
    .withMessage("نام کاربری شما باید حداقل 5 حرف باشد")
    .trim()
    .escape(),
  body("password")
    .exists()
    .withMessage("کلمه عبور شما نباید خالی باشد")
    .isString()
    .withMessage("یک کلمه عبور معتبر وارد کنید")
    .isLength({ min: 5 })
    .withMessage("کلمه عبور شما باید حداقل 5 حرف باشد")
    .trim()
    .escape(),
  body("dob")
    .exists()
    .withMessage("لطفا تاریخ تولد خود را به درستی وارد کنید")
    .trim()
    .escape(),
  body("newsletter").trim().escape(),
];

const loginValidationMiddleware = [
  body("username")
    .exists()
    .withMessage("Username can not be empty")
    .isString()
    .withMessage("Please provide a valid username")
    .isLength({ min: 5 })
    .withMessage("You username should at least be 5 characters long!")
    .trim()
    .escape(),
  body("password")
    .exists()
    .withMessage("Password can not be empty")
    .isString()
    .withMessage("Your password is not a valid value")
    .isLength({ min: 5 })
    .withMessage("Your password should at least be 5 characters long")
    .trim()
    .escape()
];

const movieValidationMiddleware = [
  check("name")
    .exists()
    .withMessage("name can not be empty")
    .trim().escape(),
    check("releaseYear").exists()
  .withMessage("releaseyear can not be empty").trim().escape(),
  check("description").exists()
  .withMessage("description can not be empty").trim().escape(),
  check("duration").exists()
  .withMessage("duration can not be empty").trim().escape(),
  check("categories").exists()
  .withMessage("categories can not be empty").trim().escape(),
  check("slug").exists()
  .withMessage("slug can not be empty").trim().escape()
];

const queryValidationMiddleware = [check("queryParam").trim().escape()];

const editaccountValidationMiddleware = [

body("email")
  .trim()
  .escape(),
body("username")
  .trim()
  .escape(),
body("oldpassword")
  .trim()
  .escape(),
body("newpassword")
  .trim()
  .escape(),
body("dob")
  .trim()
  .escape(),
body("newsletter").trim().escape(),
];

const editCategoryValidationMiddleware = [

  body("name")
    .trim()
    .escape(),
  body("description")
    .trim()
    .escape(),
  ];

  const favoritesValidationMiddleware = [body("id")
    .trim()
    .escape(),]

module.exports = {
  favoritesValidationMiddleware,
  signupValidationMiddleware,
  loginValidationMiddleware,
  movieValidationMiddleware,
  queryValidationMiddleware,
  editaccountValidationMiddleware,
  editCategoryValidationMiddleware
};
