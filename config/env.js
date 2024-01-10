import dotenv from 'dotenv';
dotenv.config();
const env = { 
    PORT: 3001,//process.env.PORT,

    DB_HOST: 'localhost',//process.env.DB_HOST,
    DB_PORT: 3306, //process.env.DB_PORT,
    DB_NAME: 'digicert',//process.env.DB_NAME,
    DB_USERNAME: 'root',//process.env.DB_USERNAME,
    DB_PASSWORD: 'Sp@s1chain',//process.env.DB_PASSWORD,
    
    PREFIX_SIGNATURE_DATA: 'spasi',//process.env.PREFIX_SIGNATURE_DATA,
    JWT_SECRET: 'spasi',
    JWT_TTL: 60*24*7,

    FILE_STORAGE: process.env.FILE_STORAGE,
    FILE_MAXIMUM_SIZE: process.env.FILE_MAXIMUM_SIZE,

    ETHER_CLIENT: 'https://ethereum-sepolia.publicnode.com',//process.env.ETHER_CLIENT,

    MAILER_ADDRESS: 'monocerusworld@gmail.com',
    MAILER_PASSWORD: 'jljlakwfjzjmfwek',

    MAGIC_SECRET_KEY: 'sk_live_124AEBCE31BEF221',
}

export default env;