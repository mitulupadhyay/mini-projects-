let taskInput = document.querySelector("#enter-task");

let addTask = document.querySelector("#added-task");

let taskList = document.querySelector("#task-list");


function addTaskToList() {

    let task = taskInput.value;

    if (task === "") {
        return;
    }


    // Create list item
    let li = document.createElement("li");


    // Create checkbox
    let complete = document.createElement("input");

    complete.type = "checkbox";


    // Create delete button
    let deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";


    // Add task text
    li.append(complete);

    li.append(task);

    li.append(deleteButton);


    // Add task to list
    taskList.append(li);


    // Clear input
    taskInput.value = "";


    // Complete task
    complete.addEventListener("change", function () {

        if (complete.checked) {

            li.style.textDecoration = "line-through";

        } else {

            li.style.textDecoration = "none";

        }

    });


    // Delete task
    deleteButton.addEventListener("click", function () {

        li.remove();

    });

}

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTaskToList();

    }

});

addTask.addEventListener("click", addTaskToList);
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTaskToList();

    }

});