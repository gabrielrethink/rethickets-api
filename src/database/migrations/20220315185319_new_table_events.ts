import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('events', (table: Knex.TableBuilder) => {
        table.increments()
        table.string('name');
        table.string('resume');
        table.string('description');
        table.string('type');
        table.string('category');
        table.string('event_image_small');
        table.string('event_image_big');
        table.string('localization');
        table.dateTime('event_date')
        table.timestamps();

    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('events');
}