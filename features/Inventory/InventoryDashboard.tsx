'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  InboxOutlined, 
  ShoppingOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  TruckOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export function InventoryDashboard() {
  const { tokens } = useTheme();

  const inventoryStats = [
    { title: 'Total Products', value: '3,450', icon: <InboxOutlined />, color: tokens.primary },
    { title: 'In Stock', value: '2,890', icon: <CheckCircleOutlined />, color: tokens.success },
    { title: 'Low Stock', value: '420', icon: <WarningOutlined />, color: tokens.warning },
    { title: 'Out of Stock', value: '140', icon: <ShoppingOutlined />, color: tokens.danger },
  ];

  const recentShipments = [
    { id: 1, product: 'Office Chairs', quantity: '50 units', status: 'Delivered', date: 'Today' },
    { id: 2, product: 'Laptops', quantity: '20 units', status: 'In Transit', date: '2 days ago' },
    { id: 3, product: 'Monitors', quantity: '30 units', status: 'Delivered', date: '3 days ago' },
    { id: 4, product: 'Keyboards', quantity: '100 units', status: 'Pending', date: '5 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Inventory
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your stock and products
          </p>
        </div>
        <Button variant="primary">
          <PlusOutlined /> Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat) => (
          <Card key={stat.title}>
            <div 
              className="neumorphic-flat w-12 h-12 rounded-lg flex items-center justify-center mb-3"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </div>
            <p className="text-sm" style={{ color: tokens.textSecondary }}>
              {stat.title}
            </p>
            <p className="text-2xl font-bold" style={{ color: tokens.text }}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Recent Shipments
          </h2>
          <div className="space-y-3">
            {recentShipments.map((shipment) => (
              <div 
                key={shipment.id}
                className="flex items-center justify-between p-4 neumorphic-flat rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: tokens.secondary }}
                  >
                    <TruckOutlined style={{ color: tokens.text }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: tokens.text }}>
                      {shipment.product}
                    </p>
                    <p className="text-sm" style={{ color: tokens.textSecondary }}>
                      {shipment.quantity}
                    </p>
                  </div>
                </div>
                <span 
                  className="text-sm px-2 py-1 rounded"
                  style={{ 
                    backgroundColor: 
                      shipment.status === 'Delivered' ? tokens.success + '20' :
                      shipment.status === 'In Transit' ? tokens.warning + '20' :
                      tokens.info + '20',
                    color: tokens.text
                  }}
                >
                  {shipment.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="ghost" className="w-full">
              View All Shipments
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              <InboxOutlined /> Add Product
            </Button>
            <Button variant="secondary" className="w-full">
              <TruckOutlined /> Manage Shipments
            </Button>
            <Button variant="secondary" className="w-full">
              <WarningOutlined /> Low Stock Alert
            </Button>
            <Button variant="secondary" className="w-full">
              <ShoppingOutlined /> Order Stock
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
