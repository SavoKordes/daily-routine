
const STORAGE_KEY = "routineTasks";
let tasks = {};

// Load everything when the page is ready
window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadTasks();
  setupResetButton();
}

// Add a new task
function addTask(text = "", checked = false, id = null) {
  const taskId = id || "task-" + Date.now();
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  checkbox.id = taskId;

  const label = document.createElement("label");
  label.htmlFor = taskId;
  label.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.style.marginLeft = "auto";
  deleteBtn.onclick = () => {
    delete tasks[taskId];
    saveTasks();
    li.remove();
  };

  checkbox.addEventListener("change", () => {
    tasks[taskId].checked = checkbox.checked;
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteBtn);

  document.getElementById("routineList").appendChild(li);

  tasks[taskId] = { text, checked };
  saveTasks();
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Load from localStorage
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  tasks = JSON.parse(saved);
  Object.entries(tasks).forEach(([id, task]) => {
    addTask(task.text, task.checked, id);
  });
}

// Handle input and add
function handleAddTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;
  addTask(taskText);
  input.value = "";
}

// Reset everything
function setupResetButton() {
  document.getElementById("resetBtn").addEventListener("click", () => {
    tasks = {};
    saveTasks();
    document.getElementById("routineList").innerHTML = "";
  });
}
