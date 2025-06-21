function submitHistory() {
  const name = document.getElementById('studentName').value.trim();
  const history = document.getElementById('historyCard').value.trim();
  const msg = document.getElementById("studentMsg");

  if (!name || !history) {
    alert("Please fill in all fields.");
    return;
  }

  const data = { name, history };

  fetch("YOUR_WEB_APP_URL", { // replace this
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === "success") {
        msg.textContent = "History card submitted successfully!";
        msg.style.color = "green";
        document.getElementById("studentName").value = "";
        document.getElementById("historyCard").value = "";
      } else {
        msg.textContent = "Submission failed!";
        msg.style.color = "red";
      }
    })
    .catch(() => {
      msg.textContent = "Error connecting to server!";
      msg.style.color = "red";
    });
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
