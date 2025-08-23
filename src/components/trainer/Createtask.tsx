import { useState, useRef, useEffect } from "react";
import PageMeta from "../common/PageMeta.tsx";
import PageBreadcrumb from "../common/PageBreadCrumb.tsx";
import Label from "../form/Label.tsx";
import Input from "../form/input/InputField.tsx";
import DatePicker from "../form/date-picker.tsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { MoreVertical, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../ui/modal/index.tsx";

export default function Createtask() {
    const [formData, setFormData] = useState({
        batch: "",
        course: "",
        task_title: "",
        task_description: "",
        due_date: "", // yyyy-mm-dd string
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let newErrors: any = {};
        if (!formData.task_title) newErrors.task_title = "Title is required";
        if (!formData.batch) newErrors.batch = "Batch is required";
        if (!formData.course) newErrors.course = "Course is required";
        if (!formData.due_date) newErrors.due_date = "Deadline is required";
        if (!formData.task_description) newErrors.task_description = "Description is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Backend may expect due_date as yyyy-mm-dd string
            const payload = {
                batch: formData.batch,
                course: formData.course,
                task_title: formData.task_title,
                task_description: formData.task_description,
                due_date: formData.due_date,
            };

            console.log("Payload:", payload);

            const response = await axios.post(
                "https://nystai-backend.onrender.com/Students-Tasks/assign-task",
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("Task created successfully!");
            console.log(response.data);

            // Reset form
            setFormData({
                batch: "",
                course: "",
                task_title: "",
                task_description: "",
                due_date: "",
            });
            setErrors({});

            // Refresh the page to show updated tasks
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.message || "Failed to create task";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageMeta
                title="Nystai Institute | CCTV & Home Automation Course Training"
                description="Join Nystai Institute to master CCTV installation and home automation systems."
            />
            <PageBreadcrumb
                pageTitle="All Trainers"
                pageTitleLink="/Trainers"
                pageTitle1="Create Assignments"
            />

            <div className="rounded-2xl border border-gray-200 bg-white">
                <div className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Assigned Task List</h2>
                    <h3 className="text-l font-semibold py-4">Create Assignments</h3>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 grid-rows-1">
                        {/* Left Inputs */}
                        <div className="left-div space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-2 grid-rows-1">
                            <div>
                                <Label>Assignment Title</Label>
                                <Input
                                    placeholder="System Integration: Module 1"
                                    value={formData.task_title}
                                    onChange={(e) => setFormData({ ...formData, task_title: e.target.value })}
                                />
                                {errors.task_title && <p className="text-red-500">{errors.task_title}</p>}
                            </div>

                            <div>
                                <Label>Assign To Batch</Label>
                                <Input
                                    placeholder="Batch 2"
                                    value={formData.batch}
                                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                                />
                                {errors.batch && <p className="text-red-500">{errors.batch}</p>}
                            </div>

                            <div>
                                <Label>Course</Label>
                                <CustomDropdown
                                    options={["Course 1", "Course 2", "Course 3"]}
                                    value={formData.course}
                                    onSelect={(val) => setFormData({ ...formData, course: val })}
                                />
                                {errors.course && <p className="text-red-500">{errors.course}</p>}
                            </div>

                            <div>
                                <Label>Deadline</Label>
                                <DatePicker
                                    id="due_date"
                                    placeholder="Select Deadline"
                                    value={formData.due_date ? new Date(formData.due_date) : undefined}
                                    onChange={(date) => {
                                        const selectedDate = Array.isArray(date) ? date[0] : date;
                                        if (selectedDate) {
                                            setFormData({
                                                ...formData,
                                                due_date: selectedDate.toISOString().split("T")[0],
                                            });
                                        }
                                    }}
                                />
                                {errors.due_date && <p className="text-red-500">{errors.due_date}</p>}
                            </div>
                        </div>

                        {/* Right description */}
                        <div className="right-div col-span-1">
                            <Label>Assignment Description</Label>
                            <textarea
                                placeholder="Describe the task..."
                                className="w-full border rounded-lg px-4 py-2 h-[165px] bg-[#f5f5f5]"
                                value={formData.task_description}
                                onChange={(e) => setFormData({ ...formData, task_description: e.target.value })}
                            />
                            {errors.task_description && <p className="text-red-500">{errors.task_description}</p>}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-3 rounded-lg bg-[#F8C723] font-medium hover:bg-yellow-500"
                        >
                            {loading ? "Creating..." : "Create Task"}
                        </button>
                    </div>
                </div>

                <Showtask />

            </div>


        </>
    );
}

interface Task {
    _id: string;
    batch: string;
    course: string;
    task_title: string;
    task_description: string;
    due_date: string;
}

function Showtask() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://nystai-backend.onrender.com/Students-Tasks/assigned-tasks",
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Tasks from API:", response.data.tasks);

            const normalizedTasks = (response.data.tasks || []).map((task: any, index: number) => ({
                _id: task.task_id || task._id || `${index}`, // use task_id to match backend
                batch: task.batch,
                course: task.course,
                task_title: task.task_title,
                task_description: task.task_description,
                due_date: task.due_date,
            }));

            setTasks(normalizedTasks);
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setTaskToDelete(null);
    };

    const handleDelete = async () => {
        if (!taskToDelete?._id) return;

        try {
            const response = await axios.delete(
                `https://nystai-backend.onrender.com/Students-Tasks/delete-tasks/${taskToDelete._id}`,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Delete response:", response.data);

            if (response.data.success) {
                toast.success("Task deleted successfully");
                setTasks((prev) => prev.filter((task) => task._id !== taskToDelete._id));
            } else {
                toast.error(response.data.message || "Failed to delete task");
            }
        } catch (error: any) {
            console.error("Delete error:", error.response || error);
            toast.error(error.response?.data?.message || "Failed to delete task");
        } finally {
            closeDeleteModal();
        }
    };

    const goToTaskDetail = async (taskId?: string) => {
        if (!taskId) return;
        try {
            const response = await axios.get(
                `https://nystai-backend.onrender.com/Students-Tasks/task/${taskId}/mailsent`
            );
            console.log("API response:", response.data);
        } catch (error) {
            console.error("Error fetching task mail:", error);
        }
    };

    function truncateWords(text: string, wordLimit: number) {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    }

    return (
        <div className="mt-5">
            <div className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Recently Added Tasks</h2>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="cursor-pointer rounded-2xl overflow-hidden border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6 hover:bg-[#FFDD68ac] transition-colors duration-300 flex flex-col justify-between h-full"
                                onClick={() => navigate(`/tasklist/${task._id}`)}
                            >
                                <div>
                                    <div className="mb-5 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                            Batch {task.batch}
                                        </h3>
                                        <Trash2
                                            onClick={(e) => {
                                                e.stopPropagation(); // stops triggering card click
                                                setTaskToDelete(task);
                                                setIsDeleteOpen(true);
                                            }}
                                            className="w-5 h-5 text-gray-600 dark:text-gray-300"
                                        />
                                    </div>

                                    <p className="text-gray-600 mb-2 font-semibold">
                                        {truncateWords(task.task_title, 4)}
                                    </p>
                                    <p className="text-gray-400 font-medium">
                                        {truncateWords(task.task_description, 10)}
                                    </p>
                                </div>

                                <p className="text-black font-medium mt-5">
                                    Deadline: {new Date(task.due_date).toLocaleDateString("en-GB")}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Render Modal ONCE outside the loop */}
            {isDeleteOpen && taskToDelete && (
                <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal} className="max-w-md m-4">
                    <div className="p-6 rounded-3xl bg-white dark:bg-gray-900">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-8">
                            Confirm Task Deletion
                        </h4>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-10 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
                            >
                                Yes, Delete Task
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 rounded-2xl border border-[#F8C723] text-gray-800"
                            >
                                <X size={18} className="text-[#F8C723]" />
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

type CustomDropdownProps<T extends string> = {
    label?: string;
    options: T[];
    value: T;
    onSelect?: (value: T) => void;
};

function CustomDropdown<T extends string>({ label = "Pick an option", options = [], value, onSelect }: CustomDropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value: T) => {
        setIsOpen(false);
        onSelect?.(value);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="peer w-full appearance-none rounded-md border border-gray-300 bg-[#F5F5F5] px-4 pr-10 py-2.5 text-left text-gray-400"
            >
                {value || label}
            </button>
            <span className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                <FontAwesomeIcon icon={faChevronDown} />
            </span>
            {isOpen && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-200 shadow-lg">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}