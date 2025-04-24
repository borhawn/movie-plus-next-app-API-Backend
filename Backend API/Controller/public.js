const User = require("../Models/Users");
const Movie = require("../Models/Movies");
const Category = require("../Models/Categories");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { customAlphabet } = require("nanoid");
const { check, validationResult } = require("express-validator");
const Movies = require("../Models/Movies");
const Users = require("../Models/Users");
// for nanoid to generate random strings
const allowedAlphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const jwtSecret = process.env.JWTSECRET || "secret";

module.exports.homePage = (req, res, next) => {
  const decoded = req.userData;
  res.status(200).json({ message: "okay", message2: decoded });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({}, ["username", "rank"])
    .then((result) => {
      return res.status(200).json({
        message: "successfully fetched users info",
        users: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "An error occured",
        errors: err,
      });
    });
};

module.exports.getAllMovies = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  //offset
  const moviesPerPage = 5;

  const initialList = await Movie.find(
    {},
    [
      "name",
      "releaseYear",
      "description",
      "duration",
      "categories",
      "file",
      "slug",
    ],
    {
      skip: page * moviesPerPage - moviesPerPage,
      limit: moviesPerPage,
      sort: { createdat: -1 },
    }
  );
  const number = await Movies.countDocuments({});
  const pagesNumber = Math.ceil(number / moviesPerPage);

  return res.status(200).json({
    message: "successfully fetched movies",
    movies: initialList,
    totalPages: pagesNumber,
  });
};

module.exports.getOneMovie = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      errors: result.array(),
    });
  } else {
    const slug = req.params.queryParam;
    Movie.findOne({ slug: slug }, [
      "name",
      "releaseYear",
      "description",
      "duration",
      "categories",
      "file",
      "slug",
    ])
      .then((result) => {
        return res.status(200).json({
          message: "successfully fetched the movie",
          movie: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "An error occured",
          errors: err,
        });
      });
  }
};

module.exports.postFavorite = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      errors: result.array(),
    });
  } else {
    const { id } = req.body;
    const userId = req.userData.id;
    if (!userId) {
      return res.status(400).json({
        error: "auth",
        message: "عملیات با خطا مواجه شد",
        errors: { msg: "توکن دسترسی شما منقضی شده" },
      });
    } else {
      let userObj = await User.findOne({ _id: userId }, ["favorites"]);

      const userFavorites = userObj.favorites;

      if (userFavorites.includes(id)) {
        const index = userFavorites.indexOf(id);
        userFavorites.splice(index, 1);
        User.findOneAndUpdate({ _id: userId }, { favorites: userFavorites })
          .then((result) => {
            return res.status(200).json({
              success: "true",
              message: "فیلم از لیست شما حذف شد",
            });
          })
          .catch((err) => {
            return res.status(500).json({
              error: "server",
              message: "خطایی در هنگام ذخیره فیلم رخ داد",
              errors: err,
            });
          });
      } else {
        userFavorites.push(id);
        User.findOneAndUpdate({ _id: userId }, { favorites: userFavorites })
          .then((result) => {
            return res.status(200).json({
              success: "true",
              message: "فیلم به لیست علاقه مندی شما اضافه شد",
            });
          })
          .catch((err) => {
            return res.status(500).json({
              error: "server",
              message: "خطایی در هنگام ذخیره فیلم رخ داد",
              errors: err,
            });
          });
      }
    }
  }
};

module.exports.getFavorites = async (req, res, next) => {

  const userId = req.userData.id;
  if (!userId) {
    return res.status(400).json({
      error: "auth",
      message: "عملیات با خطا مواجه شد",
      errors: { msg: "توکن دسترسی شما منقضی شده" },
    });
  } else {
    const user = await User.findOne({ _id: userId }, ["favorites"]);

    const userFavoritesList = user.favorites;

    const favoritesList = await Promise.all(
      userFavoritesList.map(async (movie) => {
        return Movie.findOne(
          { _id: movie },
          [
            "name",
            "releaseYear",
            "description",
            "duration",
            "categories",
            "file",
            "slug",
          ]
        );
      })
    );

    return res.status(200).json({
      success: "true",
      message: "لیست علاقه مندی های شما با موفقیت دریافت شد",
      movies: favoritesList,
    });
  }
};

module.exports.postMovie = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      error: "validation",
      message: "لطفا اطلاعات را به درستی وارد کنید",
      errors: result.array(),
    });
  } else {
    const user = req.userData.id;
    if (!user) {
      return res.status(400).json({
        error: "auth",
        message: "عملیات با خطا مواجه شد",
        errors: { msg: "توکن دسترسی شما منقضی شده" },
      });
    } else {
      const filename = "http://localhost:3001/files/" + req.file.filename;
      const { name, releaseYear, description, duration, categories, slug } =
        req.body;
      const categoriesList = categories.split(",");

      let categoryIdsList = await getCategoryIds(user, categoriesList);
      const newMovie = new Movie({
        name,
        releaseYear,
        description,
        duration,
        file: filename || null,
        categories: categoryIdsList,
        user: user,
        slug: slug,
      });

      newMovie
        .save()
        .then((result) => {
          return res.status(200).json({
            success: "true",
            message: "فیلم با موفقیت اضافه شد",
            result: result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "server",
            message: "خطایی در هنگام ذخیره فیلم رخ داد",
            errors: err,
          });
        });
    }
  }
};

// get ids of categories or create them
let getCategoryIds = async (user, categoryList) => {
  let categoryIdsList = [];
  for (cat of categoryList) {
    let category = await Category.findOne({ name: cat });
    if (category) {
      categoryIdsList.push(category._id);
    } else if (!category) {
      const newCat = new Category({
        name: cat,
        user: user,
      });

      let finalresult = await newCat.save();

      categoryIdsList.push(finalresult._id);
    }
  }

  return categoryIdsList;
};

let getCategoryNames = async (categoryList) => {
  let categoryNamesList = [];
  for (cat of categoryList) {
    let category = await Category.findOne({ _id: cat });
    if (category) {
      categoryNamesList.push(category.name);
    }
  }

  return categoryNamesList;
};

module.exports.postCategory = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      errors: result.array(),
    });
  } else {
    const user = req.userData.id;
    if (!user) {
      return res.status(400).json({
        error: "auth",
        message: "توکن دسترسی شما منقضی شده",
        errors: { msg: "دوباره ورود کنید" },
      });
    } else {
      const { name, description } = req.body;
      const filename = "http://localhost:3001/files/" + req.file.filename;

      const newCat = new Category({
        name,
        user,
        description,
        file: filename,
      });

      newCat
        .save()
        .then((result) => {
          return res.status(200).json({
            success: "true",
            message: "دسته بندی با موفقیت اضافه شده",
            result: result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "server",
            message: "خطایی در هنگام ذخیره دسته بندی رخ داد",
            errors: err,
          });
        });
    }
  }
};

module.exports.getAllCategories = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  //offset
  const categoriesPerPage = 4;

  Category.find({}, ["name", "description", "file"], {
    skip: page * categoriesPerPage - categoriesPerPage,
    limit: categoriesPerPage,
  })
    .then(async (result) => {
      const number = await Category.countDocuments({});
      const pagesNumber = Math.ceil(number / categoriesPerPage);
      return res.status(200).json({
        message: "successfully fetched categories",
        categories: result,
        totalPages: pagesNumber,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "An error occured",
        errors: err,
      });
    });
};

module.exports.getOneCategory = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      errors: result.array(),
    });
  } else {
    const page = Number(req.query.page) || 1;
    //offset
    const moviesPerPage = 5;
    const categoryname = req.params.queryParam;
    let categoryId = null;
    Category.findOne({ name: categoryname })
      .then(async (result) => {
        categoryId = result._id;
        Movie.find(
          { categories: categoryId },
          [
            "name",
            "releaseYear",
            "description",
            "duration",
            "categories",
            "file",
            "slug",
          ],
          {
            skip: page * moviesPerPage - moviesPerPage,
            limit: moviesPerPage,
          }
        )
          .then(async (result) => {
            const number = await Movies.countDocuments({
              categories: categoryId,
            });
            const pagesNumber = Math.ceil(number / moviesPerPage);
            return res.status(200).json({
              message: "successfully fetched the movies",
              movies: result,
              totalPages: pagesNumber,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              message: "An error occured fetching movies",
              error: err,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "An error occured getting category Id",
          errors: err,
        });
      });
  }
};

//Signup procedure full |
module.exports.signUp = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      error: "validation",
      message: "لطفا اطلاعات را به درستی وارد کنید",
      errors: result.array(),
    });
  } else {
    let { email, username, password, dob, newsletter } = req.body;

    if (newsletter == "on") {
      newsletter = true;
    } else if (newsletter !== "on") {
      newsletter = false;
    }

    User.exists({
      $or: [{ email: email }, { username: username }],
    })
      .then((result) => {
        //User exists in the db so nothing happens
        if (result) {
          return res.status(200).json({
            error: "auth",
            message: "ثبت نام با خطا مواجه شد",
            errors: { msg: "قبلا حسابی با این ایمیل یا نام کاربری ایجاد شده" },
          });
        } else {
          //Hash the pass and then store it in DB
          bcrypt
            .hash(password, 12)
            .then(function (hash) {
              const newUser = new User({
                email,
                username,
                password: hash,
                dob,
                newsletter,
              });

              newUser
                .save()
                .then((fresult) => {
                  const token = jwt.sign(
                    {
                      id: fresult._id,
                      username: fresult.username,
                      rank: fresult.rank,
                    },
                    jwtSecret,
                    { expiresIn: "60m" }
                  );
                  return res.status(200).json({
                    message: "حساب کاربری شما با موفقیت ایجاد شد",
                    success: "true",
                    token: token,
                  });
                })
                .catch((err) => {
                  return res.status(500).json({
                    error: "server",
                    message: "خطایی در هنگام ذخیره کاربر رخ داد",
                    errors: err,
                  });
                });
            })
            .catch((err) => {
              return res.status(500).json({
                error: "server",
                message: "خطایی در هنگام رمزگذاری کلمه عبور رخ داد",
                errors: err,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: "server",
          message: "خطایی در هنگام بررسی کاربران رخ داد",
          errors: err,
        });
      });
  }
};

//login procedure with jwt authentication
module.exports.login = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      error: "validation",
      message: "لطفا اطلاعات را به درستی وارد کنید",
      errors: result.array(),
    });
  } else {
    const { username, password } = req.body;
    User.findOne({ username })
      .then((result) => {
        if (!result) {
          return res.status(200).json({
            error: "auth",
            message: "حساب کاربری پیدا نشد!",
            errors: {
              msg: "حسابی با این نام کاربری وجود ندارد. لطفا ثبت نام کنید",
            },
          });
        } else {
          bcrypt.compare(
            password,
            result.password,
            async function (err, match) {
              if (err) {
                return res.status(500).json({
                  error: "server",
                  message: "خطایی در هنگام مقایسه پسورد رخ داد",
                  errors: err,
                });
              }
              if (match) {
                //updates the last login
                await User.findOneAndUpdate(
                  { username },
                  { lastlogin: Date.now() }
                );

                const token = jwt.sign(
                  {
                    id: result._id,
                    username: result.username,
                    rank: result.rank,
                  },
                  jwtSecret,
                  { expiresIn: "60m" }
                );
                return res.status(200).json({
                  success: "true",
                  message: "با موفقیت به حساب خود وارد شدید",
                  token: token,
                });
              }
              return res.status(200).json({
                error: "auth",
                message: "کلمه عبور وارد شده صحیح نمی‌باشد!",
                errors: {
                  msg: "کلمه عبوری که وارد کردید اشتباه است. دوباره تلاش کنید",
                },
              });
            }
          );
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: "server",
          message: "خطایی در هنگام بررسی کاربران رخ داد",
          errors: err,
        });
      });
  }
};

module.exports.myaccount = (req, res, next) => {
  const user = req.userData.id;
  if (!user) {
    return res.status(400).json({
      error: "User not found / not logged in. Please login to your account.",
    });
  } else {
    User.findOne({ _id: user }, [
      "email",
      "username",
      "dob",
      "rank",
      "lastlogin",
    ])
      .then((result) => {
        return res.status(200).json({
          message: "successfully fetched user info",
          user: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "An error occured",
          errors: err,
        });
      });
  }
};

module.exports.editaccount = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      error: "validation",
      message: "لطفا اطلاعات را به درستی وارد کنید",
      errors: result.array(),
    });
  } else {
    const user = req.userData.id;
    const { email, username, oldpassword, newpassword, dob } = req.body;

    let toBeUpdatedJson = Object.assign(
      {},
      email ? { email } : {},
      username ? { username } : {},
      dob ? { dob } : {}
    );

    if (oldpassword && newpassword) {
      let previoushashedpass = null;
      User.findOne({ _id: user })
        .then((result) => {
          if (!result) {
            return res.status(200).json({
              error: "auth",
              message: "حساب کاربری پیدا نشد!",
              errors: {
                msg: "حسابی با این نام کاربری وجود ندارد. لطفا ثبت نام کنید",
              },
            });
          } else {
            previoushashedpass = result.password;
            bcrypt.compare(oldpassword, previoushashedpass, (err, match) => {
              if (!match) {
                return res.status(400).json({
                  error: "auth",
                  message: "کلمه عبور وارد شده صحیح نمی‌باشد!",
                  errors: {
                    msg: "کلمه عبوری که وارد کردید اشتباه است. دوباره تلاش کنید",
                  },
                });
              } else if (match) {
                bcrypt
                  .hash(newpassword, 12)
                  .then((hash) => {
                    toBeUpdatedJson = { ...toBeUpdatedJson, password: hash };
                    User.updateOne({ _id: user }, toBeUpdatedJson)
                      .then((result) => {
                        return res.status(200).json({
                          success: "true",
                          message: "اطلاعات حساب شما با موفقیت به روز شد",
                          info: result,
                        });
                      })
                      .catch((err) => {
                        return res.status(500).json({
                          error: "server",
                          message: "خطایی در هنگام ذخیره اطلاعات رخ داد",
                          errors: err,
                        });
                      });
                  })
                  .catch((err) => {
                    return res.status(500).json({
                      error: "server",
                      message: "خطایی در هنگام رمزگذاری کلمه عبور رخ داد",
                      errors: err,
                    });
                  });
              } else if (err) {
                return res.status(500).json({
                  error: "server",
                  message: "خطایی در هنگام ذخیره اطلاعات رخ داد",
                  errors: err,
                });
              }
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            error: "server",
            message: "خطایی در سرور رخ داد",
            errors: err,
          });
        });
    } else {
      User.updateOne({ _id: user }, toBeUpdatedJson)
        .then((result) => {
          return res.status(200).json({
            success: "true",
            message: "اطلاعات حساب شما با موفقیت به روز شد",
            info: result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "server",
            message: "خطایی در هنگام ذخیره اطلاعات رخ داد",
            errors: err,
          });
        });
    }
  }
};

module.exports.editCategory = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      errors: result.array(),
    });
  } else {
    const user = req.userData.id;
    if (!user) {
      return res.status(400).json({
        error: "User not found / not logged in. Please login to your account.",
      });
    } else {
      const filename = "http://localhost:3001/files/" + req.file.filename;
      const { id, name, description } = req.body;

      let toBeUpdatedJson = Object.assign(
        {},
        name ? { name: name } : {},
        description ? { description: description } : {},
        filename ? { file: filename } : {}
      );

      Category.updateOne({ _id: id }, toBeUpdatedJson)
        .then((result) => {
          return res.status(200).json({
            success: "true",
            message: "اطلاعات دسته بندی به روز شد",
            result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "server",
            message: "خطایی در هنگام ذخیره دسته بندی رخ داد",
            errors: err,
          });
        });
    }
  }
};

module.exports.editmovie = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      errors: result.array(),
    });
  } else {
    const user = req.userData.id;
    if (!user) {
      return res.status(400).json({
        error: "User not found / not logged in. Please login to your account.",
      });
    } else {
      const { name, duration, releaseYear, description, categories, slug, id } =
        req.body;

      const categoriesList = categories.split(",");

      let categoryIdsList = await getCategoryIds(user, categoriesList);

      let toBeUpdatedJson = {
        name,
        duration,
        releaseYear,
        description,
        categories: categoryIdsList,
        slug,
      };

      Movie.updateOne({ _id: id }, toBeUpdatedJson)
        .then((result) => {
          return res.status(200).json({
            success: "true",
            message: "اطلاعات فیلم به روز شد.",
            result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "server",
            message: "An error occured updating the info",
            errors: err,
          });
        });
    }
  }
};
