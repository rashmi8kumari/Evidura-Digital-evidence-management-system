import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// route-level role guard
export const requireRole = (roles = []) => (req, res, next) => {
  // roles can be single string or array
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  if (!allowed.includes(req.user.role)) return res.status(403).json({ msg: "Forbidden: insufficient role" });
  next();
};



