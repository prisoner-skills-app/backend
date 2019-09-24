const router = require('express').Router();

const Centers = require('../centers/centers-model.js');
const Candidates = require('../candidates/candidates-model.js');
const authentication = require('../auth/auth-middleware.js');

//PUBLIC OPERATIONS

//get centers with completed profiles
router.get('/', (req, res) => {
    Centers.findCompleteCenters()
        .then(centers => {
            res.status(200).json(centers)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the centers.' })
        });
});

//**ERROR: LOOK INTO THE BELOW */
// get center by id, as well as all candidates from center
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Centers.findCenterById(id)
    .then(center => {
        res.status(200).json(center);
        const { id } = center;
        Centers.findCandidatesByCenterId(id)
        .then(persons => {
            res.status(200).json(persons)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the candidates.' })
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified center.' })
    });
});

//AUTH OPERATIONS

module.exports = router;


