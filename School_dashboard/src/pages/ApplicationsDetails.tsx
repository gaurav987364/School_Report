import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserGraduate, FaCalendarAlt, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { api } from "../api/mockdata";


interface ApplicationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  applicationDate: string;
  status: "verified" | "pending" | "rejected";
  program: string;
  documents?: string[];
  testScores?: {
    SAT: number;
    GPA: number;
  };
  address: string;
  guardian: string;
}

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/applications/${id}`);
        
        // Add data validation and fallbacks
        const rawData = response.data;
        const processedData = {
          id: rawData.id || 'N/A',
          name: rawData.name || 'Unknown Applicant',
          email: rawData.email || 'No email provided',
          phone: rawData.phone || 'No phone number',
          program: rawData.program || 'Undeclared',
          status: rawData.status || 'pending',
          applicationDate: rawData.applicationDate || new Date().toISOString(),
          address: rawData.address || 'Address not available',
          guardian: rawData.guardian || 'No guardian listed',
          documents: rawData.documents || [],
          testScores: rawData.testScores || { SAT: 0, GPA: 0 }
        };
  
        setApplication(processedData);
        setError(null);
  
      } catch (err) {
        setError("Failed to load application details");
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchApplication();
  }, [id]);

  const statusMap = {
    verified: "Approved",
    rejected: "Rejected",
    pending: "Pending"
  };

  const statusColor = {
    verified: "text-green-600 dark:text-green-400",
    rejected: "text-red-600 dark:text-red-400",
    pending: "text-yellow-600 dark:text-yellow-400"
  }[application?.status || 'pending'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-center text-red-500 text-2xl font-semibold">
        {error} - <button 
          onClick={() => window.location.reload()}
          className="text-blue-500 hover:underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!application) {
    return <div className="p-6 text-center text-gray-600 dark:text-gray-300">Application not found.</div>;
  }

  return (
    <div className="p-4 md:p-6 w-full h-full bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Application Details</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <FaUserGraduate className="text-4xl text-purple-600 dark:text-purple-400" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{application.name}</h2>
            <p className={`capitalize font-medium ${statusColor}`}>
              {statusMap[application.status]}
            </p>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FaEnvelope /> <span>{application.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone /> <span>{application.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt /> 
            <span>Applied On: {new Date(application.applicationDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="col-span-1 md:col-span-2">
            <strong>Program:</strong> {application.program}
          </div>
          <div className="col-span-1 md:col-span-2">
            <strong>Address:</strong> {application.address}
          </div>
          <div className="col-span-1 md:col-span-2">
            <strong>Guardian:</strong> {application.guardian}
          </div>
          <div className="col-span-1 md:col-span-2">
            <strong>Test Scores:</strong> SAT - {application.testScores?.SAT || 'N/A'}, 
            GPA - {application.testScores?.GPA?.toFixed(1) || 'N/A'}
          </div>
          <div className="col-span-1 md:col-span-2">
            <strong>Documents:</strong> {application.documents?.join(', ') || 'No documents available'}
          </div>
        </div>

        {/* Status Message */}
        <div className="pt-4 border-t dark:border-gray-700">
          {application.status === "verified" ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <FaCheckCircle /> <span>This application has been approved.</span>
            </div>
          ) : application.status === "rejected" ? (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <FaTimesCircle /> <span>This application was rejected.</span>
            </div>
          ) : (
            <div className="text-yellow-600 dark:text-yellow-400">
              This application is pending review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;