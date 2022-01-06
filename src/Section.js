import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import Login from './Components/Auth/Login';
import DashboardAdmin from './Components/Dashboard/Dashboard';
import Routelinks from './Components/Routes/Routelinks';
import PrivateAdminRoute from './Components/Routes/PrivateAdminRoute';
import { Provider } from 'react-redux';
import store from './Components/app/store'
import Header from './Components/Dashboard/Header';
import DashResp from './Components/Responsable/DashResp';
import TicketResp from './Components/Responsable/TicketResp';
import RessourceResp from './Components/Responsable/RessourceResp';
import AnomalieForm from './AnomalieForm.js';
import PrivateRoute from './Components/Routes/PrivateRoute';
import NewRessource from './Components/Responsable/NewRessource';
import Print from './Components/Print'


const Section = withRouter(({ location }) => {

  return (
    <section>
       <Provider store={store}>
       <Switch>
          <Routelinks restricted ={true} path="/" exact component={Login}/>
          <Routelinks restricted ={true} path="/Login" exact component={Login}/>
          <PrivateAdminRoute restricted ={false} path="/Create-Account" exact component={Header}/>
          <PrivateAdminRoute restricted ={false} path="/Dashboard-admin" exact component={DashboardAdmin}/>
          <PrivateRoute path="/Dashboard" exact component={DashResp}/>
          <PrivateRoute path="/Responsable-ticket" exact component={TicketResp}/>
          <PrivateRoute path="/Responsable-ressource" exact component={RessourceResp}/>
          <PrivateRoute path="/Responsable-newressource" exact component={NewRessource}/>
          <Route path="/Ressources/id/:id" exact component={AnomalieForm}/>
          <Route path="/Responsable-ressource/Print/:id" exact component={Print} />
       </Switch>
       </Provider>
    </section>    
  );
});

export default Section;
