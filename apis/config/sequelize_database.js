const { Sequelize, DataTypes, Op } = require("sequelize");

const options = {
  host: "localhost",
  user: "postgres",
  password: "maricuchaston",
  database: "comment-app"
};

let sequelize;
if(process.env.DATABASE_URL){
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    define: {
      freezeTableName: true
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
}else{
  sequelize = new Sequelize(options.database, options.user, options.password, {
    host: options.host,
    dialect: "postgres",
    define: {
      freezeTableName: true
    },
    logging: false
  })
}


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
    defaultValue: "uploads/default.png"
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
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  parent: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  children: {
    type: DataTypes.STRING,
    defaultValue: "[]"
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  topic: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: null
  }
}, { timestamps: false });

sequelize.sync();

module.exports = { Users, Topics, Comments, sequelize };
