import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  const token = req.cookies?.token; // read cookie
  // console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, iat, exp }
    next(); // proceed to the next middleware/route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
