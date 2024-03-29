import { Sequelize } from 'sequelize';
import env from '../config/env';

const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const connection = {};
connection.sequelize = sequelize;

export default connection;