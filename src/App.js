import React, { useState } from 'react';
import './App.css';
import * as Styles from "./utils/home.css"
import firebase from 'firebase/app';
import { SET_AUTH_ID, SET_CHAT_ID, SET_NAV_STATUS } from "./store/types";
import 'firebase/auth';
import 'firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const config = {
  apiKey: `${process.env.REACT_APP_apiKey}`,
  authDomain: `${process.env.REACT_APP_authDomain}`,
  databaseURL: `${process.env.REACT_APP_databaseURL}`,
  projectId: `${process.env.REACT_APP_projectId}`
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const auth = firebase.auth();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <Styles.StyledWrapper>
      <Styles.LoginButton onClick={signInWithGoogle}>Sign in with Google</Styles.LoginButton>
    </Styles.StyledWrapper>
  )
}

function SignOut() {
  return auth.currentUser && (
    <Styles.LogoutButton onClick={() => auth.signOut()}>Sign Out</Styles.LogoutButton>
  )
}

function App() {
  const [user] = useAuthState(auth)
  const dispatch = useDispatch();
  const [navShow, setNavShow] = useState(false);

  //Set State if User is logged on
  if (user) {
    dispatch({
      type: SET_AUTH_ID,
      value: user.uid
    });
  }

  //Get Users
  const usersRef = firestore.collection('users');
  let query = usersRef.orderBy('id').limit(25);
  const [users] = useCollectionData(query, { idField: 'id' });

  //Set First Chat As The Opened One
  if (users) {
    dispatch({
      type: SET_CHAT_ID,
      value: users[0].id
    });
  }

  //Set Navshow
  const setNas = () => {
    dispatch({
      type: SET_NAV_STATUS
    });
  }

  return (
    <>
      <Styles.StyledHeader>
        {
          auth.currentUser && 
          <Styles.StyledDrawerTrigger onClick={() => setNas()} >
            <svg width="25" height="15" viewBox="0 0 25 15" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.739958 1.75733H24.26C24.6564 1.75733 25 1.38076 25 0.878666C25 0.376571 24.6829 0 24.26 0H0.739958C0.343552 0 0 0.376571 0 0.878666C0 1.38076 0.343552 1.75733 0.739958 1.75733Z"
                fill="#fff" />
              <path
                d="M24.26 6.65253H0.739958C0.343552 6.65253 0 7.0291 0 7.53119C0 8.03329 0.317125 8.40986 0.739958 8.40986H24.26C24.6564 8.40986 25 8.03329 25 7.53119C25 7.0291 24.6564 6.65253 24.26 6.65253Z"
                fill="#fff" />
              <path
                d="M24.26 13.2427H0.739958C0.343552 13.2427 0 13.6192 0 14.1213C0 14.6234 0.317125 15 0.739958 15H24.26C24.6564 15 25 14.6234 25 14.1213C25 13.6192 24.6564 13.2427 24.26 13.2427Z"
                fill="#fff" />
            </svg>
          </Styles.StyledDrawerTrigger>
        }
        <SignOut />
      </Styles.StyledHeader>
        {user ? <Home userData={users} /> : <SignIn />}
    </>
  );
}


const Home = (props) => {

  const [formValue, setFormValue] = useState('');
  const userId = useSelector(state => state.userId);
  const chatId = useSelector(state => state.chatId);
  const navShow = useSelector(state => state.navShow);

  const messagesRef = firestore.collection('messages');
  let query = messagesRef.where('chatId', "==", chatId).where('uid', "==", userId)
  const [messageData] = useCollectionData(query, { idField: 'id' });
  const dispatch = useDispatch();

  if (messageData) {
    messageData.sort((a, b) => {
      return a.createdAt - b.createdAt
    })
  }
  const sendMessage = async (e) => {
    e.preventDefault();
    const uid = userId;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      chatId
    })
    setFormValue('');
  }

  const setCHatid = (id) => {
    dispatch({
      type: SET_CHAT_ID,
      value: id
    })
  }

  return (
    <Styles.homeWrapper>
      <Styles.sideBar show={navShow} >
        {props.userData && props.userData.map((item) => (
          <Styles.sideBarItems key={item.id} status={item.id === `${chatId}` ? 1 : 0} onClick={() => setCHatid(item.id)} >
            <Styles.StyledAvatar src={item.image} />   {item.Name}
          </Styles.sideBarItems>
        ))}
      </Styles.sideBar>
      <Styles.chatWindow  show={navShow} >
        <div className="otherTest">
        <Styles.ChatHolder>
          {messageData && messageData.map((item) => <ChatMessage data={item} key={item.createdAt} />)}
        </Styles.ChatHolder>
        </div>
        <div className="test">
        <Styles.InputWrapper onSubmit={sendMessage}>
          <Styles.StyledInput value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type A Message" />
          <Styles.SendButton type="submit" disabled={!formValue}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
          </Styles.SendButton >
        </Styles.InputWrapper>
        </div>
      </Styles.chatWindow>
    </Styles.homeWrapper>
  );
}

const ChatMessage = (props) => {
  const userId = useSelector(state => state.userId);
  const messageStatus = props.uid === userId ? 'Sender' : 'Receiver;'
  return (
    <Styles.MessageRow messageStatus={messageStatus} >
      <Styles.MessageBox>
        {props.data.text}
      </Styles.MessageBox>
    </Styles.MessageRow>
  );
}


export default App;
