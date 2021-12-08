exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', table => {
    table.increments()
    
    table.text('vin', 17)
      .unique()
      .notNullable()

    table.text('make', 128)
      .notNullable()

    table.text('model', 128)
      .notNullable()

    table.decimal('mileage')
      .notNullable()
      .unsigned()

    table.text('title')
      

    table.text('transmission')
      
  })
 
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars')
};
