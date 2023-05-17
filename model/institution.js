import { DataTypes, STRING, UUIDV1 } from "sequelize";
import connection from "../database/connection";

const Institution = connection.sequelize.define('Institution', {
    institution_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
    },     
    sc_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
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
    }
}, {
    tableName: 'institution',
    timestamps: false
});

export default Institution;