const { Sequelize } = require('@sequelize/core')
const { MariaDbDialect } = require('@sequelize/mariadb')

const connection = new Sequelize({
    dialect: MariaDbDialect,
    database: 'askme',
    user: 'administrador',
    password: '123456',
    host: '172.16.96.146',
    port: 3306,
    showWarnings: true,
    connectTimeout: 1000,
})

// const { Sequelize } = require('@sequelize/core')
// const { SqliteDialect } = require('@sequelize/sqlite3')

// const connection = new Sequelize({
//   dialect: SqliteDialect,
//   storage: 'database/ask-me.db'
// })
module.exports = connection