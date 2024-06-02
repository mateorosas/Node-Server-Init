import { pool } from "../db.js";

export const renderCustomers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    const rowsWithoutCircular = removeCircularReferences(rows);
    // Stringify the modified rows object
    console.log(JSON.stringify(rowsWithoutCircular));
    res.render("customers", { customers: rows });
  } catch (error) {
    console.error("Error excecuting query:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createCustomers = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO products set ?", [newCustomer]);
  res.redirect("/");
};

export const editCustomer = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM products WHERE id = ?", [
    id,
  ]);
  res.render("customers_edit", { customer: result[0] });
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE products set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/");
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Products deleted" });
  }
  res.redirect("/");
};
function removeCircularReferences(obj) {
  const seen = new WeakSet();
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular Reference]';
      }
      seen.add(value);
    }
    return value;
  }));
}
