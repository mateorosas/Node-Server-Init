import { pool, connection } from "../db.js";

export const renderCustomers = async (req, res) => {
try {
//    connection.connect();
 
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
	res.render("customers", { products: results });
});
 
//connection.end();
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
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
        return '[Unkown value]';
      }
      seen.add(value);
    }
    return value;
  }));
}

export const getProducts = async (req, res) => {
  try {
    //connection.connect();
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
    console.log(result.rows);
    //connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
