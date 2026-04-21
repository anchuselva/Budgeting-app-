import { Outlet, Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Root() {
  const { isAuthenticated, logout, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'si', label: 'සිංහල' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,87,34,0.15),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(156,39,176,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,rgba(233,30,99,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,152,0,0.15),transparent_50%)]"></div>
      </div>
      <motion.nav
        className="bg-white/90 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-white/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-3xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
                {t('appName')}
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <motion.span
                      className={`font-semibold transition-colors ${location.pathname === '/dashboard' ? 'text-orange-600' : 'text-gray-700'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('dashboard')}
                    </motion.span>
                  </Link>
                  <Link to="/income">
                    <motion.span
                      className={`font-semibold transition-colors ${location.pathname === '/income' ? 'text-orange-600' : 'text-gray-700'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('income')}
                    </motion.span>
                  </Link>
                  <Link to="/budget">
                    <motion.span
                      className={`font-semibold transition-colors ${location.pathname === '/budget' ? 'text-orange-600' : 'text-gray-700'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('budget')}
                    </motion.span>
                  </Link>
                  <Link to="/expenses">
                    <motion.span
                      className={`font-semibold transition-colors ${location.pathname === '/expenses' ? 'text-orange-600' : 'text-gray-700'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('expenses')}
                    </motion.span>
                  </Link>
                  <Link to="/analytics">
                    <motion.span
                      className={`font-semibold transition-colors ${location.pathname === '/analytics' ? 'text-orange-600' : 'text-gray-700'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('analytics')}
                    </motion.span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <motion.span
                      className="text-gray-700 font-semibold"
                      whileHover={{ scale: 1.1, color: "#ea580c" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('home')}
                    </motion.span>
                  </Link>
                  <Link to="/about">
                    <motion.span
                      className="text-gray-700 font-semibold"
                      whileHover={{ scale: 1.1, color: "#ea580c" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('about')}
                    </motion.span>
                  </Link>
                </>
              )}

              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600">
                  <Globe className="w-5 h-5" />
                  <span>{languages.find(l => l.code === language)?.label}</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-emerald-50 ${language === lang.code ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {isAuthenticated ? (
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all"
                >
                  {t('logout')}
                </motion.button>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all"
                  >
                    {t('login')}
                  </motion.button>
                </Link>
              )}
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden pb-4 space-y-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('dashboard')}
                  </Link>
                  <Link to="/income" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('income')}
                  </Link>
                  <Link to="/budget" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('budget')}
                  </Link>
                  <Link to="/expenses" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('expenses')}
                  </Link>
                  <Link to="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('analytics')}
                  </Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded">
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('home')}
                  </Link>
                  <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('about')}
                  </Link>
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {t('login')}
                  </Link>
                </>
              )}
              <div className="px-4 py-2">
                <div className="text-sm text-gray-500 mb-2">Language:</div>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setMobileMenuOpen(false); }}
                    className={`block w-full text-left px-2 py-1 rounded ${language === lang.code ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <motion.main
        className="min-h-[calc(100vh-4rem)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
