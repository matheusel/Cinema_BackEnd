import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
await knex.schema.createTable('series',(table) =>{

    table.increments('id').primary();
    table.text('nome').notNullable();
    table.text('sinopse').notNullable();
    table.text('direcao').notNullable();
    table.date('lancamento').notNullable();
    table.text('classificacao').notNullable();
    table.integer('temporadas').notNullable();
    table.text('trailer').notNullable();
    table.text('imagem').notNullable();  
    table.integer('generos_id').unsigned();
    table.foreign('generos_id').references('generos.id'); 
  
})
}

export async function down(knex: Knex): Promise<void> {
}

