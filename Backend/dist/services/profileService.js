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
exports.profileService = void 0;
const ProfileRepo_1 = require("../repositories/ProfileRepo");
class profileService {
    createProfile(profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a new profile entity using the provided data
            const newProfile = ProfileRepo_1.ProfileRepository.create({
                name: profileData.name,
                age: profileData.age,
                gender: profileData.gender,
                weight: profileData.weight,
                height: profileData.height,
                profilePicture: profileData.profilePicture, // Include profile picture path
                fitnessLevel: profileData.fitnessLevel,
                user: profileData.user // Assuming there's a user relation
            });
            // Save the new profile to the database
            yield ProfileRepo_1.ProfileRepository.save(newProfile);
            // Return the created profile as a DTO
            const profileDTO = {
                name: newProfile.name,
                age: newProfile.age,
                gender: newProfile.gender,
                weight: newProfile.weight,
                height: newProfile.height,
                profilePicture: newProfile.profilePicture,
                fitnessLevel: newProfile.fitnessLevel
            };
            return profileDTO;
        });
    }
    uploadProfilePicture(userId, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileRepo_1.ProfileRepository.findOne({ where: { user: { id: userId } } });
            if (!profile) {
                return null; // Profile not found
            }
            // Update the profile with the uploaded picture path
            profile.profilePicture = filePath;
            const updatedProfile = yield ProfileRepo_1.ProfileRepository.save(profile);
            return this.createProfile(updatedProfile); // Return updated profile as DTO
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileRepo_1.ProfileRepository.findOne({
                where: { user: { id: userId } }
            });
            if (!profile) {
                return null;
            }
            // Map database entity to ProfileDTO (if needed for frontend or other layers)
            const profileDTO = {
                name: profile.name,
                age: profile.age,
                gender: profile.gender,
                weight: profile.weight,
                height: profile.height,
                profilePicture: profile.profilePicture,
                fitnessLevel: profile.fitnessLevel
            };
            return profileDTO;
        });
    }
    updateProfile(userId, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileRepo_1.ProfileRepository.findOne({
                where: { user: { id: userId } }
            });
            if (!profile) {
                return null;
            }
            // Update the existing profile with only provided fields
            Object.assign(profile, profileData);
            // Save the updated profile to the database
            const updatedProfile = yield ProfileRepo_1.ProfileRepository.save(profile);
            // Return the updated profile as a DTO
            const profileDTO = {
                name: updatedProfile.name,
                age: updatedProfile.age,
                gender: updatedProfile.gender,
                weight: updatedProfile.weight,
                height: updatedProfile.height,
                profilePicture: updatedProfile.profilePicture,
                fitnessLevel: updatedProfile.fitnessLevel
            };
            return profileDTO;
        });
    }
    deleteProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileRepo_1.ProfileRepository.findOne({
                where: { user: { id: userId } }
            });
            if (!profile) {
                return false; // Profile not found
            }
            yield ProfileRepo_1.ProfileRepository.remove(profile);
            return true; // Successfully deleted
        });
    }
}
exports.profileService = profileService;
