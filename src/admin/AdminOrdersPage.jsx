// 📦 Admin Orders Page - Manage All Orders

import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../firebase/firestore';
import AdminLayout from './AdminLayout';
import { Search, Filter, Printer, Eye, Phone, MapPin, Package } from 'lucide-react';
import { formatPrice, formatDateTime, formatAddress } from '../../utils/formatters';
import { ORDER_STATUSES, ORDER_STATUS_COLORS } from '../utils/constants';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import { useToast } from '../components/common/Toast';
import { openWhatsApp } from '../utils/helpers';

const AdminOrdersPage = () => {
  const { success, error: showError } = useToast();
  
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    const result = await getAllOrders();
    if (result.success) {
      setOrders(result.data || []);
    }
    setLoading(false);
  };

  const filterOrders = () => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(o =>
        o.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerPhone?.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(o => o.status === statusFilter);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      success(`Order status updated to: ${newStatus}`);
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } else {
      showError('Failed to update order status');
    }
  };

  const printOrder = (order) => {
    const printContent = `
      <html>
        <head>
          <title>Order #${order.orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #FF6B00; color: white; }
          </style>
        </head>
        <body>
          <h1>SUUDHAA SAAMAAN</h1>
          <h2>Order #${order.orderId}</h2>
          <p><strong>Customer:</strong> ${order.customerName}</p>
          <p><strong>Phone:</strong> ${order.customerPhone}</p>
          <p><strong>Address:</strong> ${formatAddress(order.deliveryAddress)}</p>
          <p><strong>Date:</strong> ${formatDateTime(order.createdAt)}</p>
          <table>
            <tr><th>Item</th><th>Quantity</th><th>Price</th><th>Total</th></tr>
            ${order.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs. ${item.price}</td>
                <td>Rs. ${item.price * item.quantity}</td>
              </tr>
            `).join('')}
            <tr><th colspan="3">Delivery Fee</th><td>Rs. ${order.deliveryFee}</td></tr>
            <tr><th colspan="3">TOTAL</th><td><strong>Rs. ${order.total}</strong></td></tr>
          </table>
          <p style="margin-top: 20px;"><strong>Payment:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
        </body>
      </html>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Order Detail Modal
  const OrderDetailModal = ({ order, onClose }) => (
    <Modal isOpen={true} onClose={onClose} title={`Order #${order.orderId}`} size="xl">
      <div className="space-y-6">
        
        {/* Status Update */}
        <div>
          <label className="block text-sm font-semibold mb-2">Update Status:</label>
          <div className="flex flex-wrap gap-2">
            {ORDER_STATUSES.map(status => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(order.id, status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  order.status === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Customer Information</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {order.customerName}</p>
            <p className="flex items-center gap-2">
              <strong>Phone:</strong> {order.customerPhone}
              <button
                onClick={() => openWhatsApp(order.customerPhone, `Hi ${order.customerName}, your order #${order.orderId} update...`)}
                className="text-green-600 hover:underline"
              >
                <Phone className="w-4 h-4" />
              </button>
            </p>
            <p><strong>Address:</strong> {formatAddress(order.deliveryAddress)}</p>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="font-semibold mb-3">Order Items</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Item</th>
                  <th className="px-4 py-2 text-left text-sm">Variation</th>
                  <th className="px-4 py-2 text-center text-sm">Qty</th>
                  <th className="px-4 py-2 text-right text-sm">Price</th>
                  <th className="px-4 py-2 text-right text-sm">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{item.variation}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-right">{formatPrice(item.price)}</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-right font-semibold">Delivery Fee:</td>
                  <td className="px-4 py-2 text-right">{formatPrice(order.deliveryFee)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-right font-bold text-lg">TOTAL:</td>
                  <td className="px-4 py-2 text-right font-bold text-lg text-primary">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => printOrder(order)}
            icon={<Printer className="w-5 h-5" />}
            fullWidth
          >
            Print Order
          </Button>
          <Button
            variant="secondary"
            onClick={() => openWhatsApp(order.customerPhone, `Hi ${order.customerName}!`)}
            icon={<Phone className="w-5 h-5" />}
            fullWidth
          >
            Contact Customer
          </Button>
        </div>
      </div>
    </Modal>
  );

  if (loading) {
    return (
      <AdminLayout>
        <Loader fullScreen text="Loading orders..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: orders.length, color: 'text-blue-600' },
            { label: 'Pending', value: orders.filter(o => o.status === 'Order Placed').length, color: 'text-orange-600' },
            { label: 'Processing', value: orders.filter(o => !['Order Placed', 'Delivered', 'Cancelled'].includes(o.status)).length, color: 'text-purple-600' },
            { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, color: 'text-green-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID, customer name, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="all">All Statuses</option>
              {ORDER_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">#{order.orderId}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerPhone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{order.items?.length} items</td>
                      <td className="px-6 py-4 font-semibold">{formatPrice(order.total)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-primary hover:underline font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-semibold mb-2">No orders found</p>
              <p className="text-sm">Orders will appear here when customers place them</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;