import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../config/config.js';
import { setM2MField, setM2MFields } from '../utils/many2manyHandlers.js';

Model.prototype.setM2MField = setM2MField;
Model.prototype.setM2MFields = setM2MFields;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const Models = {};
const RESERVED_FILE_NAMES = ['associations.js', 'scopes.js', 'hooks.js']
const FILES_TO_EXCLUDE = [basename, ...RESERVED_FILE_NAMES];

const executeFunctions = async (apps) => {
    for(var app of apps){
        for(var fType of RESERVED_FILE_NAMES){
            const filePath = path.join(__dirname, app, 'models', fType);
            if(!fs.existsSync(filePath)) continue;
            var module = await import(`./${app}/models/${fType}`);
            module.default(Models);
        }
    }
};

await (async function importModels() {
    let module;
    const modules = fs.readdirSync(__dirname).filter(m => !FILES_TO_EXCLUDE.includes(m));
    for(module of modules){
        var folderPath = path.join(__dirname, module, 'models');
        if(!fs.existsSync(folderPath)) continue;
        var modelFiles = fs.readdirSync(folderPath).filter(f => !FILES_TO_EXCLUDE.includes(f));
        for(var modelFile of modelFiles){
            var models = await import(`./${module}/models/${modelFile}`);
            Object.keys(models).forEach(ModelKey => {
                Models[ModelKey] = models[ModelKey](sequelize, DataTypes);
            });
        }
    }
    await executeFunctions(modules);
})();

Models.sequelize = sequelize;

export default Models;
