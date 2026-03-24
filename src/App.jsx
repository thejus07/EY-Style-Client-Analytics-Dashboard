import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  LayoutDashboard, Users, PieChart as ChartIcon, Briefcase, FileText, Settings, 
  LogOut, ArrowUpRight, ArrowDownRight, Download, Filter, Bell, Search, DollarSign, Activity
} from 'lucide-react';
import './App.css';

// Mock Data
const revenueData = [
  { name: 'Jan', revenue: 4200, expenses: 2400 },
  { name: 'Feb', revenue: 5300, expenses: 2800 },
  { name: 'Mar', revenue: 4800, expenses: 2500 },
  { name: 'Apr', revenue: 6400, expenses: 3100 },
  { name: 'May', revenue: 5900, expenses: 2900 },
  { name: 'Jun', revenue: 8200, expenses: 3500 },
  { name: 'Jul', revenue: 7600, expenses: 3200 },
  { name: 'Aug', revenue: 9500, expenses: 4000 }
];

const allocationData = [
  { name: 'Equities', value: 45 },
  { name: 'Fixed Income', value: 30 },
  { name: 'Real Estate', value: 15 },
  { name: 'Cash', value: 10 },
];
const COLORS = ['#FFE600', '#2e2e38', '#a0a0ab', '#ffffff'];

const recentTransactions = [
  { id: 'TRX-948', client: 'Alpha Corp Ltd', amount: '$450,000', type: 'M&A Advisory', status: 'Active', date: 'Oct 12, 2026' },
  { id: 'TRX-949', client: 'Beta Holdings', amount: '$125,000', type: 'Tax Strategy', status: 'Pending', date: 'Oct 11, 2026' },
  { id: 'TRX-950', client: 'Gamma Global', amount: '$850,000', type: 'Restructuring', status: 'Active', date: 'Oct 09, 2026' },
  { id: 'TRX-951', client: 'Delta Partners', amount: '$210,000', type: 'Audit', status: 'Active', date: 'Oct 08, 2026' }
];

// Animation Config
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">EY</div>
          <div>
            <h1 className="heading-3">Analytics</h1>
            <p className="text-xs" style={{marginTop: '2px'}}>Client Portal</p>
          </div>
        </div>

        <nav className="nav-menu" aria-label="Main Navigation">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Clients', icon: Users },
            { name: 'Portfolios', icon: Briefcase },
            { name: 'Reports', icon: FileText },
            { name: 'Analysis', icon: ChartIcon },
          ].map((item) => (
            <a 
              key={item.name} 
              href={`#${item.name.toLowerCase()}`}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab(item.name); }}
              tabIndex={0}
              role="button"
            >
              <item.icon size={20} />
              {item.name}
            </a>
          ))}
        </nav>

        <div style={{marginTop: 'auto'}}>
          <a href="#settings" className="nav-item">
            <Settings size={20} />
            Settings
          </a>
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div>
              <div className="text-sm" style={{color: 'var(--text-main)', fontWeight: 500}}>Jane Doe</div>
              <div className="text-xs">Partner</div>
            </div>
            <LogOut size={16} style={{marginLeft: 'auto', cursor: 'pointer', color: 'var(--text-muted)'}} />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <div className="header-top">
            <div>
              <p className="text-body" style={{marginBottom: '0.5rem'}}>Welcome back, Jane</p>
              <h2 className="heading-1">Financial Insights</h2>
            </div>
            <div className="actions-group">
              <div className="glass-panel" style={{display: 'flex', alignItems: 'center', padding: '0 12px', height: '44px'}}>
                <Search size={18} style={{color: 'var(--text-muted)', marginRight: '8px'}} />
                <input 
                  type="text" 
                  placeholder="Search clients..." 
                  style={{background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '150px'}}
                />
              </div>
              <button className="glass-panel flex-center" style={{width: '44px', height: '44px', cursor: 'pointer', border: '1px solid var(--border-subtle)', background: 'transparent'}} aria-label="Notifications">
                <Bell size={20} />
              </button>
              <button className="btn-secondary">
                <Filter size={18} /> Filter
              </button>
              <button className="btn-primary">
                <Download size={18} color="var(--ey-black)" /> Export PDF
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <motion.div 
          className="dashboard-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* KPIs */}
          <div className="kpi-cards">
            {[
              { title: 'Total Revenue (YTD)', value: '$12.4M', trend: '+14.2%', up: true, icon: DollarSign },
              { title: 'Active Clients', value: '142', trend: '+5.4%', up: true, icon: Users },
              { title: 'EBIT Margin', value: '24.8%', trend: '-1.2%', up: false, icon: Activity },
              { title: 'AUM Growth', value: '$840M', trend: '+22.1%', up: true, icon: ChartIcon },
            ].map((kpi, index) => (
              <motion.div key={index} variants={itemVariants} className="glass-panel kpi-card">
                <div className="flex-between">
                  <span className="text-sm">{kpi.title}</span>
                  <div className="kpi-icon-wrapper">
                    <kpi.icon size={20} />
                  </div>
                </div>
                <div className="kpi-value">{kpi.value}</div>
                <div className={`kpi-trend ${kpi.up ? 'trend-up' : 'trend-down'}`}>
                  {kpi.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{kpi.trend} vs last year</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <motion.div variants={itemVariants} className="glass-panel main-chart chart-section">
            <div className="flex-between chart-header">
              <h3 className="heading-3">Revenue vs Expenses (Q1 - Q3)</h3>
              <select className="glass-panel text-sm" style={{padding: '6px 12px', color: '#fff', cursor: 'pointer'}}>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFE600" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFE600" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2e2e38" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2e2e38" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#a0a0ab" axisLine={false} tickLine={false} />
                <YAxis stroke="#a0a0ab" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(26,26,36,0.9)', borderColor: 'rgba(255,230,0,0.2)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#FFE600" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="expenses" stroke="#a0a0ab" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel side-chart chart-section">
            <h3 className="heading-3 chart-header">Asset Allocation</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(26,26,36,0.9)', borderColor: 'rgba(255,230,0,0.2)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', color: '#a0a0ab'}} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Table Section */}
          <motion.div variants={itemVariants} className="glass-panel bottom-section chart-section">
            <div className="flex-between chart-header">
              <h3 className="heading-3">Recent Client Transactions</h3>
              <button className="text-sm accent-text" style={{background:'none', border:'none', cursor:'pointer', fontWeight: 500}}>
                View All
              </button>
            </div>
            <div style={{overflowX: 'auto'}}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Client Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((trx) => (
                    <tr key={trx.id}>
                      <td className="text-body" style={{fontFamily: 'monospace'}}>{trx.id}</td>
                      <td style={{fontWeight: 500, color: '#fff'}}>{trx.client}</td>
                      <td className="text-body">{trx.type}</td>
                      <td style={{fontWeight: 600, color: '#fff'}}>{trx.amount}</td>
                      <td className="text-body">{trx.date}</td>
                      <td>
                        <span className={`status-badge ${trx.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}

export default App;
