import { useState, useEffect } from "react";
import { FaSearch, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../api/mockdata";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusMap = {
  pending: "Pending",
  verified: "Approved",
  rejected: "Rejected",
};

const ApplicationsList = () => {
  const [applications, setApplications] = useState<{ id: string; name: string; program: string; applicationDate: string; status: keyof typeof statusColors; }[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/applications?page=${page}&pageSize=${pageSize}`);
        setApplications(response.data.data);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError("Failed to load applications");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [page, pageSize]);

  const filtered = applications.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.id.toLowerCase().includes(search.toLowerCase())
  );

  const handlePreviousPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

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

  return (
    <div className="p-4 md:p-6 w-full h-full bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Applications</h1>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none w-full"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow">
          <thead className="text-left text-gray-600 dark:text-gray-300 text-sm bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Program</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr
                key={app.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-4 text-sm text-gray-800 dark:text-white">{app.id}</td>
                <td className="p-4 text-sm text-gray-800 dark:text-white">{app.name}</td>
                <td className="p-4 text-sm text-gray-800 dark:text-white">{app.program}</td>
                <td className="p-4 text-sm text-gray-800 dark:text-white">
                  {new Date(app.applicationDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[app.status]}`}>
                    {statusMap[app.status]}
                  </span>
                </td>
                <td className="p-4">
                  <Link 
                    to={`/applications/${app.id}`} 
                    className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <FaEye /> View
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-10 items-center mt-5 border-t border-gray-400 dark:border-white p-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-100 rounded-lg disabled:opacity-50"
        >
          <FaArrowLeft /> Previous
        </button>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-100 rounded-lg disabled:opacity-50"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ApplicationsList;