import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'
import { Readable } from 'node:stream'

export class ImportTasksStream extends Readable {
    constructor(csvFilePath) {
        super()
        this.csvFilePath = csvFilePath
    }

    async process() {
        const records = createReadStream(this.csvFilePath).pipe(
            parse({
                columns: true,
                skip_empty_lines: true
            })
        )

        for await (const record of records) {
            const task = {
                title: record.title,
                description: record.description
            }

            try {
                const response = await fetch('http://localhost:3333/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })

                if(response.status === 201) {
                    console.log(`Task criada com sucesso: ${task.title}`)
                } else {
                    console.error(`Erro ao criar task: ${task.title}`)
                }
            } catch(err) {
                console.error(`Erro na requisição para task ${task.title}:`, err)
            }
        }
    }
}
