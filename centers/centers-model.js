const db = require('../database/db-config.js');

module.exports = {
    addCenter,
    findCenters,
    findCenterBy,
    findCenterById,
    removeCenter,
    updateCenter,
};

async function addCenter(center) {
    const [id] = await db('centers').insert(center);

    return findCenterById(id);
};

function findCenters() {
    return db('centers')
        .where(filter)
        .select('id', 'email', 'name', 'wardenName', 'city', 'state', 'phone', 'profileComplete')
        .orderBy('id');
};

function findCenterBy(filter) {
    return db('centers')
        .where(filter)
        .first();
};

function findCenterById(id) {
    return db('centers')
        .where({ id })
        .first();
};

function removeCenter(id) {
    return db('centers')
        .where({ id })
        .del();
};

function updateCenter(id, changes) {
    return db('centers')
        .where({ id })
        .update(changes)
        .then(() => findCenterById({id}));
};