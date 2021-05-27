const { Sequelize, DataTypes, Op } = require("sequelize");
const options = require("./database_options");

const sequelize = new Sequelize(options.database, options.user, options.password, {
  host: options.host,
  dialect: "mysql",
  define: {
    freezeTableName: true
  },
  logging: false
})

sequelize.authenticate().then().catch();

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  votes_topics: {
    type: DataTypes.STRING,
    defaultValue: "[]"
  },
  favorite_topics: {
    type: DataTypes.STRING,
    defaultValue: "[]"
  },
  friends: {
    type: DataTypes.STRING,
    defaultValue: "[]"
  },
  profile_info: {
    type: DataTypes.STRING,
    defaultValue: "I am new to Comments App, hello!"
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_image: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  register_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { timestamps: false });

const Topics = sequelize.define("topics", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  intro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  votes: {
    type: DataTypes.STRING,
    defaultValue: "[]"
  }
}, { timestamps: false });

const Comments = sequelize.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parent:{
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  children: {
    type: DataTypes.STRING,
    defaultValue: "[]"
  },
  author:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  topic:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image:{
    type: DataTypes.STRING,
    defaultValue: null
  }
}, { timestamps: false });

module.exports = { Users, Topics, Comments };
