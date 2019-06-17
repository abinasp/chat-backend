import http from 'http';
import io from 'socket.io';
import db from '../utils/db';

const socketEvents = async(io)=>{
    const dbc = await db();
    io.of('/rooms').on('connection', socket=>{
        socket.on('createRoom',async(name)=>{
            let isExist = await dbc.collection('rooms').findOne({name : name});
            if(isExist) {
                socket.emit('updateRoom', {log: 'Room exists'});
            }else{
                
            }
        })
    })
}

const socket = (app) =>{
    let httpServer = http.createServer(app);
    io(httpServer);
    socketEvents(io);
    return httpServer;
}

export default socket;