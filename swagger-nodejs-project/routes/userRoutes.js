import express from 'express';
import { fetchUsers, createUser, fetchUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Códigos de resposta HTTP
const HTTP_OK = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;

// Função de tratamento de erros
const handleError = (error, res, message) => {
  console.error(message, error);
  res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
};

// Funções de ação
const userActions = {
  fetchUsers: async (req, res) => {
    try {
      const users = await fetchUsers();
      res.json({ message: 'Lista de usuários retornada com sucesso.', users });
    } catch (error) {
      handleError(error, res, 'Error fetching users:');
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await createUser(req.body);
      res.json({ message: 'Usuário criado com sucesso.', user });
    } catch (error) {
      handleError(error, res, 'Error creating user:');
    }
  },
  fetchUserById: async (req, res) => {
    try {
      const user = await fetchUserById(req.params.id);
      res.json({ message: 'Usuário retornado com sucesso.', user });
    } catch (error) {
      handleError(error, res, 'Error fetching user:');
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await updateUser(req.params.id, req.body);
      res.json({ message: 'Usuário atualizado com sucesso.', user });
    } catch (error) {
      handleError(error, res, 'Error updating user:');
    }
  },
  deleteUser: async (req, res) => {
    try {
      await deleteUser(req.params.id);
      res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      handleError(error, res, 'Error deleting user:');
    }
  },
};

// Definição das rotas e suas documentações
export const routes = [
  {
    method: 'get',
    path: '/users',
    tags: ['Usuários'],
    summary: 'Retorna a lista de usuários',
    description: 'Esta rota retorna todos os usuários cadastrados.',
    action: userActions.fetchUsers,
  },
  {
    method: 'post',
    path: '/users',
    tags: ['Usuários'],
    summary: 'Cria um novo usuário',
    description: 'Esta rota cria um novo usuário com base nos dados fornecidos.',
    action: userActions.createUser,
  },
  {
    method: 'get',
    path: '/users/:id',
    tags: ['Usuários'],
    summary: 'Retorna um usuário específico',
    description: 'Esta rota retorna um usuário específico com base no ID fornecido.',
    action: userActions.fetchUserById,
  },
  {
    method: 'put',
    path: '/users/:id',
    tags: ['Usuários'],
    summary: 'Atualiza um usuário específico',
    description: 'Esta rota atualiza um usuário específico com base no ID fornecido.',
    action: userActions.updateUser,
  },
  {
    method: 'delete',
    path: '/users/:id',
    tags: ['Usuários'],
    summary: 'Deleta um usuário específico',
    description: 'Esta rota deleta um usuário específico com base no ID fornecido.',
    action: userActions.deleteUser,
  },
];

// Configurar as rotas com base na definição
routes.forEach(route => {
  router[route.method](route.path, route.action);
});

export default router;
