const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userController = require('../controllers/userController');
const Feature = require('../model/featureModel');
const User = require('../model/userModel');

app.use(express.json());
app.post('/add-fav', userController.addWatchList);

jest.mock("../model/featureModel.js");
jest.mock("../model/userModel.js")

describe('User Controller - Add to Fav', () => {
    it('should respond with status 202 for add-fav route', async () => {
        const response = await request(app)
            .post('/add-fav')
            .send({ variable: 'testVariable' });

            console.log()
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Accepted');
    });
    it('test that body message is Accepted', async () => {
        const response = await request(app)
            .post('/add-fav')
            .send({ variable: 'testVariable' });

        
        expect(response.body.message).toBe('Accepted');
        //expect(response.body.variable).toBe('testVariable');
    });
});











/* 
const userId = '60c72b2f9b1d8b3a2c8a3e4e';

const userPayload = new User({
    //_id: userId,
    username:"jane",
    password: '333444'
});



// Mock the models using jest.mock with the correct path
jest.mock('../model/featureModel');
jest.mock('../model/userModel');

app.use(express.json());
app.post('/add-like', userController.addWatchList);

describe('User Controller - Add to Liked DB', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls between tests
  });

  it('should create a new feature and add a like', async () => {
    const userId = '60c72b2f9b1d8b3a2c8a3e4e';
    const featureId = new mongoose.Types.ObjectId().toHexString();

    Feature.findById.mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null)
    }));

    User.findById.mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue({
        _id: userId,
        liked: [],
        save: jest.fn().mockResolvedValue()
      })
    }));

    Feature.mockImplementation(() => ({
      _id: featureId,
      title: 'New Feature',
      type: 'example',
      liked: [userId],
      save: jest.fn().mockResolvedValue({
        _id: featureId,
        title: 'New Feature',
        type: 'example',
        liked: [userId]
      })
    }));

    const response = await request(app)
      .post('/add-like')
      .send({ featureId, userId, title: 'New Feature', type: 'example' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Created feature and added to liked');
    expect(response.body.feature.title).toBe('New Feature');
    expect(response.body.feature.type).toBe('example');
    expect(response.body.feature.liked).toContain(userId);

    expect(Feature).toHaveBeenCalled();
    expect(Feature.findById).toHaveBeenCalledWith(featureId);
    expect(User.findById).toHaveBeenCalledWith(userId);
  });
});
 */