// api/analytics.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create mock adapter
const mock = new MockAdapter(axios, { delayResponse: 500 });

// Generate mock data for 25 applications
const generateMockApplications = () => {
  const programs = ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Law'];
  const statuses = ['pending', 'verified', 'rejected'];
  const applications = [];

  for (let i = 1; i <= 25; i++) {
    applications.push({
      id: `APP-2023-${i.toString().padStart(3, '0')}`,
      name: `Student ${i}`,
      email: `student${i}@university.edu`,
      program: programs[i % 5],
      status: statuses[i % 3],
      applicationDate: `2023-0${Math.ceil(i/8)}-${(i%28 + 1).toString().padStart(2, '0')}`,
      documents: [
        `transcript_${i}.pdf`,
        `recommendation_${i}.pdf`
      ],
      testScores: {
        SAT: Math.floor(Math.random() * 400) + 1200,
        GPA: (Math.random() * 2 + 2).toFixed(1)
      },
      address: `${i} Main Street, City`,
      phone: `+1-555-01${i.toString().padStart(2, '0')}`,
      guardian: `Guardian ${i}`,
      notes: i % 4 === 0 ? 'Scholarship applicant' : 'Regular applicant'
    });
  }
  
  return applications;
};

const applications = generateMockApplications();

// Configure mock endpoints
mock.onGet('/metrics').reply(() => {
  const programDistribution = applications.reduce((acc: Record<string, number>, app) => {
    acc[app.program] = (acc[app.program] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trends = applications.reduce((acc: Record<string, number>, app) => {
    acc[app.applicationDate] = (acc[app.applicationDate] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return [200, {
    totalApplicants: applications.length,
    verifiedApplicants: applications.filter(app => app.status === 'verified').length,
    rejectedApplicants: applications.filter(app => app.status === 'rejected').length,
    programs: Object.entries(programDistribution).map(([name, count]) => ({ name, count })),
    applicationTrends: Object.entries(trends)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }];
});


mock.onGet(/\/applications(\?page=(\d+)&pageSize=(\d+))?/).reply(config => {
  const params = new URLSearchParams((config.url ?? '').split('?')[1]);
  const page = parseInt(params.get('page') || '1');
  const pageSize = parseInt(params.get('pageSize') || '10');
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return [200, {
    data: applications.slice(start, end),
    total: applications.length,
    page,
    pageSize,
    totalPages: Math.ceil(applications.length / pageSize)
  }];
});

// mockdata.ts 
mock.onGet(/\/api\/applications\/.+/).reply(config => {
  const id = config.url?.split('/').pop();
  const application = applications.find(app => app.id === id);
  return application 
    ? [200, application, { 'Cache-Control': 'no-store' }]
    : [404, { error: 'Not found' }];
});


// endpoint for updated data
mock.onPut(/\/api\/applications\/.+/).reply(config => {
  const id = config.url?.split('/').pop();
  const updatedData = JSON.parse(config.data);
  const index = applications.findIndex(app => app.id === id);
  
  if (index === -1) return [404, { error: 'Not found' }];
  
  applications[index] = { ...applications[index], ...updatedData };
  return [200, applications[index]];
});

// Export axios instance for direct use in components
export const api = axios.create();