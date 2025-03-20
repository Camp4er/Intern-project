'use client'
import { useState } from 'react'
import { engineerData } from '@/data/engineers';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Search filter logic
  const filteredEngineers = engineerData.filter(engineer => 
    [engineer.engineerName, engineer.engineerContact, engineer.engineerLocation]
    .some(field => {
      if (typeof field === 'string') {
        return field.toLowerCase().includes(searchQuery.toLowerCase());
      } else {
        // If field is not a string, return false or handle it differently
        return false;
      }
    })
  )

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <input 
        type="text" 
        placeholder="Search engineers..."
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEngineers.map(engineer => (
          <a 
            href={`/engineers/${engineer.engineerId}`}
            className="p-4 border rounded hover:shadow-lg transition-shadow"
            key={engineer.engineerId}
          >
            <h2 className="text-xl font-bold">{engineer.engineerName}</h2>
            {/* <p>{engineer.engineerContact}</p> */}
            <p>{engineer.engineerLocation}</p>
            <span className={`inline-block px-2 mt-2 text-sm ${
              engineer.engineerStatus === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {engineer.engineerStatus}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
