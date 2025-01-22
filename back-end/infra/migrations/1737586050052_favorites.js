/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('favorites', {
    id: 'id',
    externalId: { type: 'varchar(50)', notNull: true },
    title: { type: 'varchar(50)', notNull: true },
    price: { type: 'varchar(50)', notNull: true },
    category: { type: 'varchar(50)', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
    image: { type: 'varchar(50)', notNull: true },
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updateAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('favorites', 'userId');
};

exports.down = pgm => {};
