import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Text, Heading, VStack, TextArea, HStack, Button } from "native-base";
import { Ionicons } from '@expo/vector-icons';

const Acompanhamento = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [chamado, setChamado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [mensagensEnviadas, setMensagensEnviadas] = useState([]);
  const { id } = route.params;

  const fetchChamado = async () => {
    const url = `http://10.0.0.120/apiHelpdesk/chamado/listar/${id}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.tipo === 'sucesso') {
        setChamado(responseData.resposta);
      } else if (responseData.tipo === 'erro') {
        console.log('sem registro');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const requestBody = {
        usuario_id: chamado.id_usuario,
        usuario_acompanhamento: chamado.nome_usuario,
        mensagem: mensagem,
        chamado_id: id,
      };

      const response = await fetch('http://10.0.0.120/apiHelpdesk/acompanhamento/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (responseData.tipo === 'sucesso') {
        setMensagensEnviadas([...mensagensEnviadas, { message: mensagem, sender: 'user' }]);
        setMensagem('');
      } else {
        console.log('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const fetchListarMensagem = async () => {
    const url = `http://10.0.0.120/apiHelpdesk/acompanhamento/mensagem/${id}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChamado();
    fetchListarMensagem();
  }, []);

  return (
    <Box height="full" justifyContent={'space-between'}>
      <VStack h={'85%'}>
        <Heading p={2} bg={'white'} alignItems={'center'}>
          Chamado: {id}
        </Heading>

        {chamado && (
          <Box bg="blue.100" p={2} m={2} alignSelf="flex-end" borderRadius={10}>
            <VStack>
              <Box>
                <Heading color="black">
                  {chamado.nome_usuario}
                </Heading>
              </Box>

              <Box>
                <Text color="black">
                  {chamado.descricao}
                </Text>
              </Box>
            </VStack>
          </Box>
        )}

       

      </VStack>

      <HStack h={'15%'} p={3} bg={'white'}>
        <TextArea
          h={20}
          placeholder="Digite sua interação..."
          w="80%"
          value={mensagem}
          onChangeText={setMensagem}
        />
        <Box w="20%" justifyContent={'center'} alignItems={'center'}>
          <Button borderRadius={50} onPress={handleRegister}>
            <Ionicons name="send" size={24} color="white" />
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default Acompanhamento;
