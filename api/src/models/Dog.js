const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://static.wikia.nocookie.net/scratchpad/images/0/07/SpikeRugrats.png',
      validate: {
        isUrl: true,
        isImg(value) {
          let validValue = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value);
          if (!validValue) throw new Error ('Image format not allowed');
        }
      }
    },

    height: {
    type: DataTypes.STRING,
    allowNull: false,
  },

    weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },

    life_span: {
    type: DataTypes.STRING,
  },
    bred_for: {
    type: DataTypes.STRING,
  },
    origin: {
    type: DataTypes.STRING,
  },
    fromDb: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
  });
};
