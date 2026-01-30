import React, { useState, useEffect } from 'react';
import { Sun, Moon, Heart, Bell, CheckCircle, RotateCcw, X } from 'lucide-react';

const rawData = {
  morning: [
    { id: 'm1', text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيطَانِ الرَّجِيمِ ﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...﴾ (آية الكرسي)", count: 1 },
    { id: 'm2', text: "بسم الله الرحمن الرحيم ﴿قُلْ هُوَ اللَّهُ أَحَدٌ...﴾، ﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...﴾، ﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ...﴾", count: 3 },
    { id: 'm3', text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ...", count: 1 },
    { id: 'm4', text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.", count: 1 },
    { id: 'm5', text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ (سيد الاستغفار)...", count: 1 },
    { id: 'm6', text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتِكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ...", count: 4 },
    { id: 'm7', text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ...", count: 1 },
    { id: 'm8', text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي... (3 مرات)", count: 3 },
    { id: 'm9', text: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيهِ تَوَكَّلتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.", count: 7 },
    { id: 'm10', text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ...", count: 1 },
    { id: 'm11', text: "اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ...", count: 1 },
    { id: 'm12', text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلاَ فِي السّمَاءِ...", count: 3 },
    { id: 'm13', text: "رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيّاً.", count: 3 },
    { id: 'm14', text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ أَصْلِحْ لِي شَأْنِيَ كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.", count: 1 },
    { id: 'm15', text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُـمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ...", count: 1 },
    { id: 'm16', text: "أَصْبَحْنا عَلَى فِطْرَةِ الْإِسْلاَمِ، وَعَلَى كَلِمَةِ الْإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ...", count: 1 },
    { id: 'm17', text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.", count: 100 },
    { id: 'm18', text: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", count: 10 },
    { id: 'm19', text: "لاَ إِلَهَ إِلاَّ اللَّهُ، وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", count: 100 },
    { id: 'm20', text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.", count: 3 },
    { id: 'm21', text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَرِزْقاً طَيِّباً، وَعَمَلاً مُتَقَبَّلاً.", count: 1 },
    { id: 'm22', text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.", count: 100 },
    { id: 'm23', text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ.", count: 10 },
  ],
  evening: [
    { id: 'e1', text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيطَانِ الرَّجِيمِ ﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...﴾ (آية الكرسي)", count: 1 },
    { id: 'e2', text: "بسم الله الرحمن الرحيم ﴿قُلْ هُوَ اللَّهُ أَحَدٌ...﴾، ﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...﴾، ﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ...﴾", count: 3 },
    { id: 'e3', text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ...", count: 1 },
    { id: 'e4', text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ.", count: 1 },
    { id: 'e5', text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ (سيد الاستغفار)...", count: 1 },
    { id: 'e6', text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتِكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ...", count: 4 },
    { id: 'e7', text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ...", count: 1 },
    { id: 'e8', text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي... (3 مرات)", count: 3 },
    { id: 'e9', text: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيهِ تَوَكَّلتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.", count: 7 },
    { id: 'e10', text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ...", count: 1 },
    { id: 'e11', text: "اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ...", count: 1 },
    { id: 'e12', text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلاَ فِي السّمَاءِ...", count: 3 },
    { id: 'e13', text: "رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيّاً.", count: 3 },
    { id: 'e14', text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ أَصْلِحْ لِي شَأْنِيَ كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.", count: 1 },
    { id: 'e15', text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُـمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ...", count: 1 },
    { id: 'e16', text: "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلاَمِ، وَعَلَى كَلِمَةِ الْإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ...", count: 1 },
    { id: 'e17', text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.", count: 100 },
    { id: 'e18', text: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", count: 10 },
    { id: 'e19', text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.", count: 3 },
    { id: 'e20', text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.", count: 100 },
    { id: 'e21', text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ.", count: 10 },
  ],
  general: [
    { id: 'g1', text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ.", count: 33 },
    { id: 'g2', text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.", count: 10 },
    { id: 'g3', text: "أَسْتَغْفِرُ اللَّهَ العَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الحَيَّ القَيُّومَ وَأَتُوبُ إِلَيْه.", count: 3 },
  ]
};

const randomReminders = [
  "هل صليت على النبي اليوم؟",
  "استغفر الله العظيم",
  "سبحان الله وبحمده، سبحان الله العظيم",
  "لا تنسى قراءة آية الكرسي",
  "رطب لسانك بذكر الله",
  "لا حول ولا قوة إلا بالله"
];

export default function App() {
  const [activeTab, setActiveTab] = useState('morning');
  const [counts, setCounts] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  useEffect(() => {
    const initialCounts = {};
    [...rawData.morning, ...rawData.evening, ...rawData.general].forEach(dhikr => {
      initialCounts[dhikr.id] = dhikr.count;
    });
    setCounts(initialCounts);
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  useEffect(() => {
    let interval;
    if (notificationEnabled) {
      interval = setInterval(() => {
        const randomMsg = randomReminders[Math.floor(Math.random() * randomReminders.length)];
        setNotificationText(randomMsg);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
        if (document.hidden && Notification.permission === "granted") {
          new Notification("تذكير", { body: randomMsg });
        }
      }, 300000);
    }
    return () => clearInterval(interval);
  }, [notificationEnabled]);

  const handleCount = (id) => {
    setCounts(prev => {
      const current = prev[id];
      if (current > 0) return { ...prev, [id]: current - 1 };
      return prev;
    });
  };

  const resetDhikr = (dhikr) => {
    setCounts(prev => ({ ...prev, [dhikr.id]: dhikr.count }));
  };

  const resetAllInTab = (tab) => {
    const newCounts = { ...counts };
    rawData[tab].forEach(d => newCounts[d.id] = d.count);
    setCounts(newCounts);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 flex flex-col items-center justify-center p-3 transition-colors duration-200 ${
        activeTab === id 
          ? 'text-emerald-700 border-t-4 border-emerald-600 bg-emerald-50' 
          : 'text-gray-400 hover:text-emerald-500 hover:bg-gray-50'
      }`}
    >
      <Icon size={24} className="mb-1" />
      <span className="text-xs font-bold">{label}</span>
    </button>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 font-sans flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <header className="bg-emerald-600 text-white p-6 rounded-b-3xl shadow-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">حصن المسلم</h1>
            <p className="text-emerald-100 text-sm">أذكار الكتاب والسنة</p>
          </div>
          <button 
            onClick={() => setNotificationEnabled(!notificationEnabled)}
            className={`p-2 rounded-full ${notificationEnabled ? 'bg-emerald-500' : 'bg-red-400'} transition-colors`}
          >
            {notificationEnabled ? <Bell size={20} /> : <Bell size={20} className="line-through opacity-75" />}
          </button>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex justify-between items-center border border-white/20">
          <div className="text-center">
            <span className="block text-2xl font-bold">{new Date().toLocaleDateString('ar-EG', { weekday: 'long' })}</span>
            <span className="text-xs text-emerald-100">اليوم</span>
          </div>
          <div className="h-8 w-px bg-white/30"></div>
          <div className="text-center">
             <span className="block text-xl font-bold">
               {rawData[activeTab].filter(d => counts[d.id] === 0).length} / {rawData[activeTab].length}
             </span>
             <span className="text-xs text-emerald-100">أنجزت</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24 space-y-4 scroll-smooth">
        <div className="flex justify-between items-center mb-2 sticky top-0 bg-gray-100/95 backdrop-blur py-2 z-10">
           <h2 className="text-gray-700 font-bold text-lg">
             {activeTab === 'morning' ? 'أذكار الصباح' : activeTab === 'evening' ? 'أذكار المساء' : 'أذكار متنوعة'}
           </h2>
           <button 
             onClick={() => resetAllInTab(activeTab)}
             className="text-xs text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors"
           >
             إعادة تعيين الكل
           </button>
        </div>

        {rawData[activeTab].map((dhikr) => (
          <div 
            key={dhikr.id} 
            className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-300 relative group ${
              counts[dhikr.id] === 0 ? 'border-emerald-400 bg-emerald-50 opacity-90' : 'border-transparent'
            }`}
          >
            <div className="absolute left-4 top-4">
              <button 
                onClick={(e) => { e.stopPropagation(); resetDhikr(dhikr); }}
                className="text-gray-300 hover:text-emerald-500 transition-colors p-1"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 pl-6">
                <p className={`text-gray-800 text-lg leading-9 font-medium ${counts[dhikr.id] === 0 ? 'text-emerald-800' : ''}`}>
                  {dhikr.text}
                </p>
                {counts[dhikr.id] === 0 && (
                  <span className="inline-block mt-2 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">
                    تم الانتهاء
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCount(dhikr.id)}
                disabled={counts[dhikr.id] === 0}
                className={`flex-shrink-0 w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all active:scale-90 shadow-md ${
                  counts[dhikr.id] === 0 
                  ? 'bg-emerald-500 text-white cursor-default' 
                  : 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300'
                }`}
              >
                {counts[dhikr.id] === 0 ? <CheckCircle size={28} /> : <span className="text-2xl font-bold">{counts[dhikr.id]}</span>}
              </button>
            </div>
          </div>
        ))}
        <div className="h-8"></div>
      </main>

      <div className={`fixed top-4 left-4 right-4 bg-gray-800/95 backdrop-blur text-white p-4 rounded-xl shadow-2xl z-50 transform transition-all duration-500 flex items-center gap-3 ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-40 opacity-0'}`}>
        <div className="bg-emerald-500 p-2 rounded-full shadow-lg shadow-emerald-500/20">
           <Bell size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm text-emerald-300 mb-1">تذكير</h4>
          <p className="text-sm text-gray-100 leading-snug">{notificationText}</p>
        </div>
        <button onClick={() => setShowNotification(false)} className="p-1 hover:bg-white/10 rounded-full">
          <X size={18} className="text-gray-400" />
        </button>
      </div>

      <nav className="bg-white border-t border-gray-200 flex justify-around absolute bottom-0 w-full z-20 pb-safe">
        <TabButton id="morning" label="الصباح" icon={Sun} />
        <TabButton id="evening" label="المساء" icon={Moon} />
        <TabButton id="general" label="متنوعة" icon={Heart} />
      </nav>
    </div>
  );
}


    
