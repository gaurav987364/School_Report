import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import AdmissionDashboard from "./pages/AdmissionDashboard";
import ApplicationsList from "./pages/ApplicationList";
import ApplicationDetails from "./pages/ApplicationsDetails";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}> 
            <Route index element={<AdmissionDashboard />} />
            <Route path="/applications" element={<ApplicationsList />} />
            <Route path="/applications/:id" element={<ApplicationDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;