const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Could not retrieve list of users" });
    });
});

router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified id does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not retrieve user" });
    });
});

router.post("/", (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ errorMessage: "Please provide a username" });
  } else {
    Users.add(req.body)
      .then(saved => {
          res.status(201).json(saved)
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "Could not add user to the database" });
      });
  }
});

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(removed => {
        if (removed) {
            res.status(200).json(removed)
        } else {
            res.status(404).json({ errorMessage: 'The user with the specified id does not exist.' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: "Could not remove user from the database." })
    })
})

module.exports = router;