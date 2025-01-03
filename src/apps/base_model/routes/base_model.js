import { Router } from 'express';
import validateRecordID from '../../../middlewares/validateRecordID.js';
import validateBatchRecordIDs from '../../../middlewares/validateBatchRecordIDs.js';
import transactionHandler from '../../../utils/transactionHandler.js';
import { 
    getRecordByID, 
    getRecords, 
    createRecord, 
    createRecords, 
    updateRecord, 
    updateRecords, 
    deleteRecord, 
    deleteRecords 
} from '../controllers/base_model.js';

const BaseRouter = (Model, Routes) => {
    const router = Router();

    if(!Routes || Routes.includes('getRecords'))
        router.get('/batch', getRecords);
    if(!Routes || Routes.includes('createRecords'))
        router.post('/batch', transactionHandler(createRecords));
    if(!Routes || Routes.includes('updateRecords'))
        router.patch('/batch', validateBatchRecordIDs, transactionHandler(updateRecords));
    if(!Routes || Routes.includes('deleteRecords'))    
        router.post('/batch:delete', validateBatchRecordIDs, transactionHandler(deleteRecords));

    if(!Routes || Routes.includes('getRecordByID'))
        router.get('/:id', validateRecordID(Model), getRecordByID);
    if(!Routes || Routes.includes('createRecord'))
        router.post('/', transactionHandler(createRecord));
    if(!Routes || Routes.includes('updateRecord'))
        router.patch('/:id', validateRecordID(Model), transactionHandler(updateRecord));
    if(!Routes || Routes.includes('deleteRecord'))    
        router.delete('/:id', validateRecordID(Model), transactionHandler(deleteRecord));

    return router;
};

export default BaseRouter;