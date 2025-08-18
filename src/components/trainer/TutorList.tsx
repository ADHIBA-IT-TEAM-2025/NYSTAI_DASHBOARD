import { Edit, PlusCircleIcon, Trash2, X, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../common/PageMeta";
import PageBreadcrumb from "../common/PageBreadCrumb";
import axios from "axios";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useDropzone } from "react-dropzone";
import Upload from "../../icons/Upload icon.png";
import { toast } from "react-hot-toast";
import DatePicker from "../form/date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Tutor {
  tutor_id: number;
  first_name?: string;
  last_name?: string;
  name: string;
  dob: string;
  role?: string;
  gender: string;
  email: string;
  contact: string;
  expertise: string;
  experience_years: string;
  joining_date: string;
  img?: string;
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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    expertise: "",
    experience_years: "",
    joining_date: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.get(
          "https://nystai-backend.onrender.com/NystaiTutors/getalltutors"
        );

        if (Array.isArray(res.data.tutors)) {
          const formattedTutors: Tutor[] = res.data.tutors.map((t: any) => ({
            tutor_id: t.tutor_id,
            first_name: t.first_name ?? "",
            last_name: t.last_name ?? "",
            name: `${t.first_name ?? ""} ${t.last_name ?? ""}`,
            role: t.expertise ?? "",
            email: t.email ?? "",
            contact: t.phone ?? "",
            expertise: t.expertise ?? "",
            img: t.tutor_image ?? "",
            dob: t.dob ?? "",
            gender: t.gender ?? "",
            joining_date: t.joining_date ?? "",
            experience_years: t.experience_years ?? ""
          }));
          setTeam(formattedTutors);
        } else if (res.data.tutor) {
          setTeam([
            {
              tutor_id: res.data.tutor.tutor_id,
              first_name: res.data.tutor.first_name ?? "",
              last_name: res.data.tutor.last_name ?? "",
              name: `${res.data.tutor.first_name ?? ""} ${res.data.tutor.last_name ?? ""}`,
              role: res.data.tutor.expertise ?? "",
              email: res.data.tutor.email ?? "",
              contact: res.data.tutor.phone ?? "",
              expertise: res.data.tutor.expertise ?? "",
              img: res.data.tutor.tutor_image ?? "",
              dob: res.data.tutor.dob ?? "",
              gender: res.data.tutor.gender ?? "",
              joining_date: res.data.tutor.joining_date ?? "",
              experience_years: res.data.tutor.experience_years ?? "",
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

  const openDeleteModal = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsDeleteOpen(true);
  };

  const handleDeleteTutor = async () => {
    if (!selectedTutor) return;
    try {
      const res = await axios.delete(
        `https://nystai-backend.onrender.com/NystaiTutors/deletetutor/${selectedTutor.tutor_id}`
      );
      toast.success(res.data.message || "Tutor deleted successfully");
      setTeam(prev => prev.filter(t => t.tutor_id !== selectedTutor.tutor_id));
      setIsDeleteOpen(false);
      setSelectedTutor(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete tutor");
    }
  };

  const openEditModal = (tutor: Tutor) => {
    setSelectedTutor(tutor);

    setFormData({
      first_name: tutor.first_name || "",
      last_name: tutor.last_name || "",
      dob: tutor.dob || "",
      gender: tutor.gender || "",
      email: tutor.email || "",
      phone: tutor.contact || "",
      expertise: tutor.expertise || "",
      experience_years: tutor.experience_years || "",
      joining_date: tutor.joining_date || "",
    });

    setSelectedFile(null);
    setIsEditOpen(true);
  };

  const handleUpdateTutor = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1️⃣ Check that a tutor is selected
    if (!selectedTutor || !selectedTutor.tutor_id) {
      toast.error("No tutor selected or tutor ID is invalid");
      return;
    }

    const tutorId = Number(selectedTutor.tutor_id);

    // 2️⃣ Verify ID is valid number
    if (isNaN(tutorId) || tutorId <= 0) {
      toast.error("Invalid tutor ID");
      return;
    }

    const updateUrl = `https://nystai-backend.onrender.com/NystaiTutors/updatetutor/${tutorId}`;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name || "");
      formDataToSend.append("last_name", formData.last_name || "");
      formDataToSend.append("dob", formData.dob || "");
      formDataToSend.append("gender", formData.gender || "");
      formDataToSend.append("email", formData.email || "");
      formDataToSend.append("phone", formData.phone || "");
      formDataToSend.append("expertise", formData.expertise || "");
      formDataToSend.append(
        "experience_years",
        String(Number(formData.experience_years) || 0)
      );
      formDataToSend.append("joining_date", formData.joining_date || "");

      // Optional image update
      if (selectedFile) {
        formDataToSend.append("tutor_image", selectedFile);
      } else if (isImageRemoved) {
        formDataToSend.append("remove_image", "true");
      }

      // 3️⃣ Send PATCH request
      const res = await axios.patch(updateUrl, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Tutor updated successfully");

      // 4️⃣ Update local state
      setTeam((prev) =>
        prev.map((t) =>
          t.tutor_id === tutorId
            ? {
              ...t,
              ...formData,
              img: selectedFile
                ? URL.createObjectURL(selectedFile)
                : isImageRemoved
                  ? ""
                  : t.img,
            }
            : t
        )
      );

      // 5️⃣ Reset edit modal state
      setIsEditOpen(false);
      setSelectedTutor(null);
      setSelectedFile(null);
      setIsImageRemoved(false);
    } catch (error: any) {
      console.error("Update Tutor Error:", error);

      // 6️⃣ Handle 404 and other errors
      if (error.response?.status === 404) {
        toast.error(
          "Tutor not found. Check the tutor ID and API route."
        );
      } else {
        toast.error(error?.response?.data?.message || "Failed to update tutor");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {team.map((person, i) => (
        <div key={i} className="relative w-72 h-72 group overflow-hidden rounded-lg shadow-lg bg-white border border-gray-300">
          {/* Card Info */}
          <div className="absolute top-25 left-0 w-full p-4 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
            <div className="flex mb-3">
              <span className="flex-[0_0_20%] font-medium text-gray-500 dark:text-gray-400">Coaching</span>
              <span className="flex-[0_0_10%] font-medium text-gray-500 dark:text-gray-400 text-center">:</span>
              <span className="flex-[0_0_70%] break-words whitespace-normal text-gray-800 dark:text-white/90">{person.expertise}</span>
            </div>
            <div className="flex mb-3">
              <span className="flex-[0_0_20%] font-medium text-gray-500 dark:text-gray-400">Contact</span>
              <span className="flex-[0_0_10%] font-medium text-gray-500 dark:text-gray-400 text-center">:</span>
              <span className="flex-[0_0_70%] break-words whitespace-normal text-gray-800 dark:text-white/90">{person.contact}</span>
            </div>
            <div className="flex mb-3">
              <span className="flex-[0_0_20%] font-medium text-gray-500 dark:text-gray-400">Mail Id</span>
              <span className="flex-[0_0_10%] font-medium text-gray-500 dark:text-gray-400 text-center">:</span>
              <span className="flex-[0_0_70%] break-words whitespace-normal text-gray-800 dark:text-white/90">{person.email}</span>
            </div>
          </div>

          {/* Image */}
          <div className="absolute top-0 left-0 w-full h-full z-10 transform transition-transform duration-500 ease-in-out group-hover:-translate-y-50">
            <img src={person.img} alt={person.name} className="w-72 h-72 object-cover" />
          </div>

          {/* Icons */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 flex justify-between items-center w-[260px] gap-2">
            <div className="max-w-[160px] text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-lg font-medium text-white">{person.name}</h2>
              <p className="text-sm text-white leading-relaxed line-clamp-3">{person.role}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-transparent p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition" onClick={() => openEditModal(person)}>
                <Edit className="text-white" size={18} />
              </button>
              <button className="bg-transparent p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition" onClick={() => openDeleteModal(person)}>
                <Trash2 className="text-white" size={18} />
              </button>
            </div>
          </div>

          {/* Bottom Name & Role */}
          <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center text-center transition-opacity duration-500 z-20 opacity-100 group-hover:opacity-0">
            <h2 className="text-xl font-medium text-white leading-6 tracking-wide">
              {person.name} <br />
              <span className="text-gray-300 text-sm font-light tracking-wider">{person.role}</span>
            </h2>
          </div>
        </div>
      ))}

      {isEditOpen && selectedTutor && (
        <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} className="max-w-[900px] m-4">
          <div className="w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90 text-center">
              Edit Tutor
            </h4>

            <form className="flex flex-col mt-5" onSubmit={handleUpdateTutor}>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, first_name: e.target.value.replace(/[^A-Za-z]/g, "") }))
                    }
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, last_name: e.target.value.replace(/[^A-Za-z]/g, "") }))
                    }
                  />
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <DatePicker
                    id="dob"
                    placeholder="Select a date"
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 21))}
                    value={
                      formData.dob && !isNaN(Date.parse(formData.dob))
                        ? new Date(formData.dob)
                        : undefined
                    }
                    onChange={(date) => {
                      const selectedDate = Array.isArray(date) ? date[0] : date;

                      if (selectedDate) {
                        // Format date to YYYY-MM-DD
                        const year = selectedDate.getFullYear();
                        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
                        const day = String(selectedDate.getDate()).padStart(2, "0");

                        setFormData((prev) => ({
                          ...prev,
                          dob: `${year}-${month}-${day}`,
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          dob: "",
                        }));
                      }
                    }}
                  />
                </div>

                <div>
                  <Label>Gender</Label>
                  <CustomDropdown
                    options={["Male", "Female", "Other"]}
                    value={formData.gender}
                    onSelect={(value: string) => setFormData(prev => ({ ...prev, gender: value }))}

                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 mt-5">
                <div>
                  <Label>Mail ID</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Joining Date</Label>
                  <div>
                    <DatePicker
                      id="join-date"
                      placeholder="Select a date"
                      minDate={undefined} // or just remove this prop

                      value={
                        formData.joining_date && !isNaN(Date.parse(formData.joining_date))
                          ? new Date(formData.joining_date)
                          : undefined
                      }
                      onChange={(date) => {
                        const selectedDate = Array.isArray(date) ? date[0] : date;

                        if (selectedDate) {
                          // Format date to YYYY-MM-DD
                          const year = selectedDate.getFullYear();
                          const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
                          const day = String(selectedDate.getDate()).padStart(2, "0");

                          setFormData((prev) => ({
                            ...prev,
                            joining_date: `${year}-${month}-${day}`,
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            joining_date: "",
                          }));
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label>Years of Experience</Label>
                  <Input
                    type="text"
                    value={formData.experience_years}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience_years: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-5 mb-5">

                <div>
                  <Label>Expertise / Courses</Label>
                  <CustomDropdown
                    options={["CCTV", "Home Automation", "Networking", "Other"]}
                    value={formData.expertise}
                    onSelect={(value) => setFormData(prev => ({ ...prev, expertise: value }))}
                  />
                </div>

              </div>

              <div>
                <Label>Upload Profile Photo</Label>
                <FileUploadBox
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  previewImage={selectedTutor.img}
                  isImageRemoved={isImageRemoved}
                  setIsImageRemoved={setIsImageRemoved}
                />
              </div>

              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-center">
                <button
                  type="button"
                  className="px-4 py-2 rounded-2xl border border-[#F8C723] text-gray-800"
                  onClick={() => setIsEditOpen(false)}
                >
                  <ArrowLeft className="size-5 text-[#F8C723]" />
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-10 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
                >
                  Update Tutor
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {isDeleteOpen && selectedTutor && (
        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} className="max-w-md m-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-8">Confirm Tutor Deletion</h4>
            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-10 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800" onClick={handleDeleteTutor}>
                Yes, Delete Tutor
              </button>
              <button className="px-4 py-2 rounded-2xl border border-[#F8C723] text-gray-800" onClick={() => setIsDeleteOpen(false)}>
                <X size={18} className="text-[#F8C723]" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function FileUploadBox({
  selectedFile,
  setSelectedFile,
  previewImage,
  isImageRemoved,
  setIsImageRemoved,
}: {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  previewImage?: string | null;
  isImageRemoved: boolean;
  setIsImageRemoved: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        setIsImageRemoved(false);
      }
    },
    [setSelectedFile, setIsImageRemoved]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleDelete = () => {
    setSelectedFile(null);
    setIsImageRemoved(true);
  };

  const displayImage =
    !isImageRemoved && (selectedFile ? URL.createObjectURL(selectedFile) : previewImage);

  return displayImage ? (
    <div className="bg-white flex justify-between items-center px-4 py-3 rounded-xl shadow border h-[200px]">
      <div className="flex items-center gap-4">
        <img src={displayImage} alt="Preview" className="h-12 w-12 object-contain" />
        <div>
          <p className="text-sm font-medium">{selectedFile?.name || "Current Image"}</p>
          {selectedFile && (
            <p className="text-xs text-gray-500">
              {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
            </p>
          )}
        </div>
      </div>
      <button onClick={handleDelete} className="text-gray-500 hover:text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  ) : (
    <div
      {...getRootProps()}
      className={`transition border border-gray-300 border-dashed cursor-pointer rounded-xl h-[200px] p-7 lg:p-10 ${isDragActive ? "bg-gray-100" : "bg-gray-50"
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col justify-center items-center text-center h-full gap-2">
        <img
          src={Upload || "https://via.placeholder.com/50"}
          alt="Upload Icon"
          className="h-12 w-12 object-contain"
        />
        <p className="text-sm">
          {isDragActive ? "Drop Files or" : "Drag & Drop Files or"}{" "}
          <span className="font-medium underline text-brand-500">Browse File</span>
        </p>
        <span className="text-sm text-gray-700">
          Supported: JPEG, PNG, GIF, PDF, MP4, etc.
        </span>
      </div>
    </div>
  );
}

interface CustomDropdownProps<T extends string> {
  label?: string;
  options: T[];
  value: T | string;
  onSelect?: (value: T) => void;
}

function CustomDropdown<T extends string>({
  label = "Pick an option",
  options = [],
  value,
  onSelect,
}: CustomDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: T) => {
    setIsOpen(false);
    onSelect?.(val);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="peer w-full appearance-none rounded-md border border-gray-300 bg-[#F5F5F5] px-4 pr-10 py-2.5 text-left text-gray-400
        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        {value || label}
      </button>

      <span
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
          }`}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </span>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
