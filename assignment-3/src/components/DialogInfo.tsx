import React, { type FC, useState } from 'react'
import { type IBook } from '../type/IBook'

interface Props {
  darkMode: boolean
  currentBook: IBook
  handleEditBook: (book: IBook) => void
  handleCloseDialog: (data: string) => void
}
const DialogInfo: FC<Props> = ({
  darkMode,
  currentBook,
  handleEditBook,
  handleCloseDialog,
}) => {
  const [book, setBook] = useState<IBook>(currentBook)

  const handleEditBookInDialog = (): void => {
    if (book.bookName === '' || book.author === '' || book.topic === '') {
      alert('Please enter complete information when edit current book!')
      return
    }

    handleEditBook(book)
  }
  return (
    <div id="dialog-edit" className={`dialog ${darkMode ? 'dark-mode' : ''}`}>
      <div>
        <button
          className="btn-action btn-close"
          onClick={() => {
            handleCloseDialog('dialogInfo')
          }}
        >
          <span className={`${darkMode ? 'text-white' : ''}`}>&times;</span>
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
            placeholder="book name..."
            value={book.bookName}
            onChange={(e) => {
              setBook({ ...book, bookName: e.target.value })
            }}
          />
        </div>
        <div>
          <p className="label">Author</p>
          <input
            type="text"
            className="input"
            id="edit-author"
            name="author"
            placeholder="author..."
            value={book.author}
            onChange={(e) => {
              setBook({ ...book, author: e.target.value })
            }}
          />
        </div>
        <div>
          <p className="label">Topic</p>
          <select
            name="topic"
            id="edit-topic-select"
            className="input"
            value={book.topic}
            onChange={(e) => {
              setBook({ ...book, topic: e.target.value })
            }}
          >
            <option value="Programming">Programming</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Software Development">Software Development</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>
      </form>
      <div className="option">
        <button
          onClick={handleEditBookInDialog}
          type="submit"
          id="btn-edit"
          className="btn btn-primary btn-right"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default DialogInfo
