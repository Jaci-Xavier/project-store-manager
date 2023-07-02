const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
    SELECT
      sprod.sale_id AS saleId,
      sls.date AS date,
      sprod.product_id AS productId,
      sprod.quantity AS quantity
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
      sls.date as date,
      sprod.product_id as productId,
      sprod.quantity as quantity
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