import React, {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { type IBook } from '../type/IBook'

interface Props {
  books: IBook[]
  renderBooks: (
    books: IBook[],
    currentPage: number,
    recordsPerPage: number,
  ) => ReactNode
  searchingValue: string
}
const BookTable: FC<Props> = ({ books, renderBooks, searchingValue }) => {
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>(books)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage: number = 5
  const lastIndex: number = currentPage * recordsPerPage
  const firstIndex: number = lastIndex - recordsPerPage
  const records: IBook[] = filteredBooks.slice(firstIndex, lastIndex)
  const nPages: number = Math.ceil(filteredBooks.length / recordsPerPage)
  const numbers = Array.from({ length: nPages }, (_, i) => i + 1)
  const searchParams = useSearchParams()
  const searchingValueRef = useRef(searchingValue)
  const router = useRouter()

  useEffect(() => {
    if (
      typeof searchingValueRef.current === 'string' &&
      searchingValueRef.current.trim() !== ''
    ) {
      const filteredData = books.filter((book) =>
        book.bookName
          .toLowerCase()
          .includes(searchingValueRef.current.toLowerCase()),
      )
      setFilteredBooks(filteredData)
    } else {
      setFilteredBooks(books)
    }
    setCurrentPage(1)
  }, [searchingValue, books])

  useEffect(() => {
    const q: string | null = searchParams.get('q')
    if (q !== null && typeof q === 'string') {
      searchingValueRef.current = q
    }
    const page: string | null = searchParams.get('page')
    if (page !== null && !Number.isNaN(page)) {
      setCurrentPage(Number(page))
    }
    router.push(`?q=${searchingValueRef.current}&page=${currentPage}`, {
      scroll: false,
    })
  }, [currentPage, router, searchParams])

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
          <tr className="table-auto table-header border-solid border-2 bg-gray-500 flex">
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
              <span id="total-books">{filteredBooks.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <nav className="w-full my-2">
        <ul className="w-full flex items-center justify-center my-2 mx-auto">
          <li
            className={`mx-1 border-solid border-blue-500 ${
              currentPage === 1 ? 'disable' : ''
            }`}
          >
            <button className="no-underline p-2 bg-inherit" onClick={prevPage}>
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
