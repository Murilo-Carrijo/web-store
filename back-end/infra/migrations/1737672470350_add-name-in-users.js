/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('users', {
    name: { type: 'varchar(100)', notNull: true },
  });
};

exports.down = pgm => {};
