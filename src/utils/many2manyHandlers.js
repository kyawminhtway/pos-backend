import { Op } from "sequelize";
import { ValidationError } from "../errors/customErrors.js";

export const setM2MField = async (instance, associationAlias, actions, transaction) => {
    const association = instance.constructor.associations[associationAlias];
    const { foreignKey, otherKey } = association;
    const RelationModel = association.through.model;
    if(
        !actions
        ||
        !(Array.isArray(actions) && actions.length > 0)
    ) throw new ValidationError(`Value of ${associationAlias} must be an array of operations.`);
    const toCreate = [];
    const toDelete = [];
    for(var action of actions){
        if(action.operation === 'LINK'){
            var rows = action.record_ids.map(record_id => ({ 
                [foreignKey]: instance.id, 
                [otherKey]: record_id 
            }));
            toCreate.push(rows);
        }else if(action.operation === 'UNLINK'){
            toDelete.push({ 
                [Op.and]: [{ [foreignKey]: instance.id }, { [otherKey]: action.record_ids }] 
            });
        }else{
            throw new ValidationError(`Setting Many2many field failed!\nassociationAlias: ${associationAlias}\ndata: ${data}`);
        }
    }
    if(toCreate.length > 0){
        await RelationModel.bulkCreate(rows, { 
            fields: [foreignKey, otherKey],
            updateOnDuplicate: [foreignKey, otherKey],
            transaction 
        });
    }
    if(toDelete.length > 0){
        await RelationModel.destroy({
            where: {
                [Op.or]: toDelete
            },
            transaction
        });
    }
};

export const setM2MFields = async (instance, options) => {
    const mapping = instance.constructor.options.m2mFieldsMapping;
    const fields = Object.keys(mapping);
    const changedFields = Object.keys(options.changedFields || {});
    for(var field of fields){
        if(instance.changed(field) || changedFields.includes(field))
            await instance.setM2MField(instance, mapping[field], instance[field], options.transaction);
    }
};