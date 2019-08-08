module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'recursos humanos',
          key: 'USER_RH',
          description: 'Role of users rh ',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'administrador',
          key: 'USER_ADMIN',
          description: 'Role of users admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'tomador',
          key: 'USER_TAKER',
          description: 'Role of users tomador',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
