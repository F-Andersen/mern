import { getFeedPosts } from "../controllers/posts.js"; // Замініть "your-module" на шлях до вашого модуля

// Приклад тесту getFeedPosts
describe("getFeedPosts", () => {
  it("should get all feed posts", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockPosts = [
      { _id: "post-id-1", description: "Post 1" },
      { _id: "post-id-2", description: "Post 2" },
    ];

    // Мокування функцій
    Post.find = jest.fn().mockResolvedValue(mockPosts);

    await getFeedPosts(req, res);

    // Перевірка викликів
    expect(Post.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });
});