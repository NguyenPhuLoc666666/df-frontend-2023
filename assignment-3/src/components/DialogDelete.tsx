import { FC } from 'react'
import { IBook } from '../type/IBook'

interface Props {
  currentBook: IBook
  darkMode: boolean
  handleCloseDialog: (dialog: string) => void
  handleDeleteBook: (currentBook: IBook) => void
}
const DialogDelete: FC<Props> = ({
  currentBook,
  darkMode,
  handleCloseDialog,
  handleDeleteBook,
}) => {
  return (
    <div
      id="dialog-delete"
      className={`dialog ${darkMode === true ? 'dark-mode' : ''}`}
    >
      <div>
        <button
          className="btn-action btn-close"
          onClick={() => handleCloseDialog('dialogDelete')}
        >
          <span className={`${darkMode === true ? 'text-white' : ''}`}>
            &times;
          </span>
        </button>
      </div>
      <p className="dialog-label">Delete book</p>
      <p className="dialog-message">
        Do you want to delete the <br />
        <strong>{currentBook.bookName} </strong>
        book?
      </p>
      <div className="option">
        <button
          className="btn btn-secondary"
          id="btn-cancel-deleting-book"
          onClick={() => handleCloseDialog('dialogDelete')}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          id="btn-delete-book"
          onClick={() => handleDeleteBook(currentBook)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
export default DialogDelete
