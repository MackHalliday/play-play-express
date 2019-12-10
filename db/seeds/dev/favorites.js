exports.seed = function(knex) {
  return Promise.all([
    knex('favorites_playlist').del(),
    knex('favorites').del(),
    knex('playlists').del()
    ])
    .then(() => {
      return Promise.all([
        knex('favorites').insert([
          {id: 1, title: 'Bailamos', artistName: 'Enrique Iglesias', genre: 'Pop', rating: 88},
          {id: 2, title: 'The Chain', artistName: 'Fleetwood Mac', genre: 'Rock', rating: 52},
          {id: 3, title: 'Truth Hurts', artistName: 'Lizzo', genre: 'Pop', rating: 40},
          {id: 4, title: 'Baby One More Time', artistName: 'Britney Spears', genre: 'Pop', rating: 91},
          {id: 5, title: 'Toxic', artistName: 'Britney Spears', genre: 'Pop', rating: 68},
          {id: 6, title: 'Track 1', artistName: 'Artist', genre: 'Genre', rating: 75},
          {id: 7, title: 'Track 2', artistName: 'Artist', genre: 'Genre', rating: 80},
          {id: 8, title: 'Track 3', artistName: 'Artist', genre: 'Genre', rating: 85},
          {id: 9, title: 'Track 4', artistName: 'Artist', genre: 'Genre', rating: 90}
        ])
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`)),

        knex('playlists').insert([
          {id: 1, title: '90s Guilty Pleasure'},
          {id: 2, title: 'Party Mix'},
          {id: 3, title: 'Christmas Playlist'},
          {id: 4, title: 'Top 100 Songs'},
          {id: 5, title: 'Playlist 1 Test'},
          {id: 6, title: 'Playlist 2 Test'},
          {id: 7, title: 'Playlist 3 Test'},
          {id: 8, title: 'Playlist 4 Test'}
        ])
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`)),

        // knex('favorites_playlist').insert([
        //   {id: 1, favorites_id: 1, playlists_id: 1},
        //   {id: 2, favorites_id: 2, playlists_id: 3},
        //   {id: 3, favorites_id: 6, playlists_id: 5},
        //   {id: 4, favorites_id: 7, playlists_id: 7},
        //   {id: 5, favorites_id: 8, playlists_id: 8},
        //   {id: 6, favorites_id: 7, playlists_id: 8},
        // ])
        // .then(() => console.log('Seeding complete!'))
        // .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
