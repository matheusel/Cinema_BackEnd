import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('atores',(table) =>{

        table.increments('id').primary();
        table.text('nome').notNullable();
        table.integer('idade').notNullable();
        table.text('nacionalidade').notNullable();

      
    })
}


export async function down(knex: Knex): Promise<void> {
}

