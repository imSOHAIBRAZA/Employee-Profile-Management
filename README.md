
**Live Demo** 
 https://employee-profile-management-gray.vercel.app/

# Profile Management System

This project is a simple Profile Management System built with Next.js, React, and TypeScript. It allows users to manage their profile information, including their name, email, profile picture, experience, education, and skills. The project supports CRUD operations for each section and includes client-side form validation.

## Features

- Edit Profile Information (Name, Email, Profile Picture)
- Manage Experience (Company, Role, Duration)
- Manage Education (Institution, Degree, Year)
- Manage Skills (Skill Name)
- Form validation to ensure all required fields are filled out
- Responsive and user-friendly UI

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Development Approach](#development-approach)
  - [Project Structure and Components](#project-structure-and-components)
  - [Form Validation](#form-validation)
  - [Design Decisions](#design-decisions)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/profile-management-system.git
   cd profile-management-system

2. **Install Dependencies:**

    npm install

2. **env.local**

    NEXT_PUBLIC_BASE_URL=http://localhost:3000 // port number according to your server port

4. **Running the Project:**
    
    To start the development server:
    
    npm run dev


**Development Approach**

# Project Structure and Components
The project is divided into components for managing different sections of a user's profile. The main components include:

# Form Component: 
A reusable form component that handles different types of data (Profile, Experience, Education, Skills). It includes form validation to ensure all fields are correctly filled out before submission.

# AvatarUpload Component:
 A custom file upload component used for uploading profile pictures.

# Form Validation
Client-side form validation is implemented to ensure that all required fields are filled out before the user can submit the form. If any field is missing, an error message is displayed next to the relevant input field.

**Design Decisions**
# React State Management: 
The form data and error states are managed using React's useState hook.

# Reusable Components: 
The form structure is designed to be reusable across different sections (Profile, Experience, Education, Skills) with minimal changes.

# Toast Notifications: 
react-hot-toast is used to provide instant feedback to the user on the success or failure of form submissions



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.