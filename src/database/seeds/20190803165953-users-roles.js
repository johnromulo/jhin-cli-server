module.exports = {
  up: async queryInterface => {
    const [userAdmin] = await queryInterface.sequelize.query(
      `SELECT id from users where users.cpf in ('12345678901')`
    );

    const [roleAdmin] = await queryInterface.sequelize.query(
      `SELECT id from roles where roles.key in ('USER_ADMIN')`
    );

    const roles_users = [
      {
        role_id: roleAdmin[0].id,
        user_id: userAdmin[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert('roles_users', roles_users);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('roles_users', null, {});
  },
};
