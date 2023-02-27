import { v4 as uuidV4 } from 'uuid';

console.log(uuidV4());

// use <HTMLUlistelement> to speificy the element type
const list = document.querySelector<HTMLUListElement>("#list");
// If you want to get the element by ID you cannot use tthe above syntax - you must use the below
// it tells you it will receive a form element 
const form = document.getElementById("#task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#task-input");

// event listener for form - take in the event object and prevent refresh.
form?.addEventListener("submit", e => {
  e.preventDefault();
// optional chaining (add the ? after the input) - if this exists give the value , if it doesn't return undefined
// below line ensures that our input exists because it cannot be null.
  if (input?.value == '' || input?.value == null) return;

  // create a task object that stores the id, title, complete boolean, and when created.
  const task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }

  input.value
})