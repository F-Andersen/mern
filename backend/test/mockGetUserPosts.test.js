import { getUserPosts } from "../controllers/posts.js"; // Замініть "your-module" на шлях до вашого модуля

// Приклад тесту getUserPosts
describe("getUserPosts", () => {
  it("should get user posts", async () => {
    const req = {
      params: {
        userId: "user-id",
      },
    };

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

    await getUserPosts(req, res);

    // Перевірка викликів
    expect(Post.find).toHaveBeenCalledWith({ userId: "user-id" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });
});