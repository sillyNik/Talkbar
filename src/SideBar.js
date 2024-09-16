import React, { useEffect, useState } from 'react'
import './sideBar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db , {auth} from './firebase'
const Sidebar = () => {
    const user = useSelector(selectUser);
    const[channels , setChannels] = useState([])
    useEffect(()=>{
       db.collection('channels').onSnapshot(snapshot => {
        setChannels(snapshot.docs.map((doc) => ({
            id : doc.id,
            channel : doc.data(),

        })))
       })
    },[])
    const handleAddChannels = () => {
        const channelName = prompt("Enter the channel name");
        if(channelName){
            db.collection('channels').add({
                channelName : channelName,
            })
        }
    }
    const logout = () =>{
        auth.signOut();
    }
  return (
    <div className='sidebar'>
        <div className='sidebar__top'>
            <h3>TalkBar 🚀</h3>
            <ExpandMoreIcon />
        </div>
        <div className='sidebar__channels'>
            <div className='sidebar__channelsHeader'>
                <div className='sidebar__header'>
                    <ExpandMoreIcon />
                     <h3>Text Channel</h3>
                </div>
                <AddIcon onClick={handleAddChannels} className='sidebar__addChannel'></AddIcon>
            </div>
            <div className='sidebar__channelsList'>
                {channels.map(({id , channel})=> (
                  <SidebarChannel 
                  key={id}     //key
                  id={id}       //props 
                  channelName={channel.channelName}   //props
                  />
                ))}
        </div>
        </div>
        <div className='sidebar__voice'>
            <SignalCellularAltIcon className='sidebar__voiceIcon' fontSize='large'></SignalCellularAltIcon>
            <div className='sidebar__voiceInfo'>
                <h3>Voice Connected</h3>
                <p>Stream</p>
            </div>
            <div className='sidebar__icons'>
                <InfoIcon  />
                <CallIcon  />
            </div>
        </div>
        <div className='sidebar__profile'>
           <Avatar onClick={logout} src={user.photo}/>
           <div className='sidebar__profileInfo'>
             <h3>{user.displayName}</h3>
             <p>#{user.uid.substring(0,5)}</p>
           </div>
           <div className='sidebar__profileIcons'>
               <KeyboardVoiceIcon />
               <HeadphonesIcon />
               <SettingsIcon />
           </div>
        </div>
    </div>
  )
}

export default Sidebar