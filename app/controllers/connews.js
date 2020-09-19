// Import model menu
const Detail = require("../models/mo.news.js");
// Create and Save a new Menu
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Menu
    const detail= new Detail({
        title: req.body.title,
        content1: req.body.content1,
        image1: req.body.image1,
        infoimage1: req.body.infoimage1,
        image2: req.body.image2,
        infoimage2: req.body.infoimage2,
        content2: req.body.content2,
        content3: req.body.content3,
        menuID: req.body.menuID
    });
    // Save Menu in the database
    Detail.create(detail, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating..."
            });
        else res.send(data);
    });
};
// Retrieve all Menu from the database.
exports.findAll = function (req, res) {
    Detail.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving..."
            });
        else res.send(data);
    });
};

// Find a single Menu with a menuID
exports.findOne = (req, res) => {
    Detail.findById(req.params.menuID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found with id ${req.params.menuID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving with id " + req.params.menuID
                });
            }
        } else res.send(data);
    });
};
//Update a identified by the menuID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Detail.updateById(
        req.params.menuID,
        new Detail(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found with id ${req.params.menuID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating with id " + req.params.menuID
                    });
                }
            } else res.send(data);
        }
    );
};
// Delete a with the specified in the request
exports.delete = (req, res) => {
    Detail.remove(req.params.menuID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Menu with id ${req.params.menuID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Menu with id " + req.params.menuID
                });
            }
        } else res.send({ message: `Menu was deleted successfully!` });
    });
};
// Delete all from the database.
exports.deleteAll = (req, res) => {
};

