import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { authorization: token } = req.headers;
        console.log(token, '1111111111');


        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Please log in again.' });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);

        //console.log(token_decode);
        //const data = JSON.parse(token_decode)
        if (data.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Invalid credentials.' });
        }

        next();
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(401).json({ success: false, message: 'Authorization failed. ' + error.message });
    }
}

export default adminAuth;
