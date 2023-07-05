const validateQuantity = (req, res, next) => {
  const sale = req.body;
  // const saleProductQuantity = sale.map((product) => product.quantity);
  // const quantityValidate = saleProductQuantity.some((quantity) => quantity <= 0);
  // const quantityZero = saleProductQuantity.some((quantity) => quantity === undefined);

  // if (!quantityValidate) {
  //   return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  // }
  // if (!quantityZero) {
  //   return res.status(400).json({ message: '"quantity" is required' });
  // }

  for (let index = 0; index < sale.length; index += 1) {
    if (sale[index].quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!sale[index].quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }

  next();
};

module.exports = validateQuantity;