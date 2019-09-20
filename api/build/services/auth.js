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
const database_1 = __importDefault(require("./../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const v1_1 = __importDefault(require("uuid/v1"));
const moment_1 = __importDefault(require("moment"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const hashPassword = (password) => bcrypt_1.default.hashSync(password, 10);
const sendConfirmationMail = ({ email, firstname, lastname, uniqid, id, }) => {
    const { GMAIL_ACCOUNT, GMAIL_PASSWORD } = process.env;
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_ACCOUNT,
            pass: GMAIL_PASSWORD,
        },
    });
    new email_templates_1.default({
        transport: transporter,
        message: {
            from: GMAIL_ACCOUNT,
        },
        send: true,
        preview: false,
        views: {
            options: {
                extension: 'pug',
            },
            root: path_1.default.join(__dirname, '..', 'config', 'email-templates'),
        },
    })
        .send({
        template: 'signup',
        message: {
            to: email,
        },
        locals: {
            firstname,
            lastname,
            uniqid,
            userid: id,
        },
    })
        .then(() => console.log('email has been send!'));
};
const signup = ({ firstname, lastname, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        throw new Error('You must provide an email and password.');
    }
    try {
        const existingUser = yield database_1.default.query(`SELECT (email) FROM users WHERE email = ?`, [email.toLowerCase()]);
        if (existingUser.length) {
            throw new Error('Email in use');
        }
        const hash = hashPassword(password);
        yield database_1.default.query(`INSERT INTO users (email, password, firstname, lastname, is_check) VALUES (?, ?, ?, ?, ?)`, [email.toLowerCase(), hash, firstname, lastname, false]);
        const users = yield database_1.default.query(`SELECT id, email, firstname, lastname, password FROM users WHERE email = ?`, [email.toLowerCase()]);
        const { id } = users[0];
        const uniqid = v1_1.default();
        const expire_at = moment_1.default((moment_1.default().unix() + 2 * 24 * 60 * 60) * 1000).unix();
        yield database_1.default.query(`INSERT INTO users_check (userid, expire_at, uniqid) VALUES (?, ?, ?)`, [id, expire_at, uniqid]);
        yield sendConfirmationMail({
            email,
            firstname,
            lastname,
            uniqid,
            id,
        });
        return yield login({ email, password });
    }
    catch (err) {
        console.log(err);
    }
});
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.default.query(`SELECT id, email, firstname, lastname, password FROM users WHERE email = ?`, [email.toLowerCase()]);
    if (!users.length)
        throw new Error('User does not exists');
    if (!bcrypt_1.default.compareSync(password, users[0].password))
        throw new Error('Bad credentials');
    const { id, firstname, lastname } = users[0];
    const { JWT_KEY } = process.env;
    const token = jsonwebtoken_1.default.sign({
        id,
        email,
        firstname,
        lastname,
    }, JWT_KEY, { expiresIn: 60 * 60 });
    return { token };
});
const user = ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
    const { JWT_KEY } = process.env;
    // console.log(JWT_KEY)
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_KEY);
        const { firstname, lastname, email, id } = decoded;
        const users = yield database_1.default.query(`SELECT id, email, firstname, lastname, is_check FROM users WHERE email = ? AND firstname = ? AND lastname = ? and id = ?`, [email.toLowerCase(), firstname, lastname, id]);
        return Object.assign(Object.assign({}, users[0]), { isLogged: true });
    }
    catch (err) {
        throw err;
    }
});
const userConfirm = ({ uniqid, userid, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userConfirm = yield database_1.default.query(`SELECT * FROM users_check WHERE uniqid = ? AND userid = ?`, [uniqid, userid]);
        if (!userConfirm.length)
            throw new Error('User Confirmation not found or already confirm');
        yield database_1.default.query(`UPDATE users SET is_check = ? WHERE id = ?`, [
            true,
            userid,
        ]);
        yield database_1.default.query(`DELETE FROM users_check WHERE uniqid = ? AND userid = ?`, [uniqid, userid]);
        return { confirmation: true };
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
const resendUserConfirm = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.default.query(`SELECT * FROM users WHERE email = ?`, [email.toLowerCase()]);
        if (!users.length)
            throw new Error('User Confirmation not found or already confirm');
        const { firstname, lastname, id } = users[0];
        const userConfirm = yield database_1.default.query(`SELECT uniqid FROM users_check WHERE userid = ?`, [id]);
        if (!userConfirm.length)
            throw new Error('User Confirmation not found or already confirm');
        console.log(userConfirm);
        const { uniqid } = userConfirm[0];
        yield sendConfirmationMail({
            email,
            firstname,
            lastname,
            uniqid,
            id,
        });
        return true;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.default = { signup, login, user, userConfirm, resendUserConfirm };
//# sourceMappingURL=auth.js.map