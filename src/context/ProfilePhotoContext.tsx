import React, { createContext, useContext, useEffect } from 'react';

interface ProfilePhotoContextType {
  photoUrl: string;
}

export const DEFAULT_PROFILE_PHOTO = '/images/buike-portfolio-profile.jpg';

const ProfilePhotoContext = createContext<ProfilePhotoContextType>({
  photoUrl: DEFAULT_PROFILE_PHOTO,
});

export function ProfilePhotoProvider({ children }: { children: React.ReactNode }) {
  // Clear any old temporary base64 image strings from previous upload attempts
  useEffect(() => {
    try {
      localStorage.removeItem('buike_profile_photo_v3');
      localStorage.removeItem('buike_profile_photo_v2');
      localStorage.removeItem('buike_profile_photo_v1');
    } catch {
      // ignore
    }
  }, []);

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl: DEFAULT_PROFILE_PHOTO,
      }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
}

export function useProfilePhoto() {
  const context = useContext(ProfilePhotoContext);
  if (!context) {
    return { photoUrl: DEFAULT_PROFILE_PHOTO };
  }
  return context;
}

