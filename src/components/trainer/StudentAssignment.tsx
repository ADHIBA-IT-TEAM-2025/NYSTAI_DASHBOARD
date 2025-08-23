import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AssignmentData {
    task_id: string;
    student_id?: string; // student ID provided by backend
    htmlContent?: string;
    [key: string]: any;
}

function StudentAssignment() {
    const { token, studentId: urlStudentId } = useParams<{ token: string; studentId?: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [studentId, setStudentId] = useState<string | null>(null);

    // Fetch assignment info by token
    useEffect(() => {
        if (!token) return;

        fetch(`https://nystai-backend.onrender.com/Students-Tasks/assignment/${token}`)
            .then(async (res) => {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return res.json();
                } else {
                    const text = await res.text();
                    throw new Error("Expected JSON but got: " + text);
                }
            })
            .then((data: AssignmentData) => {
                // Use studentId from URL first, fallback to backend
                const finalStudentId = urlStudentId || data.student_id;
                if (!finalStudentId) {
                    console.error("Student ID not found in URL or backend");
                    alert("Student ID not found!");
                } else {
                    setStudentId(finalStudentId);
                }

                // Render HTML content if provided
                if (data.htmlContent) {
                    const container = document.getElementById("assignment-container");
                    if (container) container.innerHTML = data.htmlContent;
                }
            })
            .catch((err) => console.error("Failed to fetch assignment:", err));
    }, [token, urlStudentId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return alert("Please select a file");
        if (!studentId) return alert("Student ID not found");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadUrl = `https://nystai-backend.onrender.com/Students-Tasks/assignment/submit/${token}/${studentId}`;
            console.log("Uploading to:", uploadUrl);

            const res = await fetch(uploadUrl, { method: "POST", body: formData });

            if (res.ok) {
                const result = await res.json();
                console.log("Submission success:", result);
                alert("Assignment submitted successfully!");
                setFile(null);
            } else {
                const errorText = await res.text();
                console.error("Submission failed:", errorText);
                alert("Failed to submit assignment");
            }
        } catch (err) {
            console.error("Error submitting assignment:", err);
            alert("Error submitting assignment");
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
                        cursor: "pointer",
                    }}
                >
                    Submit Assignment
                </button>
            </form>
        </div>
    );
}

export default StudentAssignment;
