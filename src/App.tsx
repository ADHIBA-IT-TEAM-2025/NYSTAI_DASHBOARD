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
import ProfileCards from "./components/trainer/TutorList";
import ListStudent from "./components/ContactGrid/ListStudent";
import AddNewTutor from "./components/trainer/AddNewTutor";
import Createtask from "./components/trainer/Createtask";
import Tasklist from "./components/trainer/tasklist.tsx";
import Taskstatus from "./components/trainer/taskstatus.tsx";
import StudentAssignment from "./components/trainer/StudentAssignment.tsx";

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
          {/* Routes inside AppLayout (with header/nav) */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/Courses" element={<AllCourses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/Pricing" element={<AllPricing />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/AddStudentForm" element={<FormElements />} />
            <Route path="/ContactGrid" element={<ContactGrid />} />
            <Route path="/ListStudent" element={<ListStudent />} />
            <Route path="/Trainers" element={<ProfileCards />} />
            <Route path="/AddNewTutor" element={<AddNewTutor />} />
            <Route path="/Createtask" element={<Createtask />} />
            <Route path="/tasklist/:taskId" element={<Tasklist />} />
            <Route path="/task/:taskId/student/:studentId" element={<Taskstatus />} />
            <Route path="/studentlist" element={<Studentlist />} />
            <Route path="/student/:id" element={<Studentcertification />} />
            <Route path="/Editstudentform/:id" element={<StudentEditForm />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Student Assignment Page (outside AppLayout) */}
          <Route path="/student-assignment/:token" element={<StudentAssignment />} />

          {/* Auth and fallback */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
