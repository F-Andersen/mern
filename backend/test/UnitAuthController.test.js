import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

describe("User Registration", () => {
  it("should register a new user", async () => {
    const req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password123",
        picturePath: "/path/to/picture",
        friends: [],
        location: "New York",
        occupation: "Software Engineer",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    bcrypt.genSalt = jest.fn().mockResolvedValue("salt");
    bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
    User.prototype.save = jest.fn().mockResolvedValue({
      _id: "user_id",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "hashedPassword",
      picturePath: "/path/to/picture",
      friends: [],
      location: "New York",
      occupation: "Software Engineer",
      viewedProfile: 1234,
      impressions: 5678,
    });

    await register(req, res);

    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", "salt");
    expect(User.prototype.save).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: "user_id",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "hashedPassword",
      picturePath: "/path/to/picture",
      friends: [],
      location: "New York",
      occupation: "Software Engineer",
      viewedProfile: 1234,
      impressions: 5678,
    });
  });

  it("should handle registration error", async () => {
    const req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password123",
        picturePath: "/path/to/picture",
        friends: [],
        location: "New York",
        occupation: "Software Engineer",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    bcrypt.genSalt = jest.fn().mockRejectedValue(new Error("bcrypt error"));

    await register(req, res);

    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "bcrypt error" });
  });
});

describe("User Login", () => {
  it("should log in an existing user with valid credentials", async () => {
    const req = {
      body: {
        email: "johndoe@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne = jest.fn().mockResolvedValue({
      _id: "user_id",
      email: "johndoe@example.com",
      password: "hashedPassword",
      firstName: "John",
      lastName: "Doe",
    });

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue("token");

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "johndoe@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
    expect(jwt.sign).toHaveBeenCalledWith({ id: "user_id" }, process.env.JWT_SECRET);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "token",
      user: {
        _id: "user_id",
        email: "johndoe@example.com",
        firstName: "John",
        lastName: "Doe",
      },
    });
  });

  it("should handle login error when user does not exist", async () => {
    const req = {
      body: {
        email: "johndoe@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne = jest.fn().mockResolvedValue(null);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "johndoe@example.com" });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "User does not exist." });
  });

  it("should handle login error with invalid credentials", async () => {
    const req = {
      body: {
        email: "johndoe@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne = jest.fn().mockResolvedValue({
      _id: "user_id",
      email: "johndoe@example.com",
      password: "hashedPassword",
      firstName: "John",
      lastName: "Doe",
    });

    bcrypt.compare = jest.fn().mockResolvedValue(false);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "johndoe@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Invalid credentials." });
  });

  it("should handle login error", async () => {
    const req = {
      body: {
        email: "johndoe@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne = jest.fn().mockRejectedValue(new Error("database error"));

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "johndoe@example.com" });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "database error" });
  });
});