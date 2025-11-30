

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DayInfo, ItineraryItem, Expense, BackupSpot, CategoryType, PackingItem, UtilityTabType, ExpenseCategoryType, Note, TranslationResult } from './types';
import { INITIAL_DAYS, INITIAL_ITINERARY, INITIAL_EXPENSES, BACKUP_SPOTS, DAY_SUBTITLES, EXCHANGE_RATES, CATEGORIES, INITIAL_PACKING_LIST, CURRENCY_OPTIONS, USERS, EXPENSE_CATEGORIES, EMERGENCY_CONTACTS, OFFLINE_MAP_IMAGES, USEFUL_PHRASES } from './constants';
import DetailModal from './components/DetailModal';
import ChatModal from './components/ChatModal';
import ItineraryModal from './components/ItineraryModal';
import LoginModal from './components/LoginModal';
import { translateText } from './services/geminiService';

const App: React.FC = () => {
  // State
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [currentDate, setCurrentDate] = useState('2024-12-31');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [days, setDays] = useState<DayInfo[]>(INITIAL_DAYS);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(() => {
    const saved = localStorage.getItem('hanoi_itinerary_react');
    return saved ? JSON.parse(saved) : INITIAL_ITINERARY;
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('hanoi_expenses_react');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });
  const [backupSpots, setBackupSpots] = useState<BackupSpot[]>(() => {
    const saved = localStorage.getItem('hanoi_backups_react');
    return saved ? JSON.parse(saved) : BACKUP_SPOTS;
  });
  
  // Persistence for Current State
  useEffect(() => {
      const savedDate = localStorage.getItem('hanoi_current_date');
      const savedTab = localStorage.getItem('hanoi_active_tab');
      
      // If we have saved state, load it. If not, show landing page.
      if (savedDate) {
          setCurrentDate(savedDate);
          setShowLanding(false); // Skip landing if returning user
      }
      if (savedTab) setActiveTab(savedTab);
  }, []);

  useEffect(() => {
      localStorage.setItem('hanoi_current_date', currentDate);
  }, [currentDate]);

  useEffect(() => {
      localStorage.setItem('hanoi_active_tab', activeTab);
  }, [activeTab]);

  // Utility States
  const [utilityView, setUtilityView] = useState<UtilityTabType | 'menu'>('menu');
  const [packingList, setPackingList] = useState<PackingItem[]>(() => {
      const saved = localStorage.getItem('hanoi_packing_react');
      return saved ? JSON.parse(saved) : INITIAL_PACKING_LIST;
  });
  const [currencyAmount, setCurrencyAmount] = useState<string>('1000');
  const [currencyFrom, setCurrencyFrom] = useState<string>('VND');
  const [currencyTo, setCurrencyTo] = useState<string>('TWD');
  const [newItemText, setNewItemText] = useState('');

  // New Utility States
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState('');
  const [noteDate, setNoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [offlineMapRegion, setOfflineMapRegion] = useState<'hanoi' | 'halong' | 'yentu'>('hanoi');
  
  const [moreTab, setMoreTab] = useState<'all' | 'sightseeing' | 'food' | 'shopping'>('all');

  // Modals
  const [showChatModal, setShowChatModal] = useState(false);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isBackupMode, setIsBackupMode] = useState(false); 
  const [editItem, setEditItem] = useState<ItineraryItem | undefined>(undefined);
  const [selectedSpot, setSelectedSpot] = useState<ItineraryItem | BackupSpot | undefined>(undefined);

  // Expense Form State
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState<number | null>(null);
  const [newExpense, setNewExpense] = useState<{
      item: string, amount: string, currency: 'VND'|'TWD'|'USD', category: ExpenseCategoryType, isSplit: boolean, beneficiaries: string[] 
  }>({
    item: '', amount: '', currency: 'VND', category: 'food', isSplit: true, beneficiaries: USERS.map(u => u.name)
  });

  // Persistence
  useEffect(() => { localStorage.setItem('hanoi_itinerary_react', JSON.stringify(itinerary)); }, [itinerary]);
  useEffect(() => { localStorage.setItem('hanoi_expenses_react', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('hanoi_backups_react', JSON.stringify(backupSpots)); }, [backupSpots]);
  useEffect(() => { localStorage.setItem('hanoi_packing_react', JSON.stringify(packingList)); }, [packingList]);

  // Load Notes on User Change
  useEffect(() => {
      if (currentUser) {
          const savedNotes = localStorage.getItem(`hanoi_notes_${currentUser}`);
          if (savedNotes) setNotes(JSON.parse(savedNotes));
          else setNotes([]);
      } else {
          setNotes([]);
      }
  }, [currentUser]);

  // Derived State
  const filteredItinerary = useMemo(() => {
    return itinerary
      .filter(i => i.date === currentDate)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [itinerary, currentDate]);

  const filteredBackupSpots = useMemo(() => {
      if (moreTab === 'all') return backupSpots;
      return backupSpots.filter(s => s.category === moreTab); 
  }, [backupSpots, moreTab]);

  const dayNumber = useMemo(() => {
      const start = new Date(INITIAL_DAYS[0].date).getTime();
      const current = new Date(currentDate).getTime();
      return Math.floor((current - start) / (1000 * 60 * 60 * 24)) + 1;
  }, [currentDate]);

  const currentDayInfo = useMemo(() => {
      return days.find(d => d.date === currentDate);
  }, [days, currentDate]);

  // Expense Calculation Logic
  const displayExpenseTWD = useMemo(() => {
    return Math.round(expenses.reduce((sum, item) => {
        const itemTWD = item.amount * EXCHANGE_RATES[item.currency];
        
        if (currentUser) {
            // Personal Share Mode
            if (item.beneficiaries.includes(currentUser)) {
                return sum + (itemTWD / item.beneficiaries.length);
            }
            return sum;
        } else {
            // Group Total Mode (Fallback)
            return sum + itemTWD;
        }
    }, 0));
  }, [expenses, currentUser]);

  const convertedCurrency = useMemo(() => {
      const val = parseFloat(currencyAmount);
      if (isNaN(val)) return '---';
      const rateFrom = EXCHANGE_RATES[currencyFrom];
      const rateTo = EXCHANGE_RATES[currencyTo];
      const result = (val * rateFrom) / rateTo;
      
      if (result < 1) return result.toFixed(4);
      if (result > 10000) return Math.round(result).toLocaleString();
      return result.toFixed(2);
  }, [currencyAmount, currencyFrom, currencyTo]);

  const groupedPackingList = useMemo(() => {
      return packingList.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
      }, {} as Record<string, PackingItem[]>);
  }, [packingList]);

  // Debt Calculation - Net Balance
  const debtSettlement = useMemo(() => {
      const balances: Record<string, number> = {};
      USERS.forEach(u => balances[u.name] = 0);

      expenses.forEach(exp => {
          const amountInTWD = exp.amount * EXCHANGE_RATES[exp.currency];
          
          // Payer paid full amount (Credit)
          if (balances[exp.payer] !== undefined) balances[exp.payer] += amountInTWD;
          
          // Beneficiaries owe their share (Debit)
          const share = amountInTWD / exp.beneficiaries.length;
          exp.beneficiaries.forEach(b => {
              if (balances[b] !== undefined) balances[b] -= share;
          });
      });

      return Object.entries(balances)
        .map(([name, amount]) => ({ name, amount: Math.round(amount) }))
        .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  // Handlers
  const handleAddItem = () => {
      setEditItem(undefined);
      setIsBackupMode(false);
      setShowItineraryModal(true);
  };

  const handleAddBackupSpot = () => {
      setEditItem(undefined);
      setIsBackupMode(true);
      setShowItineraryModal(true);
  };
  
  const handleEditItem = (item: ItineraryItem) => {
      setEditItem(item);
      setIsBackupMode(false);
      setShowItineraryModal(true);
  };

  const handleDeleteItem = (id: number) => {
      if (window.confirm("確定刪除此行程？")) {
          setItinerary(prev => prev.filter(i => i.id !== id));
      }
  };

  const handleSaveItinerary = (data: Partial<ItineraryItem>) => {
      if (isBackupMode) {
           const newSpot: BackupSpot = {
              id: editItem?.id || Date.now(),
              title: data.title || '未命名',
              category: data.category || 'sightseeing',
              note: data.note || '',
              location: data.location || '',
              images: data.images
          };
          setBackupSpots(prev => [newSpot, ...prev]);
      } else {
          if (editItem) {
              setItinerary(prev => prev.map(i => i.id === editItem.id ? { ...i, ...data } as ItineraryItem : i));
          } else {
              const newItem = {
                  ...data,
                  id: Date.now(),
              } as ItineraryItem;
              setItinerary(prev => [...prev, newItem]);
          }
      }
  };

  const handleAddDay = () => {
    const lastDay = days[days.length - 1];
    const nextDate = new Date(lastDay.date);
    nextDate.setDate(nextDate.getDate() + 1);
    const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    
    setDays([...days, {
        date: nextDate.toISOString().split('T')[0],
        week: weekDays[nextDate.getDay()],
        day: String(nextDate.getDate()).padStart(2, '0'),
        weather: 'cloudy',
        temp: 20
    }]);
  };

  const handleOpenExpenseModal = () => {
      if (!currentUser) return setShowLoginModal(true);
      setNewExpense({ item: '', amount: '', currency: 'VND', category: 'food', isSplit: true, beneficiaries: USERS.map(u => u.name) });
      setEditExpenseId(null);
      setShowExpenseModal(true);
  };

  const handleEditExpense = (expense: Expense) => {
      if (!currentUser) return setShowLoginModal(true);
      if (expense.payer !== currentUser) {
          alert('只能修改自己新增的項目');
          return;
      }
      setEditExpenseId(expense.id);
      setNewExpense({
          item: expense.item,
          amount: String(expense.amount),
          currency: expense.currency,
          category: expense.category,
          isSplit: expense.beneficiaries.length > 1 || (expense.beneficiaries.length === 1 && expense.beneficiaries[0] !== expense.payer),
          beneficiaries: expense.beneficiaries
      });
      setShowExpenseModal(true);
  };

  const handleSaveExpense = () => {
      if (!newExpense.item || !newExpense.amount) return;
      if (!currentUser) return alert('請先登入');

      const beneficiaries = newExpense.isSplit ? newExpense.beneficiaries : [currentUser];
      
      if (editExpenseId) {
          setExpenses(prev => prev.map(e => e.id === editExpenseId ? {
              ...e,
              item: newExpense.item,
              amount: parseFloat(newExpense.amount),
              currency: newExpense.currency,
              category: newExpense.category,
              beneficiaries: beneficiaries
          } : e));
      } else {
          setExpenses(prev => [{
              id: Date.now(),
              item: newExpense.item,
              amount: parseFloat(newExpense.amount),
              currency: newExpense.currency,
              category: newExpense.category,
              payer: currentUser,
              beneficiaries: beneficiaries,
              date: new Date().toISOString()
          }, ...prev]);
      }
      
      setShowExpenseModal(false);
  };

  const handleDeleteExpense = (id: number) => {
      if(window.confirm('刪除這筆支出紀錄?')) {
          setExpenses(prev => prev.filter(i => i.id !== id));
      }
  };

  const handleToggleBeneficiary = (name: string) => {
      setNewExpense(prev => {
          const current = prev.beneficiaries;
          if (current.includes(name)) {
              return { ...prev, beneficiaries: current.filter(n => n !== name) };
          } else {
              return { ...prev, beneficiaries: [...current, name] };
          }
      });
  };

  const handleMoveSpotToItinerary = (e: React.MouseEvent, spot: BackupSpot) => {
      e.stopPropagation();
      const newItem: ItineraryItem = {
          id: Date.now(),
          date: currentDate,
          time: '10:00',
          title: spot.title,
          location: spot.location || '從更多發現加入',
          category: spot.category,
          note: spot.note,
          images: spot.images
      };
      setItinerary(prev => [...prev, newItem]);
      setActiveTab('itinerary');
      alert(`已將「${spot.title}」加入 ${currentDate} 行程！`);
  };

  const openGoogleMap = (e: React.MouseEvent, item: ItineraryItem) => {
      e.stopPropagation();
      const query = encodeURIComponent(`${item.title} ${item.location}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // Utility Handlers
  const togglePackingItem = (id: number) => {
      setPackingList(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const deletePackingItem = (id: number) => {
      setPackingList(prev => prev.filter(i => i.id !== id));
  };

  const addPackingItem = () => {
      if (!newItemText.trim()) return;
      setPackingList(prev => [...prev, {
          id: Date.now(),
          category: '自訂',
          text: newItemText,
          checked: false
      }]);
      setNewItemText('');
  };

  const playTTS = (text: string, lang: string) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      window.speechSynthesis.speak(u);
  };

  const handleStartListening = (lang: 'zh' | 'vi') => {
      // Browser compatibility check
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
          alert("抱歉，您的手機或瀏覽器不支援語音辨識功能。\n請嘗試使用 Chrome 或 Safari 瀏覽器。");
          return;
      }
      
      try {
          const recognition = new SpeechRecognition();
          recognition.lang = lang === 'zh' ? 'zh-TW' : 'vi-VN';
          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.onstart = () => {
              setIsTranslating(true);
              setSpeechText('聆聽中...');
          };

          recognition.onresult = async (event: any) => {
              const transcript = event.results[0][0].transcript;
              setSpeechText(transcript);
              const result = await translateText(transcript, lang);
              setTranslation(result);
              setIsTranslating(false);
          };

          recognition.onerror = (event: any) => {
              console.error("Speech error", event);
              setIsTranslating(false);
              setSpeechText('辨識失敗');
              alert(`語音辨識錯誤: ${event.error || '未知錯誤'}\n請確保已授權麥克風權限。`);
          };

          recognition.onend = () => {
              // If stopped without result, reset state
              if (speechText === '聆聽中...') {
                  setIsTranslating(false);
                  setSpeechText('');
              }
          };

          recognition.start();
      } catch (err) {
          alert("啟動語音辨識時發生錯誤。請確認您的麥克風權限。");
      }
  };
  
  const handleSaveNote = () => {
      if(!currentUser) return;
      if(!noteContent.trim()) return;
      
      const newNote: Note = {
          id: Date.now(),
          date: noteDate,
          content: noteContent,
          timestamp: Date.now()
      };
      
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem(`hanoi_notes_${currentUser}`, JSON.stringify(updatedNotes));
      setNoteContent('');
      alert('筆記已儲存');
  };
  
  const handleDeleteNote = (id: number) => {
      if(!currentUser) return;
      if(window.confirm('確定刪除此筆記?')) {
          const updatedNotes = notes.filter(n => n.id !== id);
          setNotes(updatedNotes);
          localStorage.setItem(`hanoi_notes_${currentUser}`, JSON.stringify(updatedNotes));
      }
  };

  const handleSpotClick = (spot: BackupSpot) => {
     setSelectedSpot(spot);
  };

  const handleLogout = () => {
      setCurrentUser(null);
      setShowUserMenu(false);
  };

  const handleSwitchUser = () => {
      setCurrentUser(null);
      setShowUserMenu(false);
      setShowLoginModal(true);
  };

  const handleEnterApp = () => {
      setShowLanding(false);
  };

  // Helper styles
  const getCategoryColor = (cat: CategoryType) => {
      const colors: Record<string, string> = {
          sightseeing: 'border-l-amber-400',
          transport: 'border-l-blue-400',
          flight: 'border-l-purple-400',
          food: 'border-l-rose-400',
          shopping: 'border-l-emerald-400',
          accommodation: 'border-l-indigo-400'
      };
      return colors[cat] || 'border-l-slate-400';
  };

  const getWeatherIcon = (w?: string) => {
      if(w === 'rainy') return 'fas fa-umbrella';
      if(w === 'cloudy') return 'fas fa-cloud';
      return 'fas fa-sun';
  };

  // LANDING PAGE
  if (showLanding) {
      return (
          <div className="h-full w-full bg-primary flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1555663784-06f743df0328?q=80&w=800')] bg-cover bg-center opacity-20"></div>
              <div className="z-10 text-center text-white p-6 space-y-6 animate-scale-up">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl mb-4">
                      <span className="text-5xl">🇻🇳</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-wide drop-shadow-md">古城記憶</h1>
                  <p className="text-xl text-teal-100 font-light">北越河內．下龍灣．安子山</p>
                  <p className="text-sm text-teal-200/80 mt-2">蛋蛋全家旅遊 2024-2025</p>
                  
                  <button 
                      onClick={handleEnterApp}
                      className="mt-8 bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform active:scale-95"
                  >
                      開始旅程 <i className="fas fa-arrow-right ml-2"></i>
                  </button>
              </div>
              <div className="absolute bottom-6 text-white/40 text-xs">Designed for Mobile Experience</div>
          </div>
      );
  }

  return (
    <div className="h-full flex flex-col max-w-md mx-auto bg-white shadow-2xl relative">
        
        {/* Header */}
        {activeTab !== 'utility' && activeTab !== 'expenses' && activeTab !== 'backup' && (
            <header className="bg-primary text-white pt-safe-top pb-2 px-4 rounded-b-3xl shadow-lg z-20 flex-shrink-0 relative">
                <div className="flex justify-between items-center mb-4 pt-2">
                    <div>
                        <h1 className="text-xl font-bold tracking-wide">古城記憶－北越河內之旅 🇻🇳</h1>
                        <p className="text-teal-200 text-sm mt-1 font-medium">蛋蛋全家旅遊 <span className="mx-1">|</span> <i className="fas fa-map-marker-alt mr-1"></i>Hanoi, Vietnam</p>
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => currentUser ? setShowUserMenu(!showUserMenu) : setShowLoginModal(true)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${currentUser ? 'bg-amber-400 text-primary font-bold w-10 h-10 flex items-center justify-center' : 'bg-white/20 hover:bg-white/30'}`}
                        >
                        {currentUser ? currentUser.slice(-1) : <i className="fas fa-user-circle text-2xl"></i>}
                        </button>
                        {showUserMenu && currentUser && (
                            <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl py-2 w-32 z-50 animate-scale-up text-slate-800">
                                <button onClick={handleSwitchUser} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold"><i className="fas fa-exchange-alt mr-2"></i>切換使用者</button>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold text-red-500"><i className="fas fa-sign-out-alt mr-2"></i>登出</button>
                            </div>
                        )}
                    </div>
                </div>
                {activeTab === 'itinerary' && (
                    <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                        {days.map((day) => (
                            <div 
                                key={day.date}
                                onClick={() => setCurrentDate(day.date)}
                                className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-2xl transition-all duration-300 cursor-pointer border-2 ${currentDate === day.date ? 'bg-white text-primary border-white transform scale-105 shadow-md' : 'bg-primary/50 border-transparent text-teal-100 hover:bg-primary/70'}`}
                            >
                                <span className="text-xs font-medium">{day.week}</span>
                                <span className="text-lg font-bold">{day.day}</span>
                            </div>
                        ))}
                        <div onClick={handleAddDay} className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-2xl border-2 border-dashed border-teal-300 text-teal-200 cursor-pointer hover:bg-white/10">
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>
                )}
            </header>
        )}

        {/* Alternative Simple Header for Non-Itinerary Tabs */}
        {(activeTab === 'utility' || activeTab === 'expenses' || activeTab === 'backup') && (
            <div className="bg-white p-4 pb-2 pt-safe-top flex justify-between items-center z-20 border-b border-slate-100">
                 <h2 className="text-2xl font-bold text-primary truncate max-w-[70%] pt-2">
                    {activeTab === 'utility' && (utilityView === 'menu' ? '實用工具 🛠️' : (utilityView === 'currency' ? '匯率換算' : (utilityView === 'packing' ? '行李清單' : (utilityView === 'translator' ? '語音翻譯／常用會話' : (utilityView === 'emergency' ? '緊急聯絡' : (utilityView === 'offline' ? '離線地圖' : '個人筆記'))))))}
                    {activeTab === 'expenses' && '我的錢包 💰'}
                    {activeTab === 'backup' && '更多發現 🌟'}
                 </h2>
                 <div className="relative pt-2">
                    <button 
                        onClick={() => currentUser ? setShowUserMenu(!showUserMenu) : setShowLoginModal(true)}
                        className={`p-2 rounded-full transition-all ${currentUser ? 'bg-amber-400 text-primary font-bold w-10 h-10 flex items-center justify-center' : 'bg-slate-100 text-slate-400'}`}
                    >
                    {currentUser ? currentUser.slice(-1) : <i className="fas fa-user-circle text-2xl"></i>}
                    </button>
                    {showUserMenu && currentUser && (
                        <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl py-2 w-32 z-50 animate-scale-up text-slate-800 border border-slate-100">
                            <button onClick={handleSwitchUser} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold"><i className="fas fa-exchange-alt mr-2"></i>切換使用者</button>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold text-red-500"><i className="fas fa-sign-out-alt mr-2"></i>登出</button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 relative no-scrollbar">
            
            {/* ITINERARY VIEW */}
            {activeTab === 'itinerary' && (
                <div className="p-4 space-y-4 pb-24">
                    <div className="bg-gradient-to-r from-teal-50 to-white border-l-4 border-primary p-3 rounded-r-xl shadow-sm mb-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">Day {dayNumber}</span>
                                <h2 className="text-lg font-bold text-slate-800 leading-tight">
                                    {DAY_SUBTITLES[dayNumber] || '自由探索'}
                                </h2>
                            </div>
                            {currentDayInfo && (
                                <div className="flex items-center bg-teal-100/50 px-3 py-1.5 rounded-lg text-primary">
                                    <i className={`${getWeatherIcon(currentDayInfo.weather)} text-2xl mr-2`}></i>
                                    <span className="font-bold text-lg">{currentDayInfo.temp}°</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {filteredItinerary.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                            <i className="fas fa-clipboard-list text-4xl mb-3 opacity-30"></i>
                            <p>今天還沒有安排行程喔！</p>
                            <button onClick={handleAddItem} className="mt-4 text-primary font-bold text-sm">立即新增</button>
                        </div>
                    )}

                    {filteredItinerary.map(item => (
                        <div key={item.id} className={`bg-white rounded-2xl p-3 card-shadow relative group border-l-4 ${getCategoryColor(item.category)}`}>
                            <button onClick={() => handleDeleteItem(item.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-2 z-10">
                                <i className="fas fa-times"></i>
                            </button>

                            <div className="flex items-start cursor-pointer" onClick={() => handleEditItem(item)}>
                                <div className="flex flex-col items-center mr-3 min-w-[45px] pt-1">
                                    <span className="text-base font-bold text-slate-800 leading-none">{item.time}</span>
                                    <div className="h-8 w-0.5 bg-slate-200 my-1 rounded-full"></div>
                                    <i className={`${CATEGORIES.find(c => c.value === item.category)?.icon} text-slate-400 text-xs`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start pr-6">
                                        <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-xs text-slate-500 flex items-center font-medium truncate max-w-[60%]">
                                            <i className="fas fa-map-marker-alt text-[10px] mr-1 opacity-70"></i> {item.location}
                                        </p>
                                        
                                        <div className="flex items-center space-x-2">
                                            {item.duration && (
                                                <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-1 rounded-full font-bold border border-purple-100 flex items-center whitespace-nowrap">
                                                    <i className="fas fa-clock mr-1"></i>{item.duration}
                                                </span>
                                            )}
                                            <button 
                                                onClick={(e) => openGoogleMap(e, item)}
                                                className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold hover:bg-blue-100 flex items-center shadow-sm border border-blue-100 whitespace-nowrap"
                                            >
                                                <i className="fas fa-map-marked-alt mr-1"></i> 地圖
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-2 flex gap-3">
                                        {item.images && item.images.length > 0 && (
                                            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 shadow-sm border border-slate-100 relative">
                                                <img src={item.images[0]} className="w-full h-full object-cover" alt="spot" />
                                                {item.images.length > 1 && (
                                                    <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[9px] px-1 rounded-tl-md">
                                                        +{item.images.length - 1}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {item.note && (
                                            <div 
                                                onClick={(e) => { e.stopPropagation(); setSelectedSpot(item); }}
                                                className="flex-1 bg-amber-50 border border-amber-100 p-2 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors"
                                            >
                                                <p className="text-xs text-amber-800 line-clamp-3 whitespace-pre-line">{item.note}</p>
                                                <div className="text-[10px] text-amber-600 font-bold text-right mt-1 flex items-center justify-end">
                                                    <i className="fas fa-sparkles text-amber-500 mr-1 animate-pulse"></i> 詳細介紹 <i className="fas fa-chevron-right ml-1"></i>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="h-12"></div>
                </div>
            )}

            {/* EXPENSES VIEW */}
            {activeTab === 'expenses' && (
                <div className="p-4 pb-24 h-full flex flex-col">
                    
                    {/* Summary Card */}
                    <div className="bg-gradient-to-br from-primary to-teal-600 text-white rounded-3xl p-6 shadow-xl mb-6 flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/10 rounded-full -ml-8 -mb-8 blur-xl"></div>
                        
                        <p className="text-teal-200 text-xs font-bold tracking-wider uppercase mb-2">
                            {currentUser ? 'My Personal Share' : 'Total Group Expenses'}
                        </p>
                        <h3 className="text-4xl font-extrabold mb-1 tracking-tight">
                            <span className="text-2xl align-top mr-1 opacity-80">NT$</span>
                            {displayExpenseTWD.toLocaleString()}
                        </h3>
                        <p className="text-xs text-teal-100 opacity-70 mt-1">
                            {currentUser ? `個人分攤支出 (已登入: ${currentUser})` : '全體總支出 (請登入查看個人分攤)'}
                        </p>
                    </div>

                    {/* Expense List */}
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 px-1">
                        {expenses.length === 0 && (
                            <div className="text-center text-slate-400 py-10 text-xs">目前沒有消費紀錄</div>
                        )}
                        {expenses.map((exp) => (
                            <div key={exp.id} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-50 relative group">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-3">
                                        <i className={`${EXPENSE_CATEGORIES.find(c => c.value === exp.category)?.icon || 'fas fa-receipt'} text-sm`}></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{exp.item}</p>
                                        <p className="text-[10px] text-slate-400">{exp.payer} 付款 • {exp.beneficiaries.length} 人均分</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-800 text-base">{exp.amount.toLocaleString()} <span className="text-[10px] text-slate-400">{exp.currency}</span></p>
                                    {exp.currency !== 'TWD' && (
                                        <p className="text-[10px] text-teal-600 font-medium">≈ NT$ {Math.round(exp.amount * EXCHANGE_RATES[exp.currency]).toLocaleString()}</p>
                                    )}
                                </div>
                                
                                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {currentUser === exp.payer && (
                                        <>
                                            <button 
                                                onClick={() => handleEditExpense(exp)} 
                                                className="bg-slate-200 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-slate-300"
                                            >
                                                <i className="fas fa-pencil-alt text-xs"></i>
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteExpense(exp.id)} 
                                                className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
                                            >
                                                <i className="fas fa-times text-xs"></i>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Debt Settlement Section (Net Balance) */}
                        {expenses.length > 0 && (
                             <div className="mt-6 pt-4 border-t border-slate-100">
                                <h3 className="font-bold text-slate-700 mb-3 text-sm">分帳狀態 (淨餘額)</h3>
                                <div className="space-y-2">
                                    {debtSettlement.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-lg text-slate-600">
                                            <span className="font-bold text-slate-800">{item.name}</span>
                                            <span className={`font-bold ${item.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {item.amount >= 0 ? '+' : ''}{item.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        )}
                        
                        <div className="h-16"></div>
                    </div>
                </div>
            )}

            {/* UTILITY VIEW (SUB-MENU STYLE) */}
            {activeTab === 'utility' && (
                <div className="h-full flex flex-col p-4 bg-slate-50">
                    {utilityView === 'menu' && (
                        <div className="grid grid-cols-2 gap-4 mt-4 pb-24">
                             <button onClick={() => setUtilityView('currency')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2 hover:bg-amber-50 transition-colors group aspect-square">
                                <div className="w-14 h-14 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    <i className="fas fa-coins"></i>
                                </div>
                                <h3 className="font-bold text-base text-slate-800">匯率換算</h3>
                             </button>

                             <button onClick={() => setUtilityView('packing')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 transition-colors group aspect-square">
                                <div className="w-14 h-14 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    <i className="fas fa-suitcase"></i>
                                </div>
                                <h3 className="font-bold text-base text-slate-800">行李清單</h3>
                             </button>

                             <button onClick={() => setUtilityView('translator')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2 hover:bg-rose-50 transition-colors group aspect-square">
                                <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    <i className="fas fa-microphone"></i>
                                </div>
                                <h3 className="font-bold text-base text-slate-800">語音翻譯／常用會話</h3>
                             </button>

                             <button onClick={() => setUtilityView('emergency')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2 hover:bg-red-50 transition-colors group aspect-square">
                                <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    <i className="fas fa-first-aid"></i>
                                </div>
                                <h3 className="font-bold text-base text-slate-800">緊急聯絡</h3>
                             </button>
                             
                             <button onClick={() => setUtilityView('offline')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition-colors group aspect-square">
                                <div className="w-14 h-14 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    <i className="fas fa-map"></i>
                                </div>
                                <h3 className="font-bold text-base text-slate-800">離線地圖</h3>
                             </button>

                             <button onClick={() => setUtilityView('notes')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 transition-colors group aspect-square">
                                <div className="w-14 h-14 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    <i className="fas fa-book"></i>
                                </div>
                                <h3 className="font-bold text-base text-slate-800">個人筆記</h3>
                             </button>
                        </div>
                    )}

                    {utilityView !== 'menu' && (
                        <div className="flex flex-col h-full animate-slide-up pb-24">
                             <button onClick={() => setUtilityView('menu')} className="self-start mb-4 text-slate-500 font-bold text-sm flex items-center hover:text-primary bg-white px-4 py-2 rounded-full shadow-sm"><i className="fas fa-arrow-left mr-2"></i>返回選單</button>
                             
                             {/* Currency Converter */}
                             {utilityView === 'currency' && (
                                <section className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <input 
                                            type="number" 
                                            value={currencyAmount}
                                            onChange={(e) => setCurrencyAmount(e.target.value)}
                                            className="w-1/3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xl font-bold outline-none focus:border-primary text-center"
                                        />
                                        <select 
                                            value={currencyFrom} 
                                            onChange={(e) => setCurrencyFrom(e.target.value)}
                                            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold outline-none"
                                        >
                                            {CURRENCY_OPTIONS.map(opt => <option key={opt.code} value={opt.code}>{opt.code}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex justify-center text-slate-300 my-2 text-xl"><i className="fas fa-arrow-down"></i></div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-1/3 p-3 bg-teal-50 border border-teal-100 rounded-xl text-xl font-bold text-teal-700 flex items-center justify-center">
                                            {convertedCurrency}
                                        </div>
                                        <select 
                                            value={currencyTo} 
                                            onChange={(e) => setCurrencyTo(e.target.value)}
                                            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold outline-none"
                                        >
                                            {CURRENCY_OPTIONS.map(opt => <option key={opt.code} value={opt.code}>{opt.code}</option>)}
                                        </select>
                                    </div>
                                </section>
                             )}

                             {/* Packing List */}
                             {utilityView === 'packing' && (
                                <section className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100 flex-1 flex flex-col overflow-hidden">
                                     <div className="flex space-x-2 mb-4">
                                        <input 
                                            value={newItemText} 
                                            onChange={e => setNewItemText(e.target.value)} 
                                            placeholder="新增項目..." 
                                            className="flex-1 px-3 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-400"
                                        />
                                        <button onClick={addPackingItem} className="bg-blue-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md"><i className="fas fa-plus"></i></button>
                                     </div>
                                     <div className="space-y-4 overflow-y-auto no-scrollbar flex-1 pr-1 pb-4">
                                         {Object.entries(groupedPackingList).map(([cat, items]) => (
                                             <div key={cat}>
                                                 <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider bg-slate-50 inline-block px-2 py-1 rounded">{cat}</h4>
                                                 <div className="space-y-2">
                                                     {items.map(item => (
                                                         <div key={item.id} className="flex items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-transparent hover:border-blue-100">
                                                             <input 
                                                                type="checkbox" 
                                                                checked={item.checked} 
                                                                onChange={() => togglePackingItem(item.id)}
                                                                className="w-5 h-5 accent-blue-500 mr-3 rounded cursor-pointer flex-shrink-0"
                                                             />
                                                             <span className={`text-sm font-medium flex-1 ${item.checked ? 'line-through text-slate-400' : 'text-slate-700'}`}>{item.text}</span>
                                                             <button onClick={() => deletePackingItem(item.id)} className="text-slate-300 hover:text-red-400 px-2"><i className="fas fa-times"></i></button>
                                                         </div>
                                                     ))}
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                </section>
                             )}

                             {/* Translator */}
                             {utilityView === 'translator' && (
                                <section className="flex flex-col space-y-4 h-full overflow-y-auto no-scrollbar">
                                    <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 text-center flex-shrink-0">
                                        <p className="text-slate-400 text-xs mb-2">按住按鈕說話，AI 自動翻譯</p>
                                        <div className="flex justify-center space-x-4">
                                            <button 
                                                onClick={() => handleStartListening('zh')}
                                                disabled={isTranslating}
                                                className="bg-blue-100 text-blue-600 w-32 py-4 rounded-2xl flex flex-col items-center justify-center hover:bg-blue-200 transition-colors disabled:opacity-50"
                                            >
                                                <i className={`fas fa-microphone text-2xl mb-1 ${isTranslating ? 'animate-pulse' : ''}`}></i>
                                                <span className="font-bold text-sm">我說中文</span>
                                            </button>
                                            <button 
                                                onClick={() => handleStartListening('vi')}
                                                disabled={isTranslating}
                                                className="bg-rose-100 text-rose-600 w-32 py-4 rounded-2xl flex flex-col items-center justify-center hover:bg-rose-200 transition-colors disabled:opacity-50"
                                            >
                                                <i className={`fas fa-microphone text-2xl mb-1 ${isTranslating ? 'animate-pulse' : ''}`}></i>
                                                <span className="font-bold text-sm">對方說越文</span>
                                            </button>
                                        </div>
                                    </div>

                                    {(speechText || isTranslating) && (
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center min-h-[3rem] flex items-center justify-center flex-shrink-0">
                                            <p className="text-slate-600 font-medium">{speechText}</p>
                                        </div>
                                    )}

                                    {translation && !isTranslating && (
                                        <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100 space-y-4 flex-shrink-0">
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold mb-1">中文</p>
                                                <div className="flex justify-between items-start">
                                                    <p className="text-lg font-bold text-slate-800">{translation.zh}</p>
                                                    <button onClick={() => playTTS(translation.zh, 'zh-TW')} className="text-blue-500 p-1"><i className="fas fa-volume-up"></i></button>
                                                </div>
                                            </div>
                                            <div className="border-t border-slate-100 pt-3">
                                                <p className="text-xs text-slate-400 font-bold mb-1">Tiếng Việt (越南文)</p>
                                                <div className="flex justify-between items-start">
                                                    <p className="text-lg font-bold text-primary">{translation.vi}</p>
                                                    <button onClick={() => playTTS(translation.vi, 'vi-VN')} className="text-primary p-1"><i className="fas fa-volume-up"></i></button>
                                                </div>
                                            </div>
                                            <div className="border-t border-slate-100 pt-3">
                                                <p className="text-xs text-slate-400 font-bold mb-1">English</p>
                                                <div className="flex justify-between items-start">
                                                    <p className="text-base text-slate-600">{translation.en}</p>
                                                    <button onClick={() => playTTS(translation.en, 'en-US')} className="text-slate-400 p-1"><i className="fas fa-volume-up"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex-1">
                                        <h4 className="font-bold text-slate-700 mb-3 text-sm">常用會話 (點擊發音)</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            {USEFUL_PHRASES.map(phrase => (
                                                <div key={phrase.id} onClick={() => playTTS(phrase.vi, 'vi-VN')} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-transparent hover:border-primary/20 transition-all">
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">{phrase.zh}</p>
                                                        <p className="text-xs text-slate-500 mt-0.5">{phrase.vi}</p>
                                                        <p className="text-[10px] text-teal-600">{phrase.pronunciation}</p>
                                                    </div>
                                                    <i className="fas fa-volume-up text-primary/50"></i>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                             )}

                             {/* Emergency */}
                             {utilityView === 'emergency' && (
                                <section className="space-y-3">
                                    {EMERGENCY_CONTACTS.map((contact, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                            <h4 className="font-bold text-slate-800 text-lg mb-1">{contact.title}</h4>
                                            <div className="flex items-center text-red-500 font-bold text-xl mb-1">
                                                <i className="fas fa-phone-alt mr-2"></i>
                                                <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                                            </div>
                                            {contact.address && <p className="text-xs text-slate-500 mt-1"><i className="fas fa-map-marker-alt mr-1"></i>{contact.address}</p>}
                                            {contact.note && <p className="text-xs text-slate-400 mt-1">{contact.note}</p>}
                                        </div>
                                    ))}
                                </section>
                             )}

                             {/* Offline Maps Info */}
                             {utilityView === 'offline' && (
                                <section className="space-y-4 h-full flex flex-col">
                                    <div className="flex space-x-2 mb-2">
                                        <button 
                                            onClick={() => setOfflineMapRegion('hanoi')}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${offlineMapRegion === 'hanoi' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-500 border-slate-200'}`}
                                        >
                                            河內
                                        </button>
                                        <button 
                                            onClick={() => setOfflineMapRegion('halong')}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${offlineMapRegion === 'halong' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-500 border-slate-200'}`}
                                        >
                                            下龍灣
                                        </button>
                                        <button 
                                            onClick={() => setOfflineMapRegion('yentu')}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${offlineMapRegion === 'yentu' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-500 border-slate-200'}`}
                                        >
                                            安子山
                                        </button>
                                    </div>
                                    
                                    <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
                                        <img 
                                            src={OFFLINE_MAP_IMAGES[offlineMapRegion]} 
                                            className="w-full h-full object-contain bg-slate-100" 
                                            alt={`${offlineMapRegion} offline map`} 
                                        />
                                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                            <i className="fas fa-search-plus mr-1"></i> 可截圖保存
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-emerald-800 text-sm">
                                        <h4 className="font-bold mb-2 flex items-center"><i className="fas fa-info-circle mr-2"></i>重要地點 (可複製)</h4>
                                        <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
                                            {itinerary.map((item) => (
                                                <div key={item.id} className="border-b border-emerald-100/50 pb-2 last:border-0">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-bold text-xs text-emerald-900">{item.title}</p>
                                                        <button 
                                                            onClick={() => navigator.clipboard.writeText(item.location)}
                                                            className="text-[10px] text-blue-500 bg-white px-2 py-0.5 rounded border border-emerald-100"
                                                        >
                                                            複製
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] text-emerald-700 mt-0.5">{item.location}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                             )}

                             {/* Personal Notes */}
                             {utilityView === 'notes' && (
                                <section className="flex flex-col h-full">
                                    {!currentUser ? (
                                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
                                            <i className="fas fa-lock text-4xl opacity-30"></i>
                                            <p>請先登入以使用個人筆記功能</p>
                                            <button onClick={() => setShowLoginModal(true)} className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-md">登入</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-bold text-slate-700">寫日記</h4>
                                                    <input 
                                                        type="date" 
                                                        value={noteDate}
                                                        onChange={(e) => setNoteDate(e.target.value)}
                                                        className="text-xs bg-slate-50 p-1 rounded border border-slate-200"
                                                    />
                                                </div>
                                                <textarea 
                                                    value={noteContent}
                                                    onChange={(e) => setNoteContent(e.target.value)}
                                                    placeholder="今天發生了什麼趣事..." 
                                                    className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-purple-400 text-sm h-24 mb-2"
                                                ></textarea>
                                                <button onClick={handleSaveNote} className="w-full bg-purple-500 text-white py-2 rounded-xl font-bold text-sm shadow hover:bg-purple-600 transition-colors">儲存筆記</button>
                                            </div>

                                            <div className="flex-1 overflow-y-auto space-y-3 pb-24">
                                                {notes.length === 0 && <p className="text-center text-slate-400 text-xs py-4">還沒有筆記，寫下第一篇吧！</p>}
                                                {notes.map(note => (
                                                    <div key={note.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 relative group">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-1 rounded">{note.date}</span>
                                                            <button onClick={() => handleDeleteNote(note.id)} className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><i className="fas fa-trash"></i></button>
                                                        </div>
                                                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </section>
                             )}
                        </div>
                    )}
                </div>
            )}

            {/* BACKUP VIEW (MORE) */}
            {activeTab === 'backup' && (
                <div className="p-4 pb-24">
                    <div className="flex justify-between items-end mb-4">
                        <p className="text-slate-500 text-xs mt-1">口袋名單、雨天備案、必吃美食</p>
                        <button onClick={handleAddBackupSpot} className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-teal-700 flex items-center">
                            <i className="fas fa-plus mr-1"></i> 新增私房景點
                        </button>
                    </div>
                    
                    <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar">
                        {(['all', 'food', 'sightseeing', 'shopping'] as const).map(tab => (
                            <button key={tab} onClick={() => setMoreTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border ${moreTab === tab ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200'}`}>
                                {tab === 'all' ? '全部' : (tab === 'food' ? '美食 🍜' : (tab === 'sightseeing' ? '景點 📸' : '購物 🛍️'))}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filteredBackupSpots.map(spot => (
                            <div key={spot.id} onClick={() => handleSpotClick(spot)} className="bg-white rounded-xl overflow-hidden shadow-sm flex h-28 border border-slate-100 cursor-pointer hover:shadow-md transition-shadow">
                                <div className="w-28 bg-slate-200 flex-shrink-0 relative">
                                    <img src={spot.images?.[0] || `https://picsum.photos/200/200?random=${spot.id}`} className="w-full h-full object-cover" alt={spot.title} />
                                </div>
                                <div className="p-3 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{spot.title}</h3>
                                            <div className="flex space-x-1">
                                                {spot.category === 'food' && spot.subType && (
                                                    <span className="text-[10px] bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded whitespace-nowrap">{spot.subType}</span>
                                                )}
                                                {spot.rating && (
                                                    <span className="text-[10px] bg-amber-50 text-amber-500 px-1.5 py-0.5 rounded whitespace-nowrap font-bold"><i className="fas fa-star mr-0.5"></i>{spot.rating}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 whitespace-nowrap">{CATEGORIES.find(c => c.value === spot.category)?.label}</span>
                                            {spot.priceLevel && (
                                                <span className="text-[10px] text-teal-600 font-bold">{spot.priceLevel}</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{spot.note}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={(e) => handleMoveSpotToItinerary(e, spot)} className="text-xs bg-slate-50 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors font-bold border border-slate-200">
                                            <i className="fas fa-plus mr-1"></i>加入行程
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>

        {/* Floating Action Buttons (FAB) for Itinerary */}
        {activeTab === 'itinerary' && (
            <div className="absolute bottom-24 right-4 z-30 flex flex-col items-center space-y-3">
                <button onClick={() => setShowChatModal(true)} className="bg-white text-primary w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform border border-teal-100 relative">
                    <i className="fas fa-robot"></i>
                    <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full animate-ping"></span>
                </button>
                <button onClick={handleAddItem} className="bg-secondary text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform">
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        )}

        {/* Floating Action Button (FAB) for Expenses */}
        {activeTab === 'expenses' && (
             <div className="absolute bottom-24 right-4 z-30">
                 <button 
                    onClick={handleOpenExpenseModal} 
                    className="bg-primary text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform"
                >
                    <i className="fas fa-plus"></i>
                 </button>
             </div>
        )}

        {/* Bottom Nav */}
        <nav className="bg-white h-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] flex justify-around items-center px-2 z-40 rounded-t-3xl absolute bottom-0 w-full max-w-md pb-safe-bottom">
            {[
                { id: 'itinerary', label: '行程', icon: 'fas fa-calendar-alt' },
                { id: 'expenses', label: '記帳', icon: 'fas fa-wallet' },
                { id: 'utility', label: '實用', icon: 'fas fa-tools' },
                { id: 'backup', label: '更多', icon: 'fas fa-compass' }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)} 
                    className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === tab.id ? 'text-primary bg-teal-50 w-20' : 'text-slate-400 w-16'}`}
                >
                    <i className={`${tab.icon} text-xl mb-1`}></i>
                    <span className="text-[10px] font-bold">{tab.label}</span>
                </button>
            ))}
        </nav>

        {/* Modals */}
        <ItineraryModal 
            isOpen={showItineraryModal} 
            onClose={() => setShowItineraryModal(false)}
            onSave={handleSaveItinerary}
            editItem={editItem}
            days={days}
            currentDate={currentDate}
            isBackup={isBackupMode}
        />

        {showLoginModal && (
            <LoginModal 
                onClose={() => setShowLoginModal(false)}
                onLogin={(name) => setCurrentUser(name)}
            />
        )}

        {selectedSpot && (
            <DetailModal 
                item={selectedSpot} 
                onClose={() => setSelectedSpot(undefined)} 
            />
        )}

        {showChatModal && (
            <ChatModal 
                onClose={() => setShowChatModal(false)}
                itinerary={itinerary}
            />
        )}

        {/* Expense Modal Overlay */}
        {showExpenseModal && (
             <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 pt-safe-top">
                 <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-5 animate-scale-up">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-700 text-lg">{editExpenseId ? '修改' : '新增'}消費 ({currentUser})</h4>
                        <button onClick={() => setShowExpenseModal(false)} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times text-lg"></i></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <input value={newExpense.item} onChange={(e) => setNewExpense({...newExpense, item: e.target.value})} placeholder="項目名稱" className="col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary font-bold" />
                        <input value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} type="number" placeholder="金額" className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                        <select value={newExpense.currency} onChange={(e) => setNewExpense({...newExpense, currency: e.target.value as any})} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary">
                            <option value="VND">VND</option>
                            <option value="TWD">TWD</option>
                            <option value="USD">USD</option>
                        </select>
                        <select value={newExpense.category} onChange={(e) => setNewExpense({...newExpense, category: e.target.value as any})} className="col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary">
                            {EXPENSE_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center space-x-2 text-sm font-bold text-slate-600 mb-2">
                            <input type="checkbox" checked={newExpense.isSplit} onChange={e => setNewExpense({...newExpense, isSplit: e.target.checked})} className="accent-primary w-4 h-4" />
                            <span>是否均分?</span>
                        </label>
                        {newExpense.isSplit && (
                            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                {USERS.map(u => (
                                    <div key={u.name} 
                                        onClick={() => handleToggleBeneficiary(u.name)}
                                        className={`text-xs p-2 rounded-lg text-center cursor-pointer border transition-colors ${newExpense.beneficiaries.includes(u.name) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-slate-400 border-slate-200'}`}
                                    >
                                        {u.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={handleSaveExpense} className="w-full bg-primary text-white py-3 rounded-xl text-base font-bold shadow-md active:scale-95 transition-transform">
                        確認{editExpenseId ? '更新' : '新增'}
                    </button>
                 </div>
             </div>
        )}
    </div>
  );
};

export default App;
