// hooks/useLikes.ts
'use client';

import { useState, useEffect } from 'react';

const LIKES_STORAGE_KEY = 'liked_products';

export function useLikes() {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load likes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LIKES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure it's an array of numbers
        if (Array.isArray(parsed)) {
          setLikedIds(parsed.filter((id): id is number => typeof id === 'number'));
        }
      }
    } catch (e) {
      console.error('Failed to parse likes from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save likes to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedIds));
    }
  }, [likedIds, isInitialized]);

  const toggleLike = (productId: number) => {
    setLikedIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
    // Return the new state for optimistic updates
    return !likedIds.includes(productId);
  };

  const isLiked = (productId: number) => likedIds.includes(productId);

  return { likedIds, toggleLike, isLiked, isInitialized };
}