import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({
                success: false,
                message: "Not Authorised Login Again"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.json({
                success: false,
                message: "Token Missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded.id;

        next();

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default authUser;