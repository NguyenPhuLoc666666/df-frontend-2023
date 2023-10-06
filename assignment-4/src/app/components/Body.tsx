import React, { type FC, type ReactNode, useEffect, useState } from 'react'
import BookTable from './BookTable'
import DialogCreate from './DialogCreate'
import DialogInfo from './DialogInfo'
import DialogDelete from './DialogDelete'
import { MockTestData } from '../testData/MockTestData'
import Book from './Book'
import { type IBook } from '../type/IBook'

const Body: FC = () => {
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
    setDialogCreate(!dialogCreate)
    setDialogInfo(false)
    setDialogDelete(false)
  }

  const handleOpenDialog = (dialog: string): void => {
    setDialogCreate(false)
    setDialogDelete(false)
    setDialogInfo(false)
    switch (dialog) {
      case 'dialogInfo':
        setDialogInfo(!dialogInfo)
        break
      case 'dialogDelete':
        setDialogDelete(!dialogDelete)
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
      handleOpenDialog('dialogInfo')
      setSearchingValue('')
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
      handleOpenDialog('dialogDelete')
      setSearchingValue('')
      setTimeout(() => {
        alert('Delete book successful!')
      }, 250)
    }
  }

  const renderBooks = (
    books: IBook[],
    currentPage,
    recordsPerPage,
  ): ReactNode => {
    return books.map((book: IBook, index: number) => (
      <Book
        key={index}
        book={book}
        index={index}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        handleOpenDialog={handleOpenDialog}
        setCurrentBook={setCurrentBook}
      />
    ))
  }

  const handleAddBook = ({ id, bookName, author, topic }: IBook): void => {
    books.push({ id, bookName, author, topic })
    storeData(books)
    handleOpenDialogCreate()
    setSearchingValue('')
    renderBooks(books, 1, 5)
    setTimeout(() => {
      alert('Add book successful!')
    }, 250)
  }

  return (
    <article className="w-[90%] max-w-[1200px] relative mx-auto min-h-full">
      <section>
        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center mt-4">
          <input
            type="text"
            className="text-black text-lg rounded outline-none p-1 w-full md:w-[300px] border focus:border-solid focus:border-red-500 focus:shadow-red-500"
            id="search-bar"
            placeholder="Search books..."
            value={searchingValue}
            onChange={(e) => {
              setSearchingValue(e.target.value)
            }}
          />
          <button
            onClick={() => {
              handleOpenDialogCreate()
            }}
            className="btn hover:bg-red-300 bg-red-700 text-white ml-2 active:bg-gray-500 p-2 w-24 rounded cursor-pointer mt-4 md:mt-0 mx-auto"
            id="btn-add"
          >
            Add book
          </button>
        </div>
        <BookTable books={filteredBooks} renderBooks={renderBooks} />
      </section>
      {dialogCreate && (
        <DialogCreate
          handleCloseDialogCreate={handleOpenDialogCreate}
          handleAddBook={handleAddBook}
        />
      )}
      {dialogInfo && (
        <DialogInfo
          currentBook={currentBook}
          handleEditBook={handleEditBook}
          handleOpenDialog={handleOpenDialog}
        />
      )}
      {dialogDelete && (
        <DialogDelete
          currentBook={currentBook}
          handleOpenDialog={handleOpenDialog}
          handleDeleteBook={handleDeleteBook}
        />
      )}
    </article>
  )
}
export default Body
