import React from "react";
import { Admin, Resource, ListGuesser, Create, SimpleForm, TextInput, Edit } from "react-admin"; // Importando os componentes necessários

const dataProvider = {
    getList: async (resource, params) => {
        const response = await fetch(`http://localhost:3001/${resource}`);
        const data = await response.json();
        return {
            data: data.data,
            total: data.total,
        };
    },
    getOne: async (resource, params) => {
        const response = await fetch(`http://localhost:3001/${resource}/${params.id}`);
        const data = await response.json();
        return { data }; // Certifique-se de que 'data' contém as propriedades corretas
    },
    create: async (resource, params) => {
        const response = await fetch(`http://localhost:3001/${resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        return { data: { ...data, id: data.id } };
    },
    update: async (resource, params) => {
        const response = await fetch(`http://localhost:3001/${resource}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        return { data };
    },
    delete: async (resource, params) => {
        const response = await fetch(`http://localhost:3001/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return { data };
    },
};

const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Create>
);

const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled /> {/* Exibe o ID, mas não pode ser editado */}
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Edit>
);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} create={UserCreate} edit={UserEdit} />
  </Admin>
);

export default App;