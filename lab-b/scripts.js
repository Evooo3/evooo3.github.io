console.info("działam jak cos");
class todoo {
  tasks = [];
  term = "";

  filteredTasks() {
    if (this.term.length < 2) {
      return this.tasks;
    }

    return this.tasks.filter(task =>
      task.name.toLowerCase().includes(this.term.toLowerCase()));
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  load() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
    this.draw()
  }
  draw() {
    let container = document.getElementsByClassName("rows")
    container[0].innerHTML = "";

    let tasksToDraw = this.filteredTasks();

    for (let i = 0; i < tasksToDraw.length; i++) {
      let task = tasksToDraw[i];

      let ogIndex = this.tasks.indexOf(task);

      let todoRow = document.createElement("div");
      todoRow.classList.add("todo-row");
      container[0].appendChild(todoRow);

      let chbox = document.createElement("input");
      chbox.setAttribute("type", "checkbox");
      chbox.classList.add("chbox");
      todoRow.appendChild(chbox);

      let taskName = document.createElement("span");
      taskName.classList.add("task-name");
      if (this.term.length >= 2) {
        let regex = new RegExp(`(${this.term})`, 'gi');
        taskName.innerHTML = task.name.replace(regex, '<mark>$1</mark>');
      } else {
        taskName.innerText = task.name;
      }

      taskName.onclick = () => {
        let editName = document.createElement("input");
        editName.setAttribute("type", "text");
        editName.value = task.name;
        todoRow.replaceChild(editName, taskName);
        editName.focus();
        editName.onblur = () => {
          if (editName.value.length >= 3) {
            this.tasks[ogIndex].name = editName.value;
          }
          this.save();
          this.draw();
        }
      }
      todoRow.appendChild(taskName);

      let taskDate = document.createElement("span");
      taskDate.classList.add("task-date");
      taskDate.innerText = task.date;
      taskDate.onclick = () => {
        let editDate = document.createElement("input");
        editDate.setAttribute("type", "date");
        editDate.value = task.date;
        todoRow.replaceChild(editDate, taskDate);
        editDate.focus();
        editDate.onblur = () => {
          this.tasks[ogIndex].date = editDate.value;
          this.save();
          this.draw();
        }
      }
      todoRow.appendChild(taskDate);

      let dele = document.createElement("button");
      dele.classList.add("dele");
      dele.innerText = "papa";
      dele.onclick = () => {
        this.remove(ogIndex);
      };
      todoRow.appendChild(dele);
    }
  }

  add(name, date) {
    if (name.length < 3 || name.length > 255) {
      alert("Zadanie musi mieć od 3 do 255 znaków.");
      return false;
    }

    if (date !== "") {
      let dzisiaj = new Date().toISOString().split('T')[0];
      if (date < dzisiaj) {
        alert("Data musi być dzisiejsza lub przyszła.");
        return false;
      }
    }

    this.tasks.push({
      name: name,
      date: date
    });

    this.save();
    this.draw();

    return true;
  }

  remove(index) {
    this.tasks.splice(index, 1);
    this.save();
    this.draw();
  }

}

document.todo = new todoo();

document.addEventListener("DOMContentLoaded", () => {

  document.todo.load();

  const addButton = document.getElementsByClassName("new-task-add");
  const nameInput = document.getElementsByClassName("new-task-name");
  const dateInput = document.getElementsByClassName("new-task-date");

  addButton[0].addEventListener("click", () => {
    const name = nameInput[0].value;
    const date = dateInput[0].value;
    if (document.todo.add(name, date)) {
      nameInput[0].value = "";
      dateInput[0].value = "";
    }
  });

  const searchInput = document.getElementsByClassName("search");
  searchInput[0].addEventListener("input", (event) => {
    document.todo.term = event.target.value;
    document.todo.draw();
  })
})
