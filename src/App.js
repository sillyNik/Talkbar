import React ,{useEffect} from 'react';
import Chat from './Chat';
import './App.css';
import Sidebar from './SideBar';
import { useSelector , useDispatch } from 'react-redux';
import { selectUser } from './features/userSlice'
import Login from './login';
import {auth} from './firebase';
import {login , logout} from './features/userSlice'
function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  useEffect(()=>{
     auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
        if(authUser){
          //its logged in   
          dispatch(login({
            uid : authUser.uid,
            photo : authUser.photoURL,
            email : authUser.email,
            displayName : authUser.displayName,
          }))
        }
        else{
          //its logged out 
          dispatch(logout())
        }
     })
  },[dispatch])
  return (
    <div className="App">
      {user ? ( 
      <>
      <Sidebar />
      <Chat />
      </>
    ) : (
      <Login />
    )}

    </div>
  );
}

export default App;
