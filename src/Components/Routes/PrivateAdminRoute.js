import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateAdminRoute = ({component: Component, restricted, ...rest}) => {

    const data = localStorage.getItem('user');

    if(data){
        const user = JSON.parse(data);
        
        if(user.admin){
            return ( 
                <Route {...rest}  render={props => (
                    <Component {...props}/> )} />
            );
         }else{
            return ( 
                <Route {...rest}  render={props => (
                    <Redirect to="/Login" /> )}/>
            );
        }
    }else{

        return ( 
            <Route {...rest}  render={props => (
                <Redirect to="/Login" /> )}/>
        );
    }
   
};
export default PrivateAdminRoute;
