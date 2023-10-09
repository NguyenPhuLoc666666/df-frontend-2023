import React, { type FC, useState } from 'react'
import { type IBook } from '../type/IBook'

interface Props {
  handleAddBook: (book: IBook) => void
  handleCloseDialogCreate: (data: string) => void
}
const DialogCreate: FC<Props> = ({
  handleAddBook,
  handleCloseDialogCreate,
}) => {
  const [book, setBook] = useState<IBook>({
    id: '0',
    bookName: '',
    author: '',
    topic: 'Programming',
  })

  const generateId = (): string => {
    const timestamp: string = Date.now().toString()
    const rand: number = Math.floor(Math.random() * 1000)
    return `${timestamp}-${rand}`
  }

  const handleAddNewBook = (): void => {
    const generatedId: string = generateId()
    setBook({ ...book, id: generatedId })
    if (book.bookName === '' || book.author === '' || book.topic === '') {
      alert('Please enter complete information when add new book!')
      return
    }
    handleAddBook(book)
    handleCloseDialogCreate('dialogCreate')
  }

  return (
    <div
      id="dialog-create"
      className="dark:bg-inherit dark:text-white dark:shadow-white w-[350px] h-auto z-[1001]
       bg-white text-black flex flex-col p-2 justify-start items-start m-auto rounded border-black
       fixed top-20 left-1/2 translate-x-[-50%] shadow-md shadow-slate-900"
    >
      <div>
        <button
          className="dark:text-white m-1 no-underline text-black text-2xl absolute top-2 right-4"
          onClick={() => {
            handleCloseDialogCreate('dialogCreate')
          }}
        >
          <span className="">&times;</span>
        </button>
      </div>
      <p className="text-lg font-bold text-center w-full my-4">Add book</p>
      <form className="form m-auto">
        <div>
          <p className="label">Name</p>
          <input
            type="text"
            className="text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border"
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
            className="text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border"
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
          type="submit"
          className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block mr-6 ml-auto"
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
