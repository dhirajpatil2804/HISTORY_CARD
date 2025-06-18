function submitHistory() {
  const name = document.getElementById('studentName').value.trim();
  const history = document.getElementById('historyCard').value.trim();

  if (!name || !history) {
    alert("Please fill in all fields.");
    return;
  }

  const data = JSON.parse(localStorage.getItem("studentHistory") || "[]");
  data.push({ name, history, date: new Date().toLocaleString() });

  localStorage.setItem("studentHistory", JSON.stringify(data));

  document.getElementById("studentMsg").textContent = "History card submitted successfully!";
  document.getElementById("studentName").value = "";
  document.getElementById("historyCard").value = "";
}

function viewSubmissions() {
  const password = document.getElementById("teacherPassword").value;
  if (password !== "teacher123") {
    alert("Incorrect password!");
    return;
  }

  const data = JSON.parse(localStorage.getItem("studentHistory") || "[]");

  const list = document.getElementById("submissionList");
  list.innerHTML = "";

  data.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} - ${entry.name}: ${entry.history}`;
    list.appendChild(li);
  });

  document.getElementById("teacherView").classList.remove("hidden");
}
