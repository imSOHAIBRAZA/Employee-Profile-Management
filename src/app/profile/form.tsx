'use client';

import { useState, useEffect } from "react";
import {
  Button,
  Text,
  ActionIcon,
  Input,
  Title,
} from "rizzui";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useModal } from "../shared/modal-views/use-modal";
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import toast from 'react-hot-toast';

// Define the types for form data
interface FormProps {
  title: string;
  onSubmit: (data: any) => void;
  initialValues?: any;
}

export default function Form({ title, onSubmit, initialValues }: FormProps) {
  const { closeModal } = useModal();

  // Initialize form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    company: "",
    role: "",
    duration: "",
    institution: "",
    degree: "",
    year: "",
    skillName: "",
  });

  // Initialize form errors state
  const [errors, setErrors] = useState<any>({});

  // Set initial values when the component mounts or initialValues change
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  // Handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form data
    const validationErrors: any = {};

    if (title === "Edit Profile") {
      if (!formData.name) validationErrors.name = "Name is required.";
      if (!formData.email) validationErrors.email = "Email is required.";
    } else if (title === "Experience") {
      if (!formData.company) validationErrors.company = "Company is required.";
      if (!formData.role) validationErrors.role = "Role is required.";
      if (!formData.duration) validationErrors.duration = "Duration is required.";
    } else if (title === "Education") {
      if (!formData.institution) validationErrors.institution = "Institution is required.";
      if (!formData.degree) validationErrors.degree = "Degree is required.";
      if (!formData.year) validationErrors.year = "Year is required.";
    } else if (title === "Skills") {
      if (!formData.skillName) validationErrors.skillName = "Skill Name is required.";
    }

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors and submit the form
    setErrors({});
    try {
      onSubmit(formData);
      closeModal();
      toast.success(`${title} successfully ${initialValues ? 'updated' : 'added'}!`);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle avatar change
  const handleAvatarChange = (avatar: string) => {
    setFormData({ ...formData, profilePicture: avatar });
  };

  return (
    <div className="m-auto px-7 pt-6 pb-8">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h3">{title}</Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
        >
          <XMarkIcon className="h-auto w-6" strokeWidth={1.8} />
        </ActionIcon>
      </div>
      <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
        {/* Form fields for "Edit Profile" */}
        {title === "Edit Profile" && (
          <>
            <Input
              label="Name *"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              className="col-span-2"
              error={errors.name}
            />
            <Input
              label="Email *"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              className="col-span-2"
              error={errors.email}
            />
            <div className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11">
              <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                <AvatarUpload
                  name="avatar"
                  setValue={handleAvatarChange}
                  getValues={() => formData.profilePicture}
                />
              </div>
            </div>
          </>
        )}
        {/* Form fields for "Experience" */}
        {title === "Experience" && (
          <>
            <Input
              label="Company *"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              error={errors.company}
            />
            <Input
              label="Role *"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              error={errors.role}
            />
            <Input
              label="Duration *"
              type="month"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              className="col-span-2"
              error={errors.duration}
            />
          </>
        )}
        {/* Form fields for "Education" */}
        {title === "Education" && (
          <>
            <Input
              label="Institution *"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              error={errors.institution}
            />
            <Input
              label="Degree *"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              error={errors.degree}
            />
            <Input
              label="Year *"
              type="month"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              className="col-span-2"
              error={errors.year}
            />
          </>
        )}
        {/* Form fields for "Skills" */}
        {title === "Skills" && (
          <>
            <Input
              label="Skill Name *"
              id="skillName"
              name="skillName"
              value={formData.skillName}
              onChange={handleInputChange}
              inputClassName="border-2"
              size="lg"
              className="col-span-2"
              error={errors.skillName}
            />
          </>
        )}
        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          className="col-span-2 mt-2"
          onClick={handleSubmit}
        >
          {initialValues ? 'Save' : 'Add'}
        </Button>
      </div>
    </div>
  );
}
