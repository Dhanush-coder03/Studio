/**
 * Auth Controller for Velu Photography Studio
 * Manages admin authentication & credential verification
 */

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const expectedEmail = (process.env.ADMIN_EMAIL || 'admin@velustudio.com').trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email.trim().toLowerCase() !== expectedEmail || password !== expectedPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please check your credentials.',
      });
    }

    // Success
    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      user: {
        email: expectedEmail,
        role: 'admin',
        name: 'Studio Administrator',
      },
      token: `velu-auth-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

export const verifyAdminSession = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No authorization token provided.' });
  }

  return res.status(200).json({
    success: true,
    user: {
      email: (process.env.ADMIN_EMAIL || 'admin@velustudio.com').trim().toLowerCase(),
      role: 'admin',
    },
  });
};

