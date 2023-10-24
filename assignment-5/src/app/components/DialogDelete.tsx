import React, { type FC } from 'react'
import { type IBook } from '../type/IBook'
import { type TDialog } from '../type/TDialog'

interface Props {
  currentBook: IBook
  handleOpenDialog: (dialog: TDialog) => void
  handleDeleteBook: (currentBook: IBook) => void
}
const DialogDelete: FC<Props> = ({
  currentBook,
  handleOpenDialog,
  handleDeleteBook,
}) => {
  return (
    <div
      id="dialog-delete"
      className="dark:bg-inherit dark:text-white dark:shadow-white w-[350px] h-auto z-[1001]
       bg-white text-black flex flex-col p-2 justify-start items-start m-auto rounded border-black
        fixed top-20 left-1/2 translate-x-[-50%] shadow-md shadow-slate-900"
    >
      <div>
        <button
          className="dark:text-white m-1 no-underline text-black text-2xl absolute top-2 right-4"
          onClick={() => {
            handleOpenDialog('dialogDelete')
          }}
        >
          <span>&times;</span>
        </button>
      </div>
      <p className="text-lg font-bold text-center w-full my-4">Delete book</p>
      <p className="text-center w-full">
        Do you want to delete the <br />
        <strong>{currentBook.bookName} </strong>
        book?
      </p>
      <div className="flex justify-around mt-5 w-full">
        <button
          className="btn border bg-white text-black hover:bg-red-500 active:bg-gray-500 p-2 w-24 rounded cursor-pointer block mr-6 ml-auto"
          id="btn-delete-book"
          onClick={() => {
            handleDeleteBook(currentBook)
          }}
        >
          Delete
        </button>
        <button
          className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block mr-6 ml-auto"
          id="btn-cancel-deleting-book"
          onClick={() => {
            handleOpenDialog('dialogDelete')
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
export default DialogDelete
