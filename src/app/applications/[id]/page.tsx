export default function ApplicationDetails({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Application Details: {params.id}</h1>
      {/* Add your application details content */}
    </div>
  );
} 