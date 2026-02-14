// app/test-likes/page.tsx
'use client';

import { useLikes } from '../context/LikesContext';
import Link from 'next/link';

export default function TestLikesPage() {
  try {
    const { likedIds, toggleLike } = useLikes();
    
    return (
      <div className="min-h-screen bg-[#0b0b0b] pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl text-white mb-4">Likes Test</h1>
          <p className="text-gray-400 mb-4">Liked IDs: {JSON.stringify(likedIds)}</p>
          <div className="flex gap-2">
            <button 
              onClick={() => toggleLike(1)}
              className="bg-[#c4a962] text-black px-4 py-2 rounded"
            >
              Toggle Product 1
            </button>
            <Link href="/" className="bg-gray-700 text-white px-4 py-2 rounded">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl text-red-500 mb-4">Error</h1>
          <p className="text-red-400">{(error as Error).message}</p>
          <pre className="text-gray-400 mt-4">
            Check that LikesProvider is wrapping this page in layout.tsx
          </pre>
        </div>
      </div>
    );
  }
}