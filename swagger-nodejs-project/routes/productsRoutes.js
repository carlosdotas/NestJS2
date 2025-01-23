import express from 'express';

// Funções de ação para produtos
const productActions = {
    fetchProducts: (req, res) => {
        // Lógica para buscar produtos
        res.json({ message: 'Lista de produtos retornada com sucesso.' });
    },
    createProduct: (req, res) => {
        // Lógica para criar um novo produto
        res.json({ message: 'Produto criado com sucesso.' });
    },
    fetchProductById: (req, res) => {
        // Lógica para buscar um produto por ID
        res.json({ message: 'Produto retornado com sucesso.' });
    },
    updateProduct: (req, res) => {
        // Lógica para atualizar um produto
        res.json({ message: 'Produto atualizado com sucesso.' });
    },
    deleteProduct: (req, res) => {
        // Lógica para deletar um produto
        res.json({ message: 'Produto deletado com sucesso.' });
    },
};

const productRoutesDatas = [
    { path: '/products', method: 'get', tags: ['Produtos'], summary: 'Lista todos os produtos', description: 'Retorna a lista de produtos cadastrados.', action: productActions.fetchProducts },
    { path: '/products', method: 'post', tags: ['Produtos'], summary: 'Cria um novo produto', description: 'Cria um novo produto com os dados fornecidos.', action: productActions.createProduct },
    { path: '/products/:id', method: 'get', tags: ['Produtos'], summary: 'Retorna um produto específico', description: 'Retorna os detalhes de um produto com base no ID fornecido.', action: productActions.fetchProductById },
    { path: '/products/:id', method: 'put', tags: ['Produtos'], summary: 'Atualiza um produto', description: 'Atualiza os dados de um produto existente.', action: productActions.updateProduct },
    { path: '/products/:id', method: 'delete', tags: ['Produtos'], summary: 'Deleta um produto específico', description: 'Deleta um produto específico com base no ID fornecido.', action: productActions.deleteProduct },
];

export default productRoutesDatas;
