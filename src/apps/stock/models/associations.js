const ProductAssociations = (Models) => {

    const {
        Product,
        ProductCategory,
    } = Models;
    
    // Product
    ProductCategory.hasMany(Product, { foreignKey: 'category_id' });
    Product.belongsTo(ProductCategory, { foreignKey: 'category_id' });
    
};
    
export default ProductAssociations;