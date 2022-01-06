import { useEffect,useState } from 'react';
import { getRessource, DeleteRess } from './Components/Service/api';

  export default function TicketList() {

    const [Ressource,setRessource] = useState([]);
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);

    const fetchData = async () => {
      const response = await getRessource();
      setRessource(response);  
    }

    useEffect(async() => {
      fetchData();
    },[]); 



    const OnPrint = (url) => {
      const id = url.substr(14, url.length);
      for(let i=0; i<Ressource.length ; i++){
        if(Ressource[i]._id === id  ){
          localStorage.setItem('res',JSON.stringify(Ressource[i]));
        }
      }
      window.location.replace(`/Responsable-ressource/Print/${id}`);
    }


    const OnDelete = (url) => {
      console.log(url);
      const data = DeleteRess(url);
      fetchData();
    }

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
                      Ressource
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Localisation
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Anomalies
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Code Qr
                    </th>
                    <th scope="col" className="relative px-15 py-3">
                    <a
                          href='/Responsable-newressource'
                          className='bg-gray-800 inline-flex text-white text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                        >
                          Ajouter une ressource
                        </a>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Ressource.map((ressource) => (
                     
                     ressource.Responsable === user.Role ? (
                      <tr key={ressource._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{ressource.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{ressource.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{ressource.description}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              { 
                                JSON.parse(ressource.Annomalies).map((an)=>(<p>{an.label}</p>))
                              }
                              </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              <img style={{ width: "60px"}} src={ressource.QRCODE}></img>
                            </div>
                          </div>
                        </div>
                      </td>


                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                      <span className="sm:ml-3">
                        {
                           user.admin ? null : (
                           <>
                            <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => OnPrint(ressource.url)}
                            >
                            Imprimer
                          </button>
                         {
                           ' '
                         }
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => OnDelete(ressource.url)}
                          >
                            Supprimer
                          </button>
                            </>
                        )
                        }
                      </span>
                      </td>
                      
                      </tr>
                     ) : ( null )
                     
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  