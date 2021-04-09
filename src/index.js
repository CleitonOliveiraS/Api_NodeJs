const express = require('express');
const server = express();
server.use(express.json())

const TaskRoute = require('./routes/TaskRoutes');
server.use('/task', TaskRoute);

server.listen(3000, () =>{
    console.log("Api online");
});