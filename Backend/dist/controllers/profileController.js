"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const profileService_1 = require("../services/profileService");
class ProfileController {
    constructor() {
        this.profileService = new profileService_1.profileService();
    }
    createProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileData = req.body;
                const createdProfile = yield this.profileService.createProfile(profileData);
                res.status(201).send(createdProfile);
            }
            catch (error) {
                console.error("Error creating profile:", error);
                res.status(500).send({ message: "An error occurred while creating the profile.", error });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const profileData = req.body;
                const updatedProfile = yield this.profileService.updateProfile(userId, profileData);
                if (!updatedProfile) {
                    res.status(404).json({ message: "Profile not found." });
                    return;
                }
                console.log("profile updated");
                res.status(200).json(updatedProfile);
            }
            catch (error) {
                console.error("Error updating profile:", error);
                res.status(500).json({ message: "An error occurred while updating the profile.", error });
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const profile = yield this.profileService.getProfile(userId);
                if (!profile) {
                    res.status(404).json({ message: "Profile not found" });
                    return;
                }
                res.status(200).json(profile);
            }
            catch (error) {
                console.error("Error fetching profile:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    deleteProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const isDeleted = yield this.profileService.deleteProfile(userId);
                if (!isDeleted) {
                    res.status(404).json({ message: "Profile not found" });
                }
                else {
                    res.status(200).json({ message: "Profile successfully deleted" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete profile" });
            }
        });
    }
    uploadProfilePicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = parseInt(req.params.userId, 10);
            const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            if (!filePath) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }
            try {
                // Full file path to serve the image
                const filePathWithBaseUrl = `http://localhost:3300/uploads/${req.file.filename}`;
                // profilePicture = filePathWithBaseUrl;
                // Save the file path in the database via the service
                const updatedProfile = yield this.profileService.uploadProfilePicture(userId, filePathWithBaseUrl);
                if (!updatedProfile) {
                    res.status(404).json({ message: "Profile not found" });
                    return;
                }
                res.status(200).json({
                    message: "Profile picture uploaded successfully",
                    profile: updatedProfile,
                });
            }
            catch (error) {
                res.status(500).json({ message: "Error uploading profile picture", error });
            }
        });
    }
}
exports.ProfileController = ProfileController;
//     const updatedProfile = await this.profileService.uploadProfilePicture(userId, filePath);
//     if (!updatedProfile) {
//         res.status(404).json({ message: "Profile not found" });
//         return;
//     }
//     res.status(200).json({
//         message: "Profile picture uploaded successfully",
//         profile: updatedProfile,
//     });
// }
