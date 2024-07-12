const fs = require('fs');
const path = require('path');
const Order = require('../models/Order');

exports.addOrder = async (req, res) => {
  try {
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const order = new Order({
      ...req.body,
      source: req.body.source,
      orderNumber: newOrderNumber,
      printed: false, // Añadimos el campo printed
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el pedido', error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const printed = req.query.printed === 'true';
    const orders = await Order.find({ printed });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markAsPrinted = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, { printed: true }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.closeCashRegister = async (req, res) => {
  try {
    const orders = await Order.find({ printed: true });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No hay órdenes para cerrar' });
    }

    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const summary = orders.map(order => ({
      orderNumber: order.orderNumber,
      items: order.items,
      total: order.total,
      date: order.date,
      source: order.source
    }));

    const filePath = path.join(__dirname, `../../sales-summary-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(filePath, JSON.stringify({ totalSales, orders: summary }, null, 2));

    await Order.deleteMany({ printed: true }); // Eliminar todas las órdenes impresas

    console.log(`Resumen de ventas guardado en: ${filePath}`);
    res.status(200).json({ message: 'Caja cerrada exitosamente', filePath });
  } catch (error) {
    res.status500().json({ message: 'Error al cerrar la caja', error });
  }
};
