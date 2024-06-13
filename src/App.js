import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {Home,About,Contact,Service,Project} from "../src/pages/index"
import ProjectDetails from "./components/projects/ProjectDetails";
import AdminLogin from "./admin/AdminLogin"; // Import AdminLogin component

import {ProjectCategory,Sidebar,Header,EditProject,EditTestimonial,AddTeam,LogOut,ChangePassword,Notification} from "../src/admin/components/index"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {Navbar,Footer,ProjDetails} from "../src/components/home/index"
const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const ClientRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/project/*" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/projectDetails" element={<ProjectDetails />} />
        <Route path="/project/:id" element={<ProjDetails />} />
        <Route path="/category/:id" element={<ProjectDetails />} />
        <Route path="/home/projdetails" element={<ProjDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

const AdminRoutes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const currentPath = window.location.pathname;
  const location = useLocation();
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token]);

  return (
    <div>
      {token ? (
        <>
          <div className="flex">
            {location.pathname !== "/admin/changePassword" && <Sidebar />}
            <div className="flex flex-col w-full">
              {location.pathname !== "/admin/changePassword" && <Header />}
              <Routes>
                <Route path="/projectCategory" element={<ProjectCategory />} />
                <Route path="/editProject" element={<EditProject />} />
                <Route path="/editTestimonial" element={<EditTestimonial />} />
                <Route path="/addTeam" element={<AddTeam />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/changePassword" element={<ChangePassword />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
