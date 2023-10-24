'use client'

import React, { type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { type TDialog } from '../type/TDialog'
import { type IBook } from '../type/IBook'

interface Props {
  handleAddBook: (book: IBook) => void
  handleOpenDialog: (data: TDialog) => void
}
const DialogCreate: FC<Props> = ({ handleAddBook, handleOpenDialog }) => {
  const generateId = (): string => {
    const timestamp: string = Date.now().toString()
    const rand: number = Math.floor(Math.random() * 1000)
    return `${timestamp}-${rand}`
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
      bookName: '',
      author: '',
      topic: 'Programming',
    },
    resolver: zodResolver(schema),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onAddNewBook: SubmitHandler<TBookSchema> = (data: TBookSchema) => {
    const generatedId: string = generateId()
    const book = { id: generatedId, ...data }
    handleAddBook(book)
    handleOpenDialog('dialogCreate')
  }

  return (
    <div
      id="dialog-create"
      className="dark:bg-inherit dark:text-white dark:shadow-white w-[350px] h-auto z-[1001]
       bg-white text-black flex flex-col p-2 justify-start items-start m-auto rounded border-black
       fixed top-20 left-1/2 translate-x-[-50%] shadow-md shadow-slate-900"
    >
      <div>
        <button
          className="dark:text-white m-1 no-underline text-black text-2xl absolute top-2 right-4"
          onClick={() => {
            handleOpenDialog('dialogCreate')
          }}
        >
          <span className="">&times;</span>
        </button>
      </div>
      <p className="text-lg font-bold text-center w-full my-4">Add book</p>
      <form className="form m-auto" onSubmit={handleSubmit(onAddNewBook)}>
        <div>
          <p className="label">Name</p>
          <input
            type="text"
            className={`text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border-2 
            ${
              errors.bookName?.message !== undefined
                ? 'focus:border-red-500 border-red-500 border-2'
                : ''
            }`}
            id="input-name"
            placeholder="Type book name..."
            {...register('bookName')}
          />
          <p className="text-red-500">{errors.bookName?.message}</p>
        </div>
        <div>
          <p className="label">Author</p>
          <input
            type="text"
            className={`text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border-2
            ${
              errors.author?.message !== undefined
                ? 'focus:border-red-500 border-red-500 border-2'
                : ''
            }`}
            id="input-author"
            placeholder="Type author..."
            {...register('author')}
          />
          <p className="text-red-500">{errors.author?.message}</p>
        </div>
        <div>
          <p className="label">Topic</p>
          <select
            id="topic-select"
            className={`text-black text-lg rounded mb-4 p-1 border-solid w-[300px] border-2
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
        <div className="flex justify-around mt-5 w-full">
          <button
            type="submit"
            className="btn hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-24 rounded cursor-pointer block mr-6 ml-auto"
            id="btn-create"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
export default DialogCreate
