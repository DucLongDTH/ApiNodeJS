module.exports = app => {
    const menu = require("../controllers/con.menu.js");
    const detail = require('../controllers/con.news.js');
    // Create a new 
    app.post("/menu/ins", menu.create);
    app.post("/news/ins",detail.create);
    // Retrieve all 
    app.get("/menu/findall", menu.findAll);
    app.get("/news/findall", detail.findAll);
    // Retrieve a single with menuID
    app.get("/menu/findone/:menuID", menu.findOne);
    app.get("/news/findone/:menuID", detail.findOne);
    // Update  with menuID
    app.put("/menu/update/:menuID", menu.update);
    app.put("/news/update/:menuID", detail.update);
    // Delete a Record with menuID
    app.delete("/menu/delone/:menuID", menu.delete);
    app.delete("/news/delone/:menuID", detail.delete);
    // delete all
    app.delete("/menu/delall", menu.deleteAll);
    app.delete("/news/delall", detail.deleteAll);
    
};
