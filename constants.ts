import { DayInfo, ItineraryItem, Expense, BackupSpot, PackingItem, Phrase, User, EmergencyContact } from "./types";

export const USERS: User[] = [
    { name: '曾國瑜', pass: '19910618' },
    { name: '王亞稘', pass: '19951129' },
    { name: '王采羚', pass: '20021128' },
    { name: '魏美絹', pass: '19660124' },
    { name: '何俊輝', pass: '19740823' },
    { name: '王宥騰', pass: '19941104' }
];

export const CATEGORIES = [
    { value: 'sightseeing', label: '景點', icon: 'fas fa-camera' },
    { value: 'food', label: '美食', icon: 'fas fa-utensils' },
    { value: 'shopping', label: '購物', icon: 'fas fa-shopping-bag' },
    { value: 'transport', label: '交通', icon: 'fas fa-bus' },
    { value: 'accommodation', label: '住宿', icon: 'fas fa-bed' },
    { value: 'flight', label: '航班', icon: 'fas fa-plane' },
    { value: 'other', label: '其他', icon: 'fas fa-ellipsis-h' }
];

export const EXPENSE_CATEGORIES = [
    { value: 'food', label: '美食', icon: 'fas fa-utensils' },
    { value: 'ticket', label: '票券/體驗', icon: 'fas fa-ticket-alt' },
    { value: 'shopping', label: '購物', icon: 'fas fa-shopping-bag' },
    { value: 'transport', label: '交通', icon: 'fas fa-bus' },
    { value: 'accommodation', label: '住宿', icon: 'fas fa-bed' },
    { value: 'other', label: '其他', icon: 'fas fa-ellipsis-h' },
];

export const INITIAL_DAYS: DayInfo[] = [
    { date: '2024-12-31', week: '週三', day: '31', weather: 'cloudy', temp: 18 },
    { date: '2025-01-01', week: '週四', day: '01', weather: 'sunny', temp: 21 },
    { date: '2025-01-02', week: '週五', day: '02', weather: 'cloudy', temp: 16 },
    { date: '2025-01-03', week: '週六', day: '03', weather: 'sunny', temp: 19 },
    { date: '2025-01-04', week: '週日', day: '04', weather: 'sunny', temp: 20 },
    { date: '2025-01-05', week: '週一', day: '05', weather: 'cloudy', temp: 19 },
];

export const DAY_SUBTITLES: Record<number, string> = {
    1: '抵達河內',
    2: '河內市區古蹟巡禮',
    3: '安子山禪意之旅',
    4: '下龍灣豪華遊輪',
    5: '老城區漫遊與越式體驗',
    6: '平安返台'
};

export const INITIAL_ITINERARY: ItineraryItem[] = [
    // Day 1 (12/31)
    { id: 101, date: '2024-12-31', time: '19:50', title: '抵達河內 (Arrival)', category: 'flight', location: 'Noi Bai International Airport', note: '✈️ 搭乘 VJ949 抵達河內機場。', images: ['https://image.pollinations.ai/prompt/Hanoi%20Noi%20Bai%20Airport%20modern%20terminal%20sunny?nologo=true'], transport: '接機', duration: '1小時', rating: 4.2, openTime: '24小時' },
    { id: 102, date: '2024-12-31', time: '21:00', title: '入住 Diamond Westlake Suite', category: 'accommodation', location: 'Diamond Westlake Suites', note: '🏨 辦理入住手續，休息準備明天的行程。', images: ['https://image.pollinations.ai/prompt/Diamond%20Westlake%20Suites%20Hanoi%20luxury%20hotel%20room?nologo=true'], rating: 4.6, openTime: '24小時' },

    // Day 2 (1/1)
    { id: 201, date: '2025-01-01', time: '10:00', title: '飯店出發', category: 'transport', location: 'Diamond Westlake Suites', note: '從 Diamond Westlake Suite 出發，展開市區觀光。', images: ['https://image.pollinations.ai/prompt/Hanoi%20street%20view%20morning%20sunlight?nologo=true'] },
    { id: 202, date: '2025-01-01', time: '10:15', title: '鎮國寺 (Chùa Trấn Quốc)', category: 'sightseeing', location: 'Thanh Nien, Yen Phu, Tay Ho, Hanoi', note: '🛕 預計停留30分。\n位於西湖邊的古老寺廟，求平安靈驗。', images: ['https://image.pollinations.ai/prompt/Tran%20Quoc%20Pagoda%20Hanoi%20red%20tower%20lake?nologo=true'], duration: '30分', rating: 4.5, openTime: '08:00 - 16:00', hasAiGuide: true },
    { id: 203, date: '2025-01-01', time: '10:50', title: '行經巴亭廣場', category: 'sightseeing', location: 'Ba Dinh Square', note: '🚩 行車經過不停留 (Quảng trường Ba Đình)。\n請司機開慢一點方便車上拍照。', images: ['https://image.pollinations.ai/prompt/Ba%20Dinh%20Square%20Hanoi%20Vietnam%20wide%20shot?nologo=true'], transport: '車遊', rating: 4.6, openTime: '05:00 - 22:00', hasAiGuide: true },
    { id: 204, date: '2025-01-01', time: '11:00', title: '一柱寺 (Chùa Một Cột)', category: 'sightseeing', location: 'One Pillar Pagoda, Hanoi', note: '🛕 預計停留30分。\n造型獨特的佛教古剎，是河內的象徵性建築之一。', images: ['https://image.pollinations.ai/prompt/One%20Pillar%20Pagoda%20Hanoi%20lotus%20pond?nologo=true'], duration: '30分', rating: 4.3, openTime: '07:00 - 18:00', hasAiGuide: true },
    { id: 205, date: '2025-01-01', time: '12:00', title: '午餐：Lan Ong 餐廳', category: 'food', location: 'Lan Ong Restaurant Hanoi', note: '🍽️ 預計用餐 1.5 hr。\n享用道地越式料理。', images: ['https://image.pollinations.ai/prompt/Vietnamese%20Restaurant%20interior%20cozy%20food?nologo=true'], duration: '1.5小時', rating: 4.2, openTime: '10:00 - 22:00' },
    { id: 206, date: '2025-01-01', time: '13:30', title: '國子監文廟 (Văn Miếu)', category: 'sightseeing', location: 'Temple of Literature', note: '⛩️ 預計停留30分鐘。\n參觀越南第一所大學，充滿歷史書卷氛圍，祈求學業進步。', images: ['https://image.pollinations.ai/prompt/Temple%20of%20Literature%20Hanoi%20gardens%20architecture?nologo=true'], duration: '30分', rating: 4.6, openTime: '08:00 - 17:00', hasAiGuide: true },
    { id: 207, date: '2025-01-01', time: '14:15', title: '河內大教堂', category: 'sightseeing', location: 'St. Joseph\'s Cathedral, Hanoi', note: '⛪ 參觀教堂外觀和拍照 (Nhà thờ Lớn Hà Nội)。\n河內小巴黎，哥德式建築地標。', images: ['https://image.pollinations.ai/prompt/St%20Joseph%20Cathedral%20Hanoi%20gothic%20style?nologo=true'], transport: '步行', rating: 4.5, openTime: '08:00 - 11:00, 14:00 - 17:00', hasAiGuide: true },
    { id: 208, date: '2025-01-01', time: '14:30', title: '三十六古街電瓶車巡禮', category: 'sightseeing', location: 'Hanoi Old Quarter', note: '🛺 電瓶車遊覽 120分鐘。\n輕鬆遊覽還劍湖、歌劇院及古街巷弄，感受熱鬧氣氛。', images: ['https://image.pollinations.ai/prompt/Hanoi%20Old%20Quarter%20electric%20car%20tour?nologo=true'], duration: '2小時', transport: '電瓶車', rating: 4.4, openTime: '全天開放', hasAiGuide: true },
    { id: 209, date: '2025-01-01', time: '16:30', title: '還劍湖畔 彈性時間', category: 'food', location: 'Hoan Kiem Lake', note: '☕ 預計停留 30min。\n在還劍湖附近找個咖啡廳休息、喝蛋咖啡或隨意小逛。', images: ['https://image.pollinations.ai/prompt/Hoan%20Kiem%20Lake%20Turtle%20Tower%20scenic?nologo=true'], duration: '30分', rating: 4.7, openTime: '全天開放' },
    { id: 210, date: '2025-01-01', time: '18:00', title: '樂天西湖 Mall', category: 'shopping', location: 'Lotte Mall West Lake Hanoi', note: '🛍️ 抵達 Lotte Mall West Lake，晚餐與購物行程。', images: ['https://image.pollinations.ai/prompt/Lotte%20Mall%20West%20Lake%20Hanoi%20modern%20building?nologo=true'], rating: 4.5, openTime: '09:30 - 22:00' },

    // Day 3 (1/2)
    { id: 301, date: '2025-01-02', time: '08:30', title: '前往安子山', category: 'transport', location: 'Diamond Westlake Suites', note: '🚌 從飯店啟程前往安子山 (Yen Tu)。\n預計車程時間: 3小時 (包車)。', images: ['https://image.pollinations.ai/prompt/Bus%20traveling%20to%20mountain%20Vietnam?nologo=true'], transport: '包車', duration: '3小時' },
    { id: 302, date: '2025-01-02', time: '11:30', title: '抵達 Legacy Yên Tử', category: 'accommodation', location: 'Legacy Yen Tu - MGallery', note: '🏨 抵達飯店，放置行李與稍作休息。\n預計停留 0.5 小時。', images: ['https://image.pollinations.ai/prompt/Legacy%20Yen%20Tu%20MGallery%20Hotel%20ancient%20style?nologo=true'], rating: 4.8, openTime: '24小時' },
    { id: 303, date: '2025-01-02', time: '12:00', title: '午餐：Tunglam Yên Tử', category: 'food', location: 'Nhà hàng Tùng Lâm', note: '🍽️ 用餐時間為 1.5 小時。', images: ['https://image.pollinations.ai/prompt/Vietnamese%20mountain%20restaurant%20food?nologo=true'], duration: '1.5小時', rating: 4.0, openTime: '10:00 - 21:00' },
    { id: 304, date: '2025-01-02', time: '13:30', title: '纜車第一線 (上行)', category: 'transport', location: 'Yen Tu Cable Car Station', note: '🚠 Hoàng Đàn (山腳) 至 Hoa Yên (華嚴)。\n含排隊與搭乘時間。', images: ['https://image.pollinations.ai/prompt/Cable%20car%20Yen%20Tu%20Mountain%20misty?nologo=true'], rating: 4.6, openTime: '05:00 - 20:00' },
    { id: 305, date: '2025-01-02', time: '14:00', title: '華嚴寺 (Chùa Hoa Yên)', category: 'sightseeing', location: 'Chùa Hoa Yên', note: '🛕 預計停留 15分鐘。\n參觀竹林派重要寺廟，這裡風景優美，可以俯瞰山谷。', images: ['https://image.pollinations.ai/prompt/Hoa%20Yen%20Pagoda%20Yen%20Tu%20ancient%20temple?nologo=true'], rating: 4.6, openTime: '06:00 - 18:00', hasAiGuide: true },
    { id: 306, date: '2025-01-02', time: '14:30', title: '獨頂寺', category: 'sightseeing', location: 'Chùa Một Mái', note: '🛕 預計停留 15分鐘。', images: ['https://image.pollinations.ai/prompt/Mot%20Mai%20Pagoda%20cliffside%20temple?nologo=true'], rating: 4.5, openTime: '06:00 - 18:00', hasAiGuide: true },
    { id: 307, date: '2025-01-02', time: '14:45', title: '纜車第二線 (上行)', category: 'transport', location: 'Ga Cáp Treo Một Mái', note: '🚠 Một Mái 至 An Kỳ Sinh/終點。', images: ['https://image.pollinations.ai/prompt/Cable%20car%20view%20clouds%20mountain?nologo=true'] },
    { id: 308, date: '2025-01-02', time: '15:15', title: '陳仁宗佛像', category: 'sightseeing', location: 'Tượng Phật Hoàng Trần Nhân Tông', note: '🙏 預計停留 10分鐘。\n近距離參觀陳仁宗皇帝的巨型佛像 (Tượng Phật Hoàng)。', images: ['https://image.pollinations.ai/prompt/Tran%20Nhan%20Tong%20Buddha%20statue%20gold?nologo=true'], rating: 4.7, openTime: '24小時', hasAiGuide: true },
    { id: 309, date: '2025-01-02', time: '15:45', title: '銅寺 (Chùa Đồng)', category: 'sightseeing', location: 'Chùa Đồng Yên Tử', note: '⛰️ 這是最費體力的路段。\n感受最高處的寧靜與莊嚴，並欣賞壯闊景觀。請放慢腳步，慢慢來。', images: ['https://image.pollinations.ai/prompt/Dong%20Pagoda%20Yen%20Tu%20bronze%20temple%20peak?nologo=true'], rating: 4.8, openTime: '05:00 - 17:00', hasAiGuide: true },
    { id: 310, date: '2025-01-02', time: '16:30', title: '纜車下行', category: 'transport', location: 'Yen Tu Mountain', note: '🚠 第二線 + 第一線 連續搭乘下山。', images: ['https://image.pollinations.ai/prompt/Cable%20car%20going%20down%20mountain?nologo=true'] },
    { id: 311, date: '2025-01-02', time: '17:15', title: '返回飯店入住', category: 'accommodation', location: 'Legacy Yen Tu - MGallery', note: '步行回飯店正式辦理入住手續。', images: ['https://image.pollinations.ai/prompt/Legacy%20Yen%20Tu%20Resort%20evening%20lights?nologo=true'], rating: 4.8, openTime: '24小時' },
    { id: 312, date: '2025-01-02', time: '18:30', title: '晚餐：Thọ Quang 餐廳', category: 'food', location: 'Thọ Quang Restaurant', note: '🍽️ 飯店內主要餐廳，提供國際美食和越南傳統菜餚，充滿禪意氛圍。', images: ['https://image.pollinations.ai/prompt/Fine%20dining%20restaurant%20vietnamese%20food?nologo=true'], rating: 4.5, openTime: '06:00 - 22:00' },
    { id: 313, date: '2025-01-02', time: '21:00', title: '自由活動', category: 'sightseeing', location: 'Legacy Yen Tu - MGallery', note: '🌙 晚餐後，可以在 Legacy Yên Tử 的靜心環境中散步，或在 Thien Quan Lounge 享受一杯茶或飲品。', images: ['https://image.pollinations.ai/prompt/Peaceful%20resort%20night%20walk%20lanterns?nologo=true'] },

    // Day 4 (1/3)
    { id: 400, date: '2025-01-03', time: '08:30', title: '出發前往下龍灣', category: 'transport', location: 'Legacy Yen Tu - MGallery', note: '搭車前往巡洲碼頭，車程約3小時。', transport: '包車', duration: '3小時', images: ['https://image.pollinations.ai/prompt/Travel%20van%20vietnam%20road?nologo=true'] },
    { id: 401, date: '2025-01-03', time: '11:30', title: '抵達巡洲碼頭', category: 'transport', location: 'Tuan Chau International Marina', note: '🚢 抵達 Tuan Chau harbor，準備登船。', images: ['https://image.pollinations.ai/prompt/Tuan%20Chau%20Marina%20ships%20harbor?nologo=true'], rating: 4.3, openTime: '24小時' },
    { id: 402, date: '2025-01-03', time: '12:00', title: '搭乘快艇至 Diana Cruise', category: 'transport', location: 'Ha Long Bay', note: '🚤 辦理登船手續，轉搭快艇前往大船。', images: ['https://image.pollinations.ai/prompt/Speedboat%20transfer%20Ha%20Long%20Bay?nologo=true'] },
    { id: 403, date: '2025-01-03', time: '12:30', title: '迎賓與入住', category: 'accommodation', location: 'Diana Cruises', note: '🍹 享用迎賓飲品、聽取安全簡報並辦理入住手續。', images: ['https://image.pollinations.ai/prompt/Diana%20Cruises%20welcome%20drink%20luxury?nologo=true'], rating: 4.8, openTime: '24小時' },
    { id: 404, date: '2025-01-03', time: '13:00', title: '遊輪午餐', category: 'food', location: 'Diana Cruises', note: '🍽️ 享用越式海鮮自助餐或套餐，同時遊覽下龍灣壯麗的岩石構造。', images: ['https://image.pollinations.ai/prompt/Seafood%20buffet%20on%20cruise%20ship?nologo=true'] },
    { id: 405, date: '2025-01-03', time: '13:30', title: '遊覽航行', category: 'sightseeing', location: 'Lan Ha Bay', note: '🚢 繼續航行，經過 Con Vit Islet、Thumb Islet 和 Cat Ba 地區的 Gia Luan Harbor。', images: ['https://image.pollinations.ai/prompt/Lan%20Ha%20Bay%20islets%20scenery?nologo=true'], duration: '1.5小時', rating: 4.9, openTime: '24小時', hasAiGuide: true },
    { id: 406, date: '2025-01-03', time: '15:00', title: '戶外活動 (明暗洞)', category: 'sightseeing', location: 'Dark & Bright Cave', note: '🛶 駛向 Dark & Bright Cave。\n參加獨木舟（Kayaking）或搭乘竹筏（Bamboo Boat）活動。', images: ['https://image.pollinations.ai/prompt/Kayaking%20Ha%20Long%20Bay%20cave?nologo=true'], duration: '1小時', rating: 4.7, openTime: '08:00 - 17:00', hasAiGuide: true },
    { id: 407, date: '2025-01-03', time: '16:00', title: '游泳與休閒', category: 'sightseeing', location: 'Tra Bau', note: '🏊 遊輪駛向 Tra Bau Beach，停泊後可自由環繞遊輪游泳 45 分鐘。', images: ['https://image.pollinations.ai/prompt/Swimming%20in%20Lan%20Ha%20Bay%20beach?nologo=true'], duration: '1.5小時', rating: 4.6, openTime: '24小時' },
    { id: 408, date: '2025-01-03', time: '17:30', title: '日落下午茶', category: 'food', location: 'Diana Cruises Sun Deck', note: '🌅 享用下午茶派對（免費新鮮點心、水果），欣賞蘭哈灣日落。可利用 Happy Hours 飲品優惠。', images: ['https://image.pollinations.ai/prompt/Sunset%20party%20cruise%20deck%20cocktails?nologo=true'] },
    { id: 409, date: '2025-01-03', time: '18:30', title: '越式烹飪課', category: 'sightseeing', location: 'Diana Cruises Restaurant', note: '👨‍🍳 參加由遊輪主廚指導的烹飪課，學習製作越南傳統菜餚（如春捲）。', images: ['https://image.pollinations.ai/prompt/Cooking%20class%20spring%20rolls%20cruise?nologo=true'] },
    { id: 410, date: '2025-01-03', time: '19:10', title: '遊輪晚餐', category: 'food', location: 'Diana Cruises Restaurant', note: '🍽️ 在四樓餐廳享用晚餐。', images: ['https://image.pollinations.ai/prompt/Dinner%20table%20cruise%20restaurant?nologo=true'] },
    { id: 411, date: '2025-01-03', time: '20:30', title: '晚間自由活動', category: 'sightseeing', location: 'Diana Cruises', note: '🎣 晚餐後可參加夜釣小管（一樓）、聽音樂、享用飲品或在五樓的特別房間唱卡拉 OK（需預約）。', images: ['https://image.pollinations.ai/prompt/Night%20squid%20fishing%20cruise?nologo=true'] },

    // Day 5 (1/4)
    { id: 501, date: '2025-01-04', time: '06:30', title: '太極拳', category: 'sightseeing', location: 'Diana Cruises Sun Deck', note: '🧘 (自選) 在五樓甲板上進行太極拳，迎接新的一天。', images: ['https://image.pollinations.ai/prompt/Tai%20Chi%20morning%20cruise%20deck?nologo=true'] },
    { id: 502, date: '2025-01-04', time: '07:00', title: '遊輪早餐', category: 'food', location: 'Diana Cruises', note: '☕ 享用早餐，同時欣賞蘭哈灣早晨的景色。', images: ['https://image.pollinations.ai/prompt/Breakfast%20cruise%20view%20morning?nologo=true'] },
    { id: 503, date: '2025-01-04', time: '08:00', title: '觀光 Frog Pond', category: 'sightseeing', location: 'Frog Pond Area', note: '🎬 遊輪駛過 Frog Pond area 觀光，此處為好萊塢電影《金剛》（King Kong）的拍攝地。', images: ['https://image.pollinations.ai/prompt/Frog%20Pond%20Ha%20Long%20Bay%20movie%20scene?nologo=true'], rating: 4.5, openTime: '24小時', hasAiGuide: true },
    { id: 504, date: '2025-01-04', time: '09:30', title: '退房', category: 'transport', location: 'Diana Cruises', note: '🧳 回到客艙整理行李，放鬆並完成退房手續。', images: ['https://image.pollinations.ai/prompt/Packing%20luggage%20hotel%20room?nologo=true'] },
    { id: 505, date: '2025-01-04', time: '10:00', title: '自助午餐', category: 'food', location: 'Diana Cruises', note: '🍽️ 1小時自助午餐，同時遊輪駛向碼頭。', images: ['https://image.pollinations.ai/prompt/Lunch%20buffet%20cruise%20restaurant?nologo=true'] },
    { id: 506, date: '2025-01-04', time: '11:00', title: '告別遊輪', category: 'transport', location: 'Tuan Chau International Marina', note: '👋 轉搭接駁船返回巡洲碼頭（Tuan Chau pier）。', images: ['https://image.pollinations.ai/prompt/Waving%20goodbye%20cruise%20ship?nologo=true'] },
    { id: 507, date: '2025-01-04', time: '12:00', title: '搭車返回河內', category: 'transport', location: 'Tuan Chau Marina', note: '🚌 搭乘豪華轎車（Limousine）返回河內。', images: ['https://image.pollinations.ai/prompt/Luxury%20limousine%20bus%20interior?nologo=true'] },
    { id: 508, date: '2025-01-04', time: '13:50', title: '中途休息', category: 'transport', location: 'Hai Duong Province', note: '🚽 在海陽省（Hai Duong）停留 15 分鐘休息。', images: ['https://image.pollinations.ai/prompt/Rest%20stop%20Vietnam%20travel?nologo=true'] },
    { id: 509, date: '2025-01-04', time: '15:00', title: '抵達河內市區', category: 'transport', location: 'Hanoi', note: '🏙️ 抵達河內市區。', images: ['https://image.pollinations.ai/prompt/Hanoi%20busy%20street%20afternoon?nologo=true'] },
    { id: 510, date: '2025-01-04', time: '15:30', title: '入住 Wil\'que 西湖酒店', category: 'accommodation', location: 'Wil\'que Westlake Hotel', note: '🏨 辦理入住手續。', images: ['https://image.pollinations.ai/prompt/Wilque%20Westlake%20Hotel%20Hanoi?nologo=true'], rating: 4.4, openTime: '24小時' },
    { id: 511, date: '2025-01-04', time: '17:30', title: '老城區漫遊、按摩', category: 'sightseeing', location: 'Hanoi Old Quarter', note: '💆‍♀️ 老城區自由漫步，體驗越式按摩放鬆身心。', images: ['https://image.pollinations.ai/prompt/Spa%20massage%20Vietnam%20relax?nologo=true'], rating: 4.5, openTime: '08:00 - 23:00' },

    // Day 6 (1/5)
    { id: 601, date: '2025-01-05', time: '09:30', title: '前往機場', category: 'transport', location: 'Noi Bai International Airport', note: '🧳 收拾行李，準備前往內排機場。', images: ['https://image.pollinations.ai/prompt/Airport%20departure%20hall%20Vietnam?nologo=true'] },
    { id: 602, date: '2025-01-05', time: '13:30', title: '起飛返台', category: 'flight', location: 'Noi Bai International Airport', note: '✈️ 搭機起飛，返回溫暖的家 (台中)。', images: ['https://image.pollinations.ai/prompt/Airplane%20taking%20off%20sunset?nologo=true'] },
];

export const INITIAL_EXPENSES: Expense[] = [
    {
        id: 1,
        item: '河內來回機票',
        amount: 24219,
        currency: 'TWD',
        category: 'transport',
        payer: '王采羚',
        beneficiaries: ['王采羚', '魏美絹'],
        date: '2024-12-30T10:00:00Z'
    },
    {
        id: 2,
        item: 'Legacy Yen Tu 住宿',
        amount: 478,
        currency: 'USD',
        category: 'accommodation',
        payer: '王宥騰',
        beneficiaries: ['曾國瑜', '王亞稘', '王采羚', '魏美絹', '何俊輝', '王宥騰'],
        date: '2025-01-02T15:00:00Z'
    }
];

export const BACKUP_SPOTS: BackupSpot[] = [
    // FOOD
    { id: 4, title: 'Pho 10 Ly Quoc Su', note: '河內最知名的河粉店之一，湯頭鮮甜，半生熟牛肉必點。', category: 'food', location: '10 Ly Quoc Su', images: ['https://image.pollinations.ai/prompt/Pho%20beef%20noodle%20soup%20delicious?nologo=true'], subType: '餐廳', priceLevel: '均消 60k', rating: 4.4, openTime: '06:00 - 22:00', hasAiGuide: true },
    { id: 5, title: 'Bun Cha Huong Lien', note: '歐巴馬也吃過的烤肉米線，炭火香氣十足。', category: 'food', location: 'Bun Cha Huong Lien', images: ['https://image.pollinations.ai/prompt/Bun%20Cha%20grilled%20pork%20noodles?nologo=true'], subType: '小吃', priceLevel: '均消 100k', rating: 4.2, openTime: '08:00 - 20:30', hasAiGuide: true },
    { id: 6, title: 'Giang Café 蛋咖啡', note: '發源地本店，口感像提拉米蘇般綿密的獨特咖啡。', category: 'food', location: 'Giang Café', images: ['https://image.pollinations.ai/prompt/Egg%20coffee%20Hanoi%20creamy?nologo=true'], subType: '咖啡廳', priceLevel: '均消 35k', rating: 4.5, openTime: '07:00 - 22:00' },
    { id: 11, title: 'Tam Vi', note: '米其林一星，提供精緻的越南家庭料理，環境復古優雅。', category: 'food', location: '4B Yen The, Hanoi', images: ['https://image.pollinations.ai/prompt/Tam%20Vi%20restaurant%20Hanoi%20interior?nologo=true'], subType: '餐廳', priceLevel: '均消 400k', rating: 4.6, openTime: '11:00 - 14:00, 17:00 - 22:00' },
    { id: 12, title: 'Duong\'s Restaurant', note: 'Top Chef 參賽主廚開設，精緻越南料理，適合慶祝晚餐。', category: 'food', location: '27 Ngo Huyen, Hanoi', images: ['https://image.pollinations.ai/prompt/Fine%20dining%20plating%20vietnamese?nologo=true'], subType: '餐廳', priceLevel: '均消 600k', rating: 4.8, openTime: '11:00 - 22:00' },
    { id: 13, title: 'Banh Mi 25', note: '古街人氣最高的法國麵包店，皮脆餡多。', category: 'food', location: '25 Hang Ca, Hanoi', images: ['https://image.pollinations.ai/prompt/Banh%20Mi%20sandwich%20street%20food?nologo=true'], subType: '小吃', priceLevel: '均消 40k', rating: 4.5, openTime: '07:00 - 21:00' },
    { id: 14, title: 'Cha Ca Thang Long', note: '必吃鱧魚鍋，使用薑黃醃製魚肉，香氣四溢。', category: 'food', location: '6B Duong Thanh, Hanoi', images: ['https://image.pollinations.ai/prompt/Cha%20Ca%20fish%20turmeric%20pan?nologo=true'], subType: '餐廳', priceLevel: '均消 200k', rating: 4.3, openTime: '10:00 - 22:00' },
    { id: 15, title: 'Pizza 4P\'s', note: '越南超人氣日義混血披薩，自製起司非常有名。', category: 'food', location: 'Hanoi', images: ['https://image.pollinations.ai/prompt/Pizza%204Ps%20burrata%20cheese%20pizza?nologo=true'], subType: '餐廳', priceLevel: '均消 400k', rating: 4.8, openTime: '11:00 - 22:30' },
    { id: 16, title: 'Xoi Yen', note: '非常有名的糯米飯專賣店，配料豐富(綠豆泥、雞肉絲等)。', category: 'food', location: '35B Nguyen Huu Huan', images: ['https://image.pollinations.ai/prompt/Xoi%20Yen%20sticky%20rice%20bowl?nologo=true'], subType: '小吃', priceLevel: '均消 50k', rating: 4.1, openTime: '06:00 - 23:30' },
    { id: 17, title: 'Met Vietnamese Restaurant', note: '評價極高的越式餐廳，菜色多樣且服務親切。', category: 'food', location: 'Hanoi Old Quarter', images: ['https://image.pollinations.ai/prompt/Met%20Vietnamese%20Restaurant%20food%20spread?nologo=true'], subType: '餐廳', priceLevel: '均消 250k', rating: 4.7, openTime: '10:00 - 22:00' },

    // SIGHTSEEING
    { id: 1, title: '火車街咖啡', note: '在鐵軌旁喝咖啡，注意火車經過時間，非常驚險刺激的體驗。', category: 'sightseeing', location: 'Hanoi Train Street', images: ['https://image.pollinations.ai/prompt/Hanoi%20Train%20Street%20coffee%20shops?nologo=true'], rating: 4.3, openTime: '08:00 - 22:00', hasAiGuide: true },
    { id: 2, title: '昇龍水上木偶劇院', note: '越南最具代表性的傳統藝術表演，建議提前買票。', category: 'sightseeing', location: 'Thang Long Water Puppet Theatre', images: ['https://image.pollinations.ai/prompt/Water%20puppet%20show%20Hanoi?nologo=true'], rating: 4.4, openTime: '演出時間詳見官網', hasAiGuide: true },
    { id: 3, title: '聖約瑟夫大教堂', note: '河內小巴黎，仿巴黎聖母院的哥德式建築。', category: 'sightseeing', location: 'St. Joseph\'s Cathedral', images: ['https://image.pollinations.ai/prompt/St%20Joseph%20Cathedral%20Hanoi%20front?nologo=true'], rating: 4.5, openTime: '08:00 - 11:00, 14:00 - 17:00', hasAiGuide: true },
    { id: 21, title: '昇龍皇城', note: '世界文化遺產，見證越南歷代皇朝的歷史遺跡。', category: 'sightseeing', location: 'Imperial Citadel of Thang Long', images: ['https://image.pollinations.ai/prompt/Imperial%20Citadel%20Thang%20Long%20gate?nologo=true'], rating: 4.4, openTime: '08:00 - 17:00', hasAiGuide: true },
    { id: 22, title: '火爐監獄', note: '曾關押美軍戰俘，保留許多歷史文物，氣氛莊嚴。', category: 'sightseeing', location: 'Hoa Lo Prison', images: ['https://image.pollinations.ai/prompt/Hoa%20Lo%20Prison%20museum%20entrance?nologo=true'], rating: 4.6, openTime: '08:00 - 17:00', hasAiGuide: true },
    { id: 23, title: '越南民族學博物館', note: '介紹越南54個民族的文化與建築，戶外展區很有趣。', category: 'sightseeing', location: 'Vietnam Museum of Ethnology', images: ['https://image.pollinations.ai/prompt/Vietnam%20Museum%20of%20Ethnology%20stilt%20house?nologo=true'], rating: 4.7, openTime: '08:30 - 17:30 (週一休)', hasAiGuide: true },
    { id: 24, title: '胡志明陵寢', note: '越南國父胡志明的長眠之地，需注意穿著與開放時間。', category: 'sightseeing', location: 'Ho Chi Minh Mausoleum', images: ['https://image.pollinations.ai/prompt/Ho%20Chi%20Minh%20Mausoleum%20guards?nologo=true'], rating: 4.5, openTime: '07:30 - 10:30 (週一五休)', hasAiGuide: true },
    { id: 25, title: '龍編橋', note: '橫跨紅河的百年鐵橋，由巴黎鐵塔設計師設計，適合看夕陽。', category: 'sightseeing', location: 'Long Bien Bridge', images: ['https://image.pollinations.ai/prompt/Long%20Bien%20Bridge%20sunset%20rusty?nologo=true'], rating: 4.6, openTime: '24小時', hasAiGuide: true },
    { id: 26, title: '河內歌劇院', note: '法國殖民時期的建築代表，金黃色外觀非常華麗。', category: 'sightseeing', location: 'Hanoi Opera House', images: ['https://image.pollinations.ai/prompt/Hanoi%20Opera%20House%20night%20lights?nologo=true'], rating: 4.7, openTime: '視演出時間而定', hasAiGuide: true },
    { id: 27, title: '鎮武觀', note: '河內著名的道教寺廟，供奉玄天上帝，有一尊巨大銅像。', category: 'sightseeing', location: 'Quan Thanh Temple', images: ['https://image.pollinations.ai/prompt/Quan%20Thanh%20Temple%20gate%20ancient?nologo=true'], rating: 4.4, openTime: '08:00 - 17:00', hasAiGuide: true },

    // SHOPPING
    { id: 7, title: '同春市場', note: '大型室內批發市場，買腰果、果乾、紡織品的好去處。', category: 'shopping', location: 'Dong Xuan Market', images: ['https://image.pollinations.ai/prompt/Dong%20Xuan%20Market%20busy%20shopping?nologo=true'], rating: 3.9, openTime: '06:00 - 18:00', hasAiGuide: true },
    { id: 8, title: 'Aeon Mall Long Bien', note: '日系大型購物中心，環境舒適，離市區稍遠。', category: 'shopping', location: 'Aeon Mall Long Bien', images: ['https://image.pollinations.ai/prompt/Aeon%20Mall%20Long%20Bien%20atrium?nologo=true'], rating: 4.6, openTime: '10:00 - 22:00' },
    { id: 31, title: 'Lotte Center', note: '集結百貨、飯店、觀景台於一身，可俯瞰河內夜景。', category: 'shopping', location: 'Lotte Center Hanoi', images: ['https://image.pollinations.ai/prompt/Lotte%20Center%20Hanoi%20skyscraper?nologo=true'], rating: 4.5, openTime: '09:30 - 22:00' },
    { id: 32, title: 'Trang Tien Plaza', note: '河內最古老的高級百貨公司，位於還劍湖旁，品牌眾多。', category: 'shopping', location: 'Trang Tien Plaza', images: ['https://image.pollinations.ai/prompt/Trang%20Tien%20Plaza%20luxury%20shopping?nologo=true'], rating: 4.4, openTime: '09:30 - 21:30' },
    { id: 33, title: 'Hang Gai (絲綢街)', note: '專賣絲綢製品、奧黛(Ao Dai)定製，品質較好。', category: 'shopping', location: 'Hang Gai Street', images: ['https://image.pollinations.ai/prompt/Hang%20Gai%20street%20silk%20shops?nologo=true'], rating: 4.2, openTime: '08:00 - 20:00' },
    { id: 34, title: 'Hang Ma (祭祀/裝飾街)', note: '販賣各種節慶裝飾品，色彩繽紛，拍照非常好看。', category: 'shopping', location: 'Hang Ma Street', images: ['https://image.pollinations.ai/prompt/Hang%20Ma%20street%20lanterns%20colorful?nologo=true'], rating: 4.5, openTime: '08:00 - 21:00' },
    { id: 35, title: 'Intimex Supermarket', note: '位於還劍湖旁，價格實惠，適合購買咖啡、腰果等伴手禮。', category: 'shopping', location: 'Intimex Supermarket', images: ['https://image.pollinations.ai/prompt/Intimex%20supermarket%20shelves%20coffee?nologo=true'], rating: 4.1, openTime: '07:00 - 22:00' },
    { id: 36, title: '週末夜市', note: '週五至週日晚間限定，從還劍湖延伸至同春市場，熱鬧非凡。', category: 'shopping', location: 'Hanoi Weekend Night Market', images: ['https://image.pollinations.ai/prompt/Hanoi%20Night%20Market%20crowd%20food?nologo=true'], rating: 4.3, openTime: '週五至週日 18:00 - 23:00' },
    { id: 37, title: 'Bat Trang 陶瓷村', note: '離市區約30分車程，可體驗手拉胚，購買精美陶瓷。', category: 'shopping', location: 'Bat Trang Ceramic Village', images: ['https://image.pollinations.ai/prompt/Bat%20Trang%20ceramic%20pottery%20making?nologo=true'], rating: 4.4, openTime: '08:00 - 17:30', hasAiGuide: true },
    { id: 38, title: 'Collective Memory', note: '有質感的選物店，販賣獨特且具設計感的越南紀念品。', category: 'shopping', location: 'Nha Chung Street', images: ['https://image.pollinations.ai/prompt/Boutique%20gift%20shop%20Hanoi%20interior?nologo=true'], rating: 4.7, openTime: '09:00 - 20:00' },
];

export const EXCHANGE_RATES: Record<string, number> = { 
    // Base currency is TWD = 1
    TWD: 1, 
    VND: 0.00128, // 1000 VND approx 1.28 TWD (1 TWD = 780 VND)
    USD: 32.5, // 1 USD approx 32.5 TWD
    JPY: 0.22,
    KRW: 0.024,
    EUR: 35.5
};

export const CURRENCY_OPTIONS = [
    { code: 'VND', label: '越南盾' },
    { code: 'TWD', label: '台幣' },
    { code: 'USD', label: '美金' },
    { code: 'JPY', label: '日幣' },
    { code: 'KRW', label: '韓元' },
    { code: 'EUR', label: '歐元' },
];

export const INITIAL_PACKING_LIST: PackingItem[] = [
    { id: 1, category: '文件/財物', text: '護照 (含簽證)', checked: false },
    { id: 2, category: '文件/財物', text: '機票/訂房憑證', checked: false },
    { id: 3, category: '文件/財物', text: '網卡/漫遊', checked: false },
    { id: 4, category: '文件/財物', text: '現金 (VND/USD)', checked: false },
    { id: 5, category: '衣物/穿搭', text: '輕便衣物', checked: false },
    { id: 6, category: '衣物/穿搭', text: '薄外套 (冷氣房)', checked: false },
    { id: 7, category: '衣物/穿搭', text: '好走的鞋', checked: false },
    { id: 8, category: '個人/藥品', text: '常備藥 (感冒/腸胃)', checked: false },
    { id: 9, category: '個人/藥品', text: '防蚊液', checked: false },
    { id: 10, category: '個人/藥品', text: '防曬用品', checked: false },
    { id: 11, category: '電器/其他', text: '充電器/行動電源', checked: false },
    { id: 12, category: '電器/其他', text: '萬用轉接頭 (越南220V)', checked: false },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
    { title: '報警電話', phone: '113', note: '越南當地報警電話' },
    { title: '火警電話', phone: '114', note: '越南當地火警電話' },
    { title: '急救電話', phone: '115', note: '越南當地急救電話' },
    { title: '駐越南台北經濟文化辦事處', phone: '+84-913-219-986', address: '20A, P. Phạm Thuật Duật, Dịch Vọng Hậu, Cầu Giấy, Hà Nội', note: '急難救助電話 (24小時專人接聽)' },
    { title: '旅外國人急難救助全球免付費專線', phone: '800-0885-0885', note: '需由當地國際電話冠碼撥打' },
];

export const OFFLINE_MAP_IMAGES = {
    hanoi: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hanoi_city_map.png', // Placeholder, ideally a clear schematic map
    halong: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Halong_Bay_Map.jpg/800px-Halong_Bay_Map.jpg',
    yentu: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800' // Placeholder for Yen Tu
};

export const USEFUL_PHRASES: Phrase[] = [
    { id: 1, zh: '你好', vi: 'Xin chào', pronunciation: '馨 照' },
    { id: 2, zh: '謝謝', vi: 'Cảm ơn', pronunciation: '感恩' },
    { id: 3, zh: '對不起', vi: 'Xin lỗi', pronunciation: '馨 蘿伊' },
    { id: 4, zh: '多少錢？', vi: 'Bao nhiêu tiền?', pronunciation: '包 紐 甸?' },
    { id: 5, zh: '太貴了', vi: 'Đắt quá', pronunciation: '搭 瓜' },
    { id: 6, zh: '廁所在哪裡？', vi: 'Nhà vệ sinh ở đâu?', pronunciation: '拿 衛 馨 鵝 兜?' },
    { id: 7, zh: '買單', vi: 'Tính tiền', pronunciation: '丁 甸' },
    { id: 8, zh: '不要辣', vi: 'Không cay', pronunciation: '空 開' },
    { id: 9, zh: '香菜', vi: 'Rau mùi', pronunciation: '饒 母伊' },
    { id: 10, zh: '水', vi: 'Nước', pronunciation: '努 餓' },
    { id: 11, zh: '牛肉河粉', vi: 'Phở Bò', pronunciation: '佛 伯' },
    { id: 12, zh: '雞肉河粉', vi: 'Phở Gà', pronunciation: '佛 嘎' },
];