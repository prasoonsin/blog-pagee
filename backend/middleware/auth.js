// middleware/auth.js
import jwt from 'jsonwebtoken';

// Check if user is logged in
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Login required. Token not found.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Allow only admin users
export const authorizeAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Access denied. Admins only.' });
};
