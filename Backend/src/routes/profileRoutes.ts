import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";
import multer from "multer";

const router = Router();
const profileController = new ProfileController();

router.post("/createprofile",authMiddleware(['admin', 'user']), (req, res) => profileController.createProfile(req, res));
router.get("/profile/:userId",authMiddleware(['user', 'admin']), (req, res) => profileController.getProfile(req, res));
router.put("/profile/:userId",authMiddleware(['user', 'admin']), (req, res) => profileController.updateProfile(req, res)); // For updating profile
router.delete("/delete/:userId",authMiddleware(['user', 'admin']), (req, res) => profileController.deleteProfile(req, res)); // For updating profile

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
});

router.post("/upload-profile-picture/:userId", upload.single("profilePicture"), profileController.uploadProfilePicture.bind(profileController));

export default router;
