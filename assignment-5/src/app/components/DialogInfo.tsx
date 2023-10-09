import React, { type FC, useState, useEffect } from 'react'
import { type IBook } from '../type/IBook'

interface Props {
  currentBook: IBook
  handleEditBook: (book: IBook) => void
  handleOpenDialog: (data: string) => void
}
const DialogInfo: FC<Props> = ({
  currentBook,
  handleEditBook,
  handleOpenDialog,
}) => {
  const [book, setBook] = useState<IBook>(currentBook)

  useEffect(() => {
    setBook(currentBook)
  }, [currentBook])

  const handleEditBookInDialog = (): void => {
    if (book.bookName === '' || book.author === '' || book.topic === '') {
      alert('Please enter complete information when edit current book!')
      return
    }

    handleEditBook(book)
  }
  return (
    <div
      id="dialog-edit"
      className="dark:bg-inherit dark:text-white dark:shadow-white w-[350px] h-auto z-[1001]
       bg-white text-black flex flex-col p-2 justify-start items-start m-auto rounded border-black
        fixed top-20 left-1/2 translate-x-[-50%] shadow-md shadow-slate-900"
    >
      <div>
        <button
          className="dark:text-white m-1 no-underline text-black text-2xl absolute top-2 right-4"
          onClick={() => {
            handleOpenDialog('dialogInfo')
          }}
        >
          <span>&times;</span>
        </button>
      </div>
      <p className="text-lg font-bold text-center w-full my-4">Edit book</p>
      <form className="form m-auto">
        <div>
          <p className="label">Name</p>
          <input
            type="text"
            className="text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border"
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
            className="text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border"
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
            className="dark:bg-white text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border"
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
      <div className="flex justify-around mt-5 w-full">
        <button
          onClick={handleEditBookInDialog}
          type="submit"
          id="btn-edit"
          className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block mr-6 ml-auto"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default DialogInfo
