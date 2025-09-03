const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data', 'users.json');

console.log(usersFile, "usersFile");


// Get all users
exports.getUsers = (req, res) => {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading users file');
    }

    const usersArray = JSON.parse(data);
    res.type('application/json');
    res.json(usersArray);
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading users file');
    }

    const usersArray = JSON.parse(data);
    const user = usersArray.find(u => u.id === id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.type('application/json');
    res.json(user);
  });
};
