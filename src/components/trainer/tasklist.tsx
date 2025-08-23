import { useState, useEffect } from "react";
import PageMeta from "../common/PageMeta.tsx";
import PageBreadcrumb from "../common/PageBreadCrumb.tsx";
import Label from "../form/Label.tsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

interface TaskMail {
    student_id: number;
    name: string;
    last_name: string;
    passport_photo_url: string;
    course_enrolled: string;
    batch: string;
    email_status: string;
    sent_at: string;
    task_title: string;
}

interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
    email: string;
    submitted_at: string;
    course_enrolled?: string;
    task_title?: string;
    passport_photo_url?: string;
}


// Placeholder for student image
const studentPlaceholder = "/placeholder.png";

export default function Tasklist() {
    const { taskId } = useParams<{ taskId: string }>();
    const [mails, setMails] = useState<TaskMail[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch completed students
    useEffect(() => {
        const fetchAllTaskSubmissions = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `https://nystai-backend.onrender.com/Students-Tasks/task/${taskId}/submissions`
                );

                if (res.data.success) {
                    setStudents(res.data.data);
                }

            } catch (error) {
                console.log("Students fetched:", res.data.data);

            } finally {
                setLoading(false);
            }
        };

        fetchAllTaskSubmissions();
    }, []); // Removed taskId dependency since it's not needed anymore


    // Fetch task mails
    useEffect(() => {
        const fetchTaskMails = async () => {
            if (!taskId) return;
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://nystai-backend.onrender.com/Students-Tasks/task/${taskId}/mailsent`
                );
                if (response.data.success) {
                    setMails(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching task mails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskMails();
    }, [taskId]);

    if (loading) return <p>Loading task data...</p>;
    if (mails.length === 0) return <p>No emails found for this task</p>;

    // Get task info from first element if available
    const taskInfo = mails[0];

    return (
        <>
            <PageMeta
                title="Nystai Institute | CCTV & Home Automation Course Training"
                description="Join Nystai Institute to master CCTV installation and home automation systems."
            />
            <PageBreadcrumb
                pageTitle="Create Assignments"
                pageTitleLink="/Createtask"
                pageTitle1={`Batch : ${taskInfo?.batch || ""}`}
            />

            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
                <h2 className="text-xl font-semibold">Batch: {taskInfo?.batch}</h2>
                <h3 className="text-lg font-semibold mb-12">{taskInfo?.task_title}</h3>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
                    <div className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {/* Task Assigned */}
                        <div>
                            <Label className="mb-5 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                                Task Assigned To Students
                                <span className="flex items-center justify-center w-6 h-6 text-white text-sm font-semibold rounded-full bg-[#222]">
                                    {mails.length}
                                </span>
                            </Label>

                            {mails.map((mail) => (
                                <div
                                    key={mail.student_id}
                                    className="cursor-pointer overflow-hidden border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-4 hover:bg-[#FFDD68ac] transition-colors duration-300 flex flex-col justify-between h-fit mb-5"
                                >
                                    <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-5">
                                        {mail.course_enrolled}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <img
                                                    width={40}
                                                    height={40}
                                                    src={mail.passport_photo_url || studentPlaceholder}
                                                    alt={mail.name}
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 dark:text-white/90">
                                                    {mail.name} {mail.last_name}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                                            {format(new Date(mail.sent_at), "MMM d")}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Completed Section */}
                        <div>
                            <Label className="mb-5 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                Uploaded
                                <span className="flex items-center justify-center w-6 h-6 text-white text-sm font-semibold rounded-full bg-[#222]">
                                    {students.length}
                                </span>
                            </Label>

                            <ul className="space-y-2">
                                {students.length === 0 ? (
                                    <p>No submissions yet</p>
                                ) : (
                                    students.map((student) => (
                                        <div
                                            key={student.student_id || student.id}  // use correct ID
                                            className="cursor-pointer overflow-hidden border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-4 hover:bg-[#FFDD68ac] transition-colors duration-300 flex flex-col justify-between h-fit mb-5"
                                            onClick={() => {
                                                // Navigate using the proper student_id
                                                navigate(`/task/${taskId}/student/${student.student_id}`);
                                            }}
                                        >
                                            <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-5">
                                                {student.course_enrolled || "-"} - {student.task_title || "-"}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                                        <img
                                                            width={40}
                                                            height={40}
                                                            src={student.passport_photo_url || studentPlaceholder}
                                                            alt={`${student.first_name} ${student.last_name}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="block font-medium text-gray-800 dark:text-white/90">
                                                            {student.first_name} {student.last_name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                                                    {student.submitted_at ? format(new Date(student.submitted_at), "MMM d") : "-"}
                                                </h3>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
