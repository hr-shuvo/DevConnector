import User from '../models/UserModel.js';
import {StatusCodes} from "http-status-codes";
import {comparePassword, hashPassword} from "../utils/passwordUtils.js";
import {UnAuthenticateError} from "../errors/customError.js";
import {createJWT} from "../utils/tokenUtils.js";


export const register = async (req, res) => {
    try {
        const isFirstAccount = (await User.countDocuments()) === 0;
        req.body.role = isFirstAccount ? 'admin' : 'user';

        req.body.password = await hashPassword(req.body.password);

        await User.create(req.body);

        return res.status(StatusCodes.CREATED).json({ msg: 'User created' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnAuthenticateError('Invalid credentials!');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new UnAuthenticateError('Invalid credentials!');
    }

    const token = createJWT({ id: user._id, role: user.role });

    return res.status(200).json({ token });
}