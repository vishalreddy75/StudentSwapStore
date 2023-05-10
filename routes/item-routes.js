const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items-controller");
const auth = require("../middleware/auth")
const upload = require("../middleware/upload")

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'public/upload');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage }).single('image');






router.get("/",itemsController.getAllItems);

router.get("/user",auth,itemsController.getYourItems);

router.get("/add",auth,upload,async (req, res, next) => {
  res.render("addProduct.ejs",{Title:"Add a Product",Usage:"Upload a Product"});
});


router.post("/add",auth,upload,itemsController.addItem);

router.get("/add/:id",itemsController.getById);



router.get("/add/:id/update",auth,upload,async (req, res, next) => {
  res.render("updateProduct.ejs",{Title:"Update Product details",id:req.params.id});
})
router.post("/add/:id/update",auth,upload,itemsController.updateItem);

router.get("/add/:id/delete",auth,itemsController.deleteItem);


module.exports = router;
