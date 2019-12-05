
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('favorites', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('artistName');
      table.string('genre');
      table.integer('rating');

      table.timestamps(true, true);
    })

    knex.schema.createTable('playlists', function(table) {
      table.increments('id').primary();
      table.string('title');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('favorites')
    knex.schema.dropTable('playlists')
  ]);
}
