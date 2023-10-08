'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IBook } from '../../type/IBook'

const ViewBook = () => {
  const [books, setBooks] = useState<IBook[]>([])
  const [updatedBook, setUpdatedBook] = useState<IBook>({
    id: '0',
    bookName: '',
    author: '',
    topic: '',
  })
  const router = useRouter()
  const currentBook = useSearchParams()

  const storeData = (data: IBook[]): void => {
    setBooks(data)
    localStorage.setItem('bookstore', JSON.stringify(data))
  }

  useEffect(() => {
    const storedData: string | null = localStorage.getItem('bookstore')
    if (storedData !== null && storedData !== '') {
      const parsedData: IBook[] = JSON.parse(storedData)
      storeData(parsedData)
    }
  }, [])

  useEffect(() => {
    const index: number = books.findIndex(
      (book) => book.id === currentBook.get('id'),
    )
    if (index !== -1) {
      setUpdatedBook(books[index])
    }
  }, [books, currentBook])

  const handleEditBookInPage = (): void => {
    if (
      updatedBook.bookName === '' ||
      updatedBook.author === '' ||
      updatedBook.topic === ''
    ) {
      alert('Please enter complete information when edit current book!')
      return
    }
    const index: number = books.findIndex(
      (book) => book.id === currentBook.get('id'),
    )
    if (index !== -1) {
      const book: IBook = books[index]
      book.bookName = updatedBook.bookName
      book.author = updatedBook.author
      book.topic = updatedBook.topic
      storeData(books)
      router.push('/products')
      setTimeout(() => {
        alert('Edit book successful!')
      }, 250)
    }
  }

  const handleDeleteBookInPage = (): void => {
    const index: number = books.findIndex(
      (book) => book.id === currentBook.get('id'),
    )
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete ${books[index].bookName}?`)) {
      if (index !== -1) {
        books.splice(index, 1)
        storeData(books)
        router.push('/products')
        setTimeout(() => {
          alert('Delete book successful!')
        }, 250)
      }
    }
  }

  return (
    <div
      id="dialog-edit"
      className="dark:bg-gray-900 dark:text-white dark:shadow-white w-full h-full grow
   bg-white text-black flex flex-col p-2 justify-start items-start m-auto relative"
    >
      <div>
        <button
          className="dark:text-white m-1 underline text-black text-2xl absolute top-2 left-4"
          onClick={() => {
            router.back()
          }}
        >
          <span>Back</span>
        </button>
      </div>
      <p className="text-lg font-bold text-center w-full my-4">Edit book</p>
      <form className="form px-4 flex flex-col items-start w-full">
        <div className="w-full">
          <p className="label">Name</p>
          <input
            type="text"
            className="text-black text-lg rounded mb-4 p-1 border-solid border w-full"
            id="edit-name"
            name="name"
            placeholder="book name..."
            value={updatedBook.bookName}
            onChange={(e) => {
              setUpdatedBook({ ...updatedBook, bookName: e.target.value })
            }}
          />
        </div>
        <div className="w-full">
          <p className="label">Author</p>
          <input
            type="text"
            className="text-black text-lg rounded mb-4 p-1 border-solid border w-full"
            id="edit-author"
            name="author"
            placeholder="author..."
            value={updatedBook.author}
            onChange={(e) => {
              setUpdatedBook({ ...updatedBook, author: e.target.value })
            }}
          />
        </div>
        <div>
          <p className="label">Topic</p>
          <select
            name="topic"
            id="edit-topic-select"
            className="dark:bg-white text-black text-lg rounded mb-4 p-1 border-solid border"
            value={updatedBook.topic}
            onChange={(e) => {
              setUpdatedBook({ ...updatedBook, topic: e.target.value })
            }}
          >
            <option value="Programming">Programming</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Software Development">Software Development</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>
      </form>
      <div className="flex mt-5 w-full">
        <button
          onClick={handleEditBookInPage}
          type="submit"
          id="btn-edit"
          className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block mr-6 ml-auto"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteBookInPage}
          type="submit"
          id="btn-edit"
          className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block ml-6 mr-auto"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ViewBook
