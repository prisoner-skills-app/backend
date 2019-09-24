const router = require('express').Router();

const Candidates = require('../candidates/candidates-model.js');

//get all candidates
router.get('/', (req, res) => {
    Candidates.findCandidates()
        .then(persons => {
            res.status(200).json(persons)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the candidates.' })
        });
});

//get a single candidate by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Candidates.findCandidateById(id)
    .then(person => {
        res.status(200).json(person)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified candidate.' })
    });
});

module.exports = router;