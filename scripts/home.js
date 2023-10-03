const baseUrl = "https://todos-service.onrender.com";
const user = JSON.parse(localStorage.getItem("user"));
const todoListElement = document.querySelector(".todos__container");
const todonum = document.querySelector(".menu__clear__items-left");
const todoCategoryText = document.querySelector(".todos__title span");

let todoCategorycompleted =
  sessionStorage.getItem("todoCategorycompleted") || "all";

window.onload = renderTodoList;

async function renderTodoList() {
  let todoList = await fetch(baseUrl + "/todos", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + user.token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (todoCategorycompleted === "active")
    todoList = todoList.filter((todo) => todo.completed === false);
  else if (todoCategorycompleted === "completed")
    todoList = todoList.filter((todo) => todo.completed === true);

  let todoListHTML = "";
  todoCategoryText.innerHTML = `<span>${todoCategorycompleted}</span>`;
  let todosCount = 0;
  todoList.forEach(({ _id, completed, createdAt, title }) => {
    todosCount++;
    todoListHTML += `
    <div class="todos__item">
      <div class="todos__item-clock">
        <i>🕰️</i>
        <span>${new Date(createdAt).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}</span>
      </div>
      <div class="todos__item__content">
        <div
        name="completed"
        class="todos__item-status ${completed ? "completed" : "active"}"
        onclick="changeTodocompleted('${_id}', ${completed})"
        >
          <i class="fa-solid fa-check"></i>
        </div>
        <p class="todos__item-text" id="todo-text${_id}">${title}</p>
        <div class="todos__item-btns">
          <button class="todos__item-btn__edit" onclick="ModifyElement('${title}','${_id}')">🖊️</button>
          <button class="todos__item-btn__del" onclick="deleteElement('${_id}')">X</button>
        </div>
      </div>
    </div>
    `;
  });
  todonum.innerHTML = `Items left: ${todosCount}`;
  todoListElement.innerHTML = todoListHTML;
}

const todoForm = document.querySelector(".todo__form");
const todoInput = document.querySelector(".todo__form-input");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { value } = todoInput;
  if (!value) return alert("Please enter a todo");
  const todo = fetch(baseUrl + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: JSON.stringify({
      title: value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  todoInput.value = "";
  renderTodoList();
});

async function deleteElement(_id) {
  let check = confirm("Are you sure you want to delete this todo?");
  if (!check) return;
  const delete1 = await fetch(baseUrl + "/todos/" + _id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  }).then((response) => response.json());
  console.log(delete1);
  renderTodoList();
}

async function ModifyElement(title, _id) {
  const todoText = prompt("Enter new todo", title);
  if (!todoText) return alert("Please enter a todo");
  let check = await fetch(baseUrl + "/todos/" + _id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: JSON.stringify({
      title: todoText,
    }),
  }).then((response) => response.json());
  console.log(check);
  renderTodoList();
}

async function changeTodocompleted(_id, completed) {
  let check = await fetch(baseUrl + "/todos/" + _id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    body: JSON.stringify({
      completed: !completed,
    }),
  }).then((response) => response.json());
  console.log(check);
  renderTodoList();
}

const clearAll = document.querySelector(".menu__clear-btn");
clearAll.addEventListener("click", async (e) => {
  e.preventDefault();
  let clear = await fetch(baseUrl + "/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  }).then((response) => response.json());
  console.log(clear);
  renderTodoList();
});

function changeCategory(completed) {
  todoCategorycompleted = completed;
  sessionStorage.setItem("todoCategorycompleted", todoCategorycompleted);
  renderTodoList();
}
