import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Wallet, TrendingUp, Bell, Scan, Mic, BarChart3, Shield, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Wallet,
      title: { en: 'Budget Management', ta: 'பட்ஜெட் மேலாண்மை', si: 'අයවැය කළමනාකරණය' },
      description: { en: 'Set monthly budgets for different categories', ta: 'வெவ்வேறு வகைகளுக்கு மாதாந்திர பட்ஜெட்களை அமைக்கவும்', si: 'විවිධ කාණ්ඩ සඳහා මාසික අයවැය සකසන්න' },
    },
    {
      icon: Scan,
      title: { en: 'Bill Scanning', ta: 'பில் ஸ்கேனிங்', si: 'බිල්පත් ස්කෑන් කිරීම' },
      description: { en: 'Scan bills to automatically track expenses', ta: 'செலவுகளை தானாக கண்காணிக்க பில்களை ஸ்கேன் செய்யவும்', si: 'වියදම් ස්වයංක්‍රීයව නිරීක්ෂණය කිරීම සඳහා බිල්පත් ස්කෑන් කරන්න' },
    },
    {
      icon: Bell,
      title: { en: 'Smart Reminders', ta: 'ஸ்மார்ட் நினைவூட்டல்கள்', si: 'ස්මාර්ට් මතක් කිරීම්' },
      description: { en: 'Get notified for bill payments', ta: 'பில் செலுத்துதலுக்கான அறிவிப்புகளைப் பெறுங்கள்', si: 'බිල්පත් ගෙවීම් සඳහා දැනුම්දීම් ලබා ගන්න' },
    },
    {
      icon: TrendingUp,
      title: { en: 'AI Suggestions', ta: 'AI பரிந்துரைகள்', si: 'AI යෝජනා' },
      description: { en: 'Get intelligent spending recommendations', ta: 'புத்திசாலித்தனமான செலவு பரிந்துரைகளைப் பெறுங்கள்', si: 'බුද්ධිමත් වියදම් නිර්දේශ ලබා ගන්න' },
    },
    {
      icon: Mic,
      title: { en: 'Voice Summaries', ta: 'குரல் சுருக்கங்கள்', si: 'හඬ සාරාංශ' },
      description: { en: 'Listen to your spending summary in 3 languages', ta: '3 மொழிகளில் உங்கள் செலவு சுருக்கத்தை கேளுங்கள்', si: 'භාෂා 3කින් ඔබේ වියදම් සාරාංශය සවන් දෙන්න' },
    },
    {
      icon: BarChart3,
      title: { en: 'Analytics', ta: 'பகுப்பாய்வு', si: 'විශ්ලේෂණ' },
      description: { en: 'View detailed charts and reports', ta: 'விரிவான விளக்கப்படங்கள் மற்றும் அறிக்கைகளைப் பார்க்கவும்', si: 'විස්තරාත්මක ප්‍රස්ථාර සහ වාර්තා බලන්න' },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400/25 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="text-center mb-16 relative z-10">
        <motion.div
          className="inline-block mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="w-28 h-28 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-14 h-14 text-white" />
          </motion.div>
        </motion.div>
        <motion.h1
          className="text-5xl sm:text-7xl font-black mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('appName')}
        </motion.h1>
        <motion.p
          className="text-xl sm:text-3xl text-gray-700 mb-8 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('tagline')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/register">
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white rounded-2xl text-xl font-bold shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{t('getStarted')} ✨</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-red-500 to-orange-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all h-full border border-white/50">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {feature.title[t('home') === 'Home' ? 'en' : t('home') === 'முகப்பு' ? 'ta' : 'si']}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description[t('home') === 'Home' ? 'en' : t('home') === 'முகப்பு' ? 'ta' : 'si']}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 rounded-[3rem] p-8 sm:p-16 text-white text-center shadow-2xl relative z-10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Smartphone className="w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
        </motion.div>
        <motion.h2
          className="text-4xl sm:text-5xl font-black mb-6 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {t('home') === 'Home' ? 'Take Control of Your Finances' : t('home') === 'முகப்பு' ? 'உங்கள் நிதிகளை கட்டுப்படுத்துங்கள்' : 'ඔබේ මූල්‍ය පාලනය කරන්න'}
        </motion.h2>
        <motion.p
          className="text-xl sm:text-2xl mb-10 text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {t('home') === 'Home' ? 'Join thousands of Sri Lankans saving smarter every day' : t('home') === 'முகப்பு' ? 'ஒவ்வொரு நாளும் புத்திசாலித்தனமாக சேமிக்கும் ஆயிரக்கணக்கான இலங்கையர்களுடன் சேருங்கள்' : 'සෑම දිනකම බුද්ධිමත්ව ඉතිරි කරන දහස් ගණන් ශ්‍රී ලාංකිකයන් සමඟ එක්වන්න'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/register">
            <motion.button
              className="px-10 py-5 bg-white text-orange-600 rounded-2xl text-xl font-black shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{t('getStarted')} 🚀</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
