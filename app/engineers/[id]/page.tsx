import { notFound } from 'next/navigation';
import { engineerData } from '@/data/engineers';

export default function EngineerPage({ params }: { params: { id: string } }) {
    const engineer = engineerData.find(e => e.engineerId === Number(params.id))
  
  if (!engineer) return notFound()

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{engineer.engineerName}</h1>
      <div className="space-y-2">
      <DetailItem label="Contact" value={typeof engineer.engineerContact === 'object' ? engineer.engineerContact.$numberLong : engineer.engineerContact} />
        <DetailItem label="Location" value={`${engineer.engineerLocation}, ${engineer.state}`} />
        <DetailItem label="Status" value={engineer.engineerStatus} />
        <DetailItem 
          label="Tools" 
          value={<ul className="list-disc pl-4">{engineer.engineerTools.split(',').map(t => <li key={t}>{t.trim()}</li>)}</ul>} 
        />
        <DetailItem label="Availability" value={engineer.availabilityDays} />
        <div className="pt-4">
          <h3 className="text-lg font-semibold">Bank Details</h3>
          <DetailItem label="Account Number" value={typeof engineer.bankDetails.accountNumber === 'object' ? engineer.bankDetails.accountNumber.$numberLong : engineer.bankDetails.accountNumber} />
          <DetailItem label="IFSC Code" value={engineer.bankDetails.ifscCode} />
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="font-medium w-32">{label}:</span>
      <span className="flex-1">{value}</span>
    </div>
  )
}
