// import { v4 as uuidV4 } from 'uuid';

// console.log(uuidV4());

// use <HTMLUlistelement> to speificy the element type
const list = document.querySelector<HTMLUListElement>("#list");
// If you want to get the element by ID you cannot use tthe above syntax - you must use the below
// it tells you it will receive a form element 
const form = document.getElementById("#task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#task-input");

