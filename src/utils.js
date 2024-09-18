
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const createHash = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

export const isValidPassword = (user, pass) => bcrypt.compareSync(pass,user.password);

const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/public/img')
    },
    filename: (req, file, callback) => {
        callback(null,file.originalname)
    }
})

export const uploader = multer({ storage })

export const getJWTCookie = (req) => {
    let token = null;
    if(req.signedCookies){
        token = req.signedCookies['currentUser']
    }
    console.log(token, '<=== desde el metodo de extraccion')
    return token
}

export const generadorToken = (user) => {
    const token = jwt.sign(user,process.env.SECRET,{ expiresIn: '1m' })
    return token
}
