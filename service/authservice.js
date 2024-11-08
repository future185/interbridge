import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabase";

export const onGetUserData = async (userid) => {
  try {
    const { error, data } = await supabase
      .from("userinfo")
      .select()
      .eq("id", userid)
      .single();

    if (error) {
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
};

export const updateUserData = async (userid, data) => {
  try {
    const { error } = await supabase
    .from("userinfo")
    .update(data)
    .eq("id", userid); 

    if(error){
    
      return{success: false, error: error.message}
      
    }
    else{
      return{success: true}
    }
  } catch (error) {
    
  }
};

const AuthContext = createContext();

export const AuthUserProVider = ({ children }) => {
  const [userData, setUserdata] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getUserData = (data) => {
    setUserdata(data);
  };

  const getCurrentUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ getUserData, getCurrentUser, userData, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
