'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export default function RegisterPage(): JSX.Element {
  const schema = z
    .object({
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
      confirm: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters.' })
        .max(20, { message: 'Password max length is 20 characters.' })
        .regex(/^(?=.*[A-Z])(?=.*[@#$%^&-+=()]).+$/, {
          message: 'Password must be at least 1 uppercase and 1 symbol.',
        }),
    })
    .refine(data => data.confirm.trim() === data.password.trim(), {
      message: 'Confirm Password must be match.',
      path: ['confirm'],
    })

  type TLoginSchema = z.infer<typeof schema>

  const form = useForm<TLoginSchema>({
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
    resolver: zodResolver(schema),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const router = useRouter()
  const onSubmit = (data: TLoginSchema): void => {
    const storeUser: TLoginSchema[] = []
    storeUser.push(data)
    localStorage.setItem('register', JSON.stringify(storeUser))
    try {
      router.push('/login')
    } catch (error) {
      alert('Something wrong with login page!')
    }
  }

  const onRoutingLoginPage = (): void => {
    router.push('/login')
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
          Register
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
          <div className="mb-4 mx-2">
            <label htmlFor="register-confirm-password">
              Confirm Password (<span className="text-red-500">*</span>)
            </label>
            <input
              type="password"
              className={`text-black text-lg rounded p-1 border-solid w-[300px] border-2
               ${
                 errors.confirm?.message !== undefined
                   ? 'focus:border-red-500 border-red-500 border-2'
                   : ''
               }`}
              placeholder="Type confirm password..."
              {...register('confirm')}
            />
            <p className="text-red-500">{errors.confirm?.message}</p>
          </div>
          <button
            className="hover:bg-red-300 bg-red-700 text-white active:bg-gray-500 p-2 w-full rounded cursor-pointer block"
            type="submit"
          >
            Register
          </button>
        </form>
        <button
          className="dark:text-white dark:border-white border-1 border-black hover:bg-red-300 mt-4 text-black  active:bg-gray-500 p-2 w-full rounded cursor-pointer block"
          onClick={onRoutingLoginPage}
        >
          Login
        </button>
      </div>
    </div>
  )
}
