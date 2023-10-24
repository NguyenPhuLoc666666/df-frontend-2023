'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export default function LoginPage(): JSX.Element {
  const schema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required' })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .max(20, { message: 'Password max length is 20 characters.' })
      .regex(/^(?=.*[A-Z])(?=.*[@#$%^&-+=()]).+$/, {
        message: 'Password must be at least 1 uppercase and 1 symbol.',
      }),
  })

  type TLoginSchema = z.infer<typeof schema>

  const form = useForm<TLoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })
  const {
    register,
    handleSubmit,
    setError,
    // clearErrors,
    formState: { errors },
  } = form

  const router = useRouter()
  const onSubmit = (data: TLoginSchema): void => {
    const storedData: string | null = localStorage.getItem('register')
    const users: TLoginSchema[] =
      storedData != null ? JSON.parse(storedData) : []
    const user = users.find(u => u.email === data.email)
    if (user != null) {
      if (user.password === data.password) {
        try {
          localStorage.setItem('login', JSON.stringify(data.email))
          router.push('/product')
        } catch (error) {
          alert('Something wrong with login page!')
        }
      } else {
        setError('password', { type: 'custom', message: 'Wrong password' })
      }
    } else {
      setError('email', { type: 'custom', message: 'Email does not exist' })
    }
    // clearErrors('password')
    // clearErrors('email')
  }

  const onRoutingRegisterPage = (): void => {
    router.push('/register')
  }

  return (
    <div
      className="dark:bg-gray-900 dark:text-white dark:shadow-white w-full h-full grow
      bg-white text-black flex flex-col p-2 justify-start items-start m-auto relative"
    >
      <div
        className='dark:bg-inherit dark:text-white dark:shadow-white w-[350px] h-auto z-[1001]
              bg-white text-black flex flex-col p-2 justify-start items-start m-auto rounded border-black
               fixed top-20 left-1/2 translate-x-[-50%] shadow-md shadow-slate-900"'
      >
        <p className="text-lg font-bold text-center w-full my-4 text-red-300">
          Book store
        </p>
        <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 mx-2">
            <label htmlFor="register-email">
              Email (<span className="text-red-500">*</span>)
            </label>
            <input
              type="email"
              className={`text-black text-lg rounded p-1 border-solid w-[300px] border-2
              ${
                errors.email?.message !== undefined
                  ? 'focus:border-red-500 border-red-500 border-2'
                  : ''
              }`}
              placeholder="Type your email..."
              {...register('email')}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="mb-4 mx-2">
            <label htmlFor="register-password">
              Password (<span className="text-red-500">*</span>)
            </label>
            <input
              type="password"
              className={`text-black text-lg rounded p-1 border-solid w-[300px] border-2
               ${
                 errors.password?.message !== undefined
                   ? 'focus:border-red-500 border-red-500 border-2'
                   : ''
               }`}
              placeholder="Type password..."
              {...register('password')}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <button
            className="hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-full rounded cursor-pointer block"
            type="submit"
          >
            Login
          </button>
        </form>

        <button
          className="dark:text-white dark:border-white hover:bg-red-300 mt-4 text-black border-1 border-black active:bg-gray-500 p-2 w-full rounded cursor-pointer block"
          onClick={onRoutingRegisterPage}
        >
          Register
        </button>
      </div>
    </div>
  )
}
