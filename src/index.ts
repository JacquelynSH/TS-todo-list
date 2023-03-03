import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string
  title: string
  completed:boolean
  createdAt: Date
}

// use <HTMLUlistelement> to speificy the element type
const list = document.querySelector<HTMLUListElement>("#list");
// If you want to get the element by ID you cannot use tthe above syntax - you must use the below
// it tells you it will receive a form element 
const form = document.getElementById("task-form") as HTMLFormElement;
const clear = document.getElementById("clear-task") as HTMLButtonElement;
const input = document.querySelector<HTMLInputElement>("#task-input");
const tasks: Task[] = loadTasks();
tasks.forEach(addNewTask);

// event listener for form - take in the event object and prevent refresh.
form?.addEventListener("submit", e => {
  e.preventDefault();
// optional chaining (add the ? after the input) - if this exists give the value , if it doesn't return undefined
// below line ensures that our input exists because it cannot be null.
  if (input?.value == '' || input?.value == null) return;

  // create a task object that stores the id, title, complete boolean, and when created.
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }

  tasks.push(newTask);

  // call function
  addNewTask(newTask);
  // clear the input value after submitted
  input.value = '';
})


// create function to create a new task and turn it into a checkbox item
function addNewTask(task: Task) {
  // create an element, and append 
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  // toggle completed boolean value when item is clicked
  saveTask();
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTask();
  })
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}



// save task to local storage 
function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) {
    return [];
  }
  return JSON.parse(taskJSON);
}



clear.addEventListener("click", () => {
  const taskJSON = localStorage.getItem("TASKS");
  
    if (taskJSON == null) {
      return [];
    }
    const parseTask = JSON.parse(taskJSON);
    console.log("PARSED", parseTask);
parseTask.forEach((task: Task) => {
  if (task.completed === true){
console.log(task.id)
  localStorage.removeItem();
  }
  // localStorage.removeItem(parseTask.completed);
  // location.reload();
})
})



