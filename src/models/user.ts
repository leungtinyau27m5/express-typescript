import seq from '@/db/connect'
import Sequelize from 'sequelize'

export default seq.define('user', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});
