import connection from "../database/connection";
import { DataTypes, UUIDV1 } from "sequelize";

const Admin = connection.sequelize.define('Admin', 
    {
        admin_id: {
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
        login_nonce: {
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
        tableName: 'admin',
        timestamps: false
    }
);

export default Admin;