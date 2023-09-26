import { useEffect, useState } from "react";

function BookTable({ books, searchingValue, ...Props }) {
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    if (searchingValue !== null && searchingValue !== "") {
      const filteredData = books.filter((book) =>
        book.bookName.toLowerCase().includes(searchingValue.toLowerCase())
      );
      setFilteredBooks(filteredData);
    } else {
      setFilteredBooks(books);
    }
  }, [searchingValue, books]);

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
        <tbody id="table-body">{Props.renderBooks(filteredBooks)}</tbody>
        <tfoot id="table-footer">
          <tr>
            <td
              className="table-data__item"
              id="total-books__label"
              colSpan="5"
            >
              Total of books:{" "}
              <span id="total-books">{filteredBooks.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
export default BookTable;
