const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const  { getAsync, setAsync } = require('../redis')




router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  }).then(async () => {
    const added_todos = parseInt(await getAsync('added_todos')) || 0
    setAsync('added_todos', added_todos + 1)
  })
  res.send(todo);
});

router.get('/statistics', async (req, res) => {
  const todos = await Todo.find({})
  const total = todos.length
  const done = todos.filter(todo => todo.done).length
  const added_todos = parseInt(await getAsync('added_todos')) || 0
  
  return res.send({
    total,
    done,
    added_todos
  })

})



const singleRouter = express.Router();
const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});


singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});




singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body

  req.todo.text = text
  req.todo.done = done
  
  try {
    await req.todo.save()
    res.send(req.todo);
  } catch (e) {
    console.error(e)
  }

});




router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
