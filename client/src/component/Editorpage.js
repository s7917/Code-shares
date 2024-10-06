import React, { useEffect, useRef, useState } from 'react'
import Client from './Client.js'
import Editor from './Editor.js'
import { initsocket } from '../socket.js';
import { useNavigate, useLocation ,useParams} from 'react-router-dom';
import { toast } from 'react-hot-toast';



function Editorpage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const navigate = useNavigate();
  const[clients ,SetClients] = useState([
    {socketid:"1",username:"shubham"},
    {socketid:"2",username:"Raj"}
  ]);

  const handleError =(e)=>{
    console.log('socket error', e);
    toast.error('Socket connection failed',{duration:2000});
    navigate('/'); 
  }

  useEffect(()=>{
   const init = async()=>{
           socketRef.current = await initsocket();
           socketRef.current.on('connect_error' , (err)=>handleError(err));
           socketRef.current.on('connect_failed' , (err)=>handleError(err));

           socketRef.current.emit("join-room" , {roomId ,username: location.state?.username});
          // console.log(location.state.username)
            socketRef.current.on('joined-room' , ({clients,username, socketId})=>{
              // console.log('joined-room event fired:', { clients, username, socketId });
                if( username !== location.state?.username){
                     toast.success(`${username} has joined the room`,{duration:2000});
                }
                // SetClients(clients);
              }

            );   
   }  
   if (location.state?.username) {
    init();
  } else {
    // If no username in state, navigate back to home
    navigate('/');
  }
  },[roomId, location.state?.username]);



  if(!location.state){
    navigate('/');
    return null;
  };
  return (
    <div className='container-fluid vh-100'>
      <div className='row h-100 '>
        {/* left section of editor page */}
            <div className='col-md-2 bg-dark text-light d-flex flex-column h-100 ' style={{boxShadow:"2px 0px 4px rgba(0,0,0,0.1)"}}>
            <img className='img-fluid mx-auto d-block mb-3' src="/images/SHARE (2).png" style={{maxWidth:'150px', marginTop:"0px"}}/>
            <hr style={{marginTop:"-0rem"}}/>
               {/* client list container */}
               <div className='d-flex flex-column  overflow-auto'>
                {/* client add krna hai */}
                {clients.map((client)=>(
                  <Client key={client.socketid} username={client.username}/>
                ))}
               </div>
               
               <div className='mt-auto'>
               <hr style={{}}/>
               <button className='btn btn-success btn-block'>Copy RoomId</button>
               <button className='btn btn-danger mt-2 mb-2 px-3 btn-block'>Leave Room</button>
               </div>
            </div>

        {/* right section of editor page */}
        <div className='col-md-10  text-light d-flex flex-column ' >
           < Editor/>
        </div>
      </div>
    </div>
  )
}

export default Editorpage