"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_resolvers_1 = __importDefault(require("./auth.resolvers"));
const boards_resolvers_1 = __importDefault(require("./boards.resolvers"));
exports.default = Object.assign(Object.assign({}, auth_resolvers_1.default), boards_resolvers_1.default);
//# sourceMappingURL=index.js.map