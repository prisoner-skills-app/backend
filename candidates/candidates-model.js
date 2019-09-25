const db = require('../database/db-config.js');

module.exports = {
    addCandidate,
    findCandidates,
    findCandidateById,
    removeCandidate,
    updateCandidate,
};

function addCandidate(person, centerId) {
    return db('candidates')
        .insert({'centerId': centerId, ...person}, 'id')
        .then(([id]) => {
            return findCandidateById(id);
        });
};

function findCandidates() {
    return db('candidates')
        .orderBy('id');
};

function findCandidateById(id) {
    return db('candidates')
        .where({ id })
        .first();
};

function removeCandidate(id) {
    return db('candidates')
        .where({ id })
        .del();
};

function updateCandidate(id, changes) {
    return db('candidates')
        .where({ id })
        .update(changes)
        .then(() => findCandidateById(id));
};