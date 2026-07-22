const express = require("express");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const app = express();

connectDB();

app.use(express.json()); //Before handling any matching request, run this middleware first. app.use() is telling the server that express.json() converts JSON into a JS object
app.use("/expenses", expenseRoutes);
app.post("/register", async(req,res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message: "All fields are required"});
  }

  const existingUser = await User.findOne({email});

  if(existingUser){
    return res.status(400).json({message: "User already exists"});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({name,email,password: hashedPassword});

  return res.status(201).json({
  message: "User registered successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
})


app.listen(5000, () => {
  console.log("Server running on port 5000");
});