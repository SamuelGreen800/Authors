const { model } = require('mongoose');
const Author = require('../models/author.model')

    module.exports.index = (req, res) => {  
        res.send({     
            message: "Authorzzzz"
        });
    }

    module.exports.createNewAuthor = (req, res) => {
        Author.create(req.body)
        .then((newAuthor) => res.json(newAuthor))
        .catch((err) => {
            res.status(400).json({err});
        })
    }

    module.exports.getAllAuthors = (req, res) => {
        Author.find()
        .then(allAuthors => {
            res.json(allAuthors);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    }

    module.exports.getOneAuthor = (req, res) => {
        Author.findOne({_id: req.params.id})
            .then(oneAuthor =>{
                res.json(oneAuthor)
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    }

    module.exports.updateAuthor = (req, res) => {
        Author.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true} )
            .then((updatedAuthor) => {
                res.json(updatedAuthor)
            })
            .catch((err) => {
                res.status(400).json({err});
            })
    }

    module.exports.deleteAuthor = (req, res) => {
        Author.deleteOne({_id: req.params.id}) 
            .then((deleted) =>{
            res.json (deleted)
            })
            .catch((err) => {
                res.status(400).json(err); 
            })
        }