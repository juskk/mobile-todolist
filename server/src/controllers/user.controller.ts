import { Response, Request } from 'express'

import { StatusHandler } from '../factories/validators.factory';
import User, { IUser, genPassword, validPassword } from '../models/User'
import { issueJWT } from '../middlewares/auth.middleware';

const statusHandler = new StatusHandler()

export class UserController {
  logIn(req: Request, res: Response, next: any) {
    try {
      User.findOne({ email: req.body.email })
      .then( (user: IUser) => {
        const isValid = validPassword(req.body.password, user.hash, user.salt)
        if (isValid) {
          const tokenObj = issueJWT(user)
          const data = { success: true, token: tokenObj.token, expiresIn: tokenObj.expires, id: user._id };
          statusHandler.Success(res, data)
        } else {
          statusHandler.Unauthorized(res, 'wrond password')
        }
      })
      .catch( () => {
        statusHandler.Unauthorized(res, 'coudnt find user')
      } )
    } catch(e) {
      statusHandler.NotFound(res, 'bad request')
    }
  }

  signUp(req: Request, res: Response, next: any) {
    User.findOne({ email: req.body.email }, async function (err: Error, obj: any) {
      if (obj) {
        statusHandler.Unauthorized(res, 'email exists')
      } else {
        try {
          const saltHash = genPassword(req.body.password)
          const salt = saltHash.salt;
          const hash = saltHash.hash;
          const newUser = new User({
            email: req.body.email,
            salt,
            hash
          })
          const user: IUser = await newUser.save()
          const jwt = issueJWT(user)
          res.json({ success: true, user, token: jwt.token, expiresIn: jwt.expires })
        } catch(e) {
          statusHandler.Unauthorized(res, e)
        }
      }
    })
  }
}
