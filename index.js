let taskInput = document.getElementById("taskName");
let timeInput = document.getElementById("minuteSpent");
let form = document.getElementById("taskForm");
let taskContainer = document.getElementById("taskCont");
let totalFocusTime = document.getElementById("focusTime");
let clearAll = document.getElementById("clearAll")

// SINGLE SOURCE OF TRUTH: Sirf ek array rahega
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



// Saare Tasks ko remove krega!
const clearAllTasks = () => {

    const userChoice = confirm("Saare tasks delete karne hain?");
    if(userChoice){
        tasks = []
    
        localStorage.setItem("tasks", JSON.stringify(tasks))
    
        taskInput.value = "";
        timeInput.value = "";
        renderTasks()
    }

    return;
}

// Render Engine: Yahi UI draw karega aur Total Time calculate karega
const renderTasks = () => {
    taskContainer.innerHTML = "";

    // 1. Calculate Total Time directly from 'tasks' array
    // Number() string ko integer banata hai, 0 initial value crash avoid karti hai
    const totalMinutes = tasks.reduce((acc, curr) => acc + Number(curr.time), 0);
    totalFocusTime.innerHTML = `<p><strong>Total Focus Time: </strong><span>${totalMinutes} mins</span></p>`;

    // 2. Render List
    tasks.forEach((item) => {
        let li = document.createElement("li");
        li.className = "listCont";
        li.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>${item.time} mins</p>
            <p>Loged at ${item.createdAt}</p>

            <button onclick="deleteTask(${item.id})" class="deleteBtns">Delete</button>
        `;
        taskContainer.appendChild(li);
    });
};

// Add Task
const addTask = () => {
    const taskName = taskInput.value.trim();
    const taskTime = timeInput.value.trim();

    if (!taskName || !taskTime) {
        alert("Dono fields fill karna zaroori hai!");
        return;
    }

    tasks.push({
        id: Date.now(),
        name: taskName,
        time: taskTime,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();

    taskInput.value = "";
    timeInput.value = "";
};

// Delete Task (Total time delete par apne aap update ho jayega)
window.deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
};

// Form submit automatically Enter key aur Click dono ko handle karta hai
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
});

// Initial Render
renderTasks();

clearAll.addEventListener("click", clearAllTasks)