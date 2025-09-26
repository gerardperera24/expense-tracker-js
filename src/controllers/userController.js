const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    //Hashing the password
    const hash = await bcrypt.hash(password, 10);

    //Saving the user in the database
    const user = await prisma.user.create({
      data: { email, passwordHash: hash, displayName }
    });

    //Excluding the password from teh response
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    res.status(400).json({ error: 'Could not register user' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    //Generate JWT
    const token = jsonWebToken.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Getting all registered users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, displayName: true } });
    res.json(users);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};
