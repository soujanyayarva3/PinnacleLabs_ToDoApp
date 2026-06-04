
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
    renderTasks();
};

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

function renderTasks(list = tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    list.forEach((task) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask('${task.text}')">✔</button>
                <button class="delete-btn" onclick="deleteTask('${task.text}')">✕</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(text) {
    const task = tasks.find(t => t.text === text);

    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(text) {
    tasks = tasks.filter(task => task.text !== text);
    saveTasks();
    renderTasks();
}

function searchTasks() {
    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    renderTasks(filtered);
}

function updateStats() {
    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

