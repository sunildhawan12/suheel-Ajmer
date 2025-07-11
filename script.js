
   let selectedClass = null;
  let students = [];

  function loadClassData() {
    selectedClass = document.getElementById("classDropdown").value;
    localStorage.setItem("selectedClass", selectedClass);
    document.getElementById("classTitle").innerText = `Class ${selectedClass}`;
    const stored = localStorage.getItem("class_" + selectedClass);
    students = stored ? JSON.parse(stored) : [];
    renderTable();
  }

  function renderTable() {
    const tbody = document.querySelector("#recordTable tbody");
    tbody.innerHTML = "";
    students.forEach((s, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td contenteditable="true" onblur="updateField(${i}, 'name', this.innerText)">${s.name}</td>
        <td contenteditable="true" onblur="updateField(${i}, 'roll', this.innerText)">${s.roll}</td>
        <td contenteditable="true" onblur="updateMarks(${i})">${s.math}</td>
        <td>${s.total}</td>
        <td>${s.percent}%</td>
        <td>${s.grade}</td>
        <td>${s.result}</td>
        <td class="no-print"><button onclick="deleteStudent(${i})">❌</button></td>
      `;
      tbody.appendChild(row);
    });
  }

  function addRow() {
    const student = {
      name: "",
      roll: "",
      math: 0,
      computer: 0,
      science: 0,
      total: 0,
      percent: 0,
      grade: "-",
      result: "-"
    };
    students.push(calculate(student));
    saveAndRender();
  }

  function updateField(i, key, value) {
    students[i][key] = value.trim();
    saveAndRender();
  }

  function updateMarks(i) {
    const row = document.querySelectorAll("#recordTable tbody tr")[i];
    students[i].math = parseInt(row.cells[2].innerText.trim()) || 0;
    students[i].computer = parseInt(row.cells[3].innerText.trim()) || 0;
    students[i].science = parseInt(row.cells[4].innerText.trim()) || 0;
    students[i] = calculate(students[i]);
    saveAndRender();
  }

  function calculate(s) {
    s.total = s.math + s.computer + s.science;
    s.percent = (s.total / 300 * 100).toFixed(2);
    s.grade = s.percent >= 90 ? 'A' : s.percent >= 80 ? 'B' : s.percent >= 70 ? 'C' : s.percent >= 33 ? 'D' : 'F';
    s.result = s.percent >= 33 ? 'Pass' : 'Fail';
    return s;
  }

  function deleteStudent(i) {
    students.splice(i, 1);
    saveAndRender();
  }

  function saveAndRender() {
    localStorage.setItem("class_" + selectedClass, JSON.stringify(students));
    renderTable();
  }

  function downloadPDF() {
    const element = document.getElementById("pdfContent");
    const noPrints = element.querySelectorAll('.no-print');
    noPrints.forEach(el => el.style.display = 'none');

    const opt = {
      margin: 0.5,
      filename: `Class-${selectedClass}-Student-Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      noPrints.forEach(el => el.style.display = 'block');
    });
  }

  // ✅ Load last selected class on page load
  window.addEventListener("DOMContentLoaded", () => {
    const lastClass = localStorage.getItem("selectedClass");
    if (lastClass) {
      document.getElementById("classDropdown").value = lastClass;
      loadClassData();
    }
  });

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
