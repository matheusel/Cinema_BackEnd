import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

        await knex.schema.createTable('filmes',(table) =>{
            

            table.increments('id').primary();
            table.text('Nome').notNullable();
            table.text('sinopse').notNullable();
            table.text('direcao').notNullable();
            table.text('duracao').notNullable();
            table.text('classificacao').notNullable();
            table.integer('lancamento').notNullable();
            table.text('imagem').notNullable();
            table.text('trailer').notNullable();
            table.integer('generos_id').unsigned();
            table.foreign('generos_id').references('generos.id');
        })
}


export async function down(knex: Knex): Promise<void> {
}

