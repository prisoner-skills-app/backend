
exports.seed = function(knex) {
  return knex('candidates').insert([
    {id: 1, centerId: 1, name: 'Sirius Black', availability: 'In-facility only', skills: 'Wizardry, Metalwork, Knitting', description: null, education: 'Master of Dark Arts', paroleDate: 2020-03-01}, 
    {id: 2, centerId: 1, name: 'Barty Crouch', availability: 'In-facility only', skills: 'Wizardry, Cartography, HTML/CSS', description: 'A resourceful and innovative individual that brings 100% effort to every project.', education: 'Bachelors of Dark Arts', paroleDate: 2022-12-28},
    {id: 3, centerId: 1, name: 'Dolores Umbridge', availability: 'In-facility only', skills: 'Knitting, HTML/CSS', description: 'Her knit scarves and socks are almost as exquisitely crafted as her crimes against humanity.', education: 'Bachelors of Dark Arts', paroleDate: 2080-06-20}
  ]);
};
