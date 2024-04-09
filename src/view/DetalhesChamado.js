import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Center, Input, Heading, FormControl, VStack, Icon, Button, Select, CheckIcon, TextArea } from "native-base";

import SelectUsuario from '../model/SelectUsuario';
import SelectCliente from '../model/SelectCliente';
import SelectCategoria from '../model/SelectCategoria';

const DetalhesChamado = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [categoria, setCategoria] = useState('');
  const [cliente, setCliente] = useState('');
  const [entidade, setEntidade] = useState('');
  const [usuario, setUsuario] = useState('');
  const [status, setStatus] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    // Obtenha o ID do chamado da propriedade "params" da rota
    const { id } = route.params;

    const fetchChamado = async () => {
      const url = `http://10.0.0.120/apiHelpdesk/chamado/listar/${id}`;

      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          const chamado = responseData.resposta;

          setCategoria(chamado.categoria);
          setCliente(chamado.id_cliente);
          setEntidade(chamado.entidade);
          setUsuario(chamado.id_usuario);
          setStatus(chamado.status);
          setTitulo(chamado.titulo);
          setDescricao(chamado.descricao);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChamado();
  }, []);

  const handleSelectCategoria = async (item) => {
    setCategoria(item.nome);
    handleSelectEntidade(cliente);
  };

  const handleSelectCliente = async (item) => {
    setCliente(item);
    handleSelectEntidade(item.id);
  };

  const handleSelectEntidade = async (item) => {
    let id = item;

    const url = `http://10.0.0.120/apiHelpdesk/cliente/entidade/${id}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData && responseData.resposta) {
        setEntidade(responseData.resposta);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectUsuario = async (item) => {
    setUsuario(item);
  };

  const handleSelectStatus = async (item) => {
    setStatus(item);
  };

  const handleUpdate = async () => {
    try {
      const requestBody = {
        categoria: categoria,
        id_usuario: usuario.id,
        nome_usuario: usuario.nome,
        id_cliente: cliente.id,
        nome_cliente: cliente.nome,
        entidade: entidade,
        status: status,
        titulo: titulo,
        descricao: descricao,
      };

      const { id } = route.params;

      const url = `http://10.0.0.120/apiHelpdesk/chamado/atualizar/${id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('Resposta da API:', responseData);

      if (responseData.tipo === 'sucesso') {
        alert("Chamado atualizado!");
        // navigation.navigate('Login')
      } else {
        console.log('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <Center height="full">
      <VStack width="full" p={10}>
        <Heading color="primary.500">
          Atualizar Chamado
        </Heading>
        <Box width="full">
          <SelectCategoria onValueChange={handleSelectCategoria} />

          <SelectCliente onValueChange={handleSelectCliente} />

          <Input
            variant="filled"
            placeholder='Entidade'
            size="md"
            mt={5}
            value={entidade.entidade}
            isReadOnly
          />

          <SelectUsuario  onValueChange={handleSelectUsuario} />

          <Box mt={5}>
            <Select
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Status"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={handleSelectStatus}
              value={status}
            >
              <Select.Item label="Aberto" value="a" />
              <Select.Item label="Fechado" value="f" />
            </Select>
          </Box>

          <FormControl>
            <Input
              placeholder='Titulo'
              size="md"
              mt={5}
              onChangeText={setTitulo}
              value={titulo}
            />
          </FormControl>

          <TextArea mt={5} h={20} placeholder="Descrição" w="100%" onChangeText={setDescricao} value={descricao} />

          <Button size="sm" mt={7} variant="subtle" onPress={handleUpdate}>Atualizar</Button>

        </Box>
      </VStack>
    </Center>
  );
};

export default DetalhesChamado;
