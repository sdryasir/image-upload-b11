import express from "express";
import { registerUser, loginUser, logOutUser } from "../controllers/authController.js";
import multer from 'multer'


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const filePath = path.join(__dirname, '../uploads');
            cb(null, filePath);
        },
        filename: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            const fileName = (new Date().getTime() / 1000 | 0) + '.' + extension;
            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 2 // MB
    },
    fileFilter: (req, file, cb) => {
        let valid = (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
        cb(null, valid);
    },
})

const router = express.Router();


router.route('/auth/register').post(upload.single('avatar'), registerUser);

router.route('/auth/login').post(loginUser);
router.route('/auth/logout').post(logOutUser);




export default router;
