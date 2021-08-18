module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define(
    "track",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      artist_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      yt_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      yt_link: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      preview: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "track",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return track;
};
