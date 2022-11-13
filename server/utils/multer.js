const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   console.log(path.join(__dirname.slice(__dirname.length-6,__dirname.length), "server/uploads"))
    cb(
      null,
      "server/uploads"
    );
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
module.exports = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);

      const err = new Error("only jpeg jpg png are allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
});
