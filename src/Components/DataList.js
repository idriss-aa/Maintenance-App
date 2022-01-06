import {getUsers,DeleteUser} from './Service/api';
import { useEffect,useState } from 'react';
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import zIndex from '@material-ui/core/styles/zIndex';


  export default function DataList() {

    const [Users,setUsers] = useState([]);
    const AvatarContainer = styled.div`
      display: flex;
      margin-bottom: 14px;
      & > * {
        margin: 4px;
      }
    `;

    const OnDelete = (id) => {
      console.log(id);
      const data = DeleteUser(id);
      fetchData();
    }

    const fetchData = async () => {
      const response = await getUsers();
      setUsers(response);
    }

    useEffect(async() => {
      fetchData();
    },[]); 

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    
                    <th scope="col" className="relative px-15 py-3">
                    <a
                          href='/Create-Account'
                          className='bg-gray-900 inline-flex text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'            
                        >
                          Ajouter un utilisateur
                        </a>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">


                  {Users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                          <AvatarContainer >
                            <Avatar alt={user.name.toUpperCase()} src="/broken-image.jpg" />
                          </AvatarContainer>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900"> <p>User</p></div>
                        <div className="text-sm text-gray-500"><p>maintenance manager</p> </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ user.admin ?  <p>Admin</p> : <p>{user.Role}</p> }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                      <span className="sm:ml-3">
                        {
                           user.admin ? null : (<button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => OnDelete(user._id)}
                        >
                          Delete
                        </button>)

                        }
                        
                      </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  