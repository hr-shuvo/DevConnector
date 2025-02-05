import {UnAuthenticateError} from "../errors/customError.js";
import {verifyJWT} from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    console.log('Authenticating user...');

    const {token} = req.cookies;
    if (!token) {
        throw new UnAuthenticateError('You need to login to access this route');
    }

    try{
        const {userId, role} = verifyJWT(token);

        req.user = {userId, role};


        next();
    }
    catch (e) {
        throw new UnAuthenticateError('You need to login to access this route');
    }



}