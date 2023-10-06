import React, {
  type FC,
  type ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react'
import { type IBook } from '../type/IBook'
import Book from './Book'

interface Props {
  books: IBook[]
  renderBooks: (books: IBook[], currentPage, recordsPerPage) => ReactNode
}
const BookTable: FC<Props> = ({ books, renderBooks }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage: number = 5
  const lastIndex: number = currentPage * recordsPerPage
  const firstIndex: number = lastIndex - recordsPerPage
  const records: IBook[] = books.slice(firstIndex, lastIndex)
  const nPages: number = Math.ceil(books.length / recordsPerPage)
  const numbers = Array.from({ length: nPages }, (_, i) => i + 1)

  useEffect(() => {
    setCurrentPage(1)
  }, [books])

  const prevPage = (): void => {
    if (currentPage === 1) {
      setCurrentPage(currentPage)
    } else if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = (): void => {
    if (currentPage === nPages) {
      setCurrentPage(currentPage)
    } else if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  const changeCurrentPage = (page: number): void => {
    setCurrentPage(page)
  }

  return (
    <>
      <table
        className="table-auto w-full border-solid border p-4 text-center"
        id="bookstore-table"
      >
        <caption className="text-3xl font-black my-4">Book store</caption>
        <thead>
          <tr
            className={`table-auto table-header border-solid border-2 bg-gray-500 flex`}
          >
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-[5%]">
              No
            </th>
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-[40%]">
              Name
            </th>
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-1/5">
              Author
            </th>
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-1/5">
              Topic
            </th>
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-[15%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody id="table-body" className="table-auto">
          {renderBooks(records, currentPage, recordsPerPage)}
        </tbody>
        <tfoot id="table-footer">
          <tr className="block">
            <td className="block" id="total-books__label" colSpan={5}>
              Total of books:
              <span id="total-books">{books.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <nav className={`w-full my-2`}>
        <ul className="w-full flex items-center justify-center my-2 mx-auto">
          <li
            className={`mx-1 border-solid border-blue-500 ${
              currentPage === 1 ? 'disable' : ''
            }`}
          >
            <button
              className={`no-underline p-2 bg-inherit`}
              onClick={prevPage}
            >
              Prev
            </button>
          </li>
          {numbers.map((page, i) => (
            <li
              className={`mx-1 border-solid border-blue-500 ${
                currentPage === page ? 'active' : ''
              } `}
              key={i}
            >
              <button
                className={`no-underline p-2 bg-inherit `}
                onClick={() => {
                  changeCurrentPage(page)
                }}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`mx-1 border-solid border-blue-500 ${
              currentPage === nPages ? 'disable' : ''
            } `}
          >
            <button
              className={`no-underline p-2 bg-inherit `}
              onClick={nextPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default BookTable
