import Button from "./Button";

function DialogCreate({ ...handle }) {
  function generateId() {
    let timestamp = Date.now();
    let rand = Math.floor(Math.random() * 1000);
    return "" + timestamp + "-" + rand + "";
  }

  function handleAddNewBook() {
    let bookName = document.getElementById("input-name").value;
    let author = document.getElementById("input-author").value;
    let topic = document.getElementById("topic-select").value;
    if (bookName === "" || author === "" || topic === "") {
      alert("Please enter complete information!");
      return;
    }
    let generatedId = generateId();
    handle.handleAddBook({ generatedId, bookName, author, topic });
    handle.handleCloseDialogCreate("dialogCreate");
  }

  return (
    <>
      <div id="dialog-add" className="dialog">
        <div>
          <button
            className="btn-action btn-close"
            onClick={() => handle.handleCloseDialogCreate("dialogCreate")}
          >
            <span>&times;</span>
          </button>
        </div>
        <p className="dialog-label">Add book</p>
        <form className="form">
          <div>
            <p className="label">Name</p>
            <input type="text" className="input" id="input-name" name="name" />
          </div>
          <div>
            <p className="label">Author</p>
            <input
              type="text"
              className="input"
              id="input-author"
              name="author"
            />
          </div>
          <div>
            <p className="label">Topic</p>
            <select name="topic" id="topic-select" className="input">
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
            id="btn-create"
            handle={handleAddNewBook}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
export default DialogCreate;
