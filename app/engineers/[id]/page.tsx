"use client";

import { notFound } from "next/navigation";
import { engineerData } from "@/data/engineers";
import CollapsibleSection from "@/components/CollapsibleSection";
import PasswordMask from "@/components/PasswordMask";
import Image from "next/image";
import { use } from "react";

export default function EngineerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const engineer = engineerData.find((e) => e.engineerId === Number(id));

  if (!engineer) return notFound();

  return (
    <div className="bg-white p-4">
      <div className="p-4 sm:p-6 max-w-[95%] sm:max-w-[80%] mx-auto bg-gray-100 rounded-lg sm:rounded-2xl shadow-md sm:shadow-xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Image
              src="/boy.png"
              alt="Profile"
              width={50}
              height={50}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
            />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">{engineer.engineerName}</h1>
              <p className="text-xs sm:text-sm text-gray-500">Engineer ID: {engineer.engineerId}</p>
              <p className="text-xs sm:text-sm text-gray-500">Created At: {engineer.createdAt?.$date}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs sm:text-sm text-white ${
              engineer.engineerStatus === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {engineer.engineerStatus}
          </span>
        </div>

        {/* Basic Details Section */}
        <CollapsibleSection title="Basic Details">
          <DetailItem
            label="Mobile Number"
            value={
              typeof engineer.engineerContact === "string"
                ? engineer.engineerContact
                : engineer.engineerContact.$numberLong
            }
          />
          <DetailItem label="Address" value={engineer.engineerLocation} />
        </CollapsibleSection>

        {/* Documents Section */}
        <CollapsibleSection title="Documents">
          <div className="flex gap-4 overflow-x-auto py-2">
            <DocumentItem label="Pan Card" imageUrl="/pan-card.webp" />
            <DocumentItem label="Aadhar Card" imageUrl="/aadhar-card.jpg" />
            <DocumentItem label="Police Verification" imageUrl="/police-verification.png" />
          </div>
        </CollapsibleSection>

        {/* Bank Details Section */}
        <CollapsibleSection title="Bank Details">
          <DetailItem label="Bank Name" value={engineer.bankDetails.bankName} />
          <DetailItem label="IFSC Code" value={engineer.bankDetails.ifscCode} />
          <DetailItem label="Account Number" value={engineer.bankDetails.accountNumber.toString()} />
          <DetailItem label="Passbook" value={<a href="#">View</a>} />
        </CollapsibleSection>

        {/* Staff Details Section */}
        <CollapsibleSection title="Staff Details">
          <DetailItem label="Created At" value={engineer.createdAt?.$date} />
          <DetailItem label="Updated At" value={engineer.updatedAt?.$date} />
          <DetailItem label="Password" value={<PasswordMask password={engineer._id.$oid} />} />
        </CollapsibleSection>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 py-2 border-b border-gray-200">
      <span className="font-medium min-w-[100px] sm:min-w-[120px] md:min-w-[140px] text-xs sm:text-sm md:text-base text-gray-700">
        {label}:
      </span>
      <span className="flex-1 text-xs sm:text-sm md:text-base text-gray-600">{value}</span>
    </div>
  );
}

function DocumentItem({ label, imageUrl }: { label: string; imageUrl: string }) {
  return (
    <div className="w-32 sm:w-40 h-20 sm:h-24 relative rounded-md shadow-sm overflow-hidden">
      <Image
        src={imageUrl}
        alt={label}
        width={160}
        height={96}
        className="object-cover rounded-md filter blur-xs"
      />
      <span className="absolute bottom-1 left-1 bg-yellow-500 text-white text-xs px-2 py-[2px] rounded-full">
        {label}
      </span>
    </div>
  );
}
