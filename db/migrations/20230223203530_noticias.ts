import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('noticias', (table) => {
            table.increments('id').primary();
            table.text('nome').notNullable();
            table.text('imagem').notNullable();
            table.date('data').notNullable();
            table.text('autor').notNullable();
            table.text('descricao').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
}
