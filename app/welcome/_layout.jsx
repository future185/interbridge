import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import {
  AuthUserProVider,
  onGetUserData,
  useAuth,
} from "../../service/authservice";
import { supabase } from "../../lib/supabase";

const _layout = () => {
     const { currentUser } = useAuth();
     const router = useRouter();
     useEffect(() => {
          if(currentUser){
               router.replace('/')
          }
     },[currentUser])
  
     return(
          <Stack screenOptions={{
               headerShown: false
          }}>
               <Stack.Screen name="index" />
          </Stack>
     )
};

export default _layout;

