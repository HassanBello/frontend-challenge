import styled from "styled-components";
// import { fadeIn } from "../utils/animations"
 import media from "../utils/media"

export const homeWrapper = styled.div`
display: flex;
background: radial-gradient(circle, #222831, #1f1f26, #19171b, #110d0f, #000000);
`

export const sideBar = styled.aside`
width: 20%;
display: flex;
flex-direction: column;
background: #131c21;
height: 100vh;
color: #dcddb7;
`
export const sideBarItems = styled.div`
border-bottom: 1px solid #dcddb7;
border-top: 1px solid #dcddb7;
padding: 15px 25px;
display: flex;
justify-content: flex-start;
cursor: pointer;
align-items: center;
`

export const chatWindow = styled.main`
flex: 1;
height: 100vh;
display: flex;
flex-direction: column;
background: radial-gradient(circle, #222831, #1f1f26, #19171b, #110d0f, #000000);
`

export const MessageRow = styled.div`
display: flex;
flex-direction: row;
width: 98%;
padding: 2px 0px;
justify-content: flex-end`

export const MessageBox = styled.div`
max-width: 500px;
line-height: 24px;
padding: 10px 20px;
position: relative;
color: #fff;
text-align: center;
border-radius: 5px;
background: #1e5f74;
`
export const InputWrapper = styled.form`
display: flex;
width: 100%;
position: fixed;
bottom: 0;
background: #262d31;
padding: 10px;
justify-content: flex-start;
`

export const StyledInput = styled.input`
border-radius: 25px;
padding: 8px 10px;
${media.tablet`width: 220px`};
${media.tiny`width: 190px`};
${media.phone`width: 200px`};
width: 73%;
color: #fff;
background: #33383b;
border: none;
`
export const SendButton = styled.button`
padding: 8px 10px;
background: none;
border: none;
`
export const ChatHolder = styled.div`
display: flex;
flex-direction: column;
height: 85%;
overflow-x: hidden;
overflow-y: scroll;
white-space: nowrap;
scrollbar-width: thin;
scrollbar-color: black black;
`
export const StyledHeader = styled.header`
display: flex;
background #262d31;
padding: 10px;
`
export const LogoutButton = styled.button`
padding: 8px 15px;
background: #e84545;
border: none;
color: #fff;
border-radius: 5px;
cursor: pointer;
`

export const LoginButton = styled.button`
padding: 20px 15px;
background: #054740;
border: none;
color: #fff;
border-radius: 5px;
cursor: pointer;
`

export const StyledWrapper = styled.div`
display: flex;
height: 100vh;
width: 100%;
background: #262d31;
justify-content: center;
align-items: center;
`

export const StyledAvatar = styled.img`
border-radius: 50%;
height: 50px;
margin-right: 15px;
`