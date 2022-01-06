import {React, useState, useEffect }  from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import {postLogin} from '../Service/api';
import { login } from '../features/userSlice';
import logoblack from '../../assets/logoblack.png';
import {Helmet} from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';


export default function Login() {

  const [state, setState] = useState({
    email:'',
    password:'',
  });

  const dispatch = useDispatch();

  const handleInputs = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };


  const userLogin = async (e) => {
    e.preventDefault();
    const data = await postLogin(state);
    if(data.payload){
      dispatch(login({
        id:data.payload.user._id,
        name:data.payload.user.name,
        email:data.payload.user.email,
        admin:data.payload.user.admin,
      })); 
    }else{
      if (data.length > 0) {
        data.map((error) => toast.error(error.msg));
      }
     
    }
    
 }
  
  return (
    <>
         <Helmet> 
           <title> Espace Login</title>
          </Helmet>

          <Toaster
              position='top-right'
              reverseOrder={false}
              toastOptions={{
							style: {
								fontSize: '15px',
							},
						}}
					/>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logoblack}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connectez-vous à votre compte</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={userLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={state.email}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleInputs}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
