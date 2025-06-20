function submitHistory() {
  const name = document.getElementById('studentName').value.trim();
  const history = document.getElementById('historyCard').value.trim();
  const msg = document.getElementById("studentMsg");

  if (!name || !history) {
    alert("Please fill in all fields.");
    return;
  }

  const data = { name, history };

  fetch("https://script.google.com/macros/s/AKfycbyIEnSKoc6pr-glGyiUebWGgiy3A_LxMp6ZUiqb6XLa4ubJQBAgUmopkNbzv_pGvQMc/exec", { // replace this
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
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.history
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}
