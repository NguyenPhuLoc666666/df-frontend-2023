import { useEffect, useState } from "react";

function BookTable({ books, searchingValue, ...Props }) {
  const [filteredBooks, setFilteredBooks] = useState(books);
  useEffect(() => {
    if (typeof searchingValue === "string" && searchingValue.trim() !== "") {
      const filteredData = books.filter((book) =>
        book.bookName.toLowerCase().includes(searchingValue.toLowerCase())
      );
      setFilteredBooks(filteredData);
    } else setFilteredBooks(books);
  }, [searchingValue, books]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredBooks.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredBooks.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage === nPages) {
      setCurrentPage(currentPage);
    } else if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id);
  }
  return (
    <>
      <table className="table" id="bookstore-table">
        <caption className="table-caption">Book store</caption>
        <thead>
          <tr className="table-header">
            <th className="table-header__item">No</th>
            <th className="table-header__item">Name</th>
            <th className="table-header__item">Author</th>
            <th className="table-header__item">Topic</th>
            <th className="table-header__item">Action</th>
          </tr>
        </thead>
        <tbody id="table-body">{Props.renderBooks(records)}</tbody>
        <tfoot id="table-footer">
          <tr>
            <td
              className="table-data__item"
              id="total-books__label"
              colSpan="5"
            >
              Total of books:
              <span id="total-books">{filteredBooks.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <nav
        className={`pagination-container ${
          Props.darkMode === true ? "text-white" : ""
        }`}
        colSpan="5"
      >
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disable" : ""}`}>
            <button className="page-link" onClick={prevPage}>
              Prev
            </button>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <button
                href="#"
                className="page-link"
                onClick={() => changeCurrentPage(n)}
              >
                {n}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === nPages ? "disable" : ""}`}
          >
            <button className="page-link" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>{" "}
    </>
  );
}
export default BookTable;
