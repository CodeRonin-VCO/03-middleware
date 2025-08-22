
const appController = {
    danger: (req, res) => {
        throw new Error("Kaboum 💣. Une erreur s'est produite.");
    },
    searchQuery: (req, res) => {
        console.log("Pagination : ", req.pagination);
        res.sendStatus(501);
    }
}

export default appController;