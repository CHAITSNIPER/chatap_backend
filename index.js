const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require('socket.io');
const app = express();
require("dotenv").config();
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const messageRoutes = require('./routes/messagesRoute');
const authenticateToken = require('./controllers/authController');

app.use(cors());

app.use(express.json());

app.use("/api/item",authenticateToken,itemRoutes);

app.use("/api/auth",userRoutes);

app.use('/api/messages',authenticateToken,messageRoutes);

const DB = process.env.MONGO_URL.replace('<password>',process.env.PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
  useUnifiedTopology: true,
}).then((con)=>{
    console.log('connected to DB FINALLY');
}).catch((error)=>{
    console.log('errorr',error.message);
})



const server = app.listen(process.env.PORT,()=>{
    console.log('connected at ', process.env.PORT);
});

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})
global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.msg);
        }
    });
})

app.use((req,res,next)=>{
    console.log(req.headers);
    next();
})

app.use((err, req, res, next) => {
    console.error('error' ,err.stack);
    res.status(500).send('Something broke!');
});







// app.post("/api/auth/register",(req,res)=>{
//     console.log('say hello from the the server', req.body);
//     const items = req.body;

//     res.json(items);
// })


