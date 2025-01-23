import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('teste', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch((error) => console.error('Unable to connect to the database:', error));

export default sequelize;