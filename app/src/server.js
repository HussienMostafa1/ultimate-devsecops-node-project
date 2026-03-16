const express = require('express');
const { exec } = require('child_process'); // خطر جداً لو استخدم غلط
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Ultimate DevSecOps Project is Running! 🚀</h1>');
});

// 1. الثغرة القديمة (Information Exposure)
app.get('/info', (req, res) => {
  res.json(process.env); 
});

// 2. ثغرة XSS (Cross-Site Scripting) ⚠️
// أي حد يبعت كود JavaScript في الـ URL هيتنفذ في المتصفح
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello, ${name}</h1>`); // خطر: مفيش فحص للمدخلات (Sanitization)
});

// 3. ثغرة Command Injection (أخطر نوع) 💀
// بيسمح للمستخدم ينفذ أوامر Terminal على السيرفر بتاعك
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}
module.exports = app; // ده السطر المهم عشان التيست يشوفه
