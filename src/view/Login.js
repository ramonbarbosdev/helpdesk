import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

import {  Box, Center, Input, Heading, FormControl, VStack, Icon,Button, Checkbox, HStack,Image} from "native-base";

import { FontAwesome , Entypo, MaterialIcons } from '@expo/vector-icons';


import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../control/auth';


const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();

  const { logar } = useContext(AuthContext);


  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.0.120/apiHelpdesk/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: user,
          senha: pass,
        }),
      });
  
      const data = await response.json();
  
      // Verifique a resposta da API para determinar o sucesso do login
      if (data.tipo === 'sucesso') {
        $id = data.resposta.logado;

        logar($id,user, pass)

      } else {
        // Exiba uma mensagem de erro ao usuário
        alert('Login inválido. Verifique suas credenciais.');
      }
    } catch (error) {
      // Ocorreu um erro na requisição
      console.error('Erro de login:', error);
      alert('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    }
  };
  

  const handleCadastrar = () => {
    navigation.navigate('Register');
  };

  return (
    <Center
      height="full"
    >

<Image source={{
      uri: "https://www.pngall.com/wp-content/uploads/11/Helpdesk-Vector-PNG-Images.png"
    }} alt="Alternate Text" size="xl" />

      <VStack width="full" p={10}>  

        <Box width="full" >
            <Heading color="primary.500">
              Entrar
            </Heading>
          
              <FormControl >
                <Input size="md" variant="underlined"
                placeholder="Login"
                mt={5}
                InputLeftElement={
                <Icon
                  as={<FontAwesome name="user" color="black" />}
                  size={5}
                  ml={2}
                />
                  }
                  onChangeText={setUser}

                />
                </FormControl>
                <FormControl >
                  <Input size="md" variant="underlined"
                    placeholder=" Senha"
                    mt={5}
                    InputLeftElement={
                    <Icon
                      as={<Entypo name="lock"  color="black" />}
                      size={5}
                      ml={2}
                    />
                      }
                      type={"password"}
                      onChangeText={setPass}
                    />
                 </FormControl>
          
              <Button size="sm" mt={7}  variant="subtle"  onPress={() => handleLogin()} >Entrar</Button>
              <Button size="sm" mt={7}  variant="subtle"  onPress={() => handleCadastrar()} >Registrar</Button>
                  
        </Box>

        <HStack mt={5}>       
            <Checkbox mr={3} value="test" accessibilityLabel="This is a dummy checkbox" />     
            <Text>
              Concordo com a politica de segurança.
            </Text>
        </HStack> 

       </VStack>

    </Center>

    
  );
};



export default Login;