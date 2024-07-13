const { editReview } = require('../controllers/reviewController');
const User = require('../model/userModel.js');
const Review = require('../model/reviewModel.js');

jest.mock('../model/userModel.js');
jest.mock('../model/reviewModel.js');

describe('editReview', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { username: 'testUser' },
      params: { reviewId: 'testReviewId' },
      body: { text: 'Updated review text' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should edit the review successfully', async () => {
    const mockUser = { username: 'testUser' };
    const mockReview = {
      content: 'Original review text',
      author: mockUser,
      save: jest.fn()
    };

    User.findOne.mockResolvedValue(mockUser);
    Review.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockReview)
    });

    await editReview(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testUser' });
    expect(Review.findOne).toHaveBeenCalledWith({ _id: 'testReviewId' });
    expect(mockReview.content).toBe('Updated review text');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Review edited successfully' });
  });

  it('should handle errors when saving the review', async () => {
    const mockUser = { username: 'testUser' };
    const mockReview = {
      content: 'Original review text',
      author: mockUser,
      save: jest.fn().mockRejectedValue('Save error')
    };

    User.findOne.mockResolvedValue(mockUser);
    Review.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockReview)
    });

    await editReview(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testUser' });
    expect(Review.findOne).toHaveBeenCalledWith({ _id: 'testReviewId' });
    expect(mockReview.content).toBe('Updated review text');
    expect(mockReview.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error editing review'
    });
  });
});
