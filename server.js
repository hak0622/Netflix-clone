var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors'); // CORS 정책 해결을 위한 라이브러리

app.use(cors()); // 모든 요청에 대해 CORS를 허용합니다.
app.use(express.json());

app.get('/', function (req, res) {
  db.query('SELECT * FROM user', function (error, results, fields) {
    if (error) {
        res.status(500).send('서버 에러입니다.');
        return;
    }
    res.send(results);
  });
});

app.post('/api/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  var sql = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';
  db.query(sql, [username, password, email], function (error, results, fields) {
    if (error) {
      res.status(500).send('회원가입 중 에러가 발생했습니다.');
      return;
    }
    res.send({ message: '회원가입이 성공적으로 완료되었습니다.' });
  });
});

app.post('/api/Login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [email], function (error, results, fields) {
    if (error) {
      console.error(error); 
      res.status(500).send('로그인 중 에러가 발생했습니다.');
      return;
    }

    if (results.length === 0) {
      res.status(400).send('해당 이메일을 가진 사용자가 없습니다.');
      return;
    }

    var user = results[0];
    if (user.password !== password) {
      res.status(400).send('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    res.send({ message: '로그인에 성공했습니다.' });
  });
});

app.get('/api/check-email', function (req, res) {
  var email = req.query.email;

  var sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [email], function (error, results, fields) {
    if (error) {
      res.status(500).send('이메일 중복 확인 중 에러가 발생했습니다.');
      return;
    }

    if (results.length > 0) { 
      res.send({ isDuplicated: true });  // 이메일이 중복됨
    } else {
      res.send({ isDuplicated: false }); // 이메일이 중복되지 않음
    }
  });
});

app.listen(4000, function () {
  console.log('App is listening on port 4000!');
});
