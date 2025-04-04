import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaches user info (id, role)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

export const userOnly = (req, res, next) => {
  if (req.user?.role !== 'user') {
    return res.status(403).json({ message: 'User access only' });
  }
  next();
};

