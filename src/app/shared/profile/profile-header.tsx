// 'use client';

// import Image from 'next/image';
// import { PiEnvelopeSimple, PiSealCheckFill } from 'react-icons/pi';
// // import { Form } from '@/components/ui/form';
// import Form from '@/app/profile/form';
// import { Button, Title, Text, Input, Checkbox, Select } from 'rizzui';
// import cn from '@/utils/class-names';
// import { useModal } from '@/app/shared/modal-views/use-modal';
// // import { useLayout } from '@/hooks/use-layout';
// // import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
// import { LAYOUT_OPTIONS } from '@/config/enums';


// export function ProfileHeader({
//     title,
//     description,
//     children,
//     profilePicture
//   }: React.PropsWithChildren<{ title: string; description?: string,profilePicture?:string }>) {
//     const { openModal } = useModal();
//     // const { layout } = useLayout();
//     // const { expandedLeft } = useBerylliumSidebars();
  
//     return (
//       <div
//         className= 'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10'
//       >
//         <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-muted pb-10">
//           <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
//             <Image
//               src={profilePicture}
//               alt="profile-pic"
//               fill
//               sizes="(max-width: 768px) 100vw"
//               className="aspect-auto"
//             />
//           </div>
//           <div>
//             <Title
//               as="h2"
//               className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
//             >
//               {title}
//               <PiSealCheckFill
//                onClick={() => openModal({
//                         view: <Form title={title} initialValues={exp} onSubmit={(updatedData) => handleEdit(exp.id, updatedData)} />,
//                         customSize: '720px',
//                     })}
//                      className="h-5 w-5 text-primary md:h-6 md:w-6" />
//             </Title>
//             {description ? (
//               <Text className="text-sm text-gray-500">{description}</Text>
//             ) : null}
//           </div>
//           {children}
//         </div>
//       </div>
//     );
//   }
  
'use client';

import Image from 'next/image';
import { PiSealCheckFill } from 'react-icons/pi';
import Form from '@/app/profile/form';
import { Title, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useState } from 'react';

export function ProfileHeader({
  title,
  description,
  profilePicture,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  profilePicture?: string;
}>) {
  const { openModal } = useModal();
  const [profileData, setProfileData] = useState({
    name: title,
    email: description,
    profilePicture,
  });

  const handleEdit = async (updatedData) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedData.name || profileData.name,
          email: updatedData.email || profileData.email,
          profilePicture: updatedData.profilePicture || profileData.profilePicture,
        }),
      });

      if (res.ok) {
      
        setProfileData((prevData) => ({
          ...prevData,
          name: updatedData.name || prevData.name,
          email: updatedData.email || prevData.email,
          profilePicture: updatedData.profilePicture || prevData.profilePicture,
        }));
      } else {
        console.error('Failed to update profile:', await res.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10'>
      <div className='relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-muted pb-10'>
        <div className='relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]'>
          <Image
            src={profileData.profilePicture}
            alt='profile-pic'
            fill
            sizes='(max-width: 768px) 100vw'
            className='aspect-auto'
          />
        </div>
        <div>
          <Title
            as='h2'
            className='mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900'>
            {profileData.name}
            <PiSealCheckFill
              onClick={() =>
                openModal({
                  view: (
                    <Form
                      title='Edit Profile'
                      initialValues={profileData}
                      onSubmit={(updatedData) => handleEdit(updatedData)}
                    />
                  ),
                  customSize: '720px',
                })
              }
              className='h-5 w-5 text-primary md:h-6 md:w-6'
            />
          </Title>
          {profileData.email ? (
            <Text className='text-sm text-gray-500'>{profileData.email}</Text>
          ) : null}
        </div>
      </div>
    </div>
  );
}
