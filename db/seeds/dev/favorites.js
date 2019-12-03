exports.seed = function(knex) {
  return knex('favorites').del()
    .then(() => {
      return Promise.all([
        knex('favorites').insert([
          {title: 'Bailamos', artistName: 'Enrique Iglesias', genre: 'Pop', rating: 88},
          {title: 'Fleetwood Mac', artistName: 'Fleetwood Mac', genre: 'Rock', rating: 52},
          {title: 'Truth Hurts', artistName: 'Lizzo', genre: 'Pop', rating: 40},
          {title: 'Baby One More Time', artistName: 'Britney Spears', genre: 'Pop', rating: 91},
          {title: 'Toxic', artistName: 'Britney Spears', genre: 'Pop', rating: 68}
        ])
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
