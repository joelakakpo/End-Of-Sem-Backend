const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userprofileRoutes = require("./route/profile")
const loginRoutes = require("./route/login")
const registerRoutes = require("./route/register")

const app = express();

connectDB()
// Middleware
app.use(cors())
app.use(express.json());
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path}`,{
    body:req.body,
    auth:req.headers.authorization
  })
  next()
});


app.use(userprofileRoutes)
app.use(loginRoutes)
app.use(registerRoutes)



// API route to get menu items
app.get("/", (req, res) => {
  res.status(200).json(menu);
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
