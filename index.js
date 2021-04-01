const express = require('express');
const {response} = require('express')
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

app.get('/projects', (req, res) => {

    return res.json(projects);
});

app.post('/projects', (req, res) => {
    const {title, owner} = req.body
    const project = { id: uuid(), title, owner};

    projects.push(project);
    return res.json(project)
})

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const {title, owner} = req.body

    const projectsIndex = projects.findIndex(project => project.id === id)

    if (projectsIndex < 0) {
        return res.status(400).json({error: 'Projeto não encontrado'});
    }

    const project = {
        id, 
        title,
        owner
    }

    projects[projectsIndex] = project;

    return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
    const {id} = req.params

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: 'Projeto não foi encontrado'})
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
});