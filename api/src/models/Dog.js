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
      defaultValue: 'https://media1.thehungryjpeg.com/thumbs/800_3915572_krsc7sw05xypll4eekv3dg2fp2t7vwpacl56cxf6.jpg',
      validate: {
        isUrl: true,
        isImg(value) {
          if (value.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) === null) {
            throw new Error("Image format not valid!");
          }
          // let validValue = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value);
          // if (!validValue) throw new Error ('Image format not allowed');
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
