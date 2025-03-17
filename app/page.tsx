export default function Home() {
  return (
    <main className="container mx-auto px-4 ">
      <div className="max-w-4xl mx-auto text-center flex justify-center items-center h-screen flex-col">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
           Engineers Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mt-6 border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
          
          <p className="text-lg mb-6">You can start coding in <code className="bg-gray-100 px-2 py-1 rounded text-pink-600 font-mono">app/page.tsx</code></p>
          
          <div className="border-t pt-6 mt-6 text-sm text-gray-600">
            <p>This is your starting template for the Engineers Dashboard challenge.</p>
            <p className="mt-2">Your task is to build a dashboard that displays and filters engineer data from the provided JSON file.</p>
          </div>
        </div>
      </div>
    </main>
  );
}