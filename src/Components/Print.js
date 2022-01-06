import React from "react";
import ReactToPrint from "react-to-print";
import './Print.css';
import {Helmet} from 'react-helmet';

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    const data = localStorage.getItem('res');
    const ressource = JSON.parse(data);

    return (
      <div id="page">
         <Helmet>
           <title> Impression Ticket</title>
         </Helmet>
          <h1 id="top"></h1>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div style={{'width':'31rem'}}  className="space-y-8">
            <fieldset>
              <legend>Flashez-moi</legend>
                <div className='right'>
                  <img src={ressource.QRCODE}/>
                  </div>
                  <div className='left'>
                        <p> Lien: {ressource.url}</p>
                  </div>
            </fieldset>
          </div>
        </div>
        </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() =>
            <div style={{ "margin": "0","position": "absolute","top": "50%","left": "50%","msTransform": "translate(-50%, -50%)","transform": "translate(-50%, -50%)"}}>
                <button
            className='bg-gray-900 text-white
                        text-white-300 hover:bg-gray-700 hover:text-white,
                      px-3 py-2 rounded-md text-sm font-medium' >
                    Imprimer
                  </button>
              </div>
            }
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
