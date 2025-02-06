const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await userController.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'Missing fields') {
      console.error(error);
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userController.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    if (error.message === 'Missing fields' || error.message === 'User not found') {
      console.error(error);
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await userController.deleteUser(req.params.id);
    res.status(200).send();
  } catch (error) {
    if (error.message === 'User not found') {
      console.error(error);
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;