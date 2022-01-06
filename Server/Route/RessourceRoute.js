const app = require('express');
const auth = require('../utils/auth')
const Ressourcerouter = app.Router();

const { 
       create_ressource,
       ressourceValiations,
       getRessource,
       getRessourceId,
       DeleteRess,
       Save,
       saveValiations,
       deleteTicket
}  = require('../Controller/ressource_controller');

Ressourcerouter.post('/create_ressource',ressourceValiations,create_ressource);
Ressourcerouter.get('/getRessource',getRessource);
Ressourcerouter.get('/getRessourceId/:id',getRessourceId)
Ressourcerouter.delete('/deleteRess/:id',DeleteRess);
Ressourcerouter.post('/saveRess',saveValiations,Save);
Ressourcerouter.delete('/deleteTicket/:id',deleteTicket)
module.exports = Ressourcerouter;