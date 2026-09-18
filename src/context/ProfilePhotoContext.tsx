import React, { createContext, useContext, useEffect, useState } from 'react';

interface ProfilePhotoContextType {
  photoUrl: string | null;
  isCustom: boolean;
  uploadPhoto: (file: File) => Promise<void>;
  setDirectUrl: (url: string) => void;
  resetToDefault: () => void;
  isDraggingOver: boolean;
}

const STORAGE_KEY = 'buike_profile_photo_v3';

const ProfilePhotoContext = createContext<ProfilePhotoContextType | undefined>(undefined);

export function ProfilePhotoProvider({ children }: { children: React.ReactNode }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('buike_profile_photo_v2') || localStorage.getItem('buike_profile_photo_v1');
      if (saved && saved.startsWith('data:image')) {
        return saved;
      }
    }
    return null;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('buike_profile_photo_v2');
      return Boolean(saved && saved.startsWith('data:image'));
    }
    return false;
  });

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Check candidate server paths if localStorage is empty
  useEffect(() => {
    if (photoUrl) return;

    const candidates = [
      '/images/buike-portfolio-profile.jpg',
      '/buike-portfolio-profile.jpg',
      '/images/buike-profile.jpg',
      '/buike-profile.jpg',
      '/my profile.jpg',
      '/my%20profile.jpg',
      '/my-profile.jpg',
      '/my_profile.jpg',
      '/profile.jpg',
      '/profile.jpeg',
      '/profile (2).jpeg',
      '/profile%20(2).jpeg',
      '/profile (2).jpg',
    ];

    const checkCandidates = async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            const contentType = res.headers.get('content-type') || '';
            if (contentType.includes('image') || res.status === 200) {
              setPhotoUrl(url);
              setIsCustom(true);
              break;
            }
          }
        } catch {
          // ignore
        }
      }
    };

    checkCandidates();
  }, [photoUrl]);

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
            localStorage.setItem('buike_profile_photo_v2', result);
          } catch (err) {
            console.warn('Could not persist to localStorage:', err);
          }

          // Persist directly to server disk at public/profile.jpg
          try {
            await fetch('/api/save-profile-photo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: result }),
            });
          } catch (apiErr) {
            console.warn('Server persist note:', apiErr);
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
    setPhotoUrl(null);
    setIsCustom(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('buike_profile_photo_v2');
    localStorage.removeItem('buike_profile_photo_v1');
  };

  // Global window drag-and-drop listener
  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
        setIsDraggingOver(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        setIsDraggingOver(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setIsDraggingOver(false);

      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          await uploadPhoto(file);
        }
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl,
        isCustom,
        uploadPhoto,
        setDirectUrl,
        resetToDefault,
        isDraggingOver,
      }}
    >
      {children}
      {isDraggingOver && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 border-4 border-dashed border-emerald-400 pointer-events-none animate-fade-in font-mono text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold border border-emerald-400">
            &darr;
          </div>
          <div className="text-xl font-bold text-white uppercase tracking-wider">
            Drop profile (2).jpeg to Apply
          </div>
          <p className="text-sm text-white/60 max-w-sm">
            Release to instantly set your exact, unedited original camera photo across your website.
          </p>
        </div>
      )}
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
