import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string
  title: string
  completed:boolean
  createdAt: Date
}

type Title = {
  id: string
  title: string
}

/*
    if no list - display #create-new-list-btn
      on button click display #list-title-input and #create-list-name-btn
    user types in name and on button 
    submit the below pops up and you can creat a list with the title at the top

*/


// use <HTMLUlistelement> to speificy the element type
const list = document.querySelector<HTMLUListElement>("#list");
// If you want to get the element by ID you cannot use tthe above syntax - you must use the below
// it tells you it will receive a form element 
const form = document.getElementById("task-form") as HTMLFormElement;
const clear = document.getElementById("clear-task") as HTMLButtonElement;
const remove = document.getElementById("remove-item") as HTMLButtonElement;
const input = document.querySelector<HTMLInputElement>("#task-input");
const titleForm = document.getElementById('title-form') as HTMLFormElement;
const title = document.querySelector<HTMLInputElement>("#list-title-input");


/////////////////// CREATE TITLE ////////////////////

const newTitle: Title[] = loadTitle();
newTitle.forEach(addListTitle)


titleForm?.addEventListener("submit", e => {
  e.preventDefault();
  if (title?.value == '' || title?.value == null) return;
  
  const listTitle: Title = {
    id: uuidV4(),
    title: title.value
  }

  newTitle.push(listTitle)

  addListTitle(listTitle);
  
})

function addListTitle(title: Title) {
  const listTitle = document.createElement("h3");
  saveListTitle();
  listTitle.append(title.title)
  console.log(newTitle)
}

function saveListTitle() {
  localStorage.setItem("TITLE", JSON.stringify(newTitle))
}

function loadTitle() {
  const titleJSON = localStorage.getItem("TITLE");
  if (titleJSON == null) {
    return [];
  }
  return JSON.parse(titleJSON);

}

////////////////////// CREATE TASK ////////////////////

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
  checkbox.className = "checkbox";
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
  localStorage.clear();
  location.reload();
});

remove.addEventListener("click", () => {
  const completedTask = tasks.filter(task => task.completed == false);
  localStorage.setItem("TASKS", JSON.stringify(completedTask));
  loadTasks();
  location.reload();
});


