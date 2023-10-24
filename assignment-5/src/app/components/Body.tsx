'use client'

import React, { type FC, type ReactNode, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import BookTable from './BookTable'
import DialogCreate from './DialogCreate'
import DialogInfo from './DialogInfo'
import DialogDelete from './DialogDelete'
import { MockTestData } from '../testData/MockTestData'
import Book from './Book'
import { type IBook } from '../type/IBook'
import { type TDialog } from '../type/TDialog'

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
  const searchParams = useSearchParams()
  const searchingParams: string | null = searchParams.get('q')
  const router = useRouter()

  const onSearch = (value: string): void => {
    router.replace(`?q=${value}&page=${1}`)
  }

  const onChangeSearchValue = (): string => {
    if (searchingParams !== null && searchingParams !== '') {
      return searchingParams
    }
    return ''
  }

  const onRefresh = (): void => {
    onSearch('')
  }

  useEffect(() => {
    const storedData: string | null = localStorage.getItem('bookstore')
    if (storedData !== null && storedData !== '') {
      const parsedData: IBook[] = JSON.parse(storedData)
      storeData(parsedData)
    } else {
      storeData(MockTestData)
    }
  }, [])

  const storeData = (data: IBook[]): void => {
    setBooks(data)
    localStorage.setItem('bookstore', JSON.stringify(data))
  }

  const handleOpenDialog = (dialog: TDialog): void => {
    setDialogCreate(false)
    setDialogDelete(false)
    setDialogInfo(false)
    switch (dialog) {
      case 'dialogCreate':
        setDialogCreate(!dialogCreate)
        break
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
    const index: number = books.findIndex(book => book.id === editingBook.id)
    if (index !== -1) {
      const book: IBook = books[index]
      book.bookName = editingBook.bookName
      book.author = editingBook.author
      book.topic = editingBook.topic
      storeData(books)
      handleOpenDialog('dialogInfo')
      onRefresh()
      setTimeout(() => {
        alert('Edit book successful!')
      }, 250)
    }
  }

  const handleDeleteBook = (deletingBook: IBook): void => {
    const index: number = books.findIndex(book => book.id === deletingBook.id)
    if (index !== -1) {
      books.splice(index, 1)
      storeData(books)
      handleOpenDialog('dialogDelete')
      onRefresh()
      setTimeout(() => {
        alert('Delete book successful!')
      }, 250)
    }
  }

  const renderBooks = (
    books: IBook[],
    currentPage: number,
    recordsPerPage: number,
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
    handleOpenDialog('dialogCreate')
    onRefresh()
    setTimeout(() => {
      alert('Add book successful!')
    }, 250)
  }

  return (
    <article className="dark:bg-gray-900 dark:text-white  w-[90%] max-w-[1200px] relative mx-auto min-h-[100vh-4rem] z-1">
      <section>
        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center pt-4">
          <div>
            <input
              type="text"
              className="bg-white text-black text-lg rounded outline-none p-1 w-full md:w-[300px] border
            focus:border-solid focus:border-2 focus:border-red-500 focus:shadow-red-500"
              id="search-bar"
              placeholder="Search books..."
              value={onChangeSearchValue()}
              onChange={event => {
                onSearch(event.target.value)
              }}
            />
          </div>
          <button
            onClick={() => {
              handleOpenDialog('dialogCreate')
            }}
            className="btn hover:bg-red-300 bg-red-700 text-white ml-2 active:bg-gray-500 p-2 w-24 rounded cursor-pointer mt-4 md:mt-0 mx-auto"
            id="btn-add"
          >
            Add book
          </button>
        </div>
        <BookTable
          books={books}
          renderBooks={renderBooks}
          searchingParams={onChangeSearchValue()}
        />
      </section>
      {dialogCreate && (
        <DialogCreate
          handleOpenDialog={handleOpenDialog}
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
