
export const routes = [
    {
        method: "GET",
        path: "/tasks",
        handler: (req, res) => {
            return res.end('listar tasks')
        }
    },
    {
        method: "POST",
        path: "/tasks",
        handler: (req, res) => {
            return res.end('criar task')
        }
    },
    {
        method: "DELETE",
        path: "/tasks/:id",
        handler: (req, res) => {
            return res.end('deletar task')
        }
    },
    {
        method: "PUT",
        path: "/tasks/:id",
        handler: (req, res) => {
            return res.end('editar task')   
        }
    },
    {
        method: "PATCH",
        path: "/tasks/:id/complete",
        handler: (req, res) => {
            return res.end('marcar task como concluída')
        }
    },

]