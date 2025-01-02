const up = async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('customer_tag_relation', {
        name: 'customer_tag_relation_unique',
        fields: ['customer_id', 'tag_id'],
        type: 'unique',
    });
};
  
const down = async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('customer_tag_relation', 'customer_tag_relation_unique');
};
  
export default { 
    up, 
    down 
};
  