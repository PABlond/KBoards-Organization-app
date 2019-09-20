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
const boards_1 = __importDefault(require("./../services/boards"));
exports.default = {
    getBoards: ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield boards_1.default.getBoards({ token });
    }),
    createBoard: ({ token, title, description, }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("CREATE A BOARD");
        return yield boards_1.default.createBoard({ token, title, description });
    }),
    getBoardTickets: ({ token, id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield boards_1.default.getBoardTickets({ token, id });
    }),
    deleteRow: ({ token, id, boardId, }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield boards_1.default.deleteRow({ token, id, boardId });
    }),
    moveTo: ({ token, id, boardId, to }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield boards_1.default.moveTo({ token, id, boardId, to });
    }),
    editRow: ({ token, id, boardId, name, description }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield boards_1.default.editRow({ token, id, boardId, name, description });
    }),
    addRow: ({ token, name, description, column, boardId, }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log({
            token,
            name,
            description,
            column,
            boardId,
        });
        return yield boards_1.default.addRow({
            token,
            name,
            description,
            column,
            boardId,
        });
    }),
};
//# sourceMappingURL=boards.resolvers.js.map