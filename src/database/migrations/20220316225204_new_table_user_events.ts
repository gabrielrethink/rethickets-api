import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_events', (table: Knex.TableBuilder) => {
        table.increments()
        table.integer("user_id").unsigned();
        table.integer("event_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.foreign("event_id").references("events.id");
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users_events');
}
