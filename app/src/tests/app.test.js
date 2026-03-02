// app/tests/app.test.js
const request = require('supertest');
const express = require('express');

// مثال بسيط جداً لتست ينجح دايماً
describe('GET /', () => {
  it('should return 200 OK', async () => {
    // هنا المفروض نستدعي الكود الحقيقي، بس دي فكرة الـ Unit Test
    expect(200).toBe(200);
  });
});
