const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

//! DEPRECATED TO WORK WITH VANILLA HTML FORMS
// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

//* NEW ROUTES TO WORK WITH VANILLA HTML FORMS
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { mode } = req.body;

    if (mode === 'create') {
      await userController.createUser(req.body);
      res.redirect('/users');
    }

    else if (mode === 'update') {
      await userController.updateUser(req.body);
      res.redirect('/users');
    }

    else if (mode === 'delete') {
      await userController.deleteUser(req.body);
      res.redirect('/users');
    }

    else {
      res.status(400).send({ message: 'Invalid mode' });
    }
  }

  catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;