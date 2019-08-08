import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Permission from '../app/models/Permission';
import Role from '../app/models/Role';
import Client from '../app/models/Client';

import databaseConfig from '../config/database';

const models = [User, Permission, Role, Client];
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
