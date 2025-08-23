import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AssignmentData {
    task_id: string;
    student_id: string;
    [key: string]: any; // for other data from backend
}

function StudentAssignment() {
    const { token } = useParams();
    const [file, setFile] = useState<File | null>(null);
    const [assignment, setAssignment] = useState<AssignmentData | null>(null);

    useEffect(() => {
        if (!token) return;

        fetch(`https://nystai-backend.onrender.com/Students-Tasks/assignment/${token}`)
            .then(res => res.json()) // assuming backend returns JSON with task_id and student_id
            .then((data: AssignmentData) => {
                setAssignment(data);

                // Optionally render some HTML content if needed
                const container = document.getElementById("assignment-container");
                if (container && data.htmlContent) {
                    container.innerHTML = data.htmlContent;
                }
            })
            .catch(err => console.error("Failed to fetch assignment:", err));
    }, [token]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return alert("Please select a file");
        if (!assignment) return alert("Assignment data not loaded yet");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
            `https://nystai-backend.onrender.com/Students-Tasks/assignmentuploads/${assignment.task_id}/${assignment.student_id}/submit`,
            { method: "POST", body: formData }
        );

        if (res.ok) {
            alert("Assignment submitted successfully!");
        } else {
            alert("Failed to submit assignment");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>Student Assignment</h2>
            <div id="assignment-container"></div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="file"
                    name="file"
                    accept="application/pdf,image/*"
                    onChange={handleFileChange}
                    required
                />
                <button
                    type="submit"
                    style={{
                        marginTop: "10px",
                        padding: "8px 16px",
                        background: "#27ae60",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    Submit Assignment
                </button>
            </form>
        </div>
    );
}

export default StudentAssignment;
