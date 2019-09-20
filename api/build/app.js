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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const schemas_1 = __importDefault(require("./schemas"));
const resolvers_1 = __importDefault(require("./resolvers"));
const app = express_1.default();
console.log(process.env.DB_USER, process.env.DB_PASS);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json('Done');
}));
app.use(cors_1.default());
app.use('/graphql', express_graphql_1.default({
    schema: schemas_1.default,
    rootValue: resolvers_1.default,
    graphiql: true,
}));
exports.default = app;
//# sourceMappingURL=app.js.map