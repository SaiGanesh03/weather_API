document.addEventListener('DOMContentLoaded', function () {
    // Retrieve tasks from local storage
    const savedTasks = localStorage.getItem('tasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];

    // Display existing tasks
    const tasksList = document.getElementById('tasks');
    tasks.forEach(task => {
        addTaskToList(task);
    });

    document.getElementById('newTask').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        addTaskToList(taskText);

        // Save tasks to local storage
        const tasksList = document.getElementById('tasks');
        const tasks = Array.from(tasksList.children).map(task => task.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Clear the input field
        newTaskInput.value = '';
    }
}

function addTaskToList(taskText) {
    const tasksList = document.getElementById('tasks');
    const newTask = document.createElement('li');
    newTask.innerHTML = `<span>${taskText}</span> <button onclick="removeTask(this)"> - </button>`;
    tasksList.appendChild(newTask);
}

function removeTask(button) {
    const taskElement = button.parentNode;
    const tasksList = document.getElementById('tasks');
    tasksList.removeChild(taskElement);

    // Update local storage
    const tasks = Array.from(tasksList.children).map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
