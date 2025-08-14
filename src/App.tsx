import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import Studentlist from "./pages/studentlist/studentlist";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AllCourses from "./components/Courses/AllCourses";
import CourseDetail from "./components/Courses/Coursesdetails";
import AllPricing from "./components/Pricing/allPricing";
import Studentcertification from "./components/studentlist/CertificateStatus";
import StudentEditForm from "./components/form/editstudentform/editstudentform.tsx";
import ContactGrid from "./components/ContactGrid/ContactGrid";
import { Toaster } from "react-hot-toast";
import TutorList from "./components/trainer/TutorList";
import ListStudent from "./components/ContactGrid/ListStudent";
import AddNewTutor from "./components/trainer/AddNewTutor";
import Createtask from "./components/trainer/Createtask";

export default function App() {
  return (
    <>
     <Toaster
  position="bottom-center"
  reverseOrder={false}
  toastOptions={{
    style: {
      background: "#fff",
      color: "#000",
    },
  }}
/>

      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            {/* Courses Page */}
            <Route path="/Courses" element={<AllCourses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            {/* Pricing Page */}
            <Route path="/Pricing" element={<AllPricing />} />
            {/* Profile  */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            {/* Forms */}
            <Route path="/AddStudentForm" element={<FormElements />} />
            {/* {ContactGrid} */}
            <Route path="/ContactGrid" element={<ContactGrid />} />
            <Route path="/ListStudent" element={<ListStudent />} />
            {/* {TutorList } */}
            <Route path="/Trainers" element={<TutorList/>} />
            <Route path="/AddNewTutor" element={<AddNewTutor/>} />
            <Route path="/Createtask" element={<Createtask />} />
            {/* {student list} */}
            <Route path="/studentlist" element={<Studentlist />} />
            <Route path="/student/:id" element={<Studentcertification />} />
            <Route path="/Editstudentform/:id" element={<StudentEditForm />} />
            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
