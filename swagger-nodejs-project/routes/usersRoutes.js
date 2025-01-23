import { DataTypes } from 'sequelize';
import sequelize from './../db.js';

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

// Funções de ação para usuários
const userActions = {
    fetchUsers: (req, res) => {
        // Lógica para buscar usuários
        res.json({ message: 'Lista de usuários retornada com sucesso.' });
    },
    createUser: (req, res) => {      
        const { name, email, password } = req.body;
        console.log(name, email, password);
        // Lógica para criar um novo usuário        
        res.json({ message: 'Usuário criado com sucesso.' });
    },
    fetchUserById: (req, res) => {
        // Lógica para buscar um usuário por ID
        res.json({ message: 'Usuário retornado com sucesso.' });
    },
    updateUser: (req, res) => {
        // Lógica para atualizar um usuário
        res.json({ message: 'Usuário atualizado com sucesso.' });
    },
    deleteUser: (req, res) => {
        // Lógica para deletar um usuário
        res.json({ message: 'Usuário deletado com sucesso.' });
    },
};

 const userRoutesDatas = [
    { path: '/users', 
        method: 'get', 
        tags: ['Usuários'], 
        summary: 'Lista todos os usuários', 
        description: 'Retorna a lista de usuários cadastrados.',
        schema: {
            type: 'object',
            properties: {
                message1: {
                    type: 'string',
                    autoIncrement: true,
                    primaryKey: true,
                    example: 'Lista de usuários retornada com sucesso.'
                },
                message1: {
                    type: 'string',
                    autoIncrement: true,
                    primaryKey: true,
                    example: 'Usuário criado com sucesso.'
                }                
            }
        },        
        action: userActions.fetchUsers 
    },
    { path: '/users', method: 'post', tags: ['Usuários'], summary: 'Cria um novo usuário', description: 'Cria um novo usuário com os dados fornecidos.', action: userActions.createUser, requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john.doe@example.com' },
                        password: { type: 'string', example: '123456' }
                    },
                    required: ['name', 'email', 'password']
                }
            }
        }
    }
    },
    { path: '/users/:id', method: 'get', tags: ['Usuários'], summary: 'Retorna um usuário específico', description: 'Retorna os detalhes de um usuário com base no ID fornecido.', action: userActions.fetchUserById},
    { path: '/users/:id', method: 'put', tags: ['Usuários'], summary: 'Atualiza um usuário', description: 'Atualiza os dados de um usuário existente.', action: userActions.updateUser },
    { path: '/users/:id', method: 'delete', tags: ['Usuários'], summary: 'Deleta um usuário específico', description: 'Deleta um usuário específico com base no ID fornecido.', action: userActions.deleteUser,parameters: [
        { name: 'id', in: 'path', required: true, description: 'ID do usuário', schema: { type: 'integer' } }
    ]},
];

export default userRoutesDatas;