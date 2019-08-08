module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('permissions', [
      {
        name: 'login_mobile',
        key: 'LOGIN_MOBILE',
        description: 'Permission to login into mobile ',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'login_web',
        key: 'LOGIN_WEB',
        description: 'Permission to login into portal web',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('permissions', null, {});
  },
};
