import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';
import Access from '../schemas/Access';
import Client from '../models/Client';
import Permission from '../models/Permission';

import ErroHandle from '../../lib/Errorhandle';

class AuthenticatorController {
  async store(req, res) {
    const { client_key, client_secret } = req.headers;

    const client = await Client.findOne({
      where: { client_key, client_secret },
      include: [
        {
          model: Permission,
          as: 'permission',
          attributes: ['id'],
        },
      ],
    });

    if (!client) {
      throw new ErroHandle({ message: 'Client not found', status: 401 });
    }

    const { email, cpf, password } = req.body;
    let user;

    if (email) {
      user = await User.findOne({
        where: { email },
      });
    } else {
      user = await User.findOne({
        where: { cpf },
      });
    }

    if (!user) {
      throw new ErroHandle({ message: 'User not found', status: 401 });
    }

    if (!(await user.checkPassword(password))) {
      throw new ErroHandle({ message: 'Password does not match', status: 401 });
    }

    /**
     * Buscando permissões do usuário
     */
    const permissionUser = await user.getPermissions();

    /**
     * Buscando permissões das role do usuário e reduzindo em um array de permissões.
     */
    const permRoleUser = await user.getRoles().map(async role => {
      const [{ id }] = await role.getPermissions();
      return [{ id }].reduce((accumulator, currentValue) => [
        ...accumulator,
        currentValue,
      ]);
    });

    const existPerm = [...permissionUser, ...permRoleUser].find(
      p => p.id === client.permission.id
    );

    if (!existPerm) {
      throw new ErroHandle({
        message: 'User does not have permission to access',
        status: 401,
      });
    }

    const { id, name, phone_number } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    /**
     * Buscando data de expriração do token do usuário.
     */
    const { payload } = jwt.decode(token, {
      complete: true,
    });

    const { expire_in, created_at, phone_register_code } = await Access.create({
      token,
      user: id,
      expire_in: new Date(payload.exp * 1000),
    });

    return res.json({
      user: {
        id,
        name,
        cpf,
        email,
        phone_number,
      },
      access: { token, expire_in, created_at, phone_register_code },
    });
  }
}

export default new AuthenticatorController();
