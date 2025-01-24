import { User } from "./model.js";

async function fetch(req, res) {
    const { page = 1, perPage = 10, sort = 'id', order = 'ASC' } = req.query;
    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage, 10);
    const orderOption = [[sort, order.toUpperCase()]];

    try {
        const { rows: users, count: total } = await User.findAndCountAll({
            offset,
            limit,
            order: orderOption,
        });

        const formattedUsers = users.map(({ id, name, email, createdAt, updatedAt }) => ({
            id,
            name,
            email,
            createdAt,
            updatedAt,
        }));

        res.json({ data: formattedUsers, total }); // Resposta no formato correto
    } catch (error) {
        handleError(res, error, 'Erro ao buscar usuários.');
    }
}

async function create(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
    }

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ data: { ...user, id: user.id } }); // Retorna o usuário criado com o ID
    } catch (error) {
        handleError(res, error, 'Erro ao criar usuário.');
    }
}

async function fetchById(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json({ id: user.id, data: { id: user.id, name: user.name, email: user.email } }); // Retorna o usuário com a chave 'id'
    } catch (error) {
        handleError(res, error, 'Erro ao buscar usuário.');
    }
}

async function update(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await user.update(req.body);
        res.json({ data: { ...user } }); // Retorna o usuário atualizado
    } catch (error) {
        handleError(res, error, 'Erro ao atualizar usuário.');
    }
}

async function deleteById(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await user.destroy();
        res.json({ data: { id: user.id } }); // Retorna o ID do usuário deletado
    } catch (error) {
        handleError(res, error, 'Erro ao deletar usuário.');
    }
}

export {
    fetch,
    create,
    fetchById,
    update,
    deleteById,
};