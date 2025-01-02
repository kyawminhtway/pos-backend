import 'dotenv/config';

export default {
    "development": {
        "host": process.env.DB_HOST,
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "port": process.env.DB_PORT,
        "database": process.env.DB,
        "dialect": "postgres",
        "seederStorage": "sequelize"
    },
    "test": {
        "host": process.env.DB_HOST,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "port": process.env.DB_PORT,
        "database": process.env.DB,
        "dialect": "postgres",
         "seederStorage": "sequelize"
    },
    "production": {
        "host": process.env.DB_HOST,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "port": process.env.DB_PORT,
        "database": process.env.DB,
        "dialect": "postgres",
        "seederStorage": "sequelize",
    }
};