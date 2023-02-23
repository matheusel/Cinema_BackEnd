import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('usuarios',(table) =>{

        table.increments('id').primary();
        table.text('nome').notNullable();
        table.text('email').notNullable();
        table.text('senha').notNullable();
        table.text('perfil').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
}