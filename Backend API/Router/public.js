const express = require('express')
const router = express.Router()
const publicController = require('../Controller/public')
const { userAuth, frontAuthReq } = require("../Middleware/user_auth")
const { check } = require('express-validator');

// validation and sanitization middlewares for inputs that will be received from users.
const {favoritesValidationMiddleware, signupValidationMiddleware, loginValidationMiddleware, movieValidationMiddleware, queryValidationMiddleware, editaccountValidationMiddleware, editCategoryValidationMiddleware } = require("../Middleware/validation")

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = file.originalname.split('.')
    cb(null, 'movieposter-' + uniqueSuffix + "." + fileExtension[fileExtension.length - 1])
  }
})

const upload = multer({ storage: storage, 
  limits: {fileSize: 1024 * 1024 * 5},
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('فقط فایل تصویر مجاز است!'));
    }
    cb(null, true);
  }})

//routes -- !!! order of these matters!

router.get('/', frontAuthReq)

router.post('/favorite', userAuth, favoritesValidationMiddleware, publicController.postFavorite)

router.get('/favorite', userAuth, publicController.getFavorites)

router.get('/movie', publicController.getAllMovies)

router.get('/movie/:queryParam',queryValidationMiddleware, publicController.getOneMovie)

router.post('/movie', userAuth, upload.single('file'), movieValidationMiddleware,  publicController.postMovie)

router.post('/category', userAuth, upload.single('file'), editCategoryValidationMiddleware,  publicController.postCategory)

router.get('/category', publicController.getAllCategories)

router.put('/category', userAuth, upload.single('file'), editCategoryValidationMiddleware, publicController.editCategory)

router.put('/movie', userAuth, movieValidationMiddleware, publicController.editmovie)

router.get('/category/:queryParam',queryValidationMiddleware, publicController.getOneCategory)

router.post('/signup', signupValidationMiddleware, publicController.signUp)

router.post('/login', loginValidationMiddleware, publicController.login)

router.get('/myaccount', userAuth, publicController.myaccount)

router.get('/users', userAuth, publicController.getAllUsers)

router.put('/myaccount', userAuth, editaccountValidationMiddleware, publicController.editaccount)


module.exports = router