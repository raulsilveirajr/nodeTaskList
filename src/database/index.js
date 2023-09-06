import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';

import User from '../app/models/Users.js';
import Task from '../app/models/Tasks.js';

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => {
      model.init(this.connection);
    });
    models.forEach((model) => {
      // eslint-disable-next-line no-unused-expressions
      model.associate && model.associate(this.connection.models);
    });
  }
}

export default new Database();
