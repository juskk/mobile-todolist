import { Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { ValidationFactory } from "../../factories/validators.factory";
const passport = require('passport');

const userController = new UserController()
const validationFactory = new ValidationFactory()
const router: Router = Router();

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.status(200).json({ success: true, message: 'passed' })
} )

router.post('/login', userController.logIn);

router.post(
  "/signup",
  validationFactory.userValidationParams,
  validationFactory.checkValidity,
  userController.signUp
);


export default router;
