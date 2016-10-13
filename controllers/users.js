var User = require('../models/user');
var express = require('express');
var router = express.Router();

// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

// DELETE /users/:id
// Delete a user by id
router.delete('/:id', function(req, res) {
  User.findOne(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error finding user: " + err
      });
    }
    if (!user) {
      return res.status(404).send(err);
    }
    user.remove(function(err) {
      if (err) {
        return res.status(500).json({
          error: "Error deleting user: " + err
        });
      }
    });
  });
});

// PUT /users/:id
// Update a user
router.put('/:id', function(req, res) {
  User.update(req.params.id, req.body, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error finding user: " + err
      });
    }
    if (!user) {
      return res.status(404).send("User does not exist: " + err);
    }
    return res.json(user);
  });
});

// POST /users
// Create a user
router.post('/', function(req, res) {
  User.save(req.body, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error creating user: " + err
      });
    }
    if (!user) {
      return res.status(404).send("User does not exist: " + err);
    }
    return res.json(user);
  });
});


module.exports = router;
