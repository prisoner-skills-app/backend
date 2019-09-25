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
//update a center
router.put('/:id/profile', restricted, (req, res) => {
    const { id } = req.params;
    const changes = {
        profileComplete: true,
        ...req.body
    }
    Centers.updateCenter(id, changes)
        .then(updated => {
            //console.log(updated);
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: 'No center with this ID exists.' })
            }  
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was an error updating the specified center.' })
        });
});

//delete a center
router.delete('/:id', restricted, (req, res) => {
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
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting the specified center.' })
    });
});

//add a new candidate
router.post('/:id/candidates', restricted, (req, res) => {
    const newCandidate = req.body;
    const { id } = req.params;

    Centers.findCenterById(id)
    .then(center => {
        if (center) {
            //console.log('center to add candidate to:', center);
            //console.log('candidate to add:', newCandidate);
            //console.log('center id:', id);
            Candidates.addCandidate(newCandidate, id)
            .then(candidate => {
                res.status(201).json(candidate);
            })
            .catch(error => {
                console.log(error);
                res.status(500).status({ message: 'There was an error creating a new candidate.' })
            });
        } else {
            res.status(404).json({ message: 'No center with this ID exists.' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error while creating a new candidate profile.' })
    });
});

//update a candidate

//delete a candidate
router.delete('/:centId/candidates/:candId', restricted, (req, res) => {
    const centId = req.params.centId;
    const candId = req.params.candId;
    Candidates.findCandidateById(candId)
    .then(candidate => {
        console.log(candidate)
        if (centId == candidate.centerId){
            Candidates.removeCandidate(candidate.id)
            .then(deleted => {
                res.status(200).json({removed: candidate});
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({ message: 'No candidate with this ID exists at this center.'});
            })
        } else {
            res.status(404).json({ message: 'You are not authorized to remove this candidate.' }); 
        }
        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error retrieving the specified candidate.' })
    });
});



module.exports = router;


