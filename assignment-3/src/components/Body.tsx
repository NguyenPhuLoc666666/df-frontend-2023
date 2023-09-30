import React, { type FC, type ReactNode, useEffect, useState } from 'react'
import BookTable from './BookTable'
import DialogCreate from './DialogCreate'
import DialogInfo from './DialogInfo'
import DialogDelete from './DialogDelete'
import { MockTestData } from '../testData/MockTestData'
import Book from './Book'
import { type IBook } from '../type/IBook'

interface Props {
  darkMode: boolean
}
const Body: FC<Props> = ({ darkMode }) => {
  const [dialogCreate, setDialogCreate] = useState(false)
  const [dialogInfo, setDialogInfo] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [currentBook, setCurrentBook] = useState<IBook>({
    id: '0',
    bookName: '',
    author: '',
    topic: '',
  })
  const [books, setBooks] = useState<IBook[]>([])
  const [searchingValue, setSearchingValue] = useState('')
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>(books)

  useEffect(() => {
    const storedData: string | null = localStorage.getItem('bookstore')
    if (storedData !== null && storedData !== '') {
      const parsedData: IBook[] = JSON.parse(storedData)
      storeData(parsedData)
    } else {
      storeData(MockTestData)
    }
  }, [])

  useEffect(() => {
    if (typeof searchingValue === 'string' && searchingValue.trim() !== '') {
      const filteredData = books.filter((book) =>
        book.bookName.toLowerCase().includes(searchingValue.toLowerCase()),
      )
      setFilteredBooks(filteredData)
    } else {
      setFilteredBooks(books)
    }
  }, [searchingValue, books])

  const storeData = (data: IBook[]): void => {
    setBooks(data)
    localStorage.setItem('bookstore', JSON.stringify(data))
  }

  const handleOpenDialogCreate = (): void => {
    setDialogCreate(true)
    setDialogInfo(false)
    setDialogDelete(false)
  }

  const handleCloseDialogCreate = (): void => {
    setDialogCreate(false)
  }

  const handleOpenDialog = (dialog: string, book: IBook): void => {
    setCurrentBook(book)
    switch (dialog) {
      case 'dialogInfo':
        setDialogInfo(true)
        setDialogCreate(false)
        setDialogDelete(false)
        break
      case 'dialogDelete':
        setDialogDelete(true)
        setDialogCreate(false)
        setDialogInfo(false)
        break
      default:
        break
    }
  }

  const handleCloseDialog = (dialog: string): void => {
    switch (dialog) {
      case 'dialogInfo':
        setDialogInfo(false)
        break
      case 'dialogDelete':
        setDialogDelete(false)
        break
      default:
        break
    }
  }

  const handleEditBook = (editingBook: IBook): void => {
    const index: number = books.findIndex((book) => book.id === editingBook.id)
    if (index !== -1) {
      const book: IBook = books[index]
      book.bookName = editingBook.bookName
      book.author = editingBook.author
      book.topic = editingBook.topic
      storeData(books)
      handleCloseDialog('dialogInfo')
      setSearchingValue('')
      renderBooks(books)
      setTimeout(() => {
        alert('Edit book successful!')
      }, 250)
    }
  }

  const handleDeleteBook = (deletingBook: IBook): void => {
    const index: number = books.findIndex((book) => book.id === deletingBook.id)
    if (index !== -1) {
      books.splice(index, 1)
      storeData(books)
      handleCloseDialog('dialogDelete')
      setSearchingValue('')
      renderBooks(books)
      setTimeout(() => {
        alert('Delete book successful!')
      }, 250)
    }
  }

  const renderBooks = (books: IBook[]): ReactNode => {
    return books.map((book: IBook, index: number) => (
      <Book
        key={index}
        book={book}
        index={index}
        handleOpenDialog={handleOpenDialog}
      />
    ))
  }

  const handleAddBook = ({ id, bookName, author, topic }: IBook): void => {
    books.push({ id, bookName, author, topic })
    storeData(books)
    handleCloseDialog('dialogCreate')
    setSearchingValue('')
    renderBooks(books)
    setTimeout(() => {
      alert('Add book successful!')
    }, 250)
  }

  return (
    <article className="content">
      <section>
        <div className="action-bar">
          <input
            type="text"
            className="search-bar"
            id="search-bar"
            placeholder="Seach books..."
            value={searchingValue}
            onChange={(e) => {
              setSearchingValue(e.target.value)
            }}
          />
          <button
            onClick={() => {
              handleOpenDialogCreate()
            }}
            className="btn btn-primary"
            id="btn-add"
          >
            Add book
          </button>
        </div>
        <BookTable
          darkMode={darkMode}
          books={filteredBooks}
          renderBooks={renderBooks}
        />
      </section>
      {dialogCreate && (
        <DialogCreate
          darkMode={darkMode}
          handleCloseDialogCreate={handleCloseDialogCreate}
          handleAddBook={handleAddBook}
        />
      )}
      {dialogInfo && (
        <DialogInfo
          darkMode={darkMode}
          currentBook={currentBook}
          handleEditBook={handleEditBook}
          handleCloseDialog={handleCloseDialog}
        />
      )}
      {dialogDelete && (
        <DialogDelete
          darkMode={darkMode}
          currentBook={currentBook}
          handleCloseDialog={handleCloseDialog}
          handleDeleteBook={handleDeleteBook}
        />
      )}
    </article>
  )
}
export default Body
