import mysql from 'mysql2/promise';
import Config from './config';

const connection = mysql.createPool(Config.dbConfig);

export default connection;
