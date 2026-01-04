import "./ChatWindow.css";
import axios from "axios";
import Chat from "./Chat.jsx";
import "./App.css";
import {useContext, useState, useEffect} from "react";
import { MyContext } from "./MyContext.jsx";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);//for usestate
    const [isOpen, setIsOpen] = useState(false);
    
     
  const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:3002/auth/logout",
      {}, 
      { withCredentials: true }
    );
    //  frontend cleanup
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "http://localhost:5173/";
  } catch (err) {
    console.error("Logout failed", err);
  }
  };
   
    const getReply = async () =>{
      console.log('getreply');
      setLoading(true);
      setNewChat(false);
      // console.log("message", prompt, "threadId", currThreadId);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId
        })
      };
      try{
        const response = await fetch("http://localhost:3002/api/chat", options);
        const res = await response.json();
        console.log("response is:" ,res);
        setReply(res.reply);
      }catch(err){
       console.log(err);
      }
      setLoading(false);
    }
    //Append new chat to prevChats
    useEffect(() => {
      if(prompt &&  reply){
        setPrevChats(prevChats => 
          [...prevChats, {
            role:"user",
            content:prompt
          },{
            role:"assistant",
            content:reply 
          }]
        );
      }
      setPrompt("");
    }, [reply]);

    const handleProfileClick = () =>{
      setIsOpen(!isOpen);
    }
    return(
        <div className="chatWindow">
          <div className="navbar">
            <span>SigmaGPT &nbsp; <i className="fa-solid fa-chevron-down"></i></span>
            <div className="userIconDiv" onClick={handleProfileClick}>
             <span className="userIcon"><i className="fa-solid fa-user"></i></span>
            </div>
          </div>

          {
            isOpen && 
            <div className="dropdown">
              {/* <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
              <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up" ></i>Toggle Theme</div> */}
              <div className="dropDownItem" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</div>
            </div>
          }
          <Chat></Chat>
          <ScaleLoader color="#fff" loading={loading}>

          </ScaleLoader>
          <div className="chatInput">
            <div className="inputBox">
               <input placeholder="Ask anything"
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
               >
               </input>
               <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <p className="info">
              SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
            </p>
          </div>
        </div>
    )
}
export default ChatWindow;