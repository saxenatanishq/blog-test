const {validateToken} = require("../services/auth");

function CheckAuth(cookieName) {
    return (req, res, next) => {
        const token = req.cookies[cookieName];
        if(token){
            try{
                const userPayload = validateToken(token);
                req.user = userPayload;
            }catch(err) {}
        }
        return next();
    }
}

module.exports = CheckAuth;