module.exports = {
  up: async queryInterface => {
    const [loginWeb] = await queryInterface.sequelize.query(
      `SELECT id from permissions where permissions.key in ('LOGIN_WEB')`
    );

    const [loginMobile] = await queryInterface.sequelize.query(
      `SELECT id from permissions where permissions.key in ('LOGIN_MOBILE')`
    );

    const clients = [
      {
        client_key: 'clientkey_web',
        client_secret: 'client_secret_web',
        created_at: new Date(),
        updated_at: new Date(),
        permission_id: loginWeb[0].id,
      },
      {
        client_key: 'clientkey_mobile',
        client_secret: 'client_secret_mobile',
        created_at: new Date(),
        updated_at: new Date(),
        permission_id: loginMobile[0].id,
      },
    ];
    return queryInterface.bulkInsert('clients', clients);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('clients', null, {});
  },
};
