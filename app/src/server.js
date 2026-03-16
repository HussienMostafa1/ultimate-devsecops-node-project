const express = require('express');
const { exec } = require('child_process'); 
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Ultimate DevSecOps Project is Running! 🚀</h1>');
});

// 1. ثغرة Information Exposure
app.get('/info', (req, res) => {
  res.json(process.env); 
});

// 2. ثغرة XSS
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello, ${name}</h1>`); 
});

// 3. ثغرة Command Injection
app.get('/ping', (req, res) => {
  const ip = req.query.ip;
  exec(`ping -c 4 ${ip}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(error.message);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

// 🚀 التعديل الصحيح: بنفتح السيرفر "بشرط" إنه ميكونش جاري اختباره
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = app;
