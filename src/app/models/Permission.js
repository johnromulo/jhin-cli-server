import Sequelize, { Model } from 'sequelize';

class Permission extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        key: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'permissions_users',
      foreignKey: 'permission_id',
      as: 'users',
    });

    this.belongsToMany(models.Role, {
      through: 'permissions_roles',
      foreignKey: 'permission_id',
      as: 'roles',
    });
  }
}

export default Permission;
