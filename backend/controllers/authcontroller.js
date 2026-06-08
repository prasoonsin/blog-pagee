// controllers/authController.js
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        email,
        role: 'admin'
      }
    });

  } catch (err) {
    return res.status(500).json({ error: 'Server error during login' });
  }
};