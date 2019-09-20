"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_io_1 = __importDefault(require("socket.io"));
const sockets_1 = __importDefault(require("./routes/sockets"));
require('@babel/polyfill');
const { PORT } = process.env;
const server = app_1.default.listen(PORT);
const io = socket_io_1.default(server);
sockets_1.default(io);
//# sourceMappingURL=index.js.map