import GenderCheckbox from './GenderCheckbox'

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>Chat App</span>
        </h1>
        <form action=''>
          <div>
            <label htmlFor='fullname' className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              id='fullname'
              placeholder='Enter full name'
              className='w-full input input-bordered h-10'
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
            />
          </div>
          <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            {'Already have an account?'}
          </a>
          <GenderCheckbox />
          <div>
            <button className='btn btn-block btn-sm mt-2'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup
