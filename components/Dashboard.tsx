"use client";

import { useState } from "react";
import { engineerData } from "@/data/engineers";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  const totalPages = Math.ceil(engineerData.length / itemsPerPage);

  const filteredEngineers = engineerData.filter((engineer) =>
    [
      engineer.engineerName,
      engineer.engineerContact,
      engineer.engineerLocation,
    ].some((field) =>
      typeof field === "string"
        ? field.toLowerCase().includes(searchQuery.toLowerCase())
        : false
    )
  );

  const paginatedEngineers = filteredEngineers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-lg bg-white focus:outline-none w-full sm:w-auto"
          />
          <button className="p-2 bg-white rounded-full hover:bg-gray-200">
            <Image src="/mail.png" alt="Mail" width={30} height={30} />
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-200">
            <Image src="/notification.png" alt="Notification" width={28} height={25} />
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Image
            src="/profile.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-center sm:text-left">Ankit Sethiya</p>
            <p className="text-sm text-gray-500 text-center sm:text-left">
              ankit.sethiya@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Engineers</h1>
          <p className="text-gray-600">Lorem ipsum simple content</p>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Engineer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search by ID, name, or others..."
          className="w-full sm:w-[40%] p-3 border border-gray-300 bg-white rounded focus:outline-none focus:ring focus:ring-green-300"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="px-3 py-2 bg-white rounded flex flex-row gap-2 justify-center">
          <p className="text-black font-bold">April 11 - April 24</p>
        </div>
      </div>

      {/* Engineers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEngineers.map((engineer) => (
          <a href={`/engineers/${engineer.engineerId}`} key={engineer.engineerId}>
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {engineer.engineerName}
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Image src="/telephone.png" alt="Phone" width={15} height={15} />
                    <span>
                      {typeof engineer.engineerContact === "string"
                        ? engineer.engineerContact
                        : engineer.engineerContact.$numberLong}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Image src="/location.png" alt="Location" width={15} height={15} />
                    <span>{engineer.engineerLocation}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Image src="/boy.png" alt="Profile" width={40} height={40} className="rounded-full" />
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                      engineer.engineerStatus === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {engineer.engineerStatus}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4">
                <p className="text-sm text-gray-500">Documents:</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {["PAN", "Aadhar", "Police Verification"].map((doc) => (
                    <span
                      key={doc}
                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Updated Info */}
              <p className="mt-4 text-xs text-gray-400">
                Updated at: {engineer.updatedAt?.$date}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <span>
          Showing {paginatedEngineers.length} of {filteredEngineers.length} results
        </span>
        <nav aria-label="Pagination" className="flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
