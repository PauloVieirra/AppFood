import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../src/screens/SignIn";
import SignUp from "../src/screens/SignUp";

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen 
                name="SignIn" 
                component={SignIn}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen 
                name="SignUp" 
                component={SignUp}
                options={{
                    headerShown: false,
                }}
            />
         </AuthStack.Navigator>
    );
}

export default AuthRoutes;
