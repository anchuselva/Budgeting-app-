import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { DollarSign, Calendar, Plus } from 'lucide-react';
import { toast } from 'sonner';

export function IncomeSetup() {
  const { isAuthenticated } = useAuth();
  const { monthlyIncome, addIncome } = useBudget();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setMonth(currentMonth);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!month || !amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    addIncome(month, parseFloat(amount));
    toast.success('Monthly income saved!');
    setAmount('');
  };

  const currentIncome = monthlyIncome.find(i => i.month === month);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('monthlyIncome')}</h1>
        <p className="text-gray-600">Set your income for each month to track your budget</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Income</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-5 h-5 inline mr-2" />
                Month
              </label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-5 h-5 inline mr-2" />
                Monthly Income (LKR)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="50000"
                min="0"
                step="100"
                required
              />
            </div>

            {currentIncome && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">Current income for this month:</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {currentIncome.amount.toLocaleString()} LKR
                </p>
                <p className="text-sm text-blue-700 mt-2">Submitting will update this value</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              {currentIncome ? 'Update Income' : 'Add Income'}
            </button>
          </form>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Income History</h2>
          {monthlyIncome.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No income records yet</p>
              <p className="text-sm text-gray-400 mt-2">Start by adding your monthly income</p>
            </div>
          ) : (
            <div className="space-y-4">
              {monthlyIncome
                .sort((a, b) => b.month.localeCompare(a.month))
                .map((income, index) => {
                  const date = new Date(income.month + '-01');
                  const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{monthName}</p>
                        <p className="text-sm text-gray-600">{income.month}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">
                          {income.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">LKR</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/budget')}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Next: Set Budget Categories →
        </button>
      </div>
    </div>
  );
}
