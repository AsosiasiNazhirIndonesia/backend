import connection from "../database/connection";
import { DataTypes, UUIDV1 } from "sequelize";

const CertificateType = connection.sequelize.define('CertificateType', 
    {
        certificate_type_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV1
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'certificate_type',
        timestamps: false
    }
);



export default CertificateType;