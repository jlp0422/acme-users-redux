const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_redux', {
  logging:false
})

const User = conn.define('user', {
  name: Sequelize.STRING
})

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    User.create({ name: 'Frank' }),
    User.create({ name: 'Tyus' }),
    User.create({ name: 'Oshae' })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    User
  }
}
