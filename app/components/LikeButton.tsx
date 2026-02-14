// components/LikeButton.tsx
'use client';

import { useLikes } from '../hooks/useLikes';

interface LikeButtonProps {
  productId: number;
}

export default function LikeButton({ productId }: LikeButtonProps) {
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(productId);

  return (
    <button
      onClick={() => toggleLike(productId)}
      className="text-3xl hover:scale-110 transition"
    >
      {liked ? '❤️' : '🤍'}
    </button>
  );
}