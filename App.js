import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from "native-base";

// Importe suas telas aqui
import Login from './src/view/Login';
import Index from './src/view/Index';

import AuthProvider from './src/control/auth'; // Importe o AuthProvider
import NewChamado from './src/view/NewChamado';
import Detalhes from './src/view/DetalhesChamado';
import Acompanhamento from './src/view/Acompanhamento';
import Perfil from './src/view/Perfil';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <AuthProvider> 
            <Stack.Navigator>
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            <Stack.Screen 
                name="Index"
                component={Index}
                options={{ headerShown: false }}
              />
               <Stack.Screen 
                name="Novo Chamado"
                component={NewChamado}
                options={{ headerShown: false }}
              />
               <Stack.Screen 
                name="DetalhesChamado"
                component={Detalhes}
                options={{ headerShown: true }}
              />
              <Stack.Screen 
                name="Perfil"
                component={Perfil}
                options={{ headerShown: true }}
              />
              <Stack.Screen 
                name="Acompanhamento"
                component={Acompanhamento}
                options={{ headerShown: true }}
              />
             
             
             
            </Stack.Navigator>
         </AuthProvider>
       </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;