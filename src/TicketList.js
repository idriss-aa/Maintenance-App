import { useEffect,useState } from 'react';
import { getRessource,DeleteTicket} from './Components/Service/api';


  export default function TicketList() {

    const data = localStorage.getItem('user');
    const user = JSON.parse(data);

  const [Ressource,setRessource] = useState([]);
  
  const fetchData = async () => {
    const response = await getRessource();
    setRessource(response);   
  }

  const OnDelete = (id) => {
    DeleteTicket(id);
    fetchData();
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
                      Anomalie
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Valider</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Ressource.map((ticket) => (
                     ticket.Responsable === user.Role ? (ticket.CurrentAnomalie ? (
                      <tr key={ticket._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ticket.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">{ticket.CurrentAnomalie}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                      <span className="sm:ml-3">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => OnDelete(ticket._id)}
                        >
                          Fermer le ticket
                        </button>

                        
                        
                      </span>
                      </td>
                    </tr>
                    ) : (null)
                    ) :(null)
                    
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  