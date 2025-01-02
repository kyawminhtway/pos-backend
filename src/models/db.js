import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../config/config.js';
import Associations from './associations/index.js';
import Scopes from './scopes/index.js';
import Hooks from './hooks/index.js';
import { setM2MField, setM2MFields } from '../utils/many2manyHandlers.js';

Model.prototype.setM2MField = setM2MField;
Model.prototype.setM2MFields = setM2MFields;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const db = {};
const FILES_TO_EXCLUDE = [basename];

async function importModels() {
    const files = fs.readdirSync(__dirname);
    files.filter(file => 
        file.indexOf('.' !== 0) &&
        !FILES_TO_EXCLUDE.includes(file) &&
        file.slice(-3) === '.js'
    );
    for(var fileToImport of files){
        if(
            fileToImport.indexOf('.' !== 0) &&
            !FILES_TO_EXCLUDE.includes(fileToImport) &&
            fileToImport.slice(-3) === '.js'
        ){
            var model = await import(`./${fileToImport}`);
            Object.keys(model).forEach(ModelKey => {
                db[ModelKey] = model[ModelKey](sequelize, DataTypes);
            });
        }
    }
    Associations(db);
    Scopes(db);
    Hooks(db);
    return db;
};

const Models = await importModels();
Models.sequelize = sequelize;

export default Models;
