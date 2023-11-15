const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = function(sequelize, DataTypes){
    const user = sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        lname:{
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
        },
        fname:{
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
        },
        phone:{
            type: DataTypes.STRING(12),
            allowNull: false
        },
        phone_verified:{
            type: DataTypes.DATE,
            allowNull: true
        },
        image:{
            type: DataTypes.STRING(250),
            allowNull: true,
            defaultValue: 'default.png',
        },
        nickname:{
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email_verified_at:{
            type: DataTypes.DATE,
            allowNull: true
        },
        permission:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5,
        },
        address:{
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        address:{
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        phone2:{
            type: DataTypes.STRING(12),
            allowNull: true,
            defaultValue: ''
        },
        remember_token:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        verify:{
            type: DataTypes.STRING(10),
            allowNull: true
        },
        password:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        tableName: 'user',
        timestamps: true
    });

    user.beforeCreate(async (data, options) => {

        console.time("salt");
        const salt = await bcrypt.genSalt(10);
        console.timeEnd("salt");

        console.time("hash");
        data.password = await bcrypt.hash(data.password, salt);
        console.timeEnd("hash");

        data.image = "default.png";

        data.remember_token = jwt.sign(
            { userId: data.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
    });

    user.beforeUpdate(async (data, options) => {

        console.time("salt");
        const salt = await bcrypt.genSalt(10);
        console.timeEnd("salt");

        console.time("hash");
        data.password = await bcrypt.hash(data.password, salt);
        console.timeEnd("hash");


        data.remember_token = jwt.sign(
            { userId: data.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
    });

    return user;
}