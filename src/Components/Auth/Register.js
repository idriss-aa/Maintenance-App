import {React, useState }  from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { postRegister } from '../Service/api';
import {Helmet} from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {

  const [state, setState ] = useState({
    name :'',
    email:'',
    Role:'',
    password:'',
  });

  const handleInputs = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const userRegister = async (e) => {
    e.preventDefault();
    const data = await postRegister(state);
    if (data.length > 0) {
      data.map((error) => toast.error(error.msg));
    }
};

  return (
    <>
          <Helmet> 
           <title> Ajouter un Responsable</title>
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
            <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ajouter un utilisateur</h3>
          </div>
          <form className="mt-8 space-y-6"  onSubmit={userRegister}>
            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 ">
                  UserName
                </label>
                <input
                  type="text"
                  name="name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
                  placeholder="Username"
                  value={state.name}
                  onChange={handleInputs}
                />
              </div>
            
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
                  placeholder="Email address"
                  value={state.email}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  name="Role"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
                  placeholder="Role"
                  value={state.Role}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleInputs}
                />
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
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
