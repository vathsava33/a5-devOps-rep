const express = require("express");

const app = express();
const PORT = 8000;

app.use(express.json());

const students = [
    { id: 1, name: "Vathsava", rollno: "23071A05A5", branch: "CSE" }
];

app.get("/students/GET", (req, res) => {
    res.json({ message: "Data successfully fetched!", students });
});

app.post("/students/POST", (req, res) => {
    const { name, rollno, branch } = req.body;
    if (!name || !rollno || !branch) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const student = {
        id: students.length ? Math.max(...students.map((item) => item.id)) + 1 : 1,
        name,
        rollno,
        branch
    };
    students.push(student);
    return res.status(201).json({ message: "Student created", student });
});

app.delete("/students/DELETE/:id", (req, res) => {
    const studentIndex = students.findIndex((student) => student.id === Number(req.params.id));
    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const [student] = students.splice(studentIndex, 1);
    return res.json({ message: "Student deleted", student });
});

app.patch("/students/PATCH/:id", (req, res) => {
    const student = students.find((item) => item.id === Number(req.params.id));
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, rollno, branch } = req.body;
    Object.assign(student, {
        ...(name !== undefined && { name }),
        ...(rollno !== undefined && { rollno }),
        ...(branch !== undefined && { branch })
    });
    return res.json({ message: "Student updated", student });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
