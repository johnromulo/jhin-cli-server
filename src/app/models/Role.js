import Sequelize, { Model } from 'sequelize';

class Role extends Model {
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
      through: 'roles_users',
      foreignKey: 'role_id',
      as: 'users',
    });

    this.belongsToMany(models.Permission, {
      through: 'permissions_roles',
      foreignKey: 'role_id',
      as: 'permissions',
    });
  }
}

export default Role;
