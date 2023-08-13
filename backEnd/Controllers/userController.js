const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Perform proper validation before saving the user to the database
    // For simplicity, let's assume the User model has a `create` static method
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const validUser = await User.findOne({ username });

    if (!validUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, validUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If credentials are valid, you can issue a JWT and send it to the client
    // In this example, we'll just respond with a success message
    else{
        const payload={
          mail:validUser.email,
      }
      
      const token=jwt.sign(payload,process.env.JWT_TOKEN,{
          expiresIn:"2h"
      })
      const options={
          httpOnly:true,
          expires:new Date(Date.now()+3*24*60*60*1000)
      }
      validUser=validUser.toObject();
      validUser.password=undefined;
      validUser.token=token;
      return res.status(200).cookie("cokTok",token,options).json({
        message: "Login successful",
          success:true,
          validUser,
          token,
          message:'token and cookies created successfully'
      })
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
