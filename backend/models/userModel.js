var db = require("./db");
const bcrypt = require("bcryptjs");

async function validate(data){
    let row = await db.query(`
        SELECT *
        FROM user
        WHERE username = :username
        LIMIT 1
    `, { username: data.username})

    if(row.length){
        return false
    } else {
        addUser(data)

        return true;
    }
}

async function addUser(data){
    console.log(data)
    return await db.query(`
        INSERT INTO user(username,password)
        VALUES(:username, :password)
    `, { username: data.username, password: bcrypt.hashSync(data.password1.toString(), 10)})
}

async function login(data){
    let valid = false;
    let row = await db.query(`
        SELECT *
        FROM user
        WHERE username = :username
        LIMIT 1
    `, { username : data.username })

    if(row.length){
        const verified = bcrypt.compareSync(data.password, row[0].password);

        if(verified){
            valid = {
                id : row[0].id
                , username : row[0].username
                , usertype : row[0].usertype
            };
        }
    }

    return valid;
}

module.exports = {
    validate
    , login
}