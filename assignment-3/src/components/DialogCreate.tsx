import React, { type FC, useState, useEffect } from 'react'
import { type IBook } from '../type/IBook'

interface Props {
  darkMode: boolean
  handleAddBook: (book: IBook) => void
  handleCloseDialogCreate: (data: string) => void
}
const DialogCreate: FC<Props> = ({
  darkMode,
  handleAddBook,
  handleCloseDialogCreate,
}) => {
  const [book, setBook] = useState<IBook>({
    id: '0',
    bookName: '',
    author: '',
    topic: 'Programming',
  })

  useEffect(() => {
    const generatedId: string = generateId()
    setBook({ ...book, id: generatedId })
  }, [])

  const generateId = (): string => {
    const timestamp: string = Date.now().toString()
    const rand: number = Math.floor(Math.random() * 1000)
    return `${timestamp}-${rand}`
  }

  const handleAddNewBook = (): void => {
    alert('book.id: ' + book.id)
    if (book.bookName === '' || book.author === '' || book.topic === '') {
      alert('Please enter complete information when add new book!')
      return
    }
    handleAddBook(book)
    handleCloseDialogCreate('dialogCreate')
  }

  return (
    <div id="dialog-add" className={`dialog ${darkMode ? 'dark-mode' : ''}`}>
      <div>
        <button
          className="btn-action btn-close"
          onClick={() => {
            handleCloseDialogCreate('dialogCreate')
          }}
        >
          <span className={`${darkMode ? 'text-white' : ''}`}>&times;</span>
        </button>
      </div>
      <p className="dialog-label">Add book</p>
      <form className="form">
        <div>
          <p className="label">Name</p>
          <input
            type="text"
            className="input"
            id="input-name"
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
            id="input-author"
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
            id="topic-select"
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
          type="submit"
          className="btn btn-primary btn-right"
          id="btn-create"
          onClick={handleAddNewBook}
        >
          Create
        </button>
      </div>
    </div>
  )
}
export default DialogCreate
