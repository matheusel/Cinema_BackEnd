import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
    await knex.schema.createTable('avaliacao',(table) =>{
        
        table.increments('id').primary();
        table.text('nome').notNullable();
        table.text('comentário').notNullable();
        table.integer('nota').notNullable();
        table.integer('filmes_id').unsigned();
        table.integer('series_id').unsigned();
        table.integer('usuarios_id').unsigned();
        table.foreign('filmes_id').references('filmes.id'); 
        table.foreign('series_id').references('series.id'); 
        table.foreign('usuarios_id').references('usuarios.id'); 
    })
}

export async function down(knex: Knex): Promise<void> {
}

