import Button from "./Button";

function DialogDelete({ currentBook, handleCloseDialog, handleDeleteBook }) {
  return (
    <>
      <div id="dialog-delete" className="dialog">
        <div>
          <button
            className="btn-action btn-close"
            onClick={() => handleCloseDialog("dialogDelete")}
          >
            <span>&times;</span>
          </button>
        </div>
        <p className="dialog-label">Delete book</p>
        <p className="dialog-message">
          Do you want to delete the <br />
          <strong>{currentBook.bookName} </strong>
          book?
        </p>
        <div className="option">
          <Button
            className="btn btn-secondary"
            id="btn-cancel-deleting-book"
            handle={handleCloseDialog}
            data="dialogDelete"
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            id="btn-delete-book"
            handle={handleDeleteBook}
            data={currentBook}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
export default DialogDelete;
