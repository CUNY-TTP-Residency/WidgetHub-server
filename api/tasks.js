const express = require('express');
const router = express.Router();
const models = require('../db/models')

router.get('/:id', (req, res, next) => {
    models.Tasks.findByPk(req.params.id)
    .then(task => {
        res.status(200).json(task)
    })
    .catch(error => res.status(400).send('error:', error.message))
})

router.delete('/:id', (req, res, next) => {
    models.Tasks.destroy({
        where: {id: req.params.id}
    })
    .then(task => {
        res.status(200).send('Task was deleted')
    })
    .catch(error => res.status(400).send('error deleting task: ', error.message))
})

router.post('/', (req, res, next) => {
    models.Tasks.create({
        task: req.body.task,
        userId: req.body.userId
    })
    .then(newTask => {
        res.status(200).send(newTask)
    })
    .catch(error => res.status(400).send('error creating task: ', error.message))
})

module.exports = router