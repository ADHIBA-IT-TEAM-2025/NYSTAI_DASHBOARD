import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentAssignment() {
    const { task_id, student_id } = useParams(); // get from route
    const [task, setTask] = useState(null);
    const [file, setFile] = useState(null);

    // Fetch assignment details from backend
    useEffect(() => {
        fetch(`https://nystai-backend.onrender.com/Students-Tasks/assignment/${task_id}`)
            .then(res => res.text()) // if backend returns HTML
            .then(html => {
                // You can directly set HTML if backend renders HTML
                document.getElementById("assignment-container").innerHTML = html;
            });
    }, [task_id]);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`https://nystai-backend.onrender.com/Students-Tasks/assignmentuploads/${task_id}/${student_id}/submit`, {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            alert("Assignment submitted successfully!");
        } else {
            alert("Failed to submit assignment");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>Student Assignment</h2>
            <div id="assignment-container">
                {/* backend HTML will load here */}
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="file" accept="application/pdf,image/*" onChange={handleFileChange} required />
                <button type="submit" style={{ marginTop: "10px", padding: "8px 16px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "5px" }}>
                    Submit Assignment
                </button>
            </form>
        </div>
    );
}

export default StudentAssignment;
