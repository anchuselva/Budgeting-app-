import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { UtensilsCrossed, Lightbulb, Car, Home, Gamepad2, Save, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function BudgetCategories() {
  const { isAuthenticated } = useAuth();
  const { categories, updateCategoryBudget, monthlyIncome } = useBudget();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const initialBudgets: { [key: string]: string } = {};
    categories.forEach(cat => {
      initialBudgets[cat.id] = cat.budget.toString();
    });
    setBudgets(initialBudgets);
  }, [categories]);

  const handleBudgetChange = (categoryId: string, value: string) => {
    setBudgets(prev => ({ ...prev, [categoryId]: value }));
  };

  const handleSave = (categoryId: string) => {
    const amount = parseFloat(budgets[categoryId] || '0');
    if (amount < 0) {
      toast.error('Budget cannot be negative');
      return;
    }
    updateCategoryBudget(categoryId, amount);
    toast.success('Budget updated!');
  };

  const handleSaveAll = () => {
    categories.forEach(cat => {
      const amount = parseFloat(budgets[cat.id] || '0');
      if (amount >= 0) {
        updateCategoryBudget(cat.id, amount);
      }
    });
    toast.success('All budgets saved!');
  };

  const iconMap: { [key: string]: any } = {
    'UtensilsCrossed': UtensilsCrossed,
    'Lightbulb': Lightbulb,
    'Car': Car,
    'Home': Home,
    'Gamepad2': Gamepad2,
  };

  const totalBudget = Object.values(budgets).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const totalIncome = monthlyIncome.reduce((sum, i) => sum + i.amount, 0);
  const remaining = totalIncome - totalBudget;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {t('budget')} Categories
        </h1>
        <p className="text-gray-600 text-lg">Allocate your monthly income across different categories</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-red-50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-orange-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
        >
          <p className="text-sm font-semibold text-orange-700 mb-2">Total Income</p>
          <p className="text-4xl font-black text-orange-600">{totalIncome.toLocaleString()} <span className="text-lg text-gray-500">LKR</span></p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <p className="text-sm font-semibold text-purple-700 mb-2">Total Budget</p>
          <p className="text-4xl font-black text-purple-600">{totalBudget.toLocaleString()} <span className="text-lg text-gray-500">LKR</span></p>
        </motion.div>

        <motion.div
          className={`bg-gradient-to-br ${remaining >= 0 ? 'from-green-50 to-emerald-50 border-green-100' : 'from-red-50 to-rose-50 border-red-100'} backdrop-blur-md rounded-3xl p-6 shadow-xl border`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <p className={`text-sm font-semibold ${remaining >= 0 ? 'text-green-700' : 'text-red-700'} mb-2`}>Remaining</p>
          <p className={`text-4xl font-black ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {remaining.toLocaleString()} <span className="text-lg">LKR</span>
          </p>
        </motion.div>
      </div>

      {totalIncome === 0 && (
        <motion.div
          className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-yellow-800 font-bold text-lg mb-2">Please set your monthly income first!</p>
          <motion.button
            onClick={() => navigate('/income')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Go to Income Setup →
          </motion.button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon] || UtensilsCrossed;
          const budgetValue = parseFloat(budgets[category.id] || '0');
          const percentage = totalIncome > 0 ? (budgetValue / totalIncome) * 100 : 0;

          return (
            <motion.div
              key={category.id}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-800 capitalize">{t(category.name)}</h3>
                  <p className="text-sm text-orange-600 font-semibold">{percentage.toFixed(1)}% of income</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  value={budgets[category.id] || ''}
                  onChange={(e) => handleBudgetChange(category.id, e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none text-lg font-semibold"
                  placeholder="0"
                  min="0"
                  step="100"
                />
                <motion.button
                  onClick={() => handleSave(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all"
                >
                  <Save className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                  <span>Spent: {category.spent.toLocaleString()} LKR</span>
                  <span>Budget: {category.budget.toLocaleString()} LKR</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 transition-all"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((category.spent / (category.budget || 1)) * 100, 100)}%` }}
                    transition={{ delay: 0.2 + 0.1 * index, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          onClick={handleSaveAll}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-5 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center"
        >
          <Save className="w-6 h-6 mr-2" />
          Save All Budgets
        </motion.button>

        <motion.button
          onClick={() => navigate('/expenses')}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 text-white rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all"
        >
          Next: Track Expenses →
        </motion.button>
      </div>
    </div>
  );
}
