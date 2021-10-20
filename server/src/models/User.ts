import { Document, Model, model, Schema } from "mongoose";
const crypto = require('crypto')

export interface IUser extends Document {
  email: string,
  hash: string,
  salt: string,
  date: Date
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


const User: Model<IUser> = model("User", userSchema);

export function validPassword(password: string, hash: string, salt: string) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === hashVerify
}

export function genPassword(password: string): { salt: string, hash: string } {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return {
    salt,
    hash
  }
}

export default User;
