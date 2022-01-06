import axios from 'axios';

const usersUrl = 'http://localhost:5000';

export const postRegister = async (user) => {
    console.log(user);
    const config = {
        headers: {
          "Content-Type": 'application/json',
        },
      };
      try {
        const { data } = await axios.post(`${usersUrl}/register`, user, config);
        localStorage.setItem('myToken', data.token);
        window.location.replace('/Dashboard-admin');
        return data;
      }catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            return error.response.data.errors;
         }
         this.handleAxiosError(error);
     }
}


export const postLogin = async (user) => {
    const config = {
        headers: {
          "Content-Type": 'application/json',
        },
      };

      try {
        const { data } = await axios.post(`${usersUrl}/login`, user, config);
        localStorage.setItem('myToken', data.token);
        localStorage.setItem('user',JSON.stringify(data.payload.user));
        return data;
      }catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data.errors);
          return error.response.data.errors;
         }
     }
}


export const getUsers = async () => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      const { data } = await axios.get(`${usersUrl}/getUsers`, config);
      return data;
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}

export const DeleteUser = async (id) => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      const { data } = await axios.delete(`${usersUrl}/deleteUser/${id}`, config);
      window.location.replace('/Dashboard-admin');
      return data;
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}

export const postRessource = async (state) => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`${usersUrl}/create_ressource`,state, config);
      window.location.replace('/Responsable-ressource');
      return data;
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}

export const getRessource = async () => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      const { data } = await axios.get(`${usersUrl}/getRessource`, config);
      return data;
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}


export const getRessourceId = async (id) => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      const { data } = await axios.get(`${usersUrl}/getRessourceId/${id}`,config);
      return data;
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}

export const DeleteRess = async (url) => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      const id = url.substr(14, url.length);
      const { data } = await axios.delete(`${usersUrl}/deleteRess/${id}`, config);
      window.location.replace('/Responsable-ressource');
      return data;
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}

export const saveAnomalie = async (state,id) => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      console.log(state);
      console.log(id);
      const { data } = await axios.post(`${usersUrl}/saveRess`,state, config);
      setTimeout(() => { 
         window.location.replace(`/Ressources/id/${id}`);
    }, 3001)
      
      
      return data;   
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}

export const DeleteTicket = async (id) => {
  const config = {
      headers: {
        "Content-Type": 'application/json',
      },
    };
    try {
      console.log(id);
      const { data } = await axios.delete(`${usersUrl}/deleteTicket/${id}`, config);
      window.location.replace('Responsable-ticket');
      return data;   
    }catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
       }
   }
}











   
    
