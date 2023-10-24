import React, { type FC, type ReactNode, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { type IBook } from '../type/IBook'

interface Props {
  books: IBook[]
  renderBooks: (
    books: IBook[],
    selectedCurrentPage: number,
    recordsPerPage: number,
  ) => ReactNode
  searchingParams: string
}
const BookTable: FC<Props> = ({ books, renderBooks, searchingParams }) => {
  const searchParams = useSearchParams()
  const selectedCurrentPageStr = searchParams.get('page')
  const selectedCurrentPage = !Number.isNaN(selectedCurrentPageStr)
    ? Number(selectedCurrentPageStr)
    : 1
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>(books)
  const recordsPerPage: number = 5
  const lastIndex: number = selectedCurrentPage * recordsPerPage
  const firstIndex: number = lastIndex - recordsPerPage
  const records: IBook[] = filteredBooks.slice(firstIndex, lastIndex)
  const nPages: number = Math.ceil(filteredBooks.length / recordsPerPage)
  const numbers = Array.from({ length: nPages }, (_, i) => i + 1)
  const router = useRouter()

  useEffect(() => {
    if (searchingParams !== '') {
      router.push(`?q=${searchingParams}&page=${selectedCurrentPage}`)
    }
  }, [router, searchingParams, selectedCurrentPage])

  const prevPage = (): number => {
    if (selectedCurrentPage === 1) {
      return selectedCurrentPage
    }
    return selectedCurrentPage - 1
  }

  const nextPage = (): number => {
    if (selectedCurrentPage === nPages) {
      return selectedCurrentPage
    }
    return selectedCurrentPage + 1
  }

  useEffect(() => {
    if (searchingParams !== null && searchingParams.trim() !== '') {
      const filteredData = books.filter(book =>
        book.bookName.toLowerCase().includes(searchingParams.toLowerCase()),
      )
      setFilteredBooks(filteredData)
    } else {
      setFilteredBooks(books)
    }
  }, [searchingParams, books])

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
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-[35%]">
              Name
            </th>
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-1/5">
              Author
            </th>
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-1/5">
              Topic
            </th>
            <th className="hidden md:block border-solid border-2 font-bold p-2 md:w-1/5">
              Action
            </th>
          </tr>
        </thead>
        <tbody id="table-body" className="table-auto">
          {renderBooks(records, selectedCurrentPage, recordsPerPage)}
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
              selectedCurrentPage === 1 ? 'disable' : ''
            }`}
          >
            <Link
              href={`?q=${searchingParams}&page=${prevPage()}`}
              className="no-underline p-2 bg-inherit"
            >
              Prev
            </Link>
          </li>
          {numbers.map((page, i) => (
            <li
              className={`mx-1 border-solid border-blue-500 ${
                selectedCurrentPage === page ? 'active' : ''
              } `}
              key={i}
            >
              <Link
                href={`?q=${searchingParams}&page=${page}`}
                className="no-underline p-2 bg-inherit"
              >
                {page}
              </Link>
            </li>
          ))}
          <li
            className={`mx-1 border-solid border-blue-500 ${
              selectedCurrentPage === nPages ? 'disable' : ''
            } `}
          >
            <Link
              href={`?q=${searchingParams}&page=${nextPage()}`}
              className="no-underline p-2 bg-inherit"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default BookTable
