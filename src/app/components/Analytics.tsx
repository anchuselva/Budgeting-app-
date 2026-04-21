import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, TrendingUp, AlertCircle, Mic, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

export function Analytics() {
  const { isAuthenticated } = useAuth();
  const { categories, expenses, getSpendingSummary, getAISuggestion } = useBudget();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const categoryData = categories.map((cat, index) => ({
    name: t(cat.name),
    spent: cat.spent,
    budget: cat.budget,
    fill: COLORS[index % COLORS.length],
  }));

  const getTimeframeData = () => {
    const now = new Date();
    const data: { [key: string]: number } = {};

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      let key = '';

      if (timeframe === 'weekly') {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const daysDiff = Math.floor((expenseDate.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff >= 0 && daysDiff < 7) {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          key = days[expenseDate.getDay()];
        }
      } else if (timeframe === 'monthly') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        if (expenseDate >= monthStart && expenseDate <= now) {
          key = `Week ${Math.ceil(expenseDate.getDate() / 7)}`;
        }
      } else {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        if (expenseDate >= yearStart && expenseDate <= now) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          key = months[expenseDate.getMonth()];
        }
      }

      if (key) {
        data[key] = (data[key] || 0) + expense.amount;
      }
    });

    return Object.entries(data).map(([name, amount]) => ({ name, amount }));
  };

  const timeframeData = getTimeframeData();

  const handleVoiceSummary = () => {
    const summary = getSpendingSummary(language);
    setSpeaking(true);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.lang = language === 'ta' ? 'ta-IN' : language === 'si' ? 'si-LK' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => {
        setSpeaking(false);
        toast.error('Voice synthesis not available');
      };
      window.speechSynthesis.speak(utterance);
      toast.success(language === 'ta' ? 'குரல் சுருக்கம் இயங்குகிறது' : language === 'si' ? 'හඬ සාරාංශය වාදනය වේ' : 'Playing voice summary');
    } else {
      setSpeaking(false);
      toast.error('Voice synthesis not supported in this browser');
    }
  };

  const overspentCategories = categories.filter(cat => cat.spent > cat.budget);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('analytics')}</h1>
        <p className="text-gray-600">Visualize your spending patterns and get insights</p>
      </div>

      <div className="mb-8">
        <button
          onClick={handleVoiceSummary}
          disabled={speaking}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center disabled:opacity-50"
        >
          {speaking ? <Volume2 className="w-5 h-5 mr-2 animate-pulse" /> : <Mic className="w-5 h-5 mr-2" />}
          {speaking ? 'Playing...' : t('voiceSummary')}
        </button>
      </div>

      {overspentCategories.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
            <div className="flex-1">
              <h3 className="text-red-800 font-bold mb-2">Overspending Alert</h3>
              {overspentCategories.map(cat => (
                <div key={cat.id} className="mb-3">
                  <p className="text-red-700 font-medium capitalize">{t(cat.name)}</p>
                  <p className="text-red-600 text-sm">{getAISuggestion(cat.id)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6">
        {(['weekly', 'monthly', 'yearly'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize ${
              timeframe === tf
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="spent"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6 capitalize">{timeframe} Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeframeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Budget vs Actual Spending</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
            <Bar dataKey="spent" fill="#10b981" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h4 className="text-lg font-bold text-gray-800 mb-2 capitalize">{t(category.name)}</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Budget:</span>
                <span className="font-semibold">{category.budget.toLocaleString()} LKR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Spent:</span>
                <span className="font-semibold">{category.spent.toLocaleString()} LKR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining:</span>
                <span className={`font-semibold ${category.spent > category.budget ? 'text-red-600' : 'text-green-600'}`}>
                  {(category.budget - category.spent).toLocaleString()} LKR
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className={`h-2 rounded-full transition-all ${
                    category.spent > category.budget ? 'bg-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                  }`}
                  style={{ width: `${Math.min((category.spent / category.budget) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
