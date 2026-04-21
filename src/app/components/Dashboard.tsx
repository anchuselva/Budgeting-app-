import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, Link } from 'react-router';
import { useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, AlertCircle, UtensilsCrossed, Lightbulb, Car, Home as HomeIcon, Gamepad2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { categories, monthlyIncome, getAISuggestion } = useBudget();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const totalIncome = monthlyIncome.reduce((sum, i) => sum + i.amount, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalIncome - totalSpent;

  const iconMap: { [key: string]: any } = {
    'UtensilsCrossed': UtensilsCrossed,
    'Lightbulb': Lightbulb,
    'Car': Car,
    'Home': HomeIcon,
    'Gamepad2': Gamepad2,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {t('dashboard')}
        </h1>
        <p className="text-gray-600 text-lg">Track your spending and stay on budget</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-orange-100"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Wallet className="w-7 h-7 text-white" />
            </motion.div>
            <span className="text-sm font-semibold text-orange-700">{t('income')}</span>
          </div>
          <div className="text-4xl font-black text-orange-600">
            {totalIncome.toLocaleString()} <span className="text-lg text-gray-500">LKR</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TrendingUp className="w-7 h-7 text-white" />
            </motion.div>
            <span className="text-sm font-semibold text-purple-700">{t('budget')}</span>
          </div>
          <div className="text-4xl font-black text-purple-600">
            {totalBudget.toLocaleString()} <span className="text-lg text-gray-500">LKR</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-red-50 to-rose-50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-red-100"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TrendingDown className="w-7 h-7 text-white" />
            </motion.div>
            <span className="text-sm font-semibold text-red-700">{t('expenses')}</span>
          </div>
          <div className="text-4xl font-black text-red-600">
            {totalSpent.toLocaleString()} <span className="text-lg text-gray-500">LKR</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5 }}
          className={`bg-gradient-to-br ${remaining >= 0 ? 'from-green-50 to-emerald-50 border-green-100' : 'from-red-50 to-rose-50 border-red-100'} backdrop-blur-md rounded-3xl p-6 shadow-xl border`}
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`w-14 h-14 bg-gradient-to-br ${remaining >= 0 ? 'from-green-400 to-emerald-600' : 'from-red-400 to-rose-600'} rounded-2xl flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className={`w-7 h-7 text-white`} />
            </motion.div>
            <span className={`text-sm font-semibold ${remaining >= 0 ? 'text-green-700' : 'text-red-700'}`}>Remaining</span>
          </div>
          <div className={`text-4xl font-black ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {remaining.toLocaleString()} <span className="text-lg">LKR</span>
          </div>
        </motion.div>
      </div>

      {totalIncome === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg">
          <div className="flex">
            <AlertCircle className="h-6 w-6 text-yellow-400 mr-3" />
            <div>
              <p className="text-yellow-800 font-medium">Get started with your budget!</p>
              <p className="text-yellow-700 text-sm mt-1">
                Set your monthly income and budget categories to start tracking your expenses.
              </p>
              <Link to="/income" className="inline-block mt-2 text-yellow-800 font-semibold hover:text-yellow-900">
                Set Income →
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <motion.h2
          className="text-3xl font-black text-gray-800 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Category Overview
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Wallet;
            const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
            const isOverspent = category.spent > category.budget;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`w-14 h-14 ${isOverspent ? 'bg-gradient-to-br from-red-500 to-rose-700' : 'bg-gradient-to-br from-orange-500 to-red-600'} rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="text-sm font-bold text-gray-700 capitalize">{t(category.name)}</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                    <span>Spent: {category.spent.toLocaleString()}</span>
                    <span>Budget: {category.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className={`h-4 rounded-full ${
                        isOverspent ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-orange-500 to-red-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ delay: 0.2 + 0.1 * index, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className={`text-sm mt-2 font-semibold ${isOverspent ? 'text-red-600' : 'text-orange-600'}`}>
                    {percentage.toFixed(0)}% used
                  </div>
                </div>

                {isOverspent && (
                  <motion.div
                    className="bg-red-50 border border-red-200 rounded-2xl p-3 text-sm text-red-700 font-medium"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    Overspent by {(category.spent - category.budget).toLocaleString()} LKR
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/expenses"
            className="block bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-rose-600 via-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-2">Add Expense 💳</h3>
              <p className="text-orange-50 text-lg">Scan a bill or add manually</p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/analytics"
            className="block bg-gradient-to-br from-purple-500 via-pink-500 to-fuchsia-600 text-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-2">View Analytics 📊</h3>
              <p className="text-purple-50 text-lg">Check your spending trends</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
