import UpdateAccessManagementService from '../services/UpdateAccessManagementService';

class AccessManagementController {
  async update(req, res) {
    const { roles, permissions } = await UpdateAccessManagementService.run({
      user_id: req.params.userid,
      roles: req.body.roles,
      permissions: req.body.permissions,
    });

    return res.status(200).json({ roles, permissions });
  }
}

export default new AccessManagementController();
