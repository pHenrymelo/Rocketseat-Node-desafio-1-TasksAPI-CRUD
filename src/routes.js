import { buildRoutePath } from './utils/build-route-path.js'
import { Database } from './database/database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
    {
        method: "GET",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            
        }
    },
    {
        method: "POST",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            }

            database.insert('tasks', task)
            return res.writeHead(201).end()

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