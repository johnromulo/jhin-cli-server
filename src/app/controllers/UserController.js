import { Op } from 'sequelize';
import User from '../models/User';

import ErroHandle from '../../lib/Errorhandle';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { cpf: req.body.cpf },
          { phone_number: req.body.phone_number },
        ],
      },
    });

    if (userExists) {
      throw new ErroHandle({ message: 'User already exists', status: 400 });
    }

    const { id, name, email, cpf, phone_number } = await User.create(req.body);

    return res.json({ user: { id, name, email, cpf, phone_number } });
  }

  async update(req, res) {
    const { email, cpf, phone_number, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    let userExists;

    if (email !== user.email) {
      userExists = await await User.findOne({
        where: { email },
      });
    }

    if (cpf !== user.cpf) {
      userExists = await await User.findOne({
        where: { cpf },
      });
    }

    if (phone_number !== user.phone_number) {
      userExists = await await User.findOne({
        where: { phone_number },
      });
    }

    if (userExists) {
      throw new ErroHandle({ message: 'User already exists', status: 400 });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new ErroHandle({ message: 'Password does not match', status: 400 });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ user: { id, name, email, cpf, phone_number } });
  }
}

export default new UserController();
