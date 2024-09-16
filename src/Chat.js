import React , {useState , useEffect} from 'react'
import './chat.css'
import ChatHeader from './chatHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifIcon from '@mui/icons-material/Gif';
import Message from './message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
import db from './firebase';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore'; //stuck in this while importing the firebase
const Chat = () => {
  const [messages , setMessages] = useState([]);   
  const [input , setInput] = useState("");
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  useEffect(()=>{
    if(channelId){
    db.collection('channels').doc(channelId).collection('messages').orderBy('timestamp' , 'desc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())) 
    );
  }
} ,[channelId])

  //for not refreshing up the page and addition of the message
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('channels').doc(channelId).collection('messages').add({
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      message : input,
      user : user,
    })

    setInput("");
  }
  return (
    <div className='chat'>
        <ChatHeader channelName={channelName} />
        <div className='chat__messages'>
          {messages.map((message) => (      //{message.map((mssge) => ())}   //stuck in displaying up the message
            <Message 
             timestamp = {message.timestamp}
             message = {message.message}
             user = {message.user}
            />
          ))}
        </div>
        <div className='chat__input'>
        <AddCircleIcon />
        <form>
            <input  disabled={!channelId} value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`}></input>
            <button className='chat__inputButton' type='submit' onClick={sendMessage} disabled={!channelId}>Send Message</button>
        </form>
        <div className='chat__inputIcons'>
           <CardGiftcardIcon fontSize='large' />
           <GifIcon fontSize='large' />
           <EmojiEmotionsIcon fontSize='large'/>
        </div>
        </div>
        </div>
  )
}

export default Chat