import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import {
  AuthUserProVider,
  onGetUserData,
  useAuth,
} from "../service/authservice";
import { supabase } from "../lib/supabase";
import { agent } from "../constants/agenService";

const _layout = () => {
  return (
    <AuthUserProVider>
      <MainLayout />
    </AuthUserProVider>
  );
};

export default _layout;

const MainLayout = () => {


  const { getUserData, userData, getCurrentUser } = useAuth();
 
  const router = useRouter();

  useEffect(() => {
    if(userData?.isbaned){
      router.replace('error')
    }
  },[userData])

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleUserData(session?.user);
        getCurrentUser(session?.user)
      
       
      } else {
      //  router.replace("/");
        handleUserData(null);
        getCurrentUser(null)
        router.replace('/welcome')
      }
    });
  }, []);



  const handleUserData = async (user) => {
    if (user) {
      const res = await onGetUserData(user?.id);

      if (res.success) {
        getUserData(res.data);
      }
    }
   
  };


  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="/welcome" />
    </Stack>
  );
};
