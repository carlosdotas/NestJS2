import { fetch, create, fetchById, update, deleteById } from './controller.js';

const tags = ['Usuários'];
const path = '/users';
const summary = {
    get: 'Lista usuários',
    post: 'Cria usuário',
    put: 'Atualiza usuário',
    delete: 'Deleta usuário'
}

const createRoute = (method, path, action, summary, authRequired, requestBody = {}, parameters = []) => ({
    method,
    path,
    tags,
    summary,
    authRequired,
    action,
    requestBody,
    parameters,
});

const userRoutesDatas = [
    createRoute('get', `${path}`, fetch, summary.get, false),
    createRoute('post', `${path}`, create, summary.post, true, {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john.doe@example.com' },
                        password: { type: 'string', example: '123456' },
                    },
                    required: ['name', 'email', 'password'],
                },
            },
        },
    }),
    createRoute('get', `${path}/:id`, fetchById, summary.get, true, {}, [
        {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do usuário',
            schema: { type: 'integer' },
        },
    ]),
    createRoute('put', `${path}/:id`, update, summary.put, true, {}, [
        {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do usuário',
            schema: { type: 'integer' },
        },
    ]),
    createRoute('delete', `${path}/:id`, deleteById, summary.delete, true, {}, [
        {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do usuário',
            schema: { type: 'integer' },
        },
    ]),
];

export default userRoutesDatas;