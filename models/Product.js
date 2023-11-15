module.exports = function(sequelize, DataTypes){
    const product = sequelize.define('product', {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        isPublished:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isFeatured:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        images:{
            type: DataTypes.STRING(255),
            defaultValue: 'default.png',
        },
        price:{
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        tags:{
            type: DataTypes.STRING(255),
            defaultValue: "['Шинэ бараа']",
        },
        wallet:{
            type: DataTypes.STRING(3),
            defaultValue: "MNT",
        },
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {
        tableName: 'product',
        timestamps: true
    });
    return product;
}