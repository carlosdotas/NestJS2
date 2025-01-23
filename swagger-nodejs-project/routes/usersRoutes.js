import { DataTypes } from 'sequelize';
import sequelize from './../db.js';

// Modelo de Usuário
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'users', timestamps: true });

sequelize.sync({ force: false })
    .then(() => console.log('Tabelas sincronizadas!'))
    .catch(error => console.error('Erro ao sincronizar:', error));

const handleError = (res, error, message) => res.status(500).json({ message, error });

const userActions = {
    fetchUsers: async (req, res) => {
        try { res.json(await User.findAll()); } 
        catch (error) { handleError(res, error, 'Erro ao buscar usuários.'); }
    },
    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
            res.status(201).json({ message: 'Usuário criado!', user: await User.create({ name, email, password }) });
        } catch (error) { handleError(res, error, 'Erro ao criar usuário.'); }
    },
    fetchUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            user ? res.json(user) : res.status(404).json({ message: 'Usuário não encontrado.' });
        } catch (error) { handleError(res, error, 'Erro ao buscar usuário.'); }
    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
            await user.update(req.body);
            res.json({ message: 'Usuário atualizado!', user });
        } catch (error) { handleError(res, error, 'Erro ao atualizar usuário.'); }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
            await user.destroy();
            res.json({ message: 'Usuário deletado!' });
        } catch (error) { handleError(res, error, 'Erro ao deletar usuário.'); }
    },
};

const userRoutesDatas = [
    { path: '/users', method: 'get', tags: ['Usuários'], summary: 'Lista usuários', authRequired: true, action: userActions.fetchUsers },
    { path: '/users', method: 'post', tags: ['Usuários'], summary: 'Cria usuário', authRequired: true, action: userActions.createUser, requestBody: {
        required: true, content: {
            'application/json': { schema: { type: 'object', properties: {
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', example: 'john.doe@example.com' },
                password: { type: 'string', example: '123456' }
            }, required: ['name', 'email', 'password'] } }
        }
    } },
    { path: '/users/:id', method: 'get', tags: ['Usuários'], summary: 'Busca usuário', authRequired: true, action: userActions.fetchUserById, parameters: [
        { name: 'id', in: 'path', required: true, description: 'ID do usuário', schema: { type: 'integer' } }
    ] },
    { path: '/users/:id', method: 'put', tags: ['Usuários'], summary: 'Atualiza usuário', authRequired: true, action: userActions.updateUser, parameters: [
        { name: 'id', in: 'path', required: true, description: 'ID do usuário', schema: { type: 'integer' } }
    ] },
    { path: '/users/:id', method: 'delete', tags: ['Usuários'], summary: 'Deleta usuário', authRequired: true, action: userActions.deleteUser, parameters: [
        { name: 'id', in: 'path', required: true, description: 'ID do usuário', schema: { type: 'integer' } }
    ] }
];

export default userRoutesDatas;