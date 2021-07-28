import connection from "../database/connection";
import { DataTypes, UUIDV1 } from "sequelize";

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
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public_key: {
            type: DataTypes.STRING,
            allowNull: false
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

export default User;