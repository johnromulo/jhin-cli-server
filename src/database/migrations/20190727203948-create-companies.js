module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name_fantasy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      social_reason: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      revenues: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      name_contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number_contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cell_number_contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      corresponding: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      responsible_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      responsible_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_agreement: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      number_employees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      covenant_payday: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      leaf_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payday: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('companies');
  },
};
