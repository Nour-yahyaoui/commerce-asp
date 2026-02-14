// context/LikesContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LikesContextType {
  likedIds: number[];
  toggleLike: (productId: number) => boolean;
  isLiked: (productId: number) => boolean;
  isLoading: boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

const LIKES_STORAGE_KEY = 'liked_products';

export function LikesProvider({ children }: { children: ReactNode }) {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load likes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LIKES_STORAGE_KEY);
      console.log('Loading likes from localStorage:', stored);
      
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out invalid values and convert to numbers
          const validIds = parsed
            .map(id => Number(id))
            .filter(id => !isNaN(id) && id > 0);
          
          console.log('Parsed liked IDs:', validIds);
          setLikedIds(validIds);
        } else {
          localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify([]));
          setLikedIds([]);
        }
      } else {
        localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify([]));
        setLikedIds([]);
      }
    } catch (e) {
      console.error('Failed to parse likes from localStorage', e);
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify([]));
      setLikedIds([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save likes to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      console.log('Saving likes to localStorage:', likedIds);
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedIds));
    }
  }, [likedIds, isLoading]);

  const toggleLike = (productId: number) => {
    if (!productId || isNaN(productId)) return false;
    
    setLikedIds(prev => {
      const newLikedIds = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      console.log('Toggling like:', productId, 'New state:', newLikedIds);
      return newLikedIds;
    });
    
    return !likedIds.includes(productId);
  };

  const isLiked = (productId: number) => {
    if (!productId || isNaN(productId)) return false;
    return likedIds.includes(productId);
  };

  return (
    <LikesContext.Provider value={{ likedIds, toggleLike, isLiked, isLoading }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
}