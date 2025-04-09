import { ProfileDTO } from "../dto/profileDTO";
import { ProfileRepository } from "../repositories/ProfileRepo";


export class profileService{
    async createProfile(profileData: ProfileDTO): Promise<ProfileDTO> {
        // Create a new profile entity using the provided data
        const newProfile = ProfileRepository.create({
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
        await ProfileRepository.save(newProfile);

        // Return the created profile as a DTO
        const profileDTO: ProfileDTO = {
            name: newProfile.name,
            age: newProfile.age,
            gender: newProfile.gender,
            weight: newProfile.weight,
            height: newProfile.height,
            profilePicture: newProfile.profilePicture,
            fitnessLevel: newProfile.fitnessLevel
        };
        return profileDTO;
    }

    async uploadProfilePicture(userId: number, filePath: string): Promise<ProfileDTO | null> {
        const profile = await ProfileRepository.findOne({ where: { user: { id: userId } } });

        if (!profile) {
            return null; // Profile not found
        }

        // Update the profile with the uploaded picture path
        profile.profilePicture = filePath;
        const updatedProfile = await ProfileRepository.save(profile);

        return this.createProfile(updatedProfile); // Return updated profile as DTO
    }

    async getProfile(userId: number): Promise<ProfileDTO | null> {
        const profile = await ProfileRepository.findOne({
            where: { user: { id: userId } }
        });
        if (!profile) {
            return null;
        }

        // Map database entity to ProfileDTO (if needed for frontend or other layers)
        const profileDTO: ProfileDTO = {
            name: profile.name,
            age: profile.age,
            gender: profile.gender,
            weight: profile.weight,
            height: profile.height,
            profilePicture: profile.profilePicture,
            fitnessLevel: profile.fitnessLevel
        };
        return profileDTO;
    }


    async updateProfile(userId: number, profileData: Partial<ProfileDTO>): Promise<ProfileDTO | null> {

        const profile = await ProfileRepository.findOne({
            where: { user: { id: userId } }
        });
    
        if (!profile) {
            return null; 
        }
    
        // Update the existing profile with only provided fields
        Object.assign(profile, profileData);
    
        // Save the updated profile to the database
        const updatedProfile = await ProfileRepository.save(profile);
    
        // Return the updated profile as a DTO
        const profileDTO: ProfileDTO = {
            name: updatedProfile.name,
            age: updatedProfile.age,
            gender: updatedProfile.gender,
            weight: updatedProfile.weight,
            height: updatedProfile.height,
            profilePicture: updatedProfile.profilePicture,
            fitnessLevel: updatedProfile.fitnessLevel
        };
    
        return profileDTO;
    }

    async deleteProfile(userId: number): Promise<boolean> {
        const profile = await ProfileRepository.findOne({
            where: { user: { id: userId } }
        });
    
        if (!profile) {
            return false; // Profile not found
        }
    
        await ProfileRepository.remove(profile);
        return true; // Successfully deleted
    }
    
    
}