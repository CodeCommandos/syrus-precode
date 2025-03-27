import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard,
  Users,
  LineChart,
  PieChart,
  Settings,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '../components/ui/card2';
import { Button } from '../components/ui/button';
// import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '../components/ui/tooltip';
import { cn } from '../lib/utils';
import UserRolePieChart from '../components/UserRolePieChart/UserRolePieChart';
import MarketSentimentWidget from '../components/MarketSentimentWidget/MarketSentimentWidget';
// import FinancialNewsFeed from '../components/FinancialNewsFeed';
// import AlertManagement from '../components/AlertManagement';
// import PortfolioOverview from '../components/PortfolioOverview';
import UserManagementTable from '../components/UserManagementTable/UserManagementTable';
// import SystemHealthWidget from '../components/SystemHealthWidget';
// import { fetchUserStats } from '../services/adminApi';

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
  { icon: Users, label: "Users", value: "users", badge: 3 },
  { icon: LineChart, label: "Market", value: "market" },
  // { icon: Portfolio, label: "Portfolios", value: "portfolios" },
  { icon: Bell, label: "Alerts", value: "alerts", badge: 5 },
  { icon: Settings, label: "Settings", value: "settings" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsResponse = await fetchUserStats();
        setUserStats(statsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ width: 256 }}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          "hidden md:flex flex-col border-r bg-white shadow-sm",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen ? (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-primary"
            >
              NiveshMitra
            </motion.h1>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-primary"
            >
              NM
            </motion.div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="rounded-full"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Tooltip key={item.value} delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={activeTab === item.value ? "secondary" : "ghost"}
                    onClick={() => setActiveTab(item.value)}
                    className={cn(
                      "w-full justify-start gap-3",
                      !sidebarOpen && "justify-center"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              </TooltipTrigger>
              {!sidebarOpen && (
                <TooltipContent side="right">
                  {item.label}
                  {item.badge && ` (${item.badge})`}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={toggleMobileSidebar}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-64 z-50 bg-white shadow-lg md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-bold text-primary">NiveshMitra</h1>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMobileSidebar}
                  className="rounded-full"
                >
                  <X size={18} />
                </Button>
              </div>
              <nav className="flex-1 px-2 py-4 space-y-1">
                {sidebarItems.map((item) => (
                  <motion.div
                    key={item.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={activeTab === item.value ? "secondary" : "ghost"}
                      onClick={() => {
                        setActiveTab(item.value);
                        toggleMobileSidebar();
                      }}
                      className="w-full justify-start gap-3"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileSidebar}
            className="rounded-full"
          >
            <Menu size={18} />
          </Button>
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard 
                      title="Total Users" 
                      value={userStats?.total} 
                      icon={<Users />}
                      trend="up"
                      change="12%"
                    />
                    <StatCard 
                      title="Traders" 
                      value={userStats?.traders} 
                      icon={<User />}
                      trend="up"
                      change="8%"
                    />
                    <StatCard 
                      title="Experts" 
                      value={userStats?.experts} 
                      icon={<VerifiedUser />}
                      trend="steady"
                    />
                    <StatCard 
                      title="Admins" 
                      value={userStats?.admins} 
                      icon={<Shield />}
                      trend="down"
                      change="2%"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>User Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[300px]">
                        <UserRolePieChart data={userStats} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-3">
                      <CardHeader>
                        <CardTitle>Market Sentiment</CardTitle>
                        <CardDescription>
                          Current market mood analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <MarketSentimentWidget />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                        <CardDescription>
                          Latest system events
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RecentActivities />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>System Health</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SystemHealthWidget />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage all platform users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserManagementTable />
                  </CardContent>
                </Card>
              )}

              {activeTab === 'market' && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Market Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Market insights components would go here */}
                      <div className="h-[400px] flex items-center justify-center">
                        <p>Real-time market analytics would be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial News</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FinancialNewsFeed />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Sentiment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MarketSentimentWidget detailed />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'portfolios' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PortfolioOverview />
                  </CardContent>
                </Card>
              )}

              {activeTab === 'alerts' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AlertManagement />
                  </CardContent>
                </Card>
              )}

              {activeTab === 'settings' && (
                <Card>
                  <CardHeader>
                    <CardTitle>System Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center">
                      <p>System settings and configurations would be managed here</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, change }) => {
  const trendColors = {
    up: 'text-emerald-500',
    down: 'text-rose-500',
    steady: 'text-amber-500'
  };

  const trendIcons = {
    up: <ArrowUpRight className="h-4 w-4" />,
    down: <ArrowDownRight className="h-4 w-4" />,
    steady: <Minus className="h-4 w-4" />
  };

  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {trend && change && (
            <p className={`text-xs ${trendColors[trend]} flex items-center mt-1`}>
              {trendIcons[trend]}
              <span className="ml-1">{change} from last month</span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminDashboard;