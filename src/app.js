import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';
import Routes from './routes/routes';
import socket from './socket/socket';

const app = express();
const {PORT} = process.env;

if(!PORT){
    console.error('PORT is not defined, Please check .env settings.');
    process.exit(1);
}
app.use(cors());
app.use(bodyParser({limit: '50mb'}));

//Define Routes.
app.use("/chat",Routes);

//create server
socket(app).listen(PORT,err=>{
    	err
		? console.log(`Unable to run the server in ${PORT} port.`)
		: console.log(`App is running in ${PORT} port`);
});
// const server = app.listen(PORT, err => {
// 	err
// 		? console.log(`Unable to run the server in ${PORT} port.`)
// 		: console.log(`App is running in ${PORT} port`);
// });

// const io = socket(server);
// io.on('connection', socket=>{
//     socket.on("SEND", data=>{
//         console.log(data);
//         io.emit("RECEIVE",data)
//     })
// })

