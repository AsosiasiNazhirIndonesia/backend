import { DataTypes, Sequelize, UUIDV1 } from "sequelize";
import connection from "../database/connection";
import Institution from "./institution";
import Role from "./role";
import User from "./user";


const UserHistory = connection.sequelize.define ('UserHistory', {
    user_history_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institution_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
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
    tableName:'user_history',
    timestamps: false
});

UserHistory.hasOne(Institution, {
    foreignKey: 'institution_id'
});
UserHistory.belongsTo(Institution, {
    foreignKey: 'institution_id'
});
UserHistory.hasOne(Role, {
    foreignKey: 'role_id'
});
UserHistory.belongsTo(Role, {
    foreignKey: 'role_id'
});

export default UserHistory;