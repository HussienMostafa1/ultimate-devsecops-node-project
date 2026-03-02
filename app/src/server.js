const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Ultimate DevSecOps Project is Running! 🚀</h1>');
});

// ⚠️ ثغرة مقصودة: إظهار معلومات السيرفر للعامة (SonarQube مش هيحب ده!)
app.get('/info', (req, res) => {
  res.send(process.env); // ده خطر جداً! بيطلع كل أسرار السيرفر
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
