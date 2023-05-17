import connection from "../database/connection";
import { DataTypes, UUIDV1 } from "sequelize";
import UserHistory from "./user_history";

const User = connection.sequelize.define('User', 
    {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV1
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        public_key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login_nonce: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0 
        },
        is_certified: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0 
        },
        created_date: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        updated_date: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        deleted_date: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
    },
    {
        tableName: 'user',
        timestamps: false
    }
);

User.hasMany(UserHistory, {
    foreignKey: 'user_id'
});
User.belongsTo(UserHistory, {
    foreignKey: 'user_id'
});

export default User;