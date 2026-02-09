const apiRouter = require('express').Router();
const Person = require('../models/person')

apiRouter.get('/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})


apiRouter.get('/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



apiRouter.post('/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))

})



apiRouter.put('/persons/:id', (req, res, next) => {

  const request_body = req.body

  const person = {
    name: request_body.name, 
    number: request_body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => { 
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})


apiRouter.delete('/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


module.exports = apiRouter;