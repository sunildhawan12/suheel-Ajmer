  let students = [];

    function addStudent() {
      const name = document.getElementById("name").value;
      const roll = document.getElementById("roll").value;
      const math = parseInt(document.getElementById("math").value);

      if (!name || !roll || isNaN(math)) {
        alert("Please fill all fields correctly.");
        return;
      }

      const student = calculateResult({ name, roll, math });
      students.push(student);
      displayStudents();
      clearForm();
    }

    function calculateResult(s) {
      s.total = s.math;
      s.percent = ((s.math / 100) * 100).toFixed(2);
      s.grade = s.math >= 90 ? "A" : s.math >= 80 ? "B" : s.math >= 70 ? "C" : s.math >= 33 ? "D" : "F";
      s.result = s.math >= 33 ? "Pass" : "Fail";
      return s;
    }

    function displayStudents() {
      const table = document.getElementById("recordTable");
      table.innerHTML = `
        <tr>
          <th contenteditable="true">Name</th>
          <th contenteditable="true">Roll</th>
          <th contenteditable="true">Math</th>
          <th contenteditable="true">Total</th>
          <th contenteditable="true">Percentage</th>
          <th contenteditable="true">Grade</th>
          <th contenteditable="true">Result</th>
          <th class="no-print">Actions</th>
        </tr>
      `;

      students.forEach((s, index) => {
        const row = table.insertRow();
        row.innerHTML = `
          <td>${s.name}</td>
          <td>${s.roll}</td>
          <td contenteditable="true" onblur="updateMath(${index}, this.innerText)">${s.math}</td>
          <td>${s.total}</td>
          <td>${s.percent}%</td>
          <td>${s.grade}</td>
          <td>${s.result}</td>
          <td class="actions no-print">
            <button onclick="editStudent(${index})">Edit</button>
            <button class="delete" onclick="deleteStudent(${index})">Delete</button>
          </td>
        `;
      });
    }

    function updateMath(index, newValue) {
      const math = parseInt(newValue.trim());
      if (isNaN(math)) {
        alert("Invalid number!");
        displayStudents();
        return;
      }
      students[index].math = math;
      students[index] = calculateResult(students[index]);
      displayStudents();
    }

    function editStudent(index) {
      const s = students[index];
      document.getElementById("name").value = s.name;
      document.getElementById("roll").value = s.roll;
      document.getElementById("math").value = s.math;
      students.splice(index, 1);
    }

    function deleteStudent(index) {
      students.splice(index, 1);
      displayStudents();
    }

    function clearForm() {
      document.getElementById("name").value = "";
      document.getElementById("roll").value = "";
      document.getElementById("math").value = "";
    }

    function downloadPDF() {
      document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');

      html2pdf().set({
        margin: 0.5,
        filename: 'Student-Test-Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).from(document.getElementById("pdfContent")).save()
      .then(() => {
        document.querySelectorAll('.no-print').forEach(el => el.style.display = 'block');
      });
    }

      // Dynamic Greeting
  const now = new Date();
  const hour = now.getHours();
  const greetingElement = document.getElementById('greeting');

  if (hour < 12) {
      greetingElement.innerHTML = `Good Morning! <b style='color: #ffc107;'>Sushil </b>☀️`;
  } else if (hour < 18) {
      
       greetingElement.innerHTML = `Good Afternoon! <b style='color:rgb(255, 139, 7);'>Sushil </b>🌞`;
  } else {
   
       greetingElement.innerHTML = `Good Evening! <b style='color:rgb(255, 7, 214);'>Sushil </b>🌙`;
  }

  // Typing Animation
  const textArray = ["Welcome to Student Management System", "Manage Records Easily", "Fast and Secure"];
  let typingElement = document.getElementById('typing');
  let arrayIndex = 0;
  let charIndex = 0;

  function type() {
      if (charIndex < textArray[arrayIndex].length) {
          typingElement.innerHTML += textArray[arrayIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, 100);
      } else {
          setTimeout(erase, 2000);
      }
  }

  function erase() {
      if (charIndex > 0) {
          typingElement.innerHTML = textArray[arrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 50);
      } else {
          arrayIndex++;
          if (arrayIndex >= textArray.length) arrayIndex = 0;
          setTimeout(type, 500);
      }
  }

  document.addEventListener("DOMContentLoaded", function() {
      if (textArray.length) setTimeout(type, 1000);
  });