import connection from "./../config/database"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import uuidv1 from "uuid/v1"
import moment from "moment"
import nodemailer from "nodemailer"
import Email from "email-templates"
import path from "path"

const hashPassword = (password: string) => bcrypt.hashSync(password, 10)

export interface IUser {
  firstname?: string
  lastname?: string
  id?: Number
  email?: string
  password?: string
}

const sendConfirmationMail = ({
  email,
  firstname,
  lastname,
  uniqid,
  id,
}: any) => {
  const { GMAIL_ACCOUNT, GMAIL_PASSWORD } = process.env

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_ACCOUNT,
      pass: GMAIL_PASSWORD,
    },
  })

  new Email({
    transport: transporter,
    message: {
      from: GMAIL_ACCOUNT,
    },
    send: true,
    preview: false,
    views: {
      options: {
        extension: "pug",
      },
      root: path.join(__dirname, "..", "config", "email-templates"),
    },
  })
    .send({
      template: "signup",
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
    .then(() => console.log("email has been send!"))
}

const signup = async ({ firstname, lastname, email, password }: IUser) => {
  if (!email || !password) {
    throw new Error("You must provide an email and password.")
  }
  try {
    const existingUser = await connection.query(
      `SELECT (email) FROM users WHERE email = ?`,
      [email.toLowerCase()]
    )
    if (existingUser.length) {
      throw new Error("Email in use")
    }
    const hash = hashPassword(password)
    await connection.query(
      `INSERT INTO users (email, password, firstname, lastname, is_check) VALUES (?, ?, ?, ?, ?)`,
      [email.toLowerCase(), hash, firstname, lastname, false]
    )
    const users = await connection.query(
      `SELECT id, email, firstname, lastname, password FROM users WHERE email = ?`,
      [email.toLowerCase()]
    )
    const { id } = users[0]
    const uniqid = uuidv1()
    const expire_at = moment((moment().unix() + 2 * 24 * 60 * 60) * 1000).unix()

    await connection.query(
      `INSERT INTO users_check (userid, expire_at, uniqid) VALUES (?, ?, ?)`,
      [id, expire_at, uniqid]
    )
    await sendConfirmationMail({
      email,
      firstname,
      lastname,
      uniqid,
      id,
    })

    return await login({ email, password })
  } catch (err) {
    console.log(err)
  }
}

const login = async ({ email, password }: IUser) => {
  const users = await connection.query(
    `SELECT id, email, firstname, lastname, password FROM users WHERE email = ?`,
    [email.toLowerCase()]
  )
  if (!users.length) throw new Error("User does not exists")
  if (!bcrypt.compareSync(password, users[0].password))
    throw new Error("Bad credentials")
  const { id, firstname, lastname } = users[0]
  const { JWT_KEY } = process.env
  const token = jwt.sign(
    {
      id,
      email,
      firstname,
      lastname,
    },
    JWT_KEY,
    { expiresIn: 60 * 60 }
  )
  return { token }
}

const user = async ({ token }: { token: string }) => {
  const { JWT_KEY } = process.env
  try {
    const decoded = jwt.verify(token, JWT_KEY)
    const { firstname, lastname, email, id }: any = decoded
    const users = await connection.query(
      `SELECT id, email, firstname, lastname, is_check FROM users WHERE email = ? AND firstname = ? AND lastname = ? and id = ?`,
      [email.toLowerCase(), firstname, lastname, id]
    )
    const tokenRegen = jwt.sign(
      {
        id,
        email,
        firstname,
        lastname,
      },
      JWT_KEY,
      { expiresIn: 60 * 60 }
    )
    return { ...users[0], token: tokenRegen, isLogged: true }
  } catch (err) {
    throw err
  }
}

const userConfirm = async ({
  uniqid,
  userid,
}: {
  uniqid: string
  userid: string
}) => {
  try {
    const userConfirm = await connection.query(
      `SELECT * FROM users_check WHERE uniqid = ? AND userid = ?`,
      [uniqid, userid]
    )
    if (!userConfirm.length)
      throw new Error("User Confirmation not found or already confirm")

    await connection.query(`UPDATE users SET is_check = ? WHERE id = ?`, [
      true,
      userid,
    ])
    await connection.query(
      `DELETE FROM users_check WHERE uniqid = ? AND userid = ?`,
      [uniqid, userid]
    )
    return { confirmation: true }
  } catch (err) {
    console.log(err)
    throw err
  }
}

const resendUserConfirm = async ({ email }: IUser) => {
  try {
    const users = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email.toLowerCase()]
    )
    if (!users.length)
      throw new Error("User Confirmation not found or already confirm")
    const { firstname, lastname, id } = users[0]
    const userConfirm = await connection.query(
      `SELECT uniqid FROM users_check WHERE userid = ?`,
      [id]
    )
    if (!userConfirm.length)
      throw new Error("User Confirmation not found or already confirm")
    console.log(userConfirm)
    const { uniqid } = userConfirm[0]
    await sendConfirmationMail({
      email,
      firstname,
      lastname,
      uniqid,
      id,
    })
    return true
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default { signup, login, user, userConfirm, resendUserConfirm }
