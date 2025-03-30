import { buildRoutePath } from './utils/build-route-path.js'
import { Database } from './database/database.js'
import { randomUUID } from 'node:crypto'
import { ImportTasksStream } from './utils/csv-import-tasks-stream.js'


const database = new Database()

export const routes = [
    {
        method: "GET",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
        method: "POST",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            if(!title || !description) {
                return res.writeHead(400).end(JSON.stringify({"message": "Os dados fornecidos estão incompletos, forneça titulo e descrição"}))
            }

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
            const { id } = req.params
            const task = database.select('tasks', null, id)

            if(task) {
                database.remove('tasks', id)
                return res.writeHead(204).end()
            } 

            return res.writeHead(404).end(JSON.stringify({"message": "task não encontrada"}))
        }
    },
    {
        method: "PUT",
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const task = database.select('tasks', null, id)
            const { title, description} = req.body

            if(!title || !description) {
                return res.writeHead(400).end(JSON.stringify({"message": "Os dados fornecidos estão incompletos, forneça titulo e descrição"}))
            }

            if(task) {
                database.update('tasks', id, {
                    title,
                    description
                })
                return res.writeHead(204).end()
            } else {
                return res.writeHead(404).end(JSON.stringify({"message": "task não encontrada"}))
            }
            
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params
            const task = database.select('tasks', null, id)
            if(task) {
                database.update('tasks', id)
                return res.writeHead(204).end()
            } 
            return res.writeHead(404).end(JSON.stringify({"message": "task não encontrada"}))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks/import'),
        handler: (req, res) => {
            const csvFilePath = new URL('./tasks.csv', import.meta.url)
            const importStream = new ImportTasksStream(csvFilePath)

            importStream.process().then(
                console.log("a importação foi executada")
            ).catch( err => {
                console.error("Erro na importação: ", err)
            })

            return res.writeHead(201).end(JSON.stringify({"message": "Arquivo CSV importado com sucesso!"}))
        }
    }

]