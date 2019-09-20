import mysql from 'mysql2'
import util from 'util'

console.log(process.env.DB_USER, process.env.DB_USER)
const connectionConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
}

const connection =
    process.env.NODE_ENV == 'production'
        ? mysql.createConnection({
              ...connectionConfig,
              socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
          })
        : mysql.createConnection({
              ...connectionConfig,
              host: process.env.DB_HOST,
          })

connection.connect(function(err: any) {
    if (err) {
        console.error('Error connecting: ' + err.stack)
        return
    }
    console.log('Connected as thread id: ' + connection.threadId)
})

connection.query = util.promisify(connection.query)

export default connection
