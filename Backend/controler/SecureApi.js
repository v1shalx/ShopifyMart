// creat json web token
const creatJwtToken = async (req, res) => {
    const token = global.jwt.sign(req.body, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }).send({ message: "token created success" });
};

//delete jwt token
const deleteJwtToken = async (req, res) => {
    res.clearCookie("token").send({ message: "token delete success" });
};

// // verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({ message: "Unauthorized" });
    }
    global.jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
            res.status(408).send({ message: "Request timeout" });
        }
        req.user = decode;
        next();
    });
};

module.exports = {
    creatJwtToken,
    deleteJwtToken,
    verifyToken
};
