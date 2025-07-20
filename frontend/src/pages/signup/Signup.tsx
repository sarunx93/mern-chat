import { Link } from 'react-router-dom'
import GenderCheckbox from './GenderCheckbox'
import { useState } from 'react'
import useSignUp from '../../hooks/useSignUp.js'

const Signup = () => {
  const { signup } = useSignUp()
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signup(inputs)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>Chat App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='fullname' className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              id='fullname'
              placeholder='Enter full name'
              className='w-full input input-bordered h-10'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='username' className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              id='username'
              placeholder='Enter username'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='password' className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='confirm-password' className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='confirm-password'
              id='confirm-password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>
          <Link
            to='/login'
            className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            {'Already have an account?'}
          </Link>
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
          <div>
            <button className='btn btn-block btn-sm mt-2'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup
