/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('favorites', {
    id: 'id',
    externalId: { type: 'varchar(100)', notNull: true },
    title: { type: 'varchar(100)', notNull: true },
    price: { type: 'varchar(100)', notNull: true },
    category: { type: 'varchar(100)', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
    image: { type: 'varchar(1000)', notNull: true },
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

  pgm.addConstraint('favorites', 'unique_user_favorite', {
    unique: ['userId', 'externalId'],
  });
};

exports.down = pgm => {};
