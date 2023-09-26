import Book from "./Book";
import Button from "./Button";
import BookTable from "./BookTable";
import DialogCreate from "./DialogCreate";
import DialogInfo from "./DialogInfo";
import DialogDelete from "./DialogDelete";
import { MockTestData } from "./MockTestData";
import { useState, useEffect } from "react";

function Body() {
  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const [books, setBooks] = useState([]);
  const [searchingValue, setSearchingValue] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bookstore"));
    let data;
    if (storedData !== null) {
      data = storedData;
    } else {
      data = MockTestData;
    }
    storeData(data);
  }, []);

  const storeData = (data) => {
    setBooks(data);
    localStorage.setItem("bookstore", JSON.stringify(data));
  };

  const handleOpenDialogCreate = () => {
    setDialogCreate(true);
    setDialogInfo(false);
    setDialogDelete(false);
  };

  const handleCloseDialogCreate = () => {
    setDialogCreate(false);
  };

  const handleOpenDialog = (dialog, book) => {
    setCurrentBook(book);
    switch (dialog) {
      case "dialogInfo":
        setDialogInfo(true);
        setDialogCreate(false);
        setDialogDelete(false);
        break;
      case "dialogDelete":
        setDialogDelete(true);
        setDialogCreate(false);
        setDialogInfo(false);
        break;
      default:
        break;
    }
  };

  const handleCloseDialog = (dialog) => {
    switch (dialog) {
      case "dialogInfo":
        setDialogInfo(false);
        break;
      case "dialogDelete":
        setDialogDelete(false);
        break;
      default:
        break;
    }
  };

  const handleEditBook = (editingBook) => {
    let index = books.findIndex(
      (book) => book.id === editingBook.currentBookId
    );
    if (index !== -1) {
      let book = books[index];
      book.bookName = editingBook.updatedBookName;
      book.author = editingBook.updatedAuthor;
      book.topic = editingBook.updatedTopic;
      storeData(books);
      renderBooks(books);
      handleCloseDialog("dialogInfo");
      setTimeout(() => alert("Edit book successful!"), 250);
    }
  };

  const handleDeleteBook = (deletingBook) => {
    let index = books.findIndex((book) => book.id === deletingBook.id);
    if (index !== -1) {
      books.splice(index, 1);
      storeData(books);
      renderBooks(books);
      handleCloseDialog("dialogDelete");
      setTimeout(() => alert("Delete book successful!"), 250);
    }
  };

  const renderBooks = (books) => {
    return books.map((book, index) => (
      <Book
        key={index}
        book={book}
        index={index}
        handleOpenDialog={handleOpenDialog}
      />
    ));
  };
  const handleAddBook = ({ generatedId, bookName, author, topic }) => {
    let book = {
      id: generatedId,
      bookName: bookName,
      author: author,
      topic: topic,
    };
    books.unshift(book);
    storeData(books);
    renderBooks(books);
    handleCloseDialog("dialogCreate");
    setTimeout(() => alert("Add book successful!"), 250);
  };

  return (
    <article className="content">
      <section>
        <div className="action-bar">
          <input
            type="text"
            className="search-bar"
            id="search-bar"
            placeholder="Seach books"
            value={searchingValue}
            onChange={(e) => setSearchingValue(e.target.value.toLowerCase())}
          />
          <Button
            handle={handleOpenDialogCreate}
            data="dialogCreate"
            className="btn btn-primary"
            id="btn-add"
          >
            Add book
          </Button>
        </div>
        <BookTable
          books={books}
          searchingValue={searchingValue}
          renderBooks={renderBooks}
        />
      </section>
      {dialogCreate && (
        <DialogCreate
          handleCloseDialogCreate={handleCloseDialogCreate}
          handleAddBook={handleAddBook}
        />
      )}
      {dialogInfo && (
        <DialogInfo
          currentBook={currentBook}
          handleEditBook={handleEditBook}
          handleCloseDialog={handleCloseDialog}
        />
      )}
      {dialogDelete && (
        <DialogDelete
          currentBook={currentBook}
          handleCloseDialog={handleCloseDialog}
          handleDeleteBook={handleDeleteBook}
        />
      )}
    </article>
  );
}
export default Body;
