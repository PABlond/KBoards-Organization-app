"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./../../services/auth"));
exports.default = (io) => io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = socket.handshake.query;
    if (!token) {
        return socket.emit('notLogged');
    }
    const user = yield auth_1.default
        .user({ token })
        .catch(err => socket.emit('notLogged'));
    const room = `kanban-${user.email}/${user.id}`;
    socket.join(user.id);
}));
//# sourceMappingURL=index.js.map