document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const course = document.getElementById('course').value;

    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '';

    if (!name || !email || !password || !course) {
        messageDiv.innerHTML = 'Please fill out all fields.';
        messageDiv.style.color = 'red';
        return;
    }

    try {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = { name, email, password, course };
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));

        messageDiv.innerHTML = 'Registration successful!';
        messageDiv.style.color = 'green';
        document.getElementById('registrationForm').reset();

        displayStudents();
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = 'An error occurred. Please try again.';
        messageDiv.style.color = 'red';
    }
});

function displayStudents() {
    try {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const studentList = document.querySelector('#studentList tbody');
        studentList.innerHTML = '';

        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.classList.add('fadeInRow');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit" onclick="editStudent(${index})">Edit</button>
                        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                    </div>
                </td>
            `;
            studentList.appendChild(row);
        });
    } catch (error) {
        console.error('Error displaying students:', error);
    }
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('password').value = student.password;
    document.getElementById('course').value = student.course;

    deleteStudent(index);
}

function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

document.addEventListener('DOMContentLoaded', displayStudents);
