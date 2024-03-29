import socket from 'socket.io';
import http from 'http';
import Rooms from '../providers/rooms';

const Room = new Rooms();

const ioEvents = (io)=>{
    io.on('connection',socket=>{
        console.log(socket.id)
        socket.on("SEND", async(data)=> {
            if(data.room !==''){
                if(await Room.OnGetSingleRoom(data.room,data.user,socket.id)){
                    // let rooms = await Room.OnGetAllRooms();
                    // rooms.map(room=>{
                    //     room.connections.map(conn=>{
                    //         if(conn.socketId === socket.id){
                    //             io.emit("RECEIVE", data);
                    //         }
                    //     })
                    // })
                    io.emit("RECEIVE", data);
                }
            }
        });
    })
}

const socketServer = (app)=>{
    let server = http.Server(app);
    let io = socket(server);

    ioEvents(io);
    return server;
}


export {socketServer};