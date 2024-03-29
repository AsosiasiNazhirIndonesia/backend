import connection from "../database/connection";
import { DataTypes, UUIDV1 } from "sequelize";
import Institution from "./institution";

const Admin = connection.sequelize.define('Admin', 
    {
        admin_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: true
            // defaultValue: UUIDV1
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
        admin_role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        institution_id: {
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
Admin.hasOne(Institution, {
    foreignKey: 'institution_id'
});
Admin.belongsTo(Institution, {
    foreignKey: 'institution_id'
});

export default Admin;