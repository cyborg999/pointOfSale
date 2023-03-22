var db = require("./db");
const bcrypt = require("bcryptjs");

async function add(data){
    let added = false
    let exists = await findProductByName(data.name)
    console.log(data)
    if(exists.length == 0){
        db.query(`
            INSERT INTO product(name,srp,qty,barcode,added_by)
            VALUES(:name,:srp,:qty, :barcode,:added_by)
        `, data)

        added = true
    } 

    return added
}

async function findProductByName(product){
    let sql = `
        SELECT *
        FROM product
        WHERE name = :name
        LIMIT 1
    `
    return await db.query(sql, { name: product})

}

module.exports = {
    add
}