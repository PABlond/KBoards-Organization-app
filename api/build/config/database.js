"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const util_1 = __importDefault(require("util"));
console.log(process.env.DB_USER, process.env.DB_USER);
const connectionConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
};
const connection = process.env.NODE_ENV == 'production'
    ? mysql2_1.default.createConnection(Object.assign(Object.assign({}, connectionConfig), { socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` }))
    : mysql2_1.default.createConnection(Object.assign(Object.assign({}, connectionConfig), { host: process.env.DB_HOST }));
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
});
connection.query = util_1.default.promisify(connection.query);
exports.default = connection;
//# sourceMappingURL=database.js.map