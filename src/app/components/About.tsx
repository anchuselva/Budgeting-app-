import { useLanguage } from '../context/LanguageContext';
import { Wallet, Users, Shield, Zap, Heart, Globe } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Wallet,
      title: { en: 'Smart Budgeting', ta: 'ஸ்மார்ட் பட்ஜெட்', si: 'ස්මාර්ට් අයවැය' },
      description: { en: 'Track your income and expenses with ease', ta: 'உங்கள் வருமானம் மற்றும் செலவுகளை எளிதாக கண்காணிக்கவும்', si: 'ඔබේ ආදායම සහ වියදම් පහසුවෙන් නිරීක්ෂණය කරන්න' },
    },
    {
      icon: Zap,
      title: { en: 'Bill Scanning', ta: 'பில் ஸ்கேனிங்', si: 'බිල්පත් ස්කෑන් කිරීම' },
      description: { en: 'Automatically categorize expenses from bill photos', ta: 'பில் புகைப்படங்களிலிருந்து செலவுகளை தானாக வகைப்படுத்துங்கள்', si: 'බිල්පත් ඡායාරූපවලින් ස්වයංක්‍රීයව වියදම් වර්ගීකරණය කරන්න' },
    },
    {
      icon: Users,
      title: { en: 'For Sri Lankans', ta: 'இலங்கையர்களுக்காக', si: 'ශ්‍රී ලාංකිකයන් සඳහා' },
      description: { en: 'Designed specifically for the Sri Lankan context', ta: 'இலங்கை சூழலுக்கு குறிப்பாக வடிவமைக்கப்பட்டது', si: 'ශ්‍රී ලාංකික සන්දර්භය සඳහා විශේෂයෙන් නිර්මාණය කර ඇත' },
    },
    {
      icon: Globe,
      title: { en: 'Multi-Language', ta: 'பல மொழி', si: 'බහු භාෂා' },
      description: { en: 'Available in English, Tamil, and Sinhala', ta: 'ஆங்கிலம், தமிழ், சிங்களத்தில் கிடைக்கிறது', si: 'ඉංග්‍රීසි, දෙමළ සහ සිංහල භාෂාවලින් ලබා ගත හැකිය' },
    },
    {
      icon: Shield,
      title: { en: 'Secure & Private', ta: 'பாதுகாப்பான & தனிப்பட்ட', si: 'ආරක්ෂිත සහ පුද්ගලික' },
      description: { en: 'Your financial data is encrypted and protected', ta: 'உங்கள் நிதி தரவு குறியாக்கம் மற்றும் பாதுகாக்கப்படுகிறது', si: 'ඔබේ මූල්‍ය දත්ත සංකේතනය කර ආරක්ෂා කර ඇත' },
    },
    {
      icon: Heart,
      title: { en: 'AI-Powered', ta: 'AI இயங்கும்', si: 'AI බලගැන්වූ' },
      description: { en: 'Get intelligent suggestions to save more', ta: 'மேலும் சேமிக்க புத்திசாலித்தனமான பரிந்துரைகளைப் பெறுங்கள்', si: 'වැඩි ඉතිරි කිරීමට බුද්ධිමත් යෝජනා ලබා ගන්න' },
    },
  ];

  const getLangCode = () => {
    return t('home') === 'Home' ? 'en' : t('home') === 'முகப்பு' ? 'ta' : 'si';
  };

  const lang = getLangCode();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-block mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-4xl">₨</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {t('about')} {t('appName')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {lang === 'en' && 'SaveLKR is a smart budgeting application designed specifically for Sri Lankans to manage their finances efficiently and save more money.'}
          {lang === 'ta' && 'SaveLKR என்பது இலங்கையர்கள் தங்கள் நிதிகளை திறமையாக நிர்வகிக்க மற்றும் அதிக பணத்தை சேமிக்க குறிப்பாக வடிவமைக்கப்பட்ட ஒரு ஸ்மார்ட் பட்ஜெட் பயன்பாடு ஆகும்.'}
          {lang === 'si' && 'SaveLKR යනු ශ්‍රී ලාංකිකයන්ට ඔවුන්ගේ මූල්‍ය කටයුතු කාර්යක්ෂමව කළමනාකරණය කිරීමට සහ වැඩි මුදලක් ඉතිරි කිරීමට විශේෂයෙන් නිර්මාණය කර ඇති ස්මාර්ට් අයවැය යෙදුමකි.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
              <feature.icon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {feature.title[lang]}
            </h3>
            <p className="text-gray-600">
              {feature.description[lang]}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-white text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          {lang === 'en' && 'Our Mission'}
          {lang === 'ta' && 'எங்கள் நோக்கம்'}
          {lang === 'si' && 'අපේ මෙහෙවර'}
        </h2>
        <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
          {lang === 'en' && 'To empower every Sri Lankan with the tools and insights needed to take control of their financial future and build a more secure tomorrow.'}
          {lang === 'ta' && 'ஒவ்வொரு இலங்கையரும் தங்கள் நிதி எதிர்காலத்தை கட்டுப்படுத்த மற்றும் மேலும் பாதுகாப்பான நாளை உருவாக்க தேவையான கருவிகள் மற்றும் நுண்ணறிவுகளை வழங்குவது.'}
          {lang === 'si' && 'සෑම ශ්‍රී ලාංකිකයෙකුටම ඔවුන්ගේ මූල්‍ය අනාගතය පාලනය කර ගැනීමට සහ වඩාත් ආරක්ෂිත හෙටක් ගොඩනැගීමට අවශ්‍ය මෙවලම් සහ තීක්ෂ්ණ බුද්ධිය ලබා දීම.'}
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {lang === 'en' && 'Key Features'}
          {lang === 'ta' && 'முக்கிய அம்சங்கள்'}
          {lang === 'si' && 'ප්‍රධාන විශේෂාංග'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'Monthly Income Tracking'}
                {lang === 'ta' && 'மாதாந்திர வருமான கண்காணிப்பு'}
                {lang === 'si' && 'මාසික ආදායම නිරීක්ෂණය'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'Set and track your income month by month'}
                {lang === 'ta' && 'மாதந்தோறும் உங்கள் வருமானத்தை அமைத்து கண்காணிக்கவும்'}
                {lang === 'si' && 'මාසයෙන් මාසයට ඔබේ ආදායම සකසා නිරීක්ෂණය කරන්න'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'Category-based Budgeting'}
                {lang === 'ta' && 'வகை அடிப்படையிலான பட்ஜெட்'}
                {lang === 'si' && 'කාණ්ඩය පදනම් කරගත් අයවැය'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'Allocate budgets to food, utilities, transport, and more'}
                {lang === 'ta' && 'உணவு, பயன்பாடுகள், போக்குவரத்து மற்றும் பலவற்றிற்கு பட்ஜெட்களை ஒதுக்குங்கள்'}
                {lang === 'si' && 'ආහාර, උපයෝගිතා, ප්‍රවාහනය සහ තවත් බොහෝ දේ සඳහා අයවැය වෙන් කරන්න'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'Automatic Bill Recognition'}
                {lang === 'ta' && 'தானியங்கி பில் அங்கீகாரம்'}
                {lang === 'si' && 'ස්වයංක්‍රීය බිල්පත් හඳුනා ගැනීම'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'Scan bills to auto-categorize expenses'}
                {lang === 'ta' && 'செலவுகளை தானாக வகைப்படுத்த பில்களை ஸ்கேன் செய்யவும்'}
                {lang === 'si' && 'වියදම් ස්වයංක්‍රීයව වර්ගීකරණය කිරීමට බිල්පත් ස්කෑන් කරන්න'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'Payment Reminders'}
                {lang === 'ta' && 'கட்டண நினைவூட்டல்கள்'}
                {lang === 'si' && 'ගෙවීම් මතක් කිරීම්'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'Never miss a bill payment deadline'}
                {lang === 'ta' && 'பில் செலுத்துதல் காலக்கெடுவை தவறவிடாதீர்கள்'}
                {lang === 'si' && 'කිසි විටෙකත් බිල්පත් ගෙවීමේ අවසන් දිනය මග හරින්න එපා'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'AI-Powered Insights'}
                {lang === 'ta' && 'AI இயங்கும் நுண்ணறிவுகள்'}
                {lang === 'si' && 'AI බලගැන්වූ අවබෝධය'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'Get suggestions when overspending is detected'}
                {lang === 'ta' && 'அதிக செலவு கண்டறியப்படும்போது பரிந்துரைகளைப் பெறுங்கள்'}
                {lang === 'si' && 'අධික වියදම් අනාවරණය වූ විට යෝජනා ලබා ගන්න'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'Voice Summaries'}
                {lang === 'ta' && 'குரல் சுருக்கங்கள்'}
                {lang === 'si' && 'හඬ සාරාංශ'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'Hear your spending summary in your language'}
                {lang === 'ta' && 'உங்கள் மொழியில் உங்கள் செலவு சுருக்கத்தை கேளுங்கள்'}
                {lang === 'si' && 'ඔබේ භාෂාවෙන් ඔබේ වියදම් සාරාංශය අසන්න'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'Visual Analytics'}
                {lang === 'ta' && 'காட்சி பகுப்பாய்வு'}
                {lang === 'si' && 'දෘශ්‍ය විශ්ලේෂණ'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'View spending trends with weekly, monthly, and yearly charts'}
                {lang === 'ta' && 'வாராந்திர, மாதாந்திர மற்றும் வருடாந்திர விளக்கப்படங்களுடன் செலவு போக்குகளைக் காணவும்'}
                {lang === 'si' && 'සතිපතා, මාසික සහ වාර්ෂික ප්‍රස්ථාර සමඟ වියදම් ප්‍රවණතා බලන්න'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {lang === 'en' && 'Overspending Alerts'}
                {lang === 'ta' && 'அதிக செலவு எச்சரிக்கைகள்'}
                {lang === 'si' && 'අධික වියදම් අනතුරු ඇඟවීම්'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'en' && 'Receive notifications when you exceed budget limits'}
                {lang === 'ta' && 'நீங்கள் பட்ஜெட் வரம்புகளை மீறும்போது அறிவிப்புகளைப் பெறுங்கள்'}
                {lang === 'si' && 'ඔබ අයවැය සීමාවන් ඉක්මවා ගිය විට දැනුම්දීම් ලබා ගන්න'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
