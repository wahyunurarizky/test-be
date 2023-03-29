require('dotenv').config()

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    dbname: process.env.DB_NAME || '',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost'
}

module.exports = config
