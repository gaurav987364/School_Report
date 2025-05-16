import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import AdmissionDashboard from "./pages/AdmissionDashboard";
import ApplicationsList from "./pages/ApplicationList";
import ApplicationDetails from "./pages/ApplicationsDetails";
import { ThemeProvider } from "./context/ThemeContext";
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import Profile from "./pages/Profile";
import ApplicationeditPage from "./pages/ApplicationeditPage";

const App = () => {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        {/* Protected routes */}
        <Route
          element={
            <>
              <SignedIn>
                <DashboardLayout />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          <Route path="/" element={<AdmissionDashboard />} />
          <Route path="/applications" element={<ApplicationsList />} />
          <Route path="/applications/:id" element={<ApplicationDetails />} />
          <Route path="/edit/:id" element={<ApplicationeditPage />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>

        {/* Public routes */}
        <Route
          path="/sign-in/*"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-gray-100 text-black">
              <SignIn routing="path" path="/sign-in" />
            </div>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-gray-100 text-black">
              <SignUp routing="path" path="/sign-up" />
            </div>
          }
        />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </ThemeProvider>
  )
}

export default App;