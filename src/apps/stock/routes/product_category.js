import BaseRoutes from '../../base_model/routes/base_model.js';
import Models from '../../db.js';

const { ProductCategory } = Models;
const router = BaseRoutes(ProductCategory);

export default router;