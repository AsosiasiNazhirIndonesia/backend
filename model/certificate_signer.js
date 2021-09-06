import connection from "../database/connection";
import { DataTypes, UUIDV1 } from "sequelize";
import User from "./user";
import Admin from "./admin";
import Certificate from "./certificate";

const CertificateSigner = connection.sequelize.define('CertificateSigner', 
    {
        certificate_signer_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV1
        },
        certificate_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        is_sign: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        tableName: 'certificate_signer',
        timestamps: false
    }
);

CertificateSigner.hasOne(User, {
    foreignKey: 'user_id'
});
CertificateSigner.belongsTo(User, {
    foreignKey: 'user_id'
});

export default CertificateSigner;