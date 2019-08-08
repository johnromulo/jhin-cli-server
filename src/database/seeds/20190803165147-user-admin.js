const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    const pass = await bcrypt.hash('admin1234', 8);

    const users = [
      {
        name: 'Admin',
        cpf: '12345678901',
        email: 'admin@teste.com',
        phone_number: '81999989796',
        password_hash: pass,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert('users', users);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
