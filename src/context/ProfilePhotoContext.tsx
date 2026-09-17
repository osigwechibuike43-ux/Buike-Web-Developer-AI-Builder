import React, { createContext, useContext, useEffect, useState } from 'react';

interface ProfilePhotoContextType {
  photoUrl: string;
  isCustom: boolean;
  uploadPhoto: (file: File) => Promise<void>;
  setDirectUrl: (url: string) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'buike_profile_photo_v2';
const DEFAULT_PHOTO = '/profile.jpg';

const ProfilePhotoContext = createContext<ProfilePhotoContextType | undefined>(undefined);

export function ProfilePhotoProvider({ children }: { children: React.ReactNode }) {
  const [photoUrl, setPhotoUrl] = useState<string>(DEFAULT_PHOTO);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear old v1 photo storage if any exists so official photo displays cleanly
      localStorage.removeItem('buike_profile_photo_v1');
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.startsWith('data:image')) {
        setPhotoUrl(saved);
        setIsCustom(true);
      }
    }
  }, []);

  const uploadPhoto = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        if (result) {
          setPhotoUrl(result);
          setIsCustom(true);
          try {
            localStorage.setItem(STORAGE_KEY, result);
          } catch (err) {
            console.warn('Could not persist to localStorage:', err);
          }
          resolve();
        } else {
          reject(new Error('Failed to read image data'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const setDirectUrl = (url: string) => {
    setPhotoUrl(url);
    setIsCustom(true);
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch (e) {
      console.warn(e);
    }
  };

  const resetToDefault = () => {
    setPhotoUrl(DEFAULT_PHOTO);
    setIsCustom(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('buike_profile_photo_v1');
  };

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl,
        isCustom,
        uploadPhoto,
        setDirectUrl,
        resetToDefault,
      }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
}

export function useProfilePhoto() {
  const context = useContext(ProfilePhotoContext);
  if (!context) {
    throw new Error('useProfilePhoto must be used within a ProfilePhotoProvider');
  }
  return context;
}
