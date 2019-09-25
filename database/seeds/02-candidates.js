
exports.seed = function(knex) {
  return knex('candidates').insert([
    {id: 1, centerId: 1, name: 'Sirius Black', availability: 'In-facility only', skills: 'Wizardry, Metalwork, Knitting', description: null, education: 'Master of Dark Arts', paroleDate: 'March 15, 2020'}, 
    {id: 2, centerId: 1, name: 'Barty Crouch', availability: 'In-facility only', skills: 'Wizardry, Cartography, HTML/CSS', description: 'A resourceful and innovative individual that brings 100% effort to every project.', education: 'Bachelors of Dark Arts', paroleDate: 'December 28, 2024'},
    {id: 3, centerId: 1, name: 'Dolores Umbridge', availability: 'In-facility only', skills: 'Knitting, HTML/CSS', description: 'Her knit scarves and socks are almost as exquisitely crafted as her crimes against humanity.', education: 'Bachelors of Dark Arts', paroleDate: 'January 1, 2075'}
  ]);
};
