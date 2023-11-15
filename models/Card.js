module.exports = function(sequelize, DataTypes){
    const card = sequelize.define('card', {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        price:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        qty:{
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        isOrder:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
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
        tableName: 'card',
        timestamps: true
    });
    return card;
}