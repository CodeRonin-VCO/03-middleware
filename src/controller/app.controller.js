
const appController = {
    danger: (req, res) => {
        throw new Error("Kaboum 💣");
    },
    searchQuery: (req, res) => {
        console.log("Pagination : ", req.pagination);
        res.sendStatus(501);
    }
}

export default appController;