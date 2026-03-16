const request = require('supertest');
const app = require('../server'); // بننادي الكود الحقيقي بتاعنا

describe('Security & Functionality Tests', () => {
  
  // 1. تيست الصفحة الرئيسية
  it('should return 200 for the home page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Ultimate DevSecOps');
  });

  // 2. تيست ثغرة الـ Info (الخطر)
  it('should return server info (The Vulnerability)', async () => {
    const res = await request(app).get('/info');
    expect(res.statusCode).toEqual(200);
    // التيست ده "بيلمس" الكود اللي فيه ثغرة فالسونار يعرف إننا اختبرناه
  });

  // 3. تيست ثغرة الـ XSS
  it('should reflect the name in greet (XSS)', async () => {
    const res = await request(app).get('/greet?name=Hussien');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Hello, Hussien');
  });
});
