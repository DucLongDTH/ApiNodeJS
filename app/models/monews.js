// Constructor
const sql = require("./db.js");
const Detail = function (detail) {
   this.title = detail.title,
   this.content1 = detail.content1,
   this.image1 = detail.image1,
   this.infoimage1 = detail.infoimage1,
   this.image2 = detail.image2,
   this.infoimage2 = detail.infoimage2,
   this.content2 = detail.content2,
   this.content3 = detail.content3,
   this.menuID = detail.menuID
};
//  Funtion Create
Detail.create = (newMenu, result) => {
    sql.query("INSERT INTO news SET ?", newMenu, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created newMenu: ", { id: res.insertId, ...newMenu });
        result(null, { id: res.insertId, ...newMenu });
    });
};
// Function FindByID
Detail.findById = (menuID, result) => {
    sql.query(`SELECT * FROM news WHERE id = ${menuID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};
// Function GetAll
Detail.getAll = result => {
    sql.query("SELECT * FROM news", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Detail: ", res);
        result(null, res);
    });
};
// Function UpdatebyID
Detail.updateById = (id, menu, result) => {
    sql.query(
        "UPDATE news SET title = ?, content1 = ?, image1= ?, infoimage1= ?, image2 = ?, infoimage2 = ?, content2 = ?, content3 = ?, menuID= ?   WHERE id = ?",
        [menu.tittle, menu.content1, menu.image1, menu.infoimage2, menu.image2, menu.infoimage2, menu.content2, menu.content3, menu.menuID, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated: ", { id: id, ...menu });
            result(null, { id: id, ...menu });
        }
    );
};
// Function Remove-One
Detail.remove = (id, result) => {
    sql.query("DELETE FROM news WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted news with id: ", id);
        result(null, res);
    });
};
// Function Remove-all
Detail.removeAll = result => {
    sql.query("DELETE FROM news", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} news`);
        result(null, res);
    });
};
// Export 
module.exports = Detail;