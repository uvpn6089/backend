const API_URL = window.location.origin + '/api/tasks';
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Fetch tasks from server database
async function getTasks() {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();
        taskList.innerHTML = '';
        tasks.forEach(task => appendTaskDOM(task));
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

// Render individual task structural node
function appendTaskDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.title}</span>
        <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(li);
}

// Add structural item to DB
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        const newTask = await res.json();
        appendTaskDOM(newTask);
        taskInput.value = '';
    } catch (err) {
        console.error('Error adding data:', err);
    }
});

// Terminate record entity
window.deleteTask = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        getTasks();
    } catch (err) {
        console.error('Error dropping entity:', err);
    }
};

// Initial invocation
getTasks();
