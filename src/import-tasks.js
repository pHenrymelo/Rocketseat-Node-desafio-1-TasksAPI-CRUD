import { ImportTasksStream } from './csv-import-tasks-stream.js'
 
const csvFilePath = new URL('./tasks.csv', import.meta.url)
const importStream = new ImportTasksStream(csvFilePath)

importStream.process().then(
    console.log("a importação foi executada")
).catch( err => {
    console.error("Erro na importação: ", err)
})