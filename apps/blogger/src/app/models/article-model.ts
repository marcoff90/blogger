import {Interfaces} from '@blogger/global-interfaces';
import DataTypes from "sequelize";
import sequelize from "../../config/sequelize";

const ArticleModel = sequelize.define<Interfaces.ArticleI>('blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  state: {
    type: DataTypes.ENUM(Interfaces.State.DONE, Interfaces.State.DRAFT),
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

export default ArticleModel;
