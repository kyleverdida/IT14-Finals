import multer from "multer";

// Memory storage for Firebase upload
const storage = multer.memoryStorage();

// Accept only images and reject empty files
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
    } else if (file.size === 0) {
      cb(new Error("File is empty."));
    } else {
      cb(null, true);
    }
  },
});
