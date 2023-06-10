import { createPost } from "../controllers/posts.js"; // Замініть "your-module" на шлях до вашого модуля

// Моки для моделей Post і User
jest.mock("../models/Post.js", () => jest.fn());
jest.mock("../models/User.js", () => jest.fn());

// Приклад тесту createPost
describe("createPost", () => {
  it("should create a new post", async () => {
    const req = {
      body: {
        userId: "user-id",
        description: "Test description",
        picturePath: "test/image.jpg",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      location: "Test location",
      picturePath: "test/user.jpg",
    };

    const mockPost = {
      save: jest.fn(),
    };

    // Мокування функцій
    User.findById = jest.fn().mockResolvedValue(mockUser);
    Post.mockImplementation(() => mockPost);

    await createPost(req, res);

    // Перевірка викликів
    expect(User.findById).toHaveBeenCalledWith("user-id");
    expect(Post).toHaveBeenCalledWith({
      userId: "user-id",
      firstName: "John",
      lastName: "Doe",
      location: "Test location",
      description: "Test description",
      userPicturePath: "test/user.jpg",
      picturePath: "test/image.jpg",
      likes: {},
      comments: [],
    });
    expect(mockPost.save).toHaveBeenCalled();
    expect(Post.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });
});