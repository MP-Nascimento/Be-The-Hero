 const express = require('express');
 const routes = express.Router();
 const OngController = require('./controller/OngsController')
 const IncidentController = require('./controller/IncidentController')
 const ProfileController = require('./controller/ProfileController')
 const SessionController = require('./controller/SessionController')
 const {celebrate,Segments,Joi} = require('celebrate')

 // Rota/Recurso

// Metodos http:

// get = Buscar informação do back-end
// post = Criar uma informação no back-end 
// put = Alterar uma informação no back-end
// delete = Apagar uma informação no back-end



// Tipos de parâmetros 

// Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros,Paginação)
// // Route Params: Parâmetros ultilizados para indentificar recursos
// Request body: Corpo da requisição utilizado para criar ou alterar recursos

// Rotas Ongs:

// Rota de listagem
routes.get('/ongs', OngController.index);
// Rota de Ciação
routes.post('/ongs',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp:Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),

  })
}), OngController.create);

/////////////////////////////////////////////

// Rotas Icidents(Casos) :

// Rota de Criação
routes.post('/incidents',celebrate({

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description:Joi.string().required(),
    value: Joi.number().required(),
  })
  
}),IncidentController.create);

// Rota de listagem
routes.get('/incidents',celebrate({
  [Segments.QUERY]:Joi.object().keys({
    page: Joi.number(),
  })
}),IncidentController.index);

// Rota de listagem especifica
routes.get('/profile',celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),

}),ProfileController.index)
// Rota para deletar
routes.delete('/incidents/:id',celebrate({
  [Segments.PARAMS]:Joi.object().keys({
    id: Joi.number().required(),
  })
})
,IncidentController.delete)

//Rotas de session(Login):
routes.post('/sessions',celebrate({
  [Segments.BODY]:Joi.object().keys({
    id: Joi.string().required(),
  })
}),SessionController.create);





  
module.exports = routes;
