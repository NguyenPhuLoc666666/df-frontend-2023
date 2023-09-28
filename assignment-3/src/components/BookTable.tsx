import React, { FC, ReactNode, useState } from 'react'
import { IBook } from '../type/IBook'

interface Props {
  books: IBook[]
  darkMode: boolean
  renderBooks: (books: IBook[]) => ReactNode
}
const BookTable: FC<Props> = ({ books, darkMode, renderBooks }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage: number = 5
  const lastIndex: number = currentPage * recordsPerPage
  const firstIndex: number = lastIndex - recordsPerPage
  const records: IBook[] = books.slice(firstIndex, lastIndex)
  const nPages: number = Math.ceil(books.length / recordsPerPage)
  const numbers = [...Array(nPages + 1).keys()].slice(1)

  function prevPage() {
    if (currentPage === 1) {
      setCurrentPage(currentPage)
    } else if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }
  function nextPage() {
    if (currentPage === nPages) {
      setCurrentPage(currentPage)
    } else if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  function changeCurrentPage(page: number) {
    setCurrentPage(page)
  }
  return (
    <>
      <table className="table" id="bookstore-table">
        <caption className="table-caption">Book store</caption>
        <thead>
          <tr className={`table-header ${darkMode === true ? 'bg-black' : ''}`}>
            <th className="table-header__item">No</th>
            <th className="table-header__item">Name</th>
            <th className="table-header__item">Author</th>
            <th className="table-header__item">Topic</th>
            <th className="table-header__item">Action</th>
          </tr>
        </thead>
        <tbody id="table-body">{renderBooks(records)}</tbody>
        <tfoot id="table-footer">
          <tr>
            <td
              className="table-data__item"
              id="total-books__label"
              colSpan={5}
            >
              Total of books:
              <span id="total-books">{books.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <nav
        className={`pagination-container ${
          darkMode === true ? 'text-white border-white' : ''
        }`}
      >
        <ul className="pagination">
          <li
            className={`page-item ${currentPage === 1 ? 'disable' : ''}  ${
              darkMode === true ? 'border-white' : ''
            }`}
          >
            <button
              className={`page-link ${
                darkMode === true ? 'text-white border-white' : ''
              }`}
              onClick={prevPage}
            >
              Prev
            </button>
          </li>
          {numbers.map((page, i) => (
            <li
              className={`page-item ${currentPage === page ? 'active' : ''}  ${
                darkMode === true ? 'border-white' : ''
              }`}
              key={i}
            >
              <button
                className={`page-link ${
                  darkMode === true ? 'text-white border-white' : ''
                }`}
                onClick={() => changeCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === nPages ? 'disable' : ''} 
            ${darkMode === true ? 'border-white' : ''}`}
          >
            <button
              className={`page-link ${
                darkMode === true ? 'text-white border-white' : ''
              }`}
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
