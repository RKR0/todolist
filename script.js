


let tasks = {
    // tasks object for tracking the properties of task item.
    todo: [],
    inprogress: [],
    done: [],
  };

  let ID=1;
  
  function addTask() {
    const taskName = document.getElementById('inputbox').value;
    const dueDate = document.getElementById('dueDate').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    // Validate fields
    if (taskName==='' || !dueDate || !status || !priority) {
        alert("All fields are required!");
        return;
    }

    const task = { id:ID++, name: taskName, date: dueDate, status: status, priority: priority };

    // Add task to the appropriate status array
    tasks[status.toLowerCase()].push(task);

    // Clear form fields
    document.getElementById('task_form').reset();

    showNotification('Task added successfully!');
    console.log(tasks);
    // Update UI
    renderTasks();
}


  
  function searchTasks() {
      const searchName = document.getElementById('inputbox').value;
      const searchStatus = document.getElementById('status1').value;
      const searchPriority = document.getElementById('priority').value;
  
      // Implement search logic based on the provided filters
      // You can filter tasks from the 'tasks' object and update the UI
      const filteredTasks = tasks[searchStatus.toLowerCase()].filter(task => 
          task.name.toLowerCase().includes(searchName.toLowerCase()) &&
          task.priority.toLowerCase() === searchPriority.toLowerCase()
      );
  
      // Update UI with filtered tasks
      renderFilteredTasks(filteredTasks);
  }
  
  function renderTasks() {
      // Render all tasks from the 'tasks' object to the UI
      for (const status in tasks) {
          if (tasks.hasOwnProperty(status)) {
            console.log(status);
              renderTaskList(status, tasks[status]);
          }
      }
  }
  
  function renderFilteredTasks(filteredTasks) {
      // Render filtered tasks to the UI
      const status = filteredTasks.length > 0 ? filteredTasks[0].status : 'todo';
      renderTaskList(status, filteredTasks);
  }
  
  function renderTaskList(status, taskList) {
    // Render the task list in the appropriate section based on status
    const containerId = `${status.toLowerCase()}list`;
    const container = document.getElementById(containerId);

    // Clear the existing tasks
    container.innerHTML = '';

    // Counters for todo and high priority tasks
    let todoCount = 0;
    let highPriorityCount = 0;

    // Render tasks
    if (taskList.length === 0) {
        const img = document.createElement('img');
        img.src = 'Empty.png';
        img.alt = 'empty';
        container.appendChild(img);
    } else {
        const ul = document.createElement('ul');
        ul.id = 'list-container';

        taskList.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';

            // Task details
            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';
            taskDetails.innerHTML = `<div class="task-name">${task.name}</div> <div>Due on ${task.date}</div>`;

            li.appendChild(taskDetails);

            // Edit and Delete buttons
            const actionButtons = document.createElement('div');
            actionButtons.className = 'action-buttons';
            actionButtons.innerHTML = ` <div class=${task.priority}>${task.priority}</div>`;

            // Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(status, task));
            actionButtons.appendChild(editButton);

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(status, task.id));
            actionButtons.appendChild(deleteButton);

            li.appendChild(actionButtons);
            ul.appendChild(li);

            // Update counters
            if (task.priority.toLowerCase() === 'high') {
                highPriorityCount++;
            }
            todoCount++;
        });

        container.appendChild(ul);
    }

    // Update the todo and high priority counts
    updateCount(status, todoCount, highPriorityCount);
}

function updateCount(status, todoCount, highPriorityCount) {
    // Update the count in the UI
    const todoCountElement = document.getElementById('listcount');
    const highPriorityCountElement = document.getElementById('highpriotity');

    if (status === 'todo') {
        todoCountElement.textContent = todoCount;
        highPriorityCountElement.textContent = `${highPriorityCount} of ${todoCount}` ;
    } else if (status === 'inprogress') {
        document.getElementById('countInProgress').textContent = todoCount;
        document.getElementById('highPriorityCountInProgress').textContent = `${highPriorityCount} of ${todoCount}`;
    } else if (status === 'done') {
        document.getElementById('comlited').textContent = todoCount;
        document.getElementById('highpriotitycomplited').textContent = `${highPriorityCount} of ${todoCount}`;
    }
}



function deleteTask(status, taskId) {
    // Find the task index in the tasks array
    const taskIndex = tasks[status.toLowerCase()].findIndex(task => task.id === taskId);

    // Remove the task from the array
    tasks[status.toLowerCase()].splice(taskIndex, 1);

    // Update UI
    renderTasks();
}

function editTask(status, task) {
    // Populate the form fields with task details
    document.getElementById('inputbox').value = task.name;
    document.getElementById('dueDate').value = task.date;
    document.getElementById('status').value = task.status;
    document.getElementById('priority').value = task.priority;

    // Change the button from "Add" to "Save" and handle the save functionality
    const addButton = document.querySelector('#task_form button');
    addButton.textContent = 'Save';
    addButton.removeEventListener('click', addTask);
    addButton.addEventListener('click', () => saveTask(status, task.id));
}

function saveTask(status, taskId) {
    // Find the task index in the tasks array
    const taskIndex = tasks[status.toLowerCase()].findIndex(task => task.id === taskId);

    // Update the task details
    tasks[status.toLowerCase()][taskIndex].name = document.getElementById('inputbox').value;
    tasks[status.toLowerCase()][taskIndex].date = document.getElementById('dueDate').value;
    tasks[status.toLowerCase()][taskIndex].status = document.getElementById('status').value;
    tasks[status.toLowerCase()][taskIndex].priority = document.getElementById('priority').value;

    // Change the button back to "Add" and handle the add functionality
    const addButton = document.querySelector('#task_form button');
    addButton.textContent = 'Add ';
    addButton.removeEventListener('click', saveTask);
    addButton.addEventListener('click', addTask);

    // Clear form fields
    document.getElementById('task_form').reset();

    // Update UI
    renderTasks();
}







  function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    // Clear the notification after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
        notification.textContent = '';
    }, 3000);
}

function renderTasksForStatus(status) {
    renderTaskList(status, tasks[status]);
}
  
  // Initial rendering when the page loads
//   renderTasks();
