const cardBoard = document.querySelectorAll<HTMLElement>(".cards");
const tasks = document.querySelectorAll<HTMLElement>(".task");
const column = document.querySelectorAll<HTMLElement>(".column");

let draggedTask: HTMLElement | null;

function isElement(element: unknown): element is HTMLElement {
  if (element instanceof HTMLElement) return true;
  else return false;
}

function dragStart({ target, dataTransfer, preventDefault }: DragEvent) {
  if (isElement(target) && dataTransfer) {
    draggedTask = target;
    dataTransfer.effectAllowed = "move";
  }
}

function dragOver(e: DragEvent) {
  e.preventDefault();
}

function dragEnter(e: DragEvent) {
  if (isElement(e.target)) {
    const column = e.target.parentElement;
    column?.classList.add("highligth");
  }
}

function dragLeave(e: DragEvent) {
  if (isElement(e.target)) {
    const column = e.target.parentElement;
    if (column) {
      column.classList.remove("highligth");
    }
  }
}

function drop({ target }: DragEvent) {
  if (isElement(target) && draggedTask) {
    target.parentElement?.classList.remove("highligth");
    if (target.dataset.dropzone === "true") {
      target.appendChild(draggedTask);
    }
  }
}

function createCard({ target }: MouseEvent) {
  if (isElement(target)) {
    if (target.dataset.dropzone === "true") {
      const task = document.createElement("section");
      task.classList.add("task");
      task.draggable = true;
      task.contentEditable = "true";

      task.addEventListener("focusout", () => {
        task.contentEditable = "false";
        if (!task.textContent) {
          task.remove();
        }
      });

      target.appendChild(task);
      task.focus();
      task.addEventListener("dragstart", dragStart);
    }
  }
}

if (tasks.length > 0) {
  tasks.forEach((task) => {
    task.addEventListener("dragstart", dragStart);
  });
}

if (cardBoard.length > 0) {
  cardBoard.forEach((board) => {
    board.addEventListener("dragover", dragOver);
    board.addEventListener("dragenter", dragEnter);
    board.addEventListener("dragleave", dragLeave);
    board.addEventListener("drop", drop);
    board.addEventListener("dblclick", createCard);
  });
}
