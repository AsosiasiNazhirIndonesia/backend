import dotenv from 'dotenv';
dotenv.config();
const env = { 
    PORT: 3001,//process.env.PORT,

    DB_HOST: '13.214.196.5',//process.env.DB_HOST,
    DB_PORT: 3306, //process.env.DB_PORT,
    DB_NAME: 'digicert',//process.env.DB_NAME,
    DB_USERNAME: 'root',//process.env.DB_USERNAME,
    DB_PASSWORD: 'Jesus15600D!Yesusb41k!',//process.env.DB_PASSWORD,
    
    PREFIX_SIGNATURE_DATA: process.env.PREFIX_SIGNATURE_DATA,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TTL: process.env.JWT_TTL,

    FILE_STORAGE: process.env.FILE_STORAGE,
    FILE_MAXIMUM_SIZE: process.env.FILE_MAXIMUM_SIZE,

    ETHER_CLIENT: 'https://ethereum-goerli.publicnode.com',//process.env.ETHER_CLIENT,

    MAILER_ADDRESS: process.env.MAILER_ADDRESS,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,

    MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
}

export default env;