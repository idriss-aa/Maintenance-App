import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Routelinks = ({component: Component, restricted, ...rest}) => {

    const user = useSelector(selectUser);
    const data = localStorage.getItem('user');
   
    if(data){
        const userlocal = JSON.parse(data);
        
            if(userlocal.admin){
                return ( 
                    <Route {...rest}  render={props => (
                        <Redirect to="/Dashboard-admin" /> )} />
                );
            }else{
                return ( 
                    <Route {...rest}  render={props => (
                        <Redirect to="/Dashboard" /> )}/>
                );
            }
         
    }else{

        if(!user){
               return ( 
                   <Route {...rest}  render={props => (
                       <Component {...props} /> )}/>
               );
   
       }else if(user){
   
           if(user.admin){
               return ( 
                   <Route {...rest}  render={props => (
                       <Redirect to="/Dashboard-admin" /> )} />
               );
            }else{
               return ( 
                   <Route {...rest}  render={props => (
                       <Redirect to="/Dashboard" /> )}/>
               );
           }



    }
          
  }

};
export default Routelinks;

