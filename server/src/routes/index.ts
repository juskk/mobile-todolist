import { Application } from "express";
import todosRouter from "./api/todos.route";
import authRoutes from './api/user'
const passport = require('passport');

class AppRouter {
    constructor(private app: Application) {}
    init() {
        this.app.get("/", (_req, res) => {
            res.send("API Running");
        });
        this.app.use("/api/todos", todosRouter);
        this.app.use('/auth', authRoutes);
    }
}

export default AppRouter;