import express from 'express';
import Users from '../providers/users';
import {isValidToken} from '../middleware/validat-token';
import Rooms from '../providers/rooms';


const router = express.Router();

const user = new Users();
const room = new Rooms();

//Welcome endpoint.
router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        message: 'Welcome to chat app backend!!'
    });
})

//Signin endpoint.
router.post("/signin",async (req,res)=>{
    try{
        let {username,password} = req.body;
        if(!username || username === ""){
            throw 'Username is required.';
        }
        if(!password || password === ""){
            throw 'Password is required.';
        }
        let signInResult = await user.OnSignIn(username,password)
        res.status(200).json({
            success: true,
            message: 'Signin successful',
            result: signInResult.data
        });
    }catch(ex){
        console.error('Error in signin API.');
        res.status(404).json({
            success: false,
            message: 'Error in signin API',
            error: ex
        });
    }
});

//Signout endpoint
router.post("/sign-out",isValidToken(),async(req,res)=>{
    try{
        let userData = req.body.user;
        res.status(200).json({
            success:true,
            message: 'Signout successful',
            result: await user.OnSignOut(userData)
        })
    }catch(ex){
        res.status(404).json({
            success: false,
            message: 'Error in signout',
            error: ex
        });
    }
})

//Create room endpoint
router.post("/create-room", isValidToken(), async(req,res)=>{
    try{
        let {roomname} = req.body;
        if(!roomname || roomname === ""){
            throw 'Room name is required.'
        }
        res.status(200).json({
            success:true,
            message: 'Chat room created successfully',
            result: await room.OnCreateRoom(roomname)
        });
    }catch(ex){
        console.error('Error in creating chat room.');
        res.status(404).json({
            success:false,
            message: 'Error in creating chat room.',
            error: ex
        });
    }
});

//Get all rooms endpoint
router.get("/get-rooms",isValidToken(),async(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            message: 'List of chat rooms found.',
            result: await room.OnGetAllRooms()
        });
    }catch(ex){
        console.error('Error in fetching all the room lists.');
        res.status(404).json({
            success: false,
            message: 'Error in getting all the rooms.',
            error: ex
        });
    }
});

//access a single room
router.get("/room/:id", isValidToken(), async(req,res)=>{
    try{
        let roomId = req.params.id;
        let {user} = req.body;
        res.status(200).json({
            success: true,
            message: 'Room found',
            result: await room.OnGetSingleRoom(roomId,user)
        })
    }catch(ex){
        console.error('Error in getting one room.',ex);
        res.status(404).json({
            success: false,
            message: 'Error in getting one room',
            error: ex
        })
    }
});

export default router;