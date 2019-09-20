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
const auth_1 = __importDefault(require("./auth"));
const database_1 = __importDefault(require("./../config/database"));
const moment_1 = __importDefault(require("moment"));
const getBoardsList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.default.query(`SELECT * FROM boards_list WHERE userid = ? ORDER BY id DESC`, [id]);
});
const getBoards = ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.user({ token });
    const boardsList = yield getBoardsList(user.id);
    console.log("boardsList", boardsList);
    return boardsList;
});
const createBoard = ({ token, title, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.user({ token });
    yield database_1.default
        .query(`INSERT INTO boards_list (userid, title, description, created_at, last_update, role) VALUES (?, ?, ?, ?, ?, ?)`, [user.id, title, description, moment_1.default().unix(), moment_1.default().unix(), "CREATOR"])
        .catch((err) => {
        console.log(err);
        throw err;
    });
    console.log(yield getBoardsList(user.id));
    return yield getBoardsList(user.id);
});
const getTickets = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.default.query(`SELECT * FROM board_tickets WHERE board_id = ?`, [id]);
});
const getBoardTickets = ({ token, id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.user({ token });
    if (user.id) {
        const tickets = yield getTickets({ id });
        return tickets;
    }
});
const deleteRow = ({ token, id, boardId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.user({ token });
    if (user.id) {
        yield database_1.default.query(`DELETE FROM board_tickets WHERE id = ?`, [id]);
        console.log({
            token,
            id,
            boardId,
        });
        const tickets = yield getTickets({ id: boardId });
        return tickets;
    }
});
const moveTo = ({ token, id, boardId, to, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.user({ token });
    if (user.id) {
        yield database_1.default.query(`UPDATE board_tickets SET cat = ? WHERE id = ?`, [
            to,
            id,
        ]);
        const tickets = yield getTickets({ id: boardId });
        return tickets;
    }
});
const addRow = ({ token, name, boardId, description, column, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.user({ token });
    yield database_1.default
        .query(`INSERT INTO board_tickets (board_id, name, description, created_by, created_at, cat) VALUES (?, ?, ?, ?, ?, ?)`, [parseInt(boardId), name, description, user.id, moment_1.default().unix(), column])
        .catch((err) => console.log(err));
    return yield getTickets({ id: boardId });
});
const editRow = ({ token, id, boardId, name, description, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.user({ token });
    if (user.id) {
        yield database_1.default.query(`UPDATE board_tickets SET name = ?, description = ? WHERE id = ?`, [name, description, id]);
        const tickets = yield getTickets({ id: boardId });
        console.log(tickets);
        return tickets;
    }
});
exports.default = {
    getBoards,
    createBoard,
    getBoardTickets,
    addRow,
    deleteRow,
    moveTo,
    editRow,
};
//# sourceMappingURL=boards.js.map