"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const profileController = new profileController_1.ProfileController();
router.post("/createprofile", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => profileController.createProfile(req, res));
router.get("/profile/:userId", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => profileController.getProfile(req, res));
router.put("/profile/:userId", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => profileController.updateProfile(req, res)); // For updating profile
router.delete("/delete/:userId", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => profileController.deleteProfile(req, res)); // For updating profile
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
});
router.post("/upload-profile-picture/:userId", upload.single("profilePicture"), profileController.uploadProfilePicture.bind(profileController));
exports.default = router;
