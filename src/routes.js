import { buildRoutePath } from './utils/build-route-path.js'
import { Database } from './database/database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
    {
        method: "GET",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            return res.end('listar tasks')
        }
    },
    {
        method: "POST",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            return res.end('criar task')
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            return res.end('deletar task')
        }
    },
    {
        method: "PUT",
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            return res.end('editar task')   
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            return res.end('marcar task como concluída')
        }
    },

]