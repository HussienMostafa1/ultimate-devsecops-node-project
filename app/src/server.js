const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const port = 3000;

// 1. [A01:Broken Access Control] - IDOR (Insecure Direct Object Reference)
app.get('/api/user/:id', (req, res) => {
  // خطر: أي حد يغير الـ ID يشوف بيانات غيره بدون التأكد من هويته
  res.send(`Fetching data for user: ${req.params.id}`); 
});

// 2. [A02:Cryptographic Failures] - Weak Hashing
app.get('/hash-password', (req, res) => {
  const hash = crypto.createHash('sha1').update(req.query.p).digest('hex'); // SHA1 ضعيفة ومكشوفة
  res.send(hash);
});

// 3. [A03:Injection] - SQL Injection (Simulated string concat)
app.get('/search', (req, res) => {
  const query = "SELECT * FROM products WHERE name = '" + req.query.name + "'"; // كوارث الـ Injection
  res.send(`Executing: ${query}`);
});

// 4. [A03:Injection] - OS Command Injection
app.get('/system-check', (req, res) => {
  exec(`nslookup ${req.query.domain}`, (err, out) => res.send(out)); // تحكم في السيرفر
});

// 5. [A03:Injection] - Reflected XSS
app.get('/greet', (req, res) => {
  res.send(`<h1>Welcome ${req.query.user}</h1>`); // حقن سكريبتات في المتصفح
});

// 6. [A04:Insecure Design] - Direct Trust in Client Data
app.post('/set-admin', (req, res) => {
  const isAdmin = req.body.isAdmin; // العميل هو اللي بيحدد لنفسه الصلاحية! تصميم فاشل
  res.send(`Admin status: ${isAdmin}`);
});

// 7. [A05:Security Misconfiguration] - Directory Traversal (LFI)
app.get('/download', (req, res) => {
  const path = './files/' + req.query.file; 
  res.send(fs.readFileSync(path)); // ممكن يقرأ ملفات النظام زي /etc/shadow
});

// 8. [A07:Identification & Authentication Failures] - Hardcoded Secret
const JWT_SECRET = "super_secret_12345"; // فضيحة أمنية: المفروض يكون في .env

// 9. [A08:Software & Data Integrity Failures] - Insecure Deserialization
app.post('/profile', (req, res) => {
  // محاكاة لاستقبال Object معقد وتنفيذه بدون فحص (Deserilization attack)
  const userObj = JSON.parse(req.body.data); 
  res.json(userObj);
});

// 10. [A10:Server-Side Request Forgery - SSRF]
app.get('/fetch-url', (req, res) => {
  const target = req.query.url;
  // خطر: السيرفر ممكن ينفذ طلبات داخلية (Internal) نيابة عن الهكر
  res.send(`Fetching data from: ${target}`);
});

if (require.main === module) {
  app.listen(port, () => console.log(`The 10/10 Lab is running on ${port}`));
}
module.exports = app;
