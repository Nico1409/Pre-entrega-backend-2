import { Router } from "express";
import {login, register} from "../controllers/user.controller.js"
import passport from "passport";
import {invokePassport} from "../middlewares/handlerError.js"

const router = Router()

router.post('/login',login)
router.post('/register', register)

router.get('/current', invokePassport('jwt'),(req,res)=>{
    console.log(req.user)
    res.send(req.user)
})
export default router;