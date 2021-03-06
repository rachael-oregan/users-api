var User = require('../models/user');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    return res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    return res.json(user);
  });
});

// DELETE /users/:id
// Delete a user by id
router.delete('/:id', function(req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return res.status(500).json({
        error: "Error deleting user: " + err
      });
    }
    else {
      return res.status(200).json({
        success: "User deleted!"
      });
    }
  });
});

// PUT /users/:id
// Update a user
router.put('/:id', bodyParser.json(), function(req, res) {
  var updateFields = req.body;
  User.findByIdAndUpdate({_id: req.params.id}, {$set: updateFields}, {new: true}, function(err, user) {
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
router.post('/', bodyParser(), function(req, res) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error creating user: " + err
      });
    }
    return res.json(user);
  });
});


module.exports = router;
