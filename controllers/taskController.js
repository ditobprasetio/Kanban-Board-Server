const { Task, User } = require('../models/')

class TaskController {
  static create(req, res, next) {
    let { task } = req.body
    let UserId = req.currentUserId
    Task.create({
      task,
      UserId
    })
      .then((task) => {
        res.status(201).json({ task })
      })
      .catch(next)
  }

  static display(req, res, next) {
    let UserId = req.currentUserId
    Task.findAll({
      where: {
        UserId
      },
      include: [{
        model: User,
        attributes: {
          exclude: ['password']
        }
      }]
    })
      .then((task) => {
        res.status(200).json(task)
      })
      .catch(next)
  }

  static displayOne(req, res, next) {
    let id = req.params.id
    Task.findByPk(
      id
    )
      .then((task) => {
        if (task) {
          res.status(200).json(task)
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .catch(next)
  }

  static editTask(req, res, next) {
    let { task } = req.body
    let id = req.params.id
    Task.update({
      task
    }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        if (!result[1]) {
          res.status(404).json({ name: 'NotFound' })
        }
        else {
          res.status(200).json(result[1][0])
        }
      })
      .catch(next)
  }

  static editCategory(req, res, next) {
    let { category } = req.body
    let id = req.params.id
    Task.update({
      category
    }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        if (!result[1]) {
          res.status(404).json({ name: 'NotFound' })
        }
        else {
          res.status(200).json(result[1][0])
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    let deletedTask;
    Task.findByPk(id)
      .then((task) => {
        if (task) {
          deletedTask = task
          return Task.destroy({
            where: {
              id: id
            }
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'Delete success',
            deletedTask
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .catch(next)
  }
}

module.exports = TaskController