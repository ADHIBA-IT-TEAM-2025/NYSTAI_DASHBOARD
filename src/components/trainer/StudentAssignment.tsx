import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentAssignment() {
    const { task_id, student_id } = useParams();
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetch(`https://nystai-backend.onrender.com/Students-Tasks/assignment/${task_id}`)
            .then(res => res.text())
            .then(html => {
                const container = document.getElementById("assignment-container");
                if (container) container.innerHTML = html;
            });
    }, [task_id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
            `https://nystai-backend.onrender.com/Students-Tasks/assignmentuploads/${task_id}/${student_id}/submit`,
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
                    style={{ marginTop: "10px", padding: "8px 16px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "5px" }}
                >
                    Submit Assignment
                </button>
            </form>
        </div>
    );
}

export default StudentAssignment;
