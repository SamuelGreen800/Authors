const AuthorController = require('../controllers/author.controller');
module.exports = (app) => {

    // app.get('/api/author', (req, res) =>{
    //     res.json({msg: "authorzz"})
    // }
    // );
    app.get('/api/author', AuthorController.getAllAuthors);
    app.post('/api/author', AuthorController.createNewAuthor);
    app.get('/api/author/:id', AuthorController.getOneAuthor);
    app.put('/api/author/:id', AuthorController.updateAuthor);
    app.delete('/api/author/:id', AuthorController.deleteAuthor);
}

