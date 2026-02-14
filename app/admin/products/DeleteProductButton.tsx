// app/admin/products/DeleteProductButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteProductButtonProps {
  productId: number;
  productName: string;
}

export default function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/products?id=${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.refresh();
        setShowModal(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile-friendly delete button */}
      <button
        onClick={() => setShowModal(true)}
        className="sm:p-1.5 p-3 bg-[#2d2d2d] rounded-lg hover:bg-red-500/20 transition-colors flex-1 sm:flex-none flex items-center justify-center"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
        <span className="ml-2 text-red-500 text-sm sm:hidden">Delete</span>
      </button>

      {/* Responsive Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-[#404040] rounded-t-xl sm:rounded-xl p-5 w-full sm:max-w-md animate-slide-up sm:animate-fade-in">
            {/* Mobile Handle */}
            <div className="sm:hidden w-12 h-1 bg-[#404040] rounded-full mx-auto mb-4" />
            
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">Delete Product</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Are you sure you want to delete "{productName}"?
                </p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 bg-[#2d2d2d] rounded-lg sm:hidden"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-5">
              This action cannot be undone. The product will be permanently removed.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-500 text-white py-3 sm:py-2 rounded-lg font-medium text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete Product'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-[#2d2d2d] text-gray-300 py-3 sm:py-2 rounded-lg text-sm hover:bg-[#404040] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .sm\:animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}