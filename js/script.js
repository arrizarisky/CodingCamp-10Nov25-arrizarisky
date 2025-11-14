const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const list = document.getElementById("todoList");
const filter = document.getElementById("filter");
const errorMsg = document.getElementById("errorMsg");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let todos = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  const date = dateInput.value;

  if (text === "" || date === "") {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  const newTodo = {
    id: Date.now(),
    text,
    date,
    status: "pending",
  };

  todos.push(newTodo);
  renderList();

  todoInput.value = "";
  dateInput.value = "";
});

function renderList() {
  list.innerHTML = "";

  const filtered = todos.filter((todo) => {
    if (filter.value === "today") {
      return todo.date === new Date().toISOString().split("T")[0];
    }
    if (filter.value === "upcoming") {
      return todo.date > new Date().toISOString().split("T")[0];
    }
    return true;
  });

  filtered.forEach((todo) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="p-3 border border-black font-bold">${todo.text}</td>
      <td class="p-3 border border-black">${todo.date}</td>
      <td class="p-3 border border-black">
        <span class="${
          todo.status === "done" ? "status-done" : "status-pending"
        }">
          ${todo.status === "done" ? "Done" : "Pending"}
        </span>
      </td>
      <td class="flex p-2 border border-black space-x-2">
        <button onclick="toggleStatus(${
          todo.id
        })" class="p-2 bg-blue-500 text-white brutal-border font-bold">
          Selesai
        </button>
        <button onclick="deleteTodo(${todo.id})" class="delete-btn">
          Delete
        </button>
      </td>
    `;

    list.appendChild(tr);
  });
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderList();
}

function toggleStatus(id) {
  todos = todos.map((t) => {
    if (t.id === id) {
      t.status = t.status === "pending" ? "done" : "pending";
    }
    return t;
  });
  renderList();
}

filter.addEventListener("change", renderList);

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderList();
});
