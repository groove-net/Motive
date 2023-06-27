const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const API_PORT = process.env.PORT || 3001;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'motive_db',
});

app.use(cors());
app.use(express.json()); // apply middleware to grab as json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get/currentEmails', (req, res) => {
  const sqlSelect = 'SELECT email FROM user_login';
  db.query(sqlSelect, (err, result) => {
    var emails = [];
    var data = JSON.parse(JSON.stringify(result));
    for (var i = 0; i < data.length; i++) {
      emails[i] = data[i].email;
    }
    res.send(emails);
    console.log(emails);
  });
});

app.get('/get/currentUsers', (req, res) => {
  const sqlSelect = 'SELECT username FROM user_login';
  db.query(sqlSelect, (err, result) => {
    var usernames = [];
    var data = JSON.parse(JSON.stringify(result));
    for (var i = 0; i < data.length; i++) {
      usernames[i] = data[i].username;
    }
    res.send(usernames);
    console.log(usernames);
  });
});

// insert information into the databse
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const accountType = req.body.accountType;
  const about = req.body.about;

  const sqlInsertUserLogin =
    'INSERT INTO user_login (id, email, username, password) VALUES (?,?,?,?)';
  const sqlInsertUserInfo =
    'INSERT INTO user_info (id, firstname, lastname, accountType, about) VALUES (?,?,?,?,?)';
  db.query(
    sqlInsertUserLogin,
    [username, email, username, password],
    (err, result) => {
      console.log(result);
    }
  );
  db.query(
    sqlInsertUserInfo,
    [username, firstname, lastname, accountType, about],
    (err, result) => {
      console.log(result);
    }
  );
});

// select information from the databse
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlSelectUserLogin =
    'SELECT * FROM user_login WHERE email = ? AND password = ?';
  db.query(sqlSelectUserLogin, [email, password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: 'Wrong username/password combination' });
    }
  });
});

// get tasklist information
app.get('/tasklist/get/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = 'SELECT * FROM tasklist WHERE id = ?';
  db.query(sqlSelect, id, (err, result) => {
    res.send(result);
  });
});

// get current tasks information
app.get('/tasklist/get/currentTask/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = 'SELECT task FROM tasklist WHERE id = ?';
  db.query(sqlSelect, id, (err, result) => {
    var currentTasks = [];
    var data = JSON.parse(JSON.stringify(result));
    for (var i = 0; i < data.length; i++) {
      currentTasks[i] = data[i].task;
    }
    res.send(currentTasks);
    console.log(currentTasks);
  });
});

// get user type information
app.get('/tasklist/get/userType/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = 'SELECT accountType FROM user_info WHERE id = ?';
  db.query(sqlSelect, id, (err, result) => {
    var currentTasks = '';
    var data = JSON.parse(JSON.stringify(result));
    currentTasks = data[0].accountType;
    res.send(currentTasks);
    console.log(currentTasks);
  });
});

// post tasklist information
app.post('/tasklist/post/:id', (req, res) => {
  const id = req.params.id;
  const task = req.body.task;
  let description = '';
  if (req.body.description === '') {
    description = '...';
  } else {
    description = req.body.description;
  }
  const category = req.body.category;
  const status = req.body.status;

  const sqlInsert =
    'INSERT INTO tasklist (id, task, description, category, status) VALUES (?,?,?,?,?)';
  db.query(
    sqlInsert,
    [id, task, description, category, status],
    (err, result) => {
      // console.log(err);
    }
  );
});

// delete tasklist information
app.delete('/tasklist/delete/:id/:task', (req, res) => {
  const id = req.params.id;
  const task = req.params.task;

  const sqlDelete = 'DELETE FROM tasklist WHERE id = ? AND task = ?';
  db.query(sqlDelete, [id, task], (err, result) => {
    if (err) console.log(err);
  });
});

// update tasklist information
app.put('/tasklist/update/:id/:task', (req, res) => {
  const id = req.params.id;
  const task = req.params.task;
  const status = req.body.status;

  const sqlUpdate = 'UPDATE tasklist SET status = ? WHERE id = ? AND task = ?';
  db.query(sqlUpdate, [status, id, task], (err, result) => {
    if (err) console.log(err);
  });
});

// get notes information
app.get('/notes/get/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = 'SELECT * FROM notes WHERE id = ?';
  db.query(sqlSelect, id, (err, result) => {
    res.send(result);
  });
});

// delete notes information
app.delete('/notes/delete/:id/:title', (req, res) => {
  const id = req.params.id;
  const title = req.params.title;

  const sqlDelete = 'DELETE FROM notes WHERE id = ? AND title = ?';
  db.query(sqlDelete, [id, title], (err, result) => {
    if (err) console.log(err);
  });
});

// get current notes
app.get('/notes/get/currentNotes/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = 'SELECT title FROM notes WHERE id = ?';
  db.query(sqlSelect, id, (err, result) => {
    var currentNotes = [];
    var data = JSON.parse(JSON.stringify(result));
    for (var i = 0; i < data.length; i++) {
      currentNotes[i] = data[i].title;
    }
    res.send(currentNotes);
    console.log(currentNotes);
  });
});

// post notes information
app.post('/notes/post/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;

  const sqlInsert = 'INSERT INTO notes (id, title, content) VALUES (?,?,?)';
  db.query(sqlInsert, [id, title, content], (err, result) => {
    console.log(err);
  });
});

// send friend request
app.post('/friendRequest/:id', (req, res) => {
  const id = req.params.id;
  const username = req.body.username;

  const sqlSelectUserLogin = 'SELECT * FROM user_login WHERE username = ?';
  db.query(sqlSelectUserLogin, [username], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      const sqlSelectRequest =
        'SELECT * FROM friends WHERE sender = ? AND receiver = ?';
      db.query(sqlSelectRequest, [id, username], (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send({
            message: 'You have already sent a friend request to this user',
          });
        } else {
          const sqlSendFriendRequest =
            'INSERT INTO friends (sender, status, receiver) VALUES (?,?,?)';
          db.query(
            sqlSendFriendRequest,
            [id, 'pending', username],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
              res.send({ message: 'Friend request sent!' });
            }
          );
        }
      });
    } else {
      res.send({ message: "Username doesn't exist" });
    }
  });
});

// get pending requests
app.get('/pending/get/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = 'SELECT * FROM friends WHERE receiver = ? AND status = ?';
  db.query(sqlSelect, [id, 'pending'], (err, result) => {
    res.send(result);
  });
});

// accept pending requests
app.put('/pending/accept/:id', (req, res) => {
  const id = req.params.id;
  const sender = req.body.sender;

  const sqlUpdate =
    'UPDATE friends SET status = ? WHERE receiver = ? AND sender = ?';
  db.query(sqlUpdate, ['accepted', id, sender], (err, result) => {
    if (err) console.log(err);
  });
});

// reject pending requests
app.put('/pending/reject/:id', (req, res) => {
  const id = req.params.id;
  const sender = req.body.sender;

  const sqlUpdate =
    'UPDATE friends SET status = ? WHERE receiver = ? AND sender = ?';
  db.query(sqlUpdate, ['rejected', id, sender], (err, result) => {
    if (err) console.log(err);
  });
});

// get friends who you received requests from
app.get('/friendsReceived/get/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect =
    'SELECT sender FROM friends WHERE receiver = ? AND status = ?';
  db.query(sqlSelect, [id, 'accepted'], (err, result) => {
    var friends = [];
    var data = JSON.parse(JSON.stringify(result));
    for (var i = 0; i < data.length; i++) {
      friends[i] = data[i].sender;
    }
    res.send(friends);
  });
});

// get friends who you sent requests to
app.get('/friendsSent/get/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect =
    'SELECT receiver FROM friends WHERE sender = ? AND status = ?';
  db.query(sqlSelect, [id, 'accepted'], (err, result) => {
    var friends = [];
    var data = JSON.parse(JSON.stringify(result));
    for (var i = 0; i < data.length; i++) {
      friends[i] = data[i].receiver;
    }
    res.send(friends);
  });
});

// get tasklist information
app.get('/profile/get/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = 'SELECT * FROM user_info WHERE id = ?';
  db.query(sqlSelect, id, (err, result) => {
    var data = JSON.parse(JSON.stringify(result));
    res.send(data[0]);
  });
});

// get pending tasks
app.get('/pendingTasks/get/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect =
    'SELECT * FROM tasklist WHERE id = ? AND (status = ? OR status = ?)';
  db.query(sqlSelect, [id, 'To Do', 'In Progress'], (err, result) => {
    res.send(result);
  });
});

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
