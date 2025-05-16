import { api } from "./mockdata";

// { totalApplicants, verifiedApplicants, rejectedApplicants, programs, applicationTrends }
export const fetchMetrics = async ()=>{
    try {
        const response = await api.get("/metrics");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

//paginated applications
export const fetchApplications = async (page=1,pageSize=5)=>{
    try {
        const response = await api.get(`/applications?page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:',error)
    }
}

//single application
export const fetchApplicationDetails = async (id:string) => {
    try {
        const response = await api.get(`/applications/${id}`);
        console.log('API Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('API Error:', error);
      }
};


// Fetch single application by ID
export const fetchApplicationDetailsById = async (id: string) => {
  try {
    const response = await api.get(`/api/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching application details:', error);
    throw error; // Re-throw for error handling in components
  }
};