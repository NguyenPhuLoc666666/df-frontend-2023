// Your JS code goes here
let btnCreate = document.getElementById("btn-create");
let books = [];
let currentBook = "";

document.addEventListener("DOMContentLoaded", function () {
  initData();
});

function initData() {
  let data = [
    {
      id: "1",
      bookName: "Refactoring",
      author: "Martin Fowler",
      topic: "Programming",
    },
    {
      id: "2",
      bookName: "Designing Data-intensive Applications",
      author: "Martin Kleppmann",
      topic: "Database",
    },
    {
      id: "3",
      bookName: "The Phoenix Project",
      author: "Gene Kim",
      topic: "DevOps",
    },
  ];
  setData(data);
  books = getData();
  showBookstore(books);
}

let bookName = "";
let author = "";
let topic = "";
btnCreate.addEventListener("click", createBook);
function createBook(event) {
  event.preventDefault();
  let generatedId = generateId();
  bookName = document.getElementById("input-name");
  author = document.getElementById("input-author");
  topic = document.getElementById("topic-select");
  if (bookName.value == "" || author.value == "" || topic.value == "") {
    alert("Please enter complete information!");
    return;
  }
  let book = {
    id: generatedId,
    bookName: bookName.value,
    author: author.value,
    topic: topic.value,
  };
  books = getData();
  books.push(book);
  setData(books);
  showBookstore(books);
  bookName.value = "";
  author.value = "";
  dialogAdd.style.display = "none";
}

function generateId() {
  let timestamp = Date.now();
  let rand = Math.floor(Math.random() * 1000);
  return "" + timestamp + "-" + rand + "";
}

function deleteBook(id) {
  let index = books.findIndex(id);
  books.splice(index, 1);
  setData(books);
  showBookstore();
}

function setData(data) {
  localStorage.setItem("bookstore", JSON.stringify(data));
}

function getData() {
  let data = JSON.parse(localStorage.getItem("bookstore"));
  if (data != null) return data;
  return [];
}

let tableContent = document.getElementById("table-body");
function createRow({ id, bookName, author, topic }, index) {
  let newRow = tableContent.insertRow(index);
  newRow.classList.add("table-data");
  let cellNumber = newRow.insertCell(0);
  let cellName = newRow.insertCell(1);
  let cellAuthor = newRow.insertCell(2);
  let cellTopic = newRow.insertCell(3);
  let cellAction = newRow.insertCell(4);
  cellNumber.innerHTML = index + 1;
  cellName.innerHTML = bookName;
  cellAuthor.innerHTML = author;
  cellTopic.innerHTML = topic;
  cellAction.innerHTML =
    `<div class="action"><button href="#" class="btn-action btn-edit" data-id="` +
    id +
    `">edit</button><button href="#" class="btn-action btn-delete" data-id="` +
    id +
    `">delete</button></div>`;
  cellNumber.classList.add("table-data__item");
  cellNumber.classList.add("text-center");
  cellName.classList.add("table-data__item");
  cellAuthor.classList.add("table-data__item");
  cellTopic.classList.add("table-data__item");
  cellAction.classList.add("table-data__item");
  cellNumber.classList.add("table-data__item");
  cellNumber.setAttribute("data-title", "No");
  cellName.setAttribute("data-title", "Name");
  cellAuthor.setAttribute("data-title", "Author");
  cellTopic.setAttribute("data-title", "Topic");
  cellAction.setAttribute("data-title", "Action");
}

let totalBook = document.getElementById("total-books");

function showBookstore(data) {
  tableContent.innerHTML = "";
  data.forEach(function (book, index) {
    createRow(book, index);
  });
  totalBook.innerHTML = data.length;
}

let searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", searchBook);
function searchBook(event) {
  books = getData();
  let arrOfBooks = [];
  books.forEach(function (item) {
    if (item.bookName.toLowerCase().includes(event.target.value))
      arrOfBooks.push(item);
  });
  showBookstore(arrOfBooks);
}

let dialogAdd = document.getElementById("dialog-add");
let btnAdd = document.getElementById("btn-add");
btnAdd.addEventListener("click", openDialogAdd);
function openDialogAdd() {
  dialogAdd.style.display = "flex";
}

function handleBtnCloseDialog(e) {
  if (e && e.parentElement) {
    e.parentElement.parentElement.style.display = "none";
  }
}
let btnCloses = document.querySelectorAll(".close");
btnCloses.forEach(function (btnClose) {
  btnClose.addEventListener("click", function () {
    handleBtnCloseDialog(btnClose);
  });
});

let dialogEdit = document.getElementById("dialog-edit");
let dialogDelete = document.getElementById("dialog-delete");

document.addEventListener("click", function (event) {
  let id = event.target.getAttribute("data-id");
  if (event.target.matches(".btn-edit")) {
    openDialogEdit(id);
  } else if (event.target.matches(".btn-delete")) {
    openDialogDelete(id);
  }
});

function openDialogEdit(bookId) {
  dialogEdit.style.display = "flex";
  currentBook = bookId;
  let index = books.findIndex((book) => book.id == currentBook);
  let book = books[index];
  document.getElementById("edit-name").value = book.bookName;
  document.getElementById("edit-author").value = book.author;
  document.getElementById("edit-topic-select").value = book.topic;
}
let bookNameStrong = document.getElementById("book-name__strong");
function openDialogDelete(bookId) {
  currentBook = bookId;
  let index = books.findIndex((book) => book.id == currentBook);
  bookNameStrong.innerHTML = books[index].bookName;
  dialogDelete.style.display = "flex";
}

let btnEdit = document.getElementById("btn-edit");
btnEdit.addEventListener("click", editBook);
function editBook(event) {
  event.preventDefault();
  let index = books.findIndex((book) => book.id == currentBook);
  if (index != -1) {
    let book = books[index];
    book.bookName = document.getElementById("edit-name").value;
    book.author = document.getElementById("edit-author").value;
    book.topic = document.getElementById("edit-topic-select").value;
    setData(books);
    showBookstore(books);
  }
  document.getElementById("edit-name").value = "";
  document.getElementById("edit-author").value = "";
  dialogEdit.style.display = "none";
}

let btnDelete = document.getElementById("btn-delete");
let btnCancel = document.getElementById("btn-cancel");
btnCancel.addEventListener("click", function () {
  handleBtnCloseDialog(this);
});
btnDelete.addEventListener("click", deleteBook);
function deleteBook() {
  let index = books.findIndex((book) => book.id == currentBook);
  if (index != -1) {
    books.splice(index, 1);
    setData(books);
    showBookstore(books);
  }
  dialogDelete.style.display = "none";
}
