import React, { type FC } from 'react'
import { useRouter } from 'next/navigation'
import { type IBook } from '../type/IBook'
import { type TDialog } from '../type/TDialog'

interface Props {
  book: IBook
  index: number
  currentPage: number
  recordsPerPage: number
  handleOpenDialog: (dialog: TDialog) => void
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

  const handleOpenViewPage = (): void => {
    router.push(`/product/book/${book.id}`)
  }

  const handleEditBookInDialog = (): void => {
    handleOpenDialog('dialogInfo')
    setCurrentBook(book)
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
        className="md:w-[35%] table-data__item block text-right p-2 border break-all"
        data-title="Name"
      >
        {book.bookName}
      </td>
      <td
        className="md:w-1/5 table-data__item block text-right p-2 border break-all"
        data-title="Author"
      >
        {book.author}
      </td>
      <td
        className="md:w-1/5 table-data__item block text-right p-2 border break-all"
        data-title="Topic"
      >
        {book.topic}
      </td>
      <td
        className="table-data__item block md:w-1/5 bg-slate-300 md:bg-inherit"
        data-title="Action"
      >
        <div className="flex justify-center items-center w-full">
          <button
            className="underline text-base m-1 w-full btn-edit hover:text-gray-500 text-yellow-600"
            onClick={handleOpenViewPage}
          >
            view
          </button>
          <button
            className="underline text-base m-1 w-full btn-edit hover:text-gray-500 text-orange-600"
            onClick={handleEditBookInDialog}
          >
            edit
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
