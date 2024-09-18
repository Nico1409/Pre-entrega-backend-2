import passport from "passport"

export const invokePassport = strategy =>{
    return (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if(err) return next(err);
            if(!user){
                return res.status(401).json({ error: info.messages ? info.messages: info.toString() })
            }
            req.user = user; // user -> el payload del token decodificado
            next();
        })(req, res, next);
    }
}


// const suma = (num1, num2) => {
//     return (multiplo) => num1 + num2 * multiplo
// }

// suma(1,2)(5) // 15 
