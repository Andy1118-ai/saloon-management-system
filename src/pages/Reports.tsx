import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Calendar, Download, Filter, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

const Reports: React.FC = () => {
  const { appointments, payments, customers, staff, services } = useApp();
  const [dateRange, setDateRange] = useState('7');
  const [reportType, setReportType] = useState('revenue');

  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 45000, appointments: 120 },
    { name: 'Feb', revenue: 52000, appointments: 140 },
    { name: 'Mar', revenue: 48000, appointments: 130 },
    { name: 'Apr', revenue: 61000, appointments: 160 },
    { name: 'May', revenue: 58000, appointments: 150 },
    { name: 'Jun', revenue: 67000, appointments: 180 },
    { name: 'Jul', revenue: 72000, appointments: 195 },
    { name: 'Aug', revenue: 69000, appointments: 185 },
    { name: 'Sep', revenue: 74000, appointments: 200 },
    { name: 'Oct', revenue: 78000, appointments: 210 },
    { name: 'Nov', revenue: 82000, appointments: 220 },
    { name: 'Dec', revenue: 85000, appointments: 230 }
  ];

  const servicePopularityData = [
    { name: 'Hair Cut & Style', value: 35, color: '#3B82F6' },
    { name: 'Manicure & Pedicure', value: 25, color: '#14B8A6' },
    { name: 'Facial Treatment', value: 20, color: '#F59E0B' },
    { name: 'Hair Coloring', value: 15, color: '#EF4444' },
    { name: 'Other Services', value: 5, color: '#8B5CF6' }
  ];

  const dailyAppointmentsData = [
    { day: 'Mon', appointments: 28 },
    { day: 'Tue', appointments: 32 },
    { day: 'Wed', appointments: 35 },
    { day: 'Thu', appointments: 40 },
    { day: 'Fri', appointments: 45 },
    { day: 'Sat', appointments: 50 },
    { day: 'Sun', appointments: 25 }
  ];

  const staffPerformanceData = [
    { name: 'Maria Santos', revenue: 45000, appointments: 120, rating: 4.8 },
    { name: 'Alice Kimani', revenue: 38000, appointments: 105, rating: 4.7 },
    { name: 'Grace Wanjiru', revenue: 42000, appointments: 115, rating: 4.9 },
    { name: 'Janet Mwangi', revenue: 35000, appointments: 95, rating: 4.6 }
  ];

  const customerRetentionData = [
    { month: 'Jan', newCustomers: 25, returningCustomers: 45 },
    { month: 'Feb', newCustomers: 30, returningCustomers: 52 },
    { month: 'Mar', newCustomers: 28, returningCustomers: 48 },
    { month: 'Apr', newCustomers: 35, returningCustomers: 61 },
    { month: 'May', newCustomers: 32, returningCustomers: 58 },
    { month: 'Jun', newCustomers: 38, returningCustomers: 67 }
  ];

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalAppointments = appointments.length;
  const totalCustomers = customers.length;
  const averageRevenue = totalRevenue / totalAppointments || 0;

  const metrics = [
    {
      title: 'Total Revenue',
      value: `KES ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Total Appointments',
      value: totalAppointments,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Average Revenue',
      value: `KES ${averageRevenue.toFixed(0)}`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'increase'
    }
  ];

  const exportReport = () => {
    const reportData = {
      dateRange,
      reportType,
      totalRevenue,
      totalAppointments,
      totalCustomers,
      averageRevenue,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `salon-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <button
            onClick={exportReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors duration-200"
          >
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600">{metric.change}</span>
                <span className="text-sm text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Popularity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Popularity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={servicePopularityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {servicePopularityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Appointments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyAppointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#14B8A6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Retention */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Retention</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerRetentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="newCustomers" stroke="#F59E0B" strokeWidth={2} name="New Customers" />
              <Line type="monotone" dataKey="returningCustomers" stroke="#3B82F6" strokeWidth={2} name="Returning Customers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Staff Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffPerformanceData.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KES {member.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.appointments}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KES {(member.revenue / member.appointments).toFixed(0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{member.rating}</div>
                      <div className="ml-2 text-yellow-400">★</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Peak Hours</p>
              <p className="text-2xl font-bold">2:00 PM - 4:00 PM</p>
            </div>
            <Clock className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Customer Satisfaction</p>
              <p className="text-2xl font-bold">4.8/5.0</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Avg. Service Time</p>
              <p className="text-2xl font-bold">90 min</p>
            </div>
            <Clock className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;