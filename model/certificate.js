import connection from "../database/connection";
import { DataTypes, UUIDV1 } from "sequelize";
import User from "./user";
import Admin from "./admin";
import CertificateSigner from "./certificate_signer";

const Certificate = connection.sequelize.define('Certificate', 
    {
        certificate_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV1
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiver_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sc_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        description: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        score: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        date: {
            type: DataTypes.NUMBER,
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
        tableName: 'certificate',
        timestamps: false
    }
);

Certificate.hasOne(User, {
    foreignKey: 'user_id'
});
Certificate.belongsTo(User, {
    foreignKey: 'user_id'
});
Certificate.hasOne(Admin, {
    foreignKey: 'admin_id'
});
Certificate.belongsTo(Admin, {
    foreignKey: 'admin_id'
});
Certificate.hasMany(CertificateSigner, {
    foreignKey: 'certificate_id'
});
Certificate.belongsTo(CertificateSigner, {
    foreignKey: 'certificate_id'
});

export default Certificate;