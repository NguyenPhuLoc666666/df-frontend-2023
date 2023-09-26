import { useState, useEffect } from "react";
import Button from "./Button";

function DialogInfo({ currentBook, ...handle }) {
  const [book, setBook] = useState({
    id: 0,
    bookName: "",
    author: "",
    topic: "Programming",
  });

  useEffect(() => {
    if (currentBook) {
      setBook(currentBook);
    }
  }, [currentBook]);

  const handleEditBookInDialog = () => {
    let currentBookId = book.id;
    let updatedBookName = document.getElementById("edit-name").value;
    let updatedAuthor = document.getElementById("edit-author").value;
    let updatedTopic = document.getElementById("edit-topic-select").value;
    if (updatedBookName === "" || updatedAuthor === "" || updatedTopic === "") {
      alert("Please enter complete information!");
      return;
    }
    handle.handleEditBook({
      currentBookId,
      updatedBookName,
      updatedAuthor,
      updatedTopic,
    });
  };

  return (
    <>
      <div id="dialog-edit" className="dialog">
        <div>
          <button
            className="btn-action btn-close"
            onClick={() => handle.handleCloseDialog("dialogInfo")}
          >
            <span>&times;</span>
          </button>
        </div>
        <p className="dialog-label">Edit book</p>
        <form className="form">
          <div>
            <p className="label">Name</p>
            <input
              type="text"
              className="input"
              id="edit-name"
              name="name"
              value={book.bookName}
              onChange={(e) => setBook({ ...book, bookName: e.target.value })}
            />
          </div>
          <div>
            <p className="label">Author</p>
            <input
              type="text"
              className="input"
              id="edit-author"
              name="author"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
          </div>
          <div>
            <p className="label">Topic</p>
            <select
              name="topic"
              id="edit-topic-select"
              className="input"
              value={book.topic}
              onChange={(e) => setBook({ ...book, topic: e.target.value })}
            >
              <option value="Programming">Programming</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Database">Software Development</option>
              <option value="Database">Computer Science</option>
            </select>
          </div>
        </form>
        <div className="option">
          <Button
            type="submit"
            className="btn btn-primary btn-right"
            id="btn-edit"
            handle={handleEditBookInDialog}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}

export default DialogInfo;
