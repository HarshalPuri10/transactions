import multer, { diskStorage } from "multer";
const paths = {
  images: "./src/assets/productImages",
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else if (
    file.originalname.match(/\.(pdf|docx|doc|xlsx|ppt|pptx|jpg|jpeg|csv)$/)
  ) {
    cb(null, true);
  } else {
    cb("Please upload only file.", false);
  }
};

let storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, paths[req.body.key]);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

let uploadFile = multer({ storage: storage, fileFilter: imageFilter });

export default uploadFile;
