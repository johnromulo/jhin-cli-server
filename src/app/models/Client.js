import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        client_key: Sequelize.STRING,
        client_secret: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Permission, {
      foreignKey: 'permission_id',
      as: 'permission',
    });
  }
}

export default Client;
