// app/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="bg-gray-300 h-32 rounded-lg mb-8"></div>
        
        {/* Navigation skeleton */}
        <div className="flex gap-4 mb-8 border-b pb-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-6 bg-gray-200 w-16 rounded"></div>
          ))}
        </div>
        
        {/* Products grid skeleton */}
        <div className="h-8 bg-gray-200 w-48 mb-4 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="border rounded-lg p-4">
              <div className="bg-gray-200 h-48 rounded mb-3"></div>
              <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/4 mb-4 rounded"></div>
              <div className="flex justify-between">
                <div className="bg-gray-200 h-10 w-24 rounded"></div>
                <div className="bg-gray-200 h-10 w-10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}