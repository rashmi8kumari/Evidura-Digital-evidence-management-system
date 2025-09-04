import jwt from "jsonwebtoken";

// Verify JWT token and attach user to req
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// Role-based guard (used on routes)
export const requireRole = (roles = []) => {
  return (req, res, next) => {
    const allowed = Array.isArray(roles) ? roles : [roles];

    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized: No user context" });
    }

    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden: insufficient role" });
    }

    next();
  };
};




