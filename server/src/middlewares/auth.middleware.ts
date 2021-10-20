const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt

import User, { IUser } from '../models/User'

const privKeyPath = path.join(__dirname, '..', '/keys', 'id_rsa_priv.pem')
const pubKeyPath = path.join(__dirname, '../keys', 'id_rsa_pub.pem')

const PRIV_KEY = fs.readFileSync(privKeyPath, 'utf8')
const PUB_KEY = fs.readFileSync(pubKeyPath, 'utf8')

export function issueJWT(user: IUser) {
    const _id: string = user._id;
    const expiresIn: string = '1d'
    const payload: {sub: string, iat: number} = {
        sub: _id,
        iat: Date.now()
    }
    const signedToken: string = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256' })

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn
    } 
}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

export const strategy = new JwtStrategy(options, (payload: any, done: any) => {
    User.findOne({_id: payload.sub})
        .then(user => {
            if (user) return done(null, user)
            else return done(null, false)
        })
        .catch(err => done(err, null))
})


