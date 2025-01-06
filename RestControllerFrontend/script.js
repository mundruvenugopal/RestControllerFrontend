const BASE_URL = 'http://localhost:8080'; // Adjust the path as necessary

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    addStudent(); // Call the function to add a student
});

// Function to add a student
function addStudent() {
    const studentData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phNo: document.getElementById('phNo').value,
    };
    fetch(BASE_URL+'/api/students/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data; // Show success message.
        document.getElementById('message').style.display = 'block';
        fetchStudents(); // Refresh the list of students.
        clearForm(); // Clear the form fields.
    })
    .catch(error => console.error('Error:', error));
}




function fetchStudents() {
    fetch(BASE_URL+'/api/students/') // Use BASE_URL for fetching students
        .then(response => response.json())
        .then(students => {
            const list = document.getElementById('studentList');
            list.innerHTML = ''; // Clear existing list items.
            students.forEach(student => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${student.firstName} ${student.lastName} - ${student.email}`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching students:', error));
}


function clearForm() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phNo').value = '';
}

fetchStudents();