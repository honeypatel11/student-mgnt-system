class Student {
    constructor(name, grid, emailId, course) {
        this.name = name;
        this.grid = grid;
        this.emailId = emailId;
        this.course = course;
    }
}

class StudentManage {
    constructor() {
        this.students = [];
    }

    create(student) {
        this.students.push(student);
        this.display();
    }

    display() {
        const table = document.getElementById("studentDetail");
        table.innerHTML = "";

        this.students.forEach((student, index) => {
            let row = `
                <tr class="text-center">
                    <td>${student.name}</td>
                    <td>${student.grid}</td>
                    <td>${student.emailId}</td>
                    <td>${student.course}</td>
                    
                    <td class="p-2">
                        <button class="btn btn-warning btn-sm" onclick="updateStudent(${index})">✏️</button>
                    </td>
                    <td class="p-2">
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">🗑️</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });
    }

    update(index, updatedStudent) {
        this.students[index] = updatedStudent;
        this.display();
    }

    delete(index) {
        this.students.splice(index, 1);
        this.display();
    }
}

const manage = new StudentManage();
let updateIndex = null;

function createUpdateStudent() {
    const name = document.getElementById("name").value.trim();
    const grid = document.getElementById("grid").value.trim();
    const emailId = document.getElementById("mail").value.trim();
    const course = document.getElementById("course-select").value;

    const gridRegex = /^\d{4}$/;   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!name) {
        Swal.fire("Validation Error", "Please enter your name!", "error");
        return;
    }
    
    if (!grid) {
        Swal.fire("Validation Error", "Please enter your grid!", "error");
        return;
    }
    if (!gridRegex.test(grid)) {
        Swal.fire({
            text: "Enter A Valid GRID Number (4-digits) !",
            icon: "error"
        });
        return;
    }

    if (!emailId) {
        Swal.fire("Validation Error", "Please enter your email ID!", "error");
        return;
    }
    if (!emailRegex.test(emailId)) {  
        Swal.fire("Validation Error", "Please enter a valid email address!", "error");
        return;
    }

    if (!course) {
        Swal.fire("Validation Error", "Please select a course!", "error");
        return;
    }

    if (manage.students.some((record) => record.emailId === emailId && updateIndex === null)) {
        Swal.fire("Validation Error", "Email already exists!", "error");
        return;
    }

    const student = new Student(name, grid, emailId, course);

    if (updateIndex === null) {
        manage.create(student);
        Swal.fire("Success", "Student added successfully!", "success");
    } else {
        manage.update(updateIndex, student);
        updateIndex = null;
        document.getElementById("submit").textContent = "Submit";
        Swal.fire("Success", "Student updated successfully!", "success");
    }

    resetForm();
}

function deleteStudent(idx) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            manage.delete(idx);
            Swal.fire("Deleted!", "Student has been deleted.", "success");
        }
    });
}

function resetForm() {
    document.getElementById("stu-form").reset();
    updateIndex = null;
    document.getElementById("submit").textContent = "Submit";
}

function updateStudent(index) {
    const student = manage.students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("grid").value = student.grid;
    document.getElementById("mail").value = student.emailId;
    document.getElementById("course-select").value = student.course;

    updateIndex = index;
    document.getElementById("submit").textContent = "Update";
}

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    createUpdateStudent();
});
