const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const TokenIssue = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded Firebase Token:", decodedToken); // Debugging

        const appJWT = jwt.sign(
            { uid: decodedToken.uid, email: decodedToken.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token: appJWT });
    } catch (error) {
        console.error("Error verifying token:", error.message);
        res.status(401).json({ error: "Invalid Firebase token", details: error.message });
    }
};

module.exports = { TokenIssue };
