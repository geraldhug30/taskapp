const request = require('supertest');
const app = require('../app.js');

describe('Test Mood_Data', () => {
  it('Should post a data to database', async () => {
    await request(app)
      .post('/api/mood')
      .send({
        employeeID: 810770,
        moodMeter: 9,
        workShifts: 'Start',
        reviewersReason: 'Home',
        ownWordReason: 'Lorem Ipsum ...',
      })
      .expect(201);
  });
});
