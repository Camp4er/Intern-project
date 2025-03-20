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

  // Filter engineers based on search query
  const filteredEngineers = engineerData.filter((engineer) =>
    [
      engineer.engineerName,
      engineer.engineerContact,
      engineer.engineerLocation,
    ].some((field) => {
      if (typeof field === "string") {
        return field.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    })
  );

  // Paginate engineers
  const paginatedEngineers = filteredEngineers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 rounded">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-lg bg-white focus:outline-none"
          />
          <button className="p-2 bg-white rounded-full hover:bg-gray-200">
            <Image src="/mail.png" alt="Search" width={30} height={30} />
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-200">
            <Image
              src="/notification.png"
              alt="Search"
              width={28}
              height={25}
            />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/profile.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">Ankit Sethiya</p>
            <p className="text-sm text-gray-500">ankit.sethiya@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Engineers</h1>
          <p className="text-gray-600">Lorem ipsum simple content</p>
        </div>
        {/* Date Range Picker */}
        
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Engineer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex flex-row justify-between">
        <input
          type="text"
          placeholder="Search by ID, name, or others..."
          className="w-[40%] p-3 border border-gray-300 bg-white rounded focus:outline-none focus:ring focus:ring-green-300"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="px-3 py-2 bg-white rounded flex flex-row gap-2">
            {/* <Image src="/check-mark.png" alt="calendar" width={15} height={0}/> */}
            <p className="text-black font-bold">April 11 - April 24</p>
        </div>
      </div>

      {/* Engineers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEngineers.map((engineer) => (
          <a
            href={`/engineers/${engineer.engineerId}`}
            key={engineer.engineerId}
          >
            <div
              key={engineer.engineerId}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Engineer Info */}
              <div className="flex flex-row justify-between">
                <div className="details">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {engineer.engineerName}
                  </h2>
                  <div className="flex flex-row contact pb-2">
                    <Image
                      src="/telephone.png"
                      alt="Profile"
                      width={15}
                      height={5}
                      className="rounded-full pr-1"
                    />
                    <p className="text-sm text-gray-600">
                      {typeof engineer.engineerContact === "string"
                        ? engineer.engineerContact
                        : engineer.engineerContact.$numberLong}
                    </p>
                  </div>
                  <div className="flex flex-row location">
                    <Image
                      src="/location.png"
                      alt="Profile"
                      width={15}
                      height={5}
                      className="rounded-full pr-1"
                    />
                    <p className="text-sm text-gray-600">
                      {engineer.engineerLocation}
                    </p>
                  </div>
                </div>
                <div className="image flex flex-col gap-2 items-center mb-4">
                  <Image
                    src="/boy.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
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
                <div className="flex gap-2 mt-1">
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
      <div className="flex justify-between items-center mt-6">
        <span>
          Showing {paginatedEngineers.length} of {filteredEngineers.length}{" "}
          results
        </span>
        <nav aria-label="Pagination" className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
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
