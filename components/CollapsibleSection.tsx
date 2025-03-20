import React from 'react'

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
  
    return (
      <div className="mb-4 border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium"
        >
          {title}
        </button>
        {isOpen && (
          <div className="px-4 py-2 bg-white border-t">{children}</div>
        )}
      </div>
    );
  }
  

export default CollapsibleSection
