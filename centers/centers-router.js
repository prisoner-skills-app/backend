const router = require('express').Router();

const Centers = require('../centers/centers-model.js');
const Candidates = require('../candidates/candidates-model.js');
const restricted = require('../auth/auth-middleware.js');

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

// get center by id, as well as all candidates from center
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Centers.findCenterById(id)
    .then(center => {
        const id = center.id;
        Centers.findCandidatesByCenterId(id)
        .then(persons => {
            res.status(200).json({center, persons})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error retrieving the candidates.' })
        });
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({ message: 'No center with this ID exists.' })
    });
});

//AUTH OPERATIONS


//delete a center
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Centers.findCenterById(id)
    .then(center => {
        Centers.removeCenter(center.id)
        .then(deleted => {
            res.status(200).json({removed: center});
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: 'No center with this ID exists.'})
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting the specified center.' })
    });
});

//delete a candidate
// router.delete('/:id/candidates/:id', (req, res) => {
//     const { id } = req.params;
//     Centers.findCenterById(id)
//     .then(center => {
//         const id = center.id;
//         Centers.findCandidatesByCenterId(id)
//         .then(persons => {
//             res.status(200).json({center, persons})
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({ message: 'There was an error retrieving the candidates.' })
//         });
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({ message: 'There was an error retrieving the specified center.' })
//     });
// });



module.exports = router;


