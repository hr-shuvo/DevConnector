import User from '../models/UserModel.js';
import {StatusCodes} from "http-status-codes";


export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);


        return res.status(StatusCodes.CREATED).json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required!' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }
        const token = user.generateToken();
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}