import { Router } from 'express';
import Models from '../models/db.js';
import validateRecordID from '../middlewares/validateRecordID.js';
import validateBatchRecordIDs from '../middlewares/validateBatchRecordIDs.js';
import transactionHandler from '../utils/transactionHandler.js';
import { 
    getUserByID, 
    getUsers, 
    createUser, 
    createUsers,
    updateUser,
    updateUsers,
    deleteUser,
    deleteUsers,
} from '../controllers/app_user.js';

const User = Models.User;
const router = Router();

router.get('/batch', getUsers);
router.post('/batch', transactionHandler(createUsers));
router.patch('/batch', validateBatchRecordIDs, transactionHandler(updateUsers));
router.post('/batch:delete', validateBatchRecordIDs, transactionHandler(deleteUsers))

router.get('/:id', validateRecordID(User), getUserByID);
router.post('/', transactionHandler(createUser));
router.patch('/:id', validateRecordID(User), transactionHandler(updateUser));
router.delete('/:id', validateRecordID(User), transactionHandler(deleteUser))

export default router;