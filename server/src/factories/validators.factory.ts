const { body, check, validationResult } = require('express-validator/check')
import { Response } from 'express'

export class StatusHandler {
    Success(res: Response, data?: any) {
        return res.status(200).json(data)
    }
    Created(res: Response, data?: any) {
        return res.status(201).json(data)
    }
    BadRequest(res: Response, errorMessage?: string) {
        return res.status(400).json({ message: `Bad request. ${ errorMessage }` })
    }
    Unauthorized(res: Response, errorMessage?: string) {
      return res.status(401).json({ message: `Auth error. ${ errorMessage }` })
    }
    NotFound(res: Response, errorMessage?: string) {
        return res.status(404).json({ message: `Not found. ${ errorMessage }` })
    }

}

const status = new StatusHandler()

export class ValidationFactory {
    todoValidationParams = [
        body('title').isLength({min: 5}),
        body('description').isLength({min: 10})
    ]
    userValidationParams = [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    ]
    checkValidity(req: any, res: any, next: any) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return status.BadRequest(res)
        next()
    }
}