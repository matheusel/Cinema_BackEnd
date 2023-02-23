import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
    await knex.schema.createTable('avaliacao',(table) =>{
        
        table.increments('id').primary();
        table.text('nome').notNullable();
        table.text('comentário').notNullable();
        table.integer('nota').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
}

