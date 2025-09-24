const { PrismaClient } = require('prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash: password, displayName }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ eroor: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jsonWebToken.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWS_EXPIRES_IN });
    res.json({ token });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllusers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};