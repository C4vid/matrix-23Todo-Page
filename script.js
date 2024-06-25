const inputElem = document.querySelector("#input-name");
const form = document.querySelector("#form");
const listElem = document.querySelector("#to-do-list");
const itemCountElement = document.getElementById("item-count");
const toDoArray = JSON.parse(localStorage.getItem("to-do-list")) || [];

function updateTodoList() {
  listElem.innerHTML = "";
  toDoArray.forEach((item, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = `${index + 1}. ${item}`;
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.classList.add("delete");
    li.appendChild(span);
    li.appendChild(button);
    listElem.appendChild(li);
  });
  localStorage.setItem("to-do-list", JSON.stringify(toDoArray));
  updateItemCount();
}

function addToList(value) {
  if (value === "") {
    return
};
  toDoArray.push(value);
  updateTodoList();
  inputElem.value = "";
  inputElem.focus();
}

function deleteItem(key) {
  toDoArray.splice(Number(key), 1);
  updateTodoList();
  inputElem.value = "";
  inputElem.focus();
}

function updateItemCount() {
    itemCountElement.textContent = `You have ${toDoArray.length} items in your to-do list.`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToList(inputElem.value);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.preventDefault();
    deleteItem(e.target.getAttribute("key"));
  }
});

updateTodoList();
updateItemCount();