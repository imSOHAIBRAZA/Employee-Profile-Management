import ProfileSection from "./profile-section";
import { ProfileHeader } from "../shared/profile/profile-header";

// Define the types for the profile data
interface Profile {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  experience: Experience[];
  education: Experience[];
  skills: Experience[];
}

// Define the type for individual experience or education entries
interface Experience {
  id: number;
  company?: string;
  role?: string;
  duration?: string;
  institution?: string;
  degree?: string;
  year?: string;
  skillName?: string;
}

// Fetch profile data from the API
async function fetchProfile(): Promise<Profile> {
  // Fetch profile data from the API without using cached data
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    cache: 'no-store', // Ensure fresh data is fetched
  });

  // Check if the response is OK
  if (!res.ok) {
    throw new Error('Failed to fetch data'); // Throw an error if the request fails
  }

  // Return the fetched data as JSON
  return res.json();
}

// Main ProfilePage component
export default async function ProfilePage() {
  // Fetch the profile data
  const data = await fetchProfile();

  // Destructure the profile data
  const { name, email, profilePicture, experience, education, skills } = data;

  return (
    <div>
      {/* Render the profile header with name, email, and profile picture */}
      <ProfileHeader 
        title={name} 
        description={email} 
        profilePicture={profilePicture} 
      />

      {/* Render sections for experience, education, and skills */}
      <ProfileSection
        title="Experience"
        initialValues={experience}
      />

      <ProfileSection
        title="Education"
        initialValues={education}
      />

      <ProfileSection
        title="Skills"
        initialValues={skills}
      />
    </div>
  );
}
