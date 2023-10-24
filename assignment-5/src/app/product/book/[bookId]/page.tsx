'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type IBook } from '../../../type/IBook'
import DialogDelete from '../../../components/DialogDelete'
import { type TDialog } from '../../../type/TDialog'

export default function ViewBook({
  params,
}: {
  params: { bookId: string }
}): React.JSX.Element {
  const [books, setBooks] = useState<IBook[]>([])
  const router = useRouter()
  const currentBookId = params.bookId
  const [dialogDelete, setDialogDelete] = useState(false)
  const [currentBook, setCurrentBook] = useState({
    id: '0',
    bookName: '',
    author: '',
    topic: '',
  })

  const storeData = (data: IBook[]): void => {
    setBooks(data)
    localStorage.setItem('bookstore', JSON.stringify(data))
  }

  useEffect(() => {
    const storedData: string | null = localStorage.getItem('bookstore')
    if (storedData !== null && storedData !== '') {
      const parsedData: IBook[] = JSON.parse(storedData)
      setBooks(parsedData)
    }
  }, [])

  const onDeleteBook = (): void => {
    const index: number = books.findIndex(book => book.id === currentBook.id)
    if (index !== -1) {
      books.splice(index, 1)
      storeData(books)
      handleOpenDialog('dialogDelete')
      setTimeout(() => {
        alert('Delete book successful!')
      }, 250)
    }
  }

  const handleOpenDialog = (dialog: TDialog): void => {
    switch (dialog) {
      case 'dialogDelete':
        setDialogDelete(!dialogDelete)
        break
      default:
        break
    }
  }

  const schema = z.object({
    bookName: z
      .string()
      .min(5, { message: 'Book Name must be at least 5 character.' })
      .refine(val => val.trim() !== '', {
        message: 'Book Name is required',
      }),
    author: z
      .string()
      .regex(/^[a-zA-Z,.\s]+$/, {
        message: 'Only allow uppercase and lowercase characters.',
      })
      .refine(val => val.trim() !== '', {
        message: 'Author is required.',
      }),
    topic: z
      .string()
      .regex(
        /^(Programming|Database|DevOps|Software Development|Computer Science)+$/,
        {
          message: 'Topic is required.',
        },
      ),
  })

  type TBookSchema = z.infer<typeof schema>

  const form = useForm<TBookSchema>({
    defaultValues: {
      bookName: currentBook.bookName,
      author: currentBook.author,
      topic: currentBook.topic,
    },
    resolver: zodResolver(schema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form

  useEffect(() => {
    const index: number = books.findIndex(book => book.id === currentBookId)
    if (index !== -1) {
      setCurrentBook(books[index])
      setValue('bookName', books[index].bookName)
      setValue('author', books[index].author)
      setValue('topic', books[index].topic)
    }
  }, [books, currentBookId, setValue])

  const onEditBook: SubmitHandler<TBookSchema> = (data: TBookSchema) => {
    console.log(data)
    const index: number = books.findIndex(book => book.id === currentBookId)
    if (index !== -1) {
      const book: IBook = books[index]
      book.bookName = data.bookName
      book.author = data.author
      book.topic = data.topic
      storeData(books)
      router.push('/product', { scroll: false })
      setTimeout(() => {
        alert('Edit book successful!')
      }, 250)
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
      <form
        className="form px-4 flex flex-col items-start w-full justify-center"
        onSubmit={handleSubmit(onEditBook)}
      >
        <div className="w-full">
          <p className="label">Name</p>
          <input
            type="text"
            id="edit-name"
            className={`text-black text-lg rounded mb-4 p-1 border-solid w-full border-2
           ${
             errors.bookName?.message !== undefined
               ? 'focus:border-red-500 border-red-500 border-2'
               : ''
           }`}
            placeholder="Type book name..."
            {...register('bookName', {
              onChange: e => {
                console.log(e)
              },
            })}
          />
          <p className="text-red-500">{errors.bookName?.message}</p>
        </div>
        <div className="w-full">
          <p className="label">Author</p>
          <input
            type="text"
            id="edit-author"
            placeholder="author..."
            className={`text-black text-lg rounded mb-4 p-1 border-solid w-full border-2
            ${
              errors.author?.message !== undefined
                ? 'focus:border-red-500 border-red-500 border-2'
                : ''
            }`}
            {...register('author')}
          />
          <p className="text-red-500">{errors.author?.message}</p>
        </div>
        <div className="w-full">
          <p className="label">Topic</p>
          <select
            id="edit-topic-select"
            className={`text-black text-lg rounded mb-4 p-1 border-solid w-full border-2
            ${
              errors.topic?.message !== undefined
                ? 'focus:border-red-500 border-red-500 border-2'
                : ''
            }`}
            {...register('topic')}
          >
            <option value="Programming">Programming</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Software Development">Software Development</option>
            <option value="Computer Science">Computer Science</option>
          </select>
          <p className="text-red-500">{errors.topic?.message}</p>
        </div>
        <div className="flex mt-5 w-full">
          <button
            type="submit"
            id="btn-edit"
            className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block mr-6 ml-auto"
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleOpenDialog('dialogDelete')
            }}
            id="btn-edit"
            className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block ml-6 mr-auto"
          >
            Delete
          </button>
        </div>
      </form>

      {dialogDelete && (
        <DialogDelete
          currentBook={currentBook}
          handleOpenDialog={handleOpenDialog}
          handleDeleteBook={onDeleteBook}
        />
      )}
    </div>
  )
}
