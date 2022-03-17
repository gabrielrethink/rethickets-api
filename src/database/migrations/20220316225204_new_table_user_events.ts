import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_events', (table: Knex.TableBuilder) => {
        table.increments()
        table.integer("userId").unsigned();
        table.integer("eventId").unsigned();
        table.foreign("userId").references("users.id");
        table.foreign("eventId").references("events.id");
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users_events');
}
