import { DataTypes, UUIDV1 } from "sequelize";
import connection from "../database/connection";


const Role = connection.sequelize.define('Role', {
    role_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_date: {
        type: DataTypes.STRING,
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
    tableName: 'role',
    timestamps: false
});

export default Role;