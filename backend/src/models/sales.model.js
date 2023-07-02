const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
    SELECT
      sprod.sale_id,
      sls.date,
      sprod.product_id,
      sprod.quantity
    FROM sales_products AS sprod
    INNER JOIN sales AS sls
    ON sprod.sale_id = sls.id
    ORDER BY sale_id, product_id;
  `);
  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
`
    SELECT
      sls.date,
      sprod.product_id,
      sprod.quantity
    FROM sales_products AS sprod
    JOIN sales AS sls
    ON sprod.sale_id = sls.id
    WHERE sls.id = ?;
`,
    [id],
  );
  return sale;
};

module.exports = {
  getAll,
  getById,
};