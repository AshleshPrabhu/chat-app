import { createContext, useContext, useEffect, useState } from "react";

const chatContext = createContext();

const ChatProvider = ({ children }) => {
    
    const [user, setUser ] = useState();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser (userInfo);
        if (!userInfo) {
            window.location.href = '/';
        }
    }, []); // You can choose to keep navigate here if you want

    return <chatContext.Provider value={{ user, setUser  }}>{children}</chatContext.Provider>;
};

export const chatState = () => {
    return useContext(chatContext);
};

export default ChatProvider;