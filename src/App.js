import React, { useState } from 'react';
import './App.css';
import * as Styles from "./utils/home.css"
import * as firebase from 'firebase';
import { SET_AUTH_ID, SET_CHAT_ID } from "./store/types";
import "firebase/auth";
import "firebase/database";
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

  return (
    <>
      <Styles.StyledHeader>
        <SignOut />
      </Styles.StyledHeader>
      <div>
        {user ? <Home userData={users} /> : <SignIn />}
      </div>
    </>
  );
}


const Home = (props) => {
  const [formValue, setFormValue] = useState('');
  const userId = useSelector(state => state.userId);
  const chatId = useSelector(state => state.chatId);

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
      <Styles.sideBar>
        {props.userData && props.userData.map((item) => (
          <Styles.sideBarItems onClick={() => setCHatid(item.id)} key={item.id}>
            {item.Name}
          </Styles.sideBarItems>
        ))}
      </Styles.sideBar>
      <Styles.chatWindow>
        <Styles.ChatHolder>
          {messageData && messageData.map((item) => <ChatMessage data={item} />)}
        </Styles.ChatHolder>
        <Styles.InputWrapper onSubmit={sendMessage}>
          <Styles.StyledInput value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type A Message" />
          <Styles.SendButton type="submit" disabled={!formValue}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
          </Styles.SendButton >
        </Styles.InputWrapper>
      </Styles.chatWindow>
    </Styles.homeWrapper>
  );
}

const ChatMessage = (props) => {
  const userId = useSelector(state => state.userId);
  const messageStatus = props.uid === userId ? 'Sender' : 'Receiver;'
  return (
    <Styles.MessageRow key={props.data.uid + Math.floor(Math.random() * Math.floor(40000))} messageStatus={messageStatus} >
      <Styles.MessageBox>
        {props.data.text}
      </Styles.MessageBox>
    </Styles.MessageRow>
  );
}


export default App;
