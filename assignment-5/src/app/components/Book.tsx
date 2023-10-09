import React, { type FC } from 'react'
import { useRouter } from 'next/navigation'
import { type IBook } from '../type/IBook'

interface Props {
  book: IBook
  index: number
  currentPage: number
  recordsPerPage: number
  handleOpenDialog: (dialog: string) => void
  setCurrentBook: React.Dispatch<React.SetStateAction<IBook>>
}
const Book: FC<Props> = ({
  book,
  index,
  handleOpenDialog,
  currentPage,
  recordsPerPage,
  setCurrentBook,
}) => {
  const router = useRouter()
  const handleEditBookInDialog = (): void => {
    router.push(`/products/book/?id=${book.id}`)
  }
  const handleDeleteBookInDialog = (): void => {
    handleOpenDialog('dialogDelete')
    setCurrentBook(book)
  }
  return (
    <tr className="table-auto table-data block md:flex border m-2 md:m-0">
      <td
        className="md:w-[5%] table-data__item block text-right p-2 border"
        data-title="No"
      >
        {(currentPage - 1) * recordsPerPage + index + 1}
      </td>
      <td
        className="md:w-[40%] table-data__item block text-right p-2 border"
        data-title="Name"
      >
        {book.bookName}
      </td>
      <td
        className="md:w-[20%] table-data__item block text-right p-2 border"
        data-title="Author"
      >
        {book.author}
      </td>
      <td
        className="md:w-[20%] table-data__item block text-right p-2 border"
        data-title="Topic"
      >
        {book.topic}
      </td>
      <td
        className="table-data__item block md:w-[15%] bg-slate-300 md:bg-inherit"
        data-title="Action"
      >
        <div className="flex justify-center items-center w-full">
          <button
            className="underline text-base m-1 w-full btn-edit hover:text-gray-500 text-yellow-600"
            onClick={handleEditBookInDialog}
          >
            view
          </button>
          <button
            className="underline text-base m-1 w-full btn-delete hover:text-gray-500 ml-2 text-red-700"
            onClick={handleDeleteBookInDialog}
          >
            delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Book
