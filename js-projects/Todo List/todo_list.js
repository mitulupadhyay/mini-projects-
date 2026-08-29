const inputBox = document.querySelector("#input-box");
const addBtn = document.querySelector("#add-btn");
const listContainer = document.querySelector("#list-container");
const formMessage = document.querySelector("#form-message");
const taskCounter = document.querySelector("#task-counter");
const emptyState = document.querySelector("#empty-state");
const emptyTitle = document.querySelector("#empty-title");
const emptyText = document.querySelector("#empty-text");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");
const themeToggleBtn = document.querySelector("#theme-toggle");

let tasks = [];
let currentFilter = "all";

loadTasks();
loadTheme();
renderTasks();

// ADD TASK
addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


inputBox.addEventListener("input", function () {
    formMessage.textContent = "";
});

function addTask() {
    const taskText = inputBox.value.trim();

    if (taskText === "") {
        formMessage.textContent = "Please type a task before adding it.";
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    inputBox.value = "";
    formMessage.textContent = "";

    saveTasks();
    renderTasks();
}

// render taskk

function renderTasks() {

    listContainer.innerHTML = "";

    // tasks visible for the current filter
    let visibleTasks = tasks;

    if (currentFilter === "active") {
        visibleTasks = tasks.filter(function (task) {
            return task.completed === false;
        });
    } else if (currentFilter === "completed") {
        visibleTasks = tasks.filter(function (task) {
            return task.completed === true;
        });
    }

    visibleTasks.forEach(function (task) {
        const li = document.createElement("li");
        li.dataset.id = task.id;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span class="task-check" role="checkbox" tabindex="0"
                aria-checked="${task.completed}"
                aria-label="Mark task as ${task.completed ? "not completed" : "completed"}"></span>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="edit-btn" aria-label="Edit task">✏️</button>
                <button class="delete-btn" aria-label="Delete task">✕</button>
            </div>
        `;

        listContainer.appendChild(li);
    });

    updateEmptyState(visibleTasks);
    updateTaskCounter();
}


function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// complete edit delete

listContainer.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (!li) return;

    const taskId = Number(li.dataset.id);
    const task = tasks.find(function (t) {
        return t.id === taskId;
    });
    if (!task) return;

    if (event.target.classList.contains("task-check")) {
        toggleComplete(task);
    } else if (event.target.classList.contains("delete-btn")) {
        deleteTask(taskId);
    } else if (event.target.classList.contains("edit-btn")) {
        startEditingTask(li, task);
    }
});

// checkbox
listContainer.addEventListener("keydown", function (event) {
    const isCheckbox = event.target.classList.contains("task-check");
    if (isCheckbox && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        const li = event.target.closest("li");
        const taskId = Number(li.dataset.id);
        const task = tasks.find(function (t) {
            return t.id === taskId;
        });
        if (task) toggleComplete(task);
    }
});

function toggleComplete(task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });
    saveTasks();
    renderTasks();
}

function startEditingTask(li, task) {
    const textSpan = li.querySelector(".task-text");

    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = task.text;

    li.replaceChild(input, textSpan);
    input.focus();
    input.select();

    function saveEdit() {
        const newText = input.value.trim();
        if (newText !== "") {
            task.text = newText;
            saveTasks();
        }
        renderTasks();
    }

    input.addEventListener("blur", saveEdit);
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            input.blur();
        }
    });
}

// FILTER

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

clearCompletedBtn.addEventListener("click", function () {
    tasks = tasks.filter(function (task) {
        return task.completed === false;
    });
    saveTasks();
    renderTasks();
});

// empty
function updateEmptyState(visibleTasks) {
    if (visibleTasks.length > 0) {
        emptyState.style.display = "none";
        listContainer.style.display = "flex";
        return;
    }

    emptyState.style.display = "block";
    listContainer.style.display = "none";

    if (currentFilter === "active") {
        emptyTitle.textContent = "No active tasks";
        emptyText.textContent = "Nice! You're all caught up.";
    } else if (currentFilter === "completed") {
        emptyTitle.textContent = "No completed tasks";
        emptyText.textContent = "Complete a task to see it here.";
    } else {
        emptyTitle.textContent = "No tasks yet";
        emptyText.textContent = "Add something you want to get done today.";
    }
}

// task counter
function updateTaskCounter() {
    const activeCount = tasks.filter(function (task) {
        return task.completed === false;
    }).length;

    if (tasks.length === 0) {
        taskCounter.textContent = "";
    } else if (activeCount === 1) {
        taskCounter.textContent = "1 task left";
    } else {
        taskCounter.textContent = activeCount + " tasks left";
    }
}

// Local storage

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("todoTasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// DARK MODE

themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("todoTheme", isDark ? "dark" : "light");

    updateThemeButton();
});

function loadTheme() {
    const savedTheme = localStorage.getItem("todoTheme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
    updateThemeButton();
}

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    themeToggleBtn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    themeToggleBtn.setAttribute("aria-label", themeToggleBtn.title);
}
