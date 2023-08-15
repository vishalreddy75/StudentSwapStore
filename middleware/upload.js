const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/upload');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

module.exports = (req, res, next) => {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Unable To Add" });
    }
    next();
  });
};
