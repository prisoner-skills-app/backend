
exports.up = function(knex) {
    return knex.schema
        .createTable('centers', tbl => {
            tbl.increments();
            tbl.string('email', 128)
                .notNullable()
                .unique();
            tbl.string('password', 128)
                .notNullable();
            tbl.string('name')
                .unique();
            tbl.string('wardenName', 128);
            tbl.string('city', 255);
            tbl.string('state', 128);
            tbl.string('phone', 20);
            tbl.boolean('profileComplete')
                .defaultTo('false')
                .notNullable();
        })
        .createTable('candidates', tbl => {
            tbl.increments();
            tbl.integer('centerId')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('centers')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.string('name', 128)
                .notNullable();
            tbl.string('availability', 255);
            tbl.string('skills', 500);
            tbl.string('description', 1000);
            tbl.string('education', 255);
            tbl.date('paroleDate');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('candidates')
        .dropTableIfExists('centers');
};
