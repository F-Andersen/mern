import { likePost } from "../controllers/posts.js"; // Замініть "your-module" на шлях до вашого модуля

// Приклад тесту likePost
describe("likePost", () => {
  it("should like/unlike a post", async () => {
    const req = {
      params: {
        id: "post-id",
      },
      body: {
        userId: "user-id",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockPost = {
      _id: "post-id",
      likes: new Map([["user-id", true]]),
    };

    // Мокування функцій
    Post.findById = jest.fn().mockResolvedValue(mockPost);
    Post.findByIdAndUpdate = jest.fn().mockResolvedValue(mockPost);

    await likePost(req, res);

    // Перевірка викликів
    expect(Post.findById).toHaveBeenCalledWith("post-id");
    expect(mockPost.likes.get("user-id")).toBeUndefined(); // Перевірка, що лайк було знято
    expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(
      "post-id",
      { likes: mockPost.likes },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });
});