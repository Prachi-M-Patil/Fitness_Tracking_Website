import { ProfileDTO } from "../dto/profileDTO";
import { ProfileRepository } from "../repositories/ProfileRepo";
import { profileService } from "../services/profileService";
import { Request, Response } from "express";

export class ProfileController{
    private profileService = new profileService();

    async createProfile(req: Request, res: Response): Promise<void> {
        try {
            const profileData: ProfileDTO = req.body; 
            const createdProfile = await this.profileService.createProfile(profileData); 
            res.status(201).send(createdProfile);
        } catch (error) {
            console.error("Error creating profile:", error); 
            res.status(500).send({ message: "An error occurred while creating the profile.", error });
        }
    }

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const profileData : Partial<ProfileDTO> = req.body;

            const updatedProfile = await this.profileService.updateProfile(userId, profileData);
            if (!updatedProfile) {
                res.status(404).json({ message: "Profile not found." });
                return;
            }
            console.log("profile updated");

            res.status(200).json(updatedProfile);
        } catch (error) {
            console.error("Error updating profile:", error); 
            res.status(500).json({ message: "An error occurred while updating the profile.", error });
        }
    
    }

    
    async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const profile: ProfileDTO | null = await this.profileService.getProfile(userId);
            
            if (!profile) {
                res.status(404).json({ message: "Profile not found" });
                return;
            }
            
            res.status(200).json(profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteProfile(req: Request, res: Response){
        try{
            const userId = parseInt(req.params.userId);
           
            const isDeleted = await this.profileService.deleteProfile(userId);
            
            if (!isDeleted) {
                res.status(404).json({ message: "Profile not found" });
            } else {
                res.status(200).json({ message: "Profile successfully deleted" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to delete profile" });
        }
    
           
        }

        async uploadProfilePicture(req: Request, res: Response): Promise<void> {
            const userId = parseInt(req.params.userId, 10);
            const filePath = req.file?.path;
    
            if (!filePath) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }

            try {
                // Full file path to serve the image
                const filePathWithBaseUrl = `http://localhost:3300/uploads/${req.file.filename}`;
                // profilePicture = filePathWithBaseUrl;
                // Save the file path in the database via the service
                const updatedProfile = await this.profileService.uploadProfilePicture(userId, filePathWithBaseUrl);
          
                if (!updatedProfile) {
                  res.status(404).json({ message: "Profile not found" });
                  return;
                }
          
                res.status(200).json({
                  message: "Profile picture uploaded successfully",
                  profile: updatedProfile,
                });
              } catch (error) {
                res.status(500).json({ message: "Error uploading profile picture", error });
              }
        }
}
    
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

