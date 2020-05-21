const db = require("../database/connection.js");

module.exports = {
    find,
    findById,
    add,
    remove
};

function find() {
    return db("users").select("id", "username");
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}

function add(user) {
    return db("users").insert(user);
}

function remove(id) {
    return db("users")
        .where({ id })
        .del();
}