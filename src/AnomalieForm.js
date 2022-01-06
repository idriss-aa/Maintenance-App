import React, {useState,useEffect} from "react"
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import {getRessourceId,saveAnomalie} from './Components/Service/api';
import { Disclosure} from '@headlessui/react';
import logo from './assets/logo.png';
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  role: 'Responsable des ampoules',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AnomalieForm() {

  const [values, setValues] = useState({
    resId: 0,
    resName: '',
		resDesc: '',
		resLoca: '',
		resResp: '',
		anomalies: [],
    CurrentAnomalie:[],
  });

  const [option, setOption] = useState({
    selectedOptions:'',
  });

  const { selectedOptions } = option; 
  const { id } = useParams();

  const fetchData = async () => {
    const response = await getRessourceId(id);
   
    setValues({
      resId: response.ressource._id,
      resName: response.ressource.title,
      resDesc:response.ressource.description,
      resLoca:response.ressource.location,
      resResp:response.ressource.Responsable,
      anomalies:JSON.parse(response.ressource.Annomalies), 
      CurrentAnomalie:[],
    })
  }

  useEffect( async () => {
    fetchData();
  },[]); 
  
  const save = async (e) => {
    e.preventDefault();
    const savedata = saveAnomalie(values,id);
    if(savedata){
      toast.success('Rapport Envoyé avec succès Merci.',{
        duration: 3000,
      })
    }
  }

    const DestroyToken = () => {
      localStorage.clear();
      window.location.replace('/Login');
    }
  
    return (
         <div className="min-h-full">
           <Helmet>
           <title>Rapport d'anomalie</title>
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
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 "
                          src={logo}
                          alt="Workflow"
                        />
                      </div>
                      
                    </div>
                    
                    
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        {
          <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0 relative ">
            <div className="md:grid md:gap-6 grid place-items-center inset-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={save}>
                <div className="shadow sm:rounded-md sm:overflow-hidden ">
                  <div className="px-4 py-10 bg-white space-y-6 sm:p-6">

                  <div>
                      <div>
                        <label htmlFor="company-website" className="block text-xl font-medium text-gray-700">
                        Bienvenue sur le rapport d'anomalies
                        </label>
                        <label htmlFor="company-website" className="block text-xs font-medium text-gray-700">
                        <br/>
                        Merci de fournir l'anomalie observée en bas du formulaire si les informations<br/> ci-dessous correspondent à la ressource en question
                        </label>
                      </div>
                    </div>

                    <div>
                      <div>
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Nom de la ressource
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          
                          <input
                          value={values.resName}
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
                          value={values.resDesc}
                          id="ressource-description"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          type="text"
                          placeholder="Description de la ressource"
                          name="ressourceDesc"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div>
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Localisation de la ressource
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          
                        <input
                          value={values.resLoca}
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
                      <div>
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Responsable de maintenance
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          
                        <input
                          value={values.resResp}
                          id="responsable"
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
                            Veuillez choisir l'anomalie
                        </label>
                      <Select
                        onChange={(e) =>setValues({...values,CurrentAnomalie:e})}
                        closeMenuOnSelect={true}
                        placeholder='Selectionnez une anomalie'
                        name="anomalie"
                        className="basic-multi-select"
                        options={values.anomalies}
                        value={values.CurrentAnomalie}
                      />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
            </div>
          </div>
        </main>
          }
        </div>
    )
  }