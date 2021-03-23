const { User } = require('../models')
const { getToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
  static signup(req, res, next) {
    let { username, email, password } = req.body
    User.create({
      username,
      email,
      password
    })
      .then((user) => {
        let payload = {
          id: user.id,
          email: user.email
        }
        let token = getToken(payload)
        res.status(201).json({
          email: user.email,
          token
        })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (user) {
          let status = comparePassword(password, user.password)
          if (status) {
            let payload = {
              id: user.id,
              email: user.email
            }
            let token = getToken(payload)
            res.status(200).json({
              email: user.email,
              token
            })
          }
          else {
            next({ name: 'Invalid email or password' })
          }
        }
        else {
          next({ name: 'Invalid email or password' })
        }
      })
      .catch(next)
  }
}

module.exports = UserController