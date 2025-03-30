import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
    #database = {}

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    constructor() {
        fs.readFile(databasePath, 'utf-8')
        .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }

    select(table, search, id) {
        let data = this.#database[table] ?? []

        if(search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        if(id) {
            return data.find(row => row.id === id)
        }

        return data
    }

    remove(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(data) {
            if(rowIndex > -1){
                const actualData = this.#database[table][rowIndex]
                this.#database[table][rowIndex] = {id, ...actualData, ...data, updated_at: new Date()}
                this.#persist()
            }
        } else {
            if(rowIndex > -1) {
                const actualData = this.#database[table][rowIndex]

                if(!actualData.completed_at){
                    this.#database[table][rowIndex] = {
                        ...actualData,
                        completed_at: new Date()
                    }
                } else {
                    this.#database[table][rowIndex] = {
                        ...actualData,
                        completed_at: null
                    }
                }

                this.#persist()
            }
        }
    }


}