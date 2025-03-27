import Admin from '../model/adminModel.js'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET || 'ghfydjSDfatGH243$%GH&*'

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.find();
        console.log('admin', admin)
        const adminExist = await Admin.findOne({ email });
        if (!adminExist) {
            return res.status(400).json({
                reponse: 400,
                msg: 'You are not Registered yet!',
                success: false
            });
        }

        if (adminExist.password !== password) {
            return res.status(400).json({
                reponse: 400,
                msg: 'Invalid email or password',
                success: false
            });
        }

        const payload = {  userId: adminExist._id, role: 'admin', email, password };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return res.status(200).json({
            reponse: 200,
            msg: 'User signin successfully',
            data: { token },
            success: false
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
