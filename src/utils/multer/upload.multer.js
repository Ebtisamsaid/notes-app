import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";

export const fileValidation = {
  image: ["image/png", "image/jpeg", "image/jpg"]
};

export const upload = (fileType, folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      try {

        const fullPath = path.join(".", "uploads", folder, req.user._id.toString());
    
        fs.mkdirSync(fullPath, { recursive: true });
        
        cb(null, fullPath);
      } catch (error) {
        cb(error);
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${nanoid()}${ext}`;
      cb(null, uniqueName);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (!fileType.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  };

  return multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
  });
};