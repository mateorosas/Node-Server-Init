import { pool, connection } from "../db.js";


export const renderCustomers = async (req, res) => {
  try {
    connection.query(`SELECT 
                  it.tienda,
                  p.id AS product_id,
                  p.nombre AS product_name,
                  p.unidad AS unidad,
                  AVG(it.precio) AS average_price
                  FROM 
                  products p
                  JOIN 
                  items i ON p.id = i.product_id
                  JOIN 
                  items_tiendas it ON i.id = it.item_id
                  GROUP BY 
                  it.tienda, p.id, p.nombre, p.unidad
                  ORDER BY 
                  average_price,  p.nombre, it.tienda;`,
      function (error, results, fields) {
        if (error) throw error;
        res.render("customers", { products: results });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const priceByProduct = async (req, res) => {
  try {
    const nameProduct = req.query.nameProduct; 

    connection.query(
      `SELECT 
          it.tienda,
          p.id AS product_id,
          p.nombre AS product_name,
          p.unidad AS unidad,
          AVG(it.precio) AS average_price
      FROM 
          products p
      JOIN 
          items i ON p.id = i.product_id
      JOIN 
          items_tiendas it ON i.id = it.item_id
      WHERE 
          p.nombre = ?
      GROUP BY 
          it.tienda, p.id, p.nombre, p.unidad
      ORDER BY 
          it.tienda, p.nombre;`,
      [nameProduct],
      function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.render("customers_edit", { pricesProducts: results });
      }
    );
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