import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBudget, Category } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { Scan, Plus, Camera, Calendar, DollarSign, FileText, Upload, Bell, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function ExpenseTracker() {
  const { isAuthenticated } = useAuth();
  const { categories, addExpense, expenses } = useBudget();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [billImage, setBillImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().split('T')[0]);
  }, []);

  const handleScanBill = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target?.result as string;
      setBillImage(imageData);
      setScanning(true);

      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockScannedData = {
        amount: (Math.random() * 5000 + 1000).toFixed(2),
        description: 'Scanned from bill',
        category: categories[Math.floor(Math.random() * categories.length)].id,
      };

      setAmount(mockScannedData.amount);
      setDescription(mockScannedData.description);
      setSelectedCategory(mockScannedData.category);
      setScanning(false);
      setShowForm(true);
      toast.success('Bill scanned successfully!');
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !amount || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    addExpense({
      categoryId: selectedCategory,
      amount: parseFloat(amount),
      description,
      date: new Date(date),
      billImage: billImage || undefined,
    });

    toast.success('Expense added successfully!');
    setShowForm(false);
    setAmount('');
    setDescription('');
    setBillImage(null);
    setSelectedCategory('');
  };

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {t('expenses')}
        </h1>
        <p className="text-gray-600 text-lg">Track your expenses by scanning bills or adding manually</p>
      </motion.div>

      {!showForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.button
            onClick={handleScanBill}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-rose-600 via-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <Scan className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-3xl font-black mb-2">{t('scanBill')} 📸</h3>
              <p className="text-orange-50 text-lg">Upload or take a photo of your bill</p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-purple-500 via-pink-500 to-fuchsia-600 text-white rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <Plus className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-3xl font-black mb-2">{t('addExpense')} ✏️</h3>
              <p className="text-purple-50 text-lg">Enter expense details manually</p>
            </div>
          </motion.button>
        </div>
      ) : (
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-8 border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Add Expense
            </h2>
            <motion.button
              onClick={() => {
                setShowForm(false);
                setBillImage(null);
                setAmount('');
                setDescription('');
                setSelectedCategory('');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 transition-all"
            >
              Cancel
            </motion.button>
          </div>

          {scanning && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-600 font-semibold text-lg">Scanning bill...</p>
            </motion.div>
          )}

          {billImage && !scanning && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src={billImage} alt="Bill" className="max-w-full h-64 object-contain mx-auto rounded-2xl border-4 border-orange-200 shadow-lg" />
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none text-lg font-semibold"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="capitalize">
                    {t(cat.name)}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <DollarSign className="w-5 h-5 inline mr-2 text-orange-500" />
                Amount (LKR)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none text-lg font-semibold"
                placeholder="1000"
                min="0"
                step="0.01"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <FileText className="w-5 h-5 inline mr-2 text-orange-500" />
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none text-lg"
                placeholder="Grocery shopping"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Calendar className="w-5 h-5 inline mr-2 text-orange-500" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none text-lg font-semibold"
                required
              />
            </motion.div>

            {!billImage && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Upload className="w-5 h-5 inline mr-2 text-orange-500" />
                  Bill Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none"
                />
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white rounded-2xl text-lg font-black shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Add Expense ✨</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-red-500 to-orange-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </form>
        </motion.div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      <motion.div
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
          Recent Expenses
        </h2>
        {recentExpenses.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-semibold">No expenses yet</p>
            <p className="text-sm text-gray-400 mt-2">Start tracking by adding your first expense</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentExpenses.map((expense, index) => {
              const category = categories.find(c => c.id === expense.categoryId);
              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl hover:shadow-lg transition-all border border-orange-100"
                >
                  <div className="flex items-center flex-1">
                    {expense.billImage && (
                      <img src={expense.billImage} alt="Bill" className="w-16 h-16 object-cover rounded-xl mr-4 border-2 border-orange-200 shadow-md" />
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-lg">{expense.description}</p>
                      <p className="text-sm text-orange-600 font-semibold capitalize">
                        {category ? t(category.name) : 'Unknown'} • {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-red-600">-{expense.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-semibold">LKR</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
