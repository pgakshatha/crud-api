const pool = require("../config/database");

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const query = `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const result = await pool.query(query, [name, email]);

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
};