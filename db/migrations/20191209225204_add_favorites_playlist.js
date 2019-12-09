
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('favorites_playlist', function(table){
      table.increments().primary();
      table.integer('favorites_id').references('id').inTable('favorites');
      table.integer('playlists_id').references('id').inTable('playlists');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('favorites_playlist')
  ]);
}
