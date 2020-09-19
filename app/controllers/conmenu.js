// Import model menu
const Menu = require("../models/mo.menu.js");
// Create and Save a new Menu
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Menu
    const menu = new Menu({
        tittle: req.body.tittle,
        subtitle: req.body.subtitle,
        urlimage: req.body.urlimage,
        parentcode: req.body.parentcode
    });
    // Save Menu in the database
    Menu.create(menu, (err, data) => {
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
    Menu.getAll((err, data) => {
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
    Menu.findById(req.params.menuID, (err, data) => {
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
    Menu.updateById(
        req.params.menuID,
        new Menu(req.body),
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
    Menu.remove(req.params.menuID, (err, data) => {
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

