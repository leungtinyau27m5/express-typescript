import * as sequelize from 'sequelize'
import db from './config'

export default new sequelize.Sequelize(db.db, db.user, db.password, {
    host: db.host,
    dialect: 'mysql',
    pool: {
        max: 3000,
        min: 0,
        idle: 10000
    }
});
