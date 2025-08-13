import { Edit, PlusCircleIcon, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../common/PageMeta";
import PageBreadcrumb from "../common/PageBreadCrumb";
import axios from "axios";

interface Tutor {
  name: string;
  role: string;
  email: string;
  contact: string;
  expertise: string;
  img: string;
}

export default function TutorList() {
  return (
    <>
      <PageMeta
        title="All Courses - Nystai Institute"
        description="All available courses"
      />
      <PageBreadcrumb pageTitle="Tutor List" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tutor List
          </h3>
          <div className="flex flex-row gap-6">
            <Link
              to="/Createtask"
              className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Create Task
            </Link>
            <Link
              to="/AddNewTutor"
              className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Add Tutor
            </Link>
          </div>
        </div>

        <div className="space-y-6 border-t border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 p-6">
            <ProfileCards />
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileCards() {
  const [team, setTeam] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.get(
          "https://nystai-backend.onrender.com/NystaiTutors/getalltutors"
        );
        console.log("API response:", res.data);

        if (Array.isArray(res.data.tutors)) {
          const formattedTutors: Tutor[] = res.data.tutors.map((t: any) => ({
            name: `${t.first_name} ${t.last_name}`,
            role: t.expertise ?? "",
            email: t.email ?? "",
            contact: t.phone ?? "",
            expertise: t.expertise ?? "",
            img: t.tutor_image ?? "",
          }));
          setTeam(formattedTutors);
        } else if (res.data.tutor) {
          setTeam([
            {
              name: `${res.data.tutor.first_name} ${res.data.tutor.last_name}`,
              role: res.data.tutor.expertise ?? "",
              email: res.data.tutor.email ?? "",
              contact: res.data.tutor.phone ?? "",
              expertise: res.data.tutor.expertise ?? "",
              img: res.data.tutor.tutor_image ?? "",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {team.map((person, i) => (
        <div
          key={i}
          className="relative w-62 h-72 group overflow-hidden rounded-lg shadow-lg bg-white border border-gray-300"
        >
          {/* Info behind image */}
          <div className="absolute top-25 left-0 w-full p-4 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
            <div className="flex mb-3">
              <span className="w-30 font-medium text-gray-500 dark:text-gray-400">
                Contact
              </span>
              <span className="w-10 font-medium text-gray-500 dark:text-gray-400">
                :
              </span>
              <span className="w-80 break-words whitespace-normal text-gray-800 dark:text-white/90">
                {person.contact}
              </span>
            </div>
            <div className="flex mb-3">
              <span className="w-30 font-medium text-gray-500 dark:text-gray-400">
                Mail Id
              </span>
              <span className="w-10 font-medium text-gray-500 dark:text-gray-400">
                :
              </span>
              <span className="w-80 break-words whitespace-normal text-gray-800 dark:text-white/90">
                {person.email}
              </span>
            </div>
            <div className="flex mb-3">
              <span className="w-30 font-medium text-gray-500 dark:text-gray-400">
                Expertise Course
              </span>
              <span className="w-10 font-medium text-gray-500 dark:text-gray-400">
                :
              </span>
              <span className="w-80 break-words whitespace-normal text-gray-800 dark:text-white/90">
                {person.expertise}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="absolute top-0 left-0 w-full h-full z-10 transform transition-transform duration-500 ease-in-out group-hover:-translate-y-50">
            <img
              src={person.img}
              alt={person.name}
              className="w-62 h-72 object-cover"
            />
          </div>

          {/* Top Right Icons + Username */}
          <div className="absolute m-3 top-2 z-20 flex justify-between items-center w-[260px] gap-2">
            <div className="max-w-[160px] text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-lg font-medium text-white">{person.name}</h2>
              <p className="text-sm text-white leading-relaxed line-clamp-3">
                {person.role}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-transparent p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                <Edit className="text-white" size={14} />
              </button>
              <button className="bg-transparent p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                <Trash2 className="text-white" size={14} />
              </button>
            </div>
          </div>

          {/* Bottom Name & Role */}
          <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center text-center transition-opacity duration-500 z-20 opacity-100 group-hover:opacity-0">
            <h2 className="text-xl font-medium text-white leading-6 tracking-wide">
              {person.name} <br />
              <span className="text-gray-300 text-sm font-light tracking-wider">
                {person.role}
              </span>
            </h2>
          </div>
        </div>
      ))}
    </>
  );
}
