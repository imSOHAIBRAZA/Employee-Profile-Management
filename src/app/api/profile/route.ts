
import { NextRequest, NextResponse } from 'next/server';

interface Profile {
  name: string;
  email: string;
  profilePicture: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
}

interface Skill {
  id: number;
  skillName: string;
}

// Initial data for the profile
let profile: Profile = {
  name: 'Sohaib Raza',
  email: 'sohaibraza789@gmail.com',
  profilePicture: "https://avatars.githubusercontent.com/u/26149018?v=4",
  experience: [
    { id: 1, company: 'Secomind.ai', role: 'Senior React Developer', duration: '2 years' },
    { id: 2, company: 'Radical Stack', role: 'React Developer', duration: '3 years' },
  ],
  education: [
    { id: 1, institution: 'GC University', degree: 'BSc Computer Science', year: '2015' },
  ],
  skills: [{ id: 1, skillName: 'React' },{ id: 2, skillName: 'NodeJs' }],
};

// app/api/profile/route.ts

export async function GET(req: NextRequest) {
  return NextResponse.json(profile, { status: 200 });
}

export async function POST(req: NextRequest) {
  const newProfileData = await req.json();
  profile = { ...profile, ...newProfileData };
  return NextResponse.json(profile, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const updatedProfileData = await req.json();
  
  // Handle updating experience, education, and skills individually if needed
  if (updatedProfileData.experience) {
    profile.experience = updatedProfileData.experience;
  }
  if (updatedProfileData.education) {
    profile.education = updatedProfileData.education;
  }
  if (updatedProfileData.skills) {
    profile.skills = updatedProfileData.skills;
  }
  
  profile = { ...profile, ...updatedProfileData };
  return NextResponse.json(profile, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { section, id } = await req.json();

  if (section === 'experience') {
    profile.experience = profile.experience.filter((exp) => exp.id !== id);
  } else if (section === 'education') {
    profile.education = profile.education.filter((edu) => edu.id !== id);
  } else if (section === 'skills') {
    profile.skills = profile.skills.filter((skill) => skill.id !== id);
  }

  return NextResponse.json({ message: `${section} entry deleted` }, { status: 200 });
}
