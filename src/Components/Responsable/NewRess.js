import React, {useState} from "react";
import {postRessource} from '../Service/api';

export default function AnomalieForm() {


  const data = localStorage.getItem('user');
  const user = JSON.parse(data);

  const [values, setValues] = useState({
    title: '',
		description: '',
		location: '',
		Responsable: user.Role,
    newAnomalie:'',
    Annomalies: [],
    AnomalieString:'',
  });

  const handleResNameInputChange = (event) => {
    setValues({...values, title: event.target.value})
  }

  const handleResDescInputChange = (event) => {
    setValues({...values, description: event.target.value})
  }

  const handleResLocaInputChange = (event) => {
    setValues({...values, location: event.target.value})
  }

  const handleResRespInputChange = (event) => {
    setValues({...values, Responsable: event.target.value})
  }

 
  const handleNewAnomalieInputChange = (event) => {
    setValues({...values, newAnomalie: event.target.value})
  }

  const handleButtonNewAnomalieInputChange = (event) => {
    event.preventDefault();
    var ano = values.Annomalies;
    ano.push({ value: 'anomalie 1', label: values.newAnomalie });
    setValues({...values, AnomalieString: JSON.stringify(ano), Annomalies: ano, newAnomalie: '' })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = postRessource(values);
  }

    return (
          <div className="min-h-full flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-md w-full space-y-3 space-x-4">
                <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ajouter une ressource</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden ">
                  <div className="px-2 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6 pt-4">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Nom de la ressource
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          
                          <input
                          value={values.title}
                          onChange={handleResNameInputChange}
                          id="ressource-name"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded rounded-r-md sm:text-sm border-gray-300"
                          type="text"
                          placeholder="Nom de la ressource"
                          name="ressourceName"
                        />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={values.description}
                          onChange={handleResDescInputChange}
                          id="ressource-description"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          type="text"
                          placeholder="Description de la ressource"
                          name="ressourceDesc"
                        />
                      </div>
                    </div>
                    
                    <div >
                      <div >
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Localisation de la ressource
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          
                        <input
                          value={values.location}
                          onChange={handleResLocaInputChange}
                          id="localisation"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded rounded-r-md sm:text-sm border-gray-300"
                          type="text"
                          placeholder="Localisation de la ressource"
                          name="localisation"
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div >
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Responsable de maintenance
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          
                        <input
                          value={values.Responsable}
                          onChange={handleResRespInputChange}
                          id="responsable"
                          disabled="true"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded rounded-r-md sm:text-sm border-gray-300"
                          type="text"
                          placeholder="Responsable de maintenance"
                          name="responsable"
                        />
                        </div>
                      </div>
                    </div>


                    <div>
                            <div>
                              <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                              Anomalie

                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                {
                              <input
                              onChange={handleNewAnomalieInputChange}
                              value={values.newAnomalie}
                                id="anomalie"
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded rounded-r-md sm:text-sm border-gray-300"
                                type="text"
                                placeholder="Anomalie"
                                name="anomalie"
                              />
                                }
                              </div>
                            </div>
                       </div>
    
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      onClick={handleButtonNewAnomalieInputChange}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter une anomalie
                    </button>
                  </div>
                 
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
    )
  }
  