import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Home from "./components/Home";
// import { InactiveWorkerRegistration } from "./components/InActiveWorker";
// import { ActiveWorkerRegistration } from "./components/ActiveWorker";
import Verify from "./components/Verify";
import ManuallySendEmail from "./components/ManuallySendEmail";
import RegistrationClosed from "./components/RegistrationClosed";
import NotFound from "./components/NotFound";
import Attendance2 from "./components/Attendance2";
import Reporting from "./components/Reporting";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SkeletonTheme baseColor="#e5e5e5" highlightColor="#d6d4d4">
          <Routes>
            <Route index element={<Attendance2 />} />
            <Route index element={<RegistrationClosed />} />
             {/* <Route path="/register" element={<InactiveWorkerRegistration />} /> */}
            {/* <Route path="/update/:id" element={<ActiveWorkerRegistration />} /> */}
            <Route path="/admin/workforce/verify" element={<Verify />} />
            <Route path="/admin/workforce/email" element={<ManuallySendEmail />} /> 
            <Route path="/admin/reports" element={<Reporting />} /> 
            <Route path="*" exact={true} element={<NotFound />} />
          </Routes>
        </SkeletonTheme>
      </BrowserRouter>
      <ToastContainer
        hideProgressBar
        autoClose={5000}
        theme="colored"
        position="top-center"
      />
    </QueryClientProvider>
  );
};

export default App;
