var db = require("./db");
const bcrypt = require("bcryptjs");

async function validate(required){
    let err = [];

    for(var i in required){
        if(required[i] == ""){
            err.push(i+" is required")
        }
    }

    if(required['password'] != required['password2']){
        err.push("Passwords doesn't matched.");
    }

    let emailExists = await checkEmail(required['email']);

    if(emailExists.length){
        err.push("Email is already in use.")
    }

    return err;
}

async function authenticate(required){
    let err = [];

    for(var i in required){
        if(required[i] == ""){
            err.push(i+" is required")
        }
    }

    return err;
}

/**
 * Checks if email exists
 */
 async function checkEmail(email){
    const rows = await db.query("select * from users where email = :email limit 1", { email:email});

    return rows;
}

/**
 * insert new record
 */

async function addUser(data){
    const rows = await db.query(`
        INSERT INTO users(firstname,lastname,email,password)
        VALUES(:fname,:lname,:email,:pw)
    `, {'fname': data['firstname'], 'lname': data['lastname'], 'email': data['email'], 'pw' : bcrypt.hashSync(data['password'], 10)})

    return rows;
}

async function getUserById(id){
    const row = await db.query(`
        SELECT *
        FROM users
        WHERE id = :id
        LIMIT 1
    `, { 'id': id});

    return row;
}

async function getAllUsers(){
    let rows = await db.query(`
        SELECT *
        FROM user
    `);

    return rows;

}

async function findOne(data){
    const hash = bcrypt.hashSync(data['password'], 10);
    const row = await db.query(`
        SELECT *
        FROM users
        WHERE email = :email
        LIMIT 1
    `, { 'email':data['email']});

    let valid = false;

    if(row.length > 0){
        let password = row[0]['password'];
        const verified = bcrypt.compareSync(data['password'], hash);

        if(verified){
            valid = row[0]['id'];
        }

    }

    return valid;
}

module.exports = {
    validate
    , checkEmail
    , addUser
    , findOne
    , authenticate
    , getUserById
    , getAllUsers
}