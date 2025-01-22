const User = require('../models/User');

// @desc    Kullanıcı girişi
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Yeni kullanıcı oluşturma
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'Bu email zaten kullanılıyor' });
      return;
    }

    const user = await User.create({
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(400).json({ message: 'Geçersiz kullanıcı bilgileri' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser
}; 