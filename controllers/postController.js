const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../data', 'posts.json');

// Get all posts
exports.getPosts = (req, res) => {
  fs.readFile(postsFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading posts file');
    }

    const postsArray = JSON.parse(data);
    res.type('application/json');
    res.json(postsArray);
  });
};

// Get a single post by ID
exports.getPostById = (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(postsFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading posts file');
    }

    const postsArray = JSON.parse(data);
    const post = postsArray.find(p => p.id === id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.type('application/json');
    res.json(post);
  });
};
