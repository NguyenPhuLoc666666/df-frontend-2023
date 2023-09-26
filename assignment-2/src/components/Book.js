function Book({ book, index, handleOpenDialog }) {
  return (
    <tr className="table-data">
      <td className="table-data__item text-center" data-title="No">
        {index + 1}
      </td>
      <td className="table-data__item" data-title="Name">
        {book.bookName}
      </td>
      <td className="table-data__item" data-title="Author">
        {book.author}
      </td>
      <td className="table-data__item" data-title="Topic">
        {book.topic}
      </td>
      <td className="table-data__item" data-title="Action">
        <div className="action">
          <button
            className="btn-action btn-edit"
            onClick={() => {
              handleOpenDialog("dialogInfo", book);
            }}
          >
            edit
          </button>
          <button
            className="btn-action btn-delete"
            onClick={() => {
              handleOpenDialog("dialogDelete", book);
            }}
          >
            delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Book;
