import { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUserGraduate, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { fetchMetrics } from "../api/api";
import { FiRefreshCw } from "react-icons/fi";

interface ApplicationTrend {
  date: string;
  count: number;
};

interface MetricsData {
  totalApplicants: number;
  verifiedApplicants: number;
  rejectedApplicants: number;
  applicationTrends: ApplicationTrend[];
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    start: '2023-01-01',
    end: '2023-12-31'
  });

  // Filtered and transformed chart data
  const chartData = useMemo(() => {
    if (!metrics?.applicationTrends) return [];
    
    return metrics.applicationTrends
      .filter(trend => 
        trend.date >= dateRange.start && 
        trend.date <= dateRange.end
      )
      .map(trend => ({
        month: new Date(trend.date).toLocaleString('default', { month: 'short' }),
        applications: trend.count
      }));
  }, [metrics, dateRange]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchMetrics();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Status card color calculation
  const getStatusColor = (value: number) => {
    if (value > 1000) return 'border-red-500 bg-red-50 dark:bg-red-900';
    if (value > 500) return 'border-orange-500 bg-orange-50 dark:bg-orange-900';
    return 'border-blue-200 bg-blue-50 dark:bg-blue-900';
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Admission Analytics Dashboard
        </h1>
        <button 
          onClick={loadData}
          className="mb-5 p-2 bg-blue-100 dark:bg-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        >
          <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          className="dark:bg-gray-800 dark:text-gray-50 p-2 rounded border"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          className="dark:bg-gray-800 dark:text-gray-50 p-2 rounded border"
        />
      </div>

      {/* Status Cards with Dynamic Styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-xl shadow flex items-center gap-4 border-l-4 ${getStatusColor(metrics?.totalApplicants || 0)}`}>
          <FaUserGraduate className="text-3xl text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Total Applications</p>
            <p className="text-xl font-bold dark:text-white">
              {metrics?.totalApplicants || 0}
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-xl shadow flex items-center gap-4 border-l-4 ${getStatusColor(metrics?.verifiedApplicants || 0)}`}>
          <FaCheckCircle className="text-3xl text-green-600 dark:text-green-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Verified</p>
            <p className="text-xl font-bold dark:text-white">
              {metrics?.verifiedApplicants || 0}
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-xl shadow flex items-center gap-4 border-l-4 ${getStatusColor(metrics?.rejectedApplicants || 0)}`}>
          <FaTimesCircle className="text-3xl text-red-600 dark:text-red-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Rejected</p>
            <p className="text-xl font-bold dark:text-white">
              {metrics?.rejectedApplicants || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Application Trends ({dateRange.start} to {dateRange.end})
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart 
            data={chartData} 
            margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#64748b' }}
            />
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorApps)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;