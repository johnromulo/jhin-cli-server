module.exports = {
  up: async queryInterface => {
    const [permissionsAdmin] = await queryInterface.sequelize.query(
      `SELECT id from permissions where permissions.key in ('LOGIN_WEB')`
    );

    const [roleAdmin] = await queryInterface.sequelize.query(
      `SELECT id from roles where key = 'USER_ADMIN';`
    );

    const pers_roles_admin = permissionsAdmin.map(p => {
      return {
        permission_id: p.id,
        role_id: roleAdmin[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    const [permissionsRh] = await queryInterface.sequelize.query(
      `SELECT id from permissions where permissions.key in ('LOGIN_WEB')`
    );

    const [roleRh] = await queryInterface.sequelize.query(
      `SELECT id from roles where key = 'USER_RH';`
    );

    const pers_roles_rh = permissionsRh.map(p => {
      return {
        permission_id: p.id,
        role_id: roleRh[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    const [permissionsTomador] = await queryInterface.sequelize.query(
      `SELECT id from permissions where permissions.key in ('LOGIN_MOBILE')`
    );

    const [roleTomador] = await queryInterface.sequelize.query(
      `SELECT id from roles where key = 'USER_TAKER';`
    );

    const pers_roles_tomador = permissionsTomador.map(p => {
      return {
        permission_id: p.id,
        role_id: roleTomador[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    const pers_roles = [
      ...pers_roles_admin,
      ...pers_roles_rh,
      ...pers_roles_tomador,
    ];

    return queryInterface.bulkInsert('permissions_roles', pers_roles);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('permissions_roles', null, {});
  },
};
