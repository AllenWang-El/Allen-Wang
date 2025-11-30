

import { DayInfo, ItineraryItem, Expense, BackupSpot, PackingItem, Phrase, User, EmergencyContact } from "./types";

export const USERS: User[] = [
    { name: '曾國瑜', pass: '19910618' },
    { name: '王亞稘', pass: '19951129' },
    { name: '王采羚', pass: '20021128' },
    { name: '魏美絹', pass: '19660124' },
    { name: '何俊輝', pass: '19740823' },
    { name: '王宥騰', pass: '19941104' }
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
    { id: 101, date: '2024-12-31', time: '19:50', title: '抵達河內 (Arrival)', category: 'flight', location: 'Noi Bai International Airport', note: '✈️ 搭乘 VJ949 抵達河內機場。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Noibai_International_Airport_Terminal_2.jpg/800px-Noibai_International_Airport_Terminal_2.jpg'], transport: '接機', duration: '1小時', rating: 4.2, openTime: '24小時' },
    { id: 102, date: '2024-12-31', time: '21:00', title: '入住 Diamond Westlake Suite', category: 'accommodation', location: 'Diamond Westlake Suites', note: '🏨 辦理入住手續，休息準備明天的行程。', images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800'], rating: 4.6, openTime: '24小時' },

    // Day 2 (1/1)
    { id: 201, date: '2025-01-01', time: '10:00', title: '飯店出發', category: 'transport', location: 'Diamond Westlake Suites', note: '從 Diamond Westlake Suite 出發，展開市區觀光。', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800'] },
    { id: 202, date: '2025-01-01', time: '10:15', title: '鎮國寺 (Chùa Trấn Quốc)', category: 'sightseeing', location: 'Thanh Nien, Yen Phu, Tay Ho, Hanoi', note: '🛕 預計停留30分。\n位於西湖邊的古老寺廟，求平安靈驗。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Ch%C3%B9a_Tr%E1%BA%A5n_Qu%E1%BB%91c_-_H%E1%BB%93_T%C3%A2y_-_H%C3%A0_N%E1%BB%99i.jpg/800px-Ch%C3%B9a_Tr%E1%BA%A5n_Qu%E1%BB%91c_-_H%E1%BB%93_T%C3%A2y_-_H%C3%A0_N%E1%BB%99i.jpg'], duration: '30分', rating: 4.5, openTime: '08:00 - 16:00' },
    { id: 203, date: '2025-01-01', time: '10:50', title: '行經巴亭廣場', category: 'sightseeing', location: 'Ba Dinh Square', note: '🚩 行車經過不停留 (Quảng trường Ba Đình)。\n請司機開慢一點方便車上拍照。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lang_Chu_tich_Ho_Chi_Minh.jpg/800px-Lang_Chu_tich_Ho_Chi_Minh.jpg'], transport: '車遊', rating: 4.6, openTime: '05:00 - 22:00' },
    { id: 204, date: '2025-01-01', time: '11:00', title: '一柱寺 (Chùa Một Cột)', category: 'sightseeing', location: 'One Pillar Pagoda, Hanoi', note: '🛕 預計停留30分。\n造型獨特的佛教古剎，是河內的象徵性建築之一。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ch%C3%B9a_M%E1%BB%99t_C%E1%BB%99t_-_One_Pillar_Pagoda.jpg/800px-Ch%C3%B9a_M%E1%BB%99t_C%E1%BB%99t_-_One_Pillar_Pagoda.jpg'], duration: '30分', rating: 4.3, openTime: '07:00 - 18:00' },
    { id: 205, date: '2025-01-01', time: '12:00', title: '午餐：Lan Ong 餐廳', category: 'food', location: 'Lan Ong Restaurant Hanoi', note: '🍽️ 預計用餐 1.5 hr。\n享用道地越式料理。', images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800'], duration: '1.5小時', rating: 4.2, openTime: '10:00 - 22:00' },
    { id: 206, date: '2025-01-01', time: '13:30', title: '國子監文廟 (Văn Miếu)', category: 'sightseeing', location: 'Temple of Literature', note: '⛩️ 預計停留30分鐘。\n參觀越南第一所大學，充滿歷史書卷氛圍，祈求學業進步。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Khue_Van_Cac_2016.jpg/800px-Khue_Van_Cac_2016.jpg'], duration: '30分', rating: 4.6, openTime: '08:00 - 17:00' },
    { id: 207, date: '2025-01-01', time: '14:15', title: '河內大教堂', category: 'sightseeing', location: 'St. Joseph\'s Cathedral, Hanoi', note: '⛪ 參觀教堂外觀和拍照 (Nhà thờ Lớn Hà Nội)。\n河內小巴黎，哥德式建築地標。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nha_tho_lon_Ha_Noi_01.jpg/800px-Nha_tho_lon_Ha_Noi_01.jpg'], transport: '步行', rating: 4.5, openTime: '08:00 - 11:00, 14:00 - 17:00' },
    { id: 208, date: '2025-01-01', time: '14:30', title: '三十六古街電瓶車巡禮', category: 'sightseeing', location: 'Hanoi Old Quarter', note: '🛺 電瓶車遊覽 120分鐘。\n輕鬆遊覽還劍湖、歌劇院及古街巷弄，感受熱鬧氣氛。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hanoi_Old_Quarter_Night.jpg/800px-Hanoi_Old_Quarter_Night.jpg'], duration: '2小時', transport: '電瓶車', rating: 4.4, openTime: '全天開放' },
    { id: 209, date: '2025-01-01', time: '16:30', title: '還劍湖畔 彈性時間', category: 'food', location: 'Hoan Kiem Lake', note: '☕ 預計停留 30min。\n在還劍湖附近找個咖啡廳休息、喝蛋咖啡或隨意小逛。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Thap_Rua.jpg/800px-Thap_Rua.jpg'], duration: '30分', rating: 4.7, openTime: '全天開放' },
    { id: 210, date: '2025-01-01', time: '18:00', title: '樂天西湖 Mall', category: 'shopping', location: 'Lotte Mall West Lake Hanoi', note: '🛍️ 抵達 Lotte Mall West Lake，晚餐與購物行程。', images: ['https://images.unsplash.com/photo-1567449303078-57ad431deba6?q=80&w=800'], rating: 4.5, openTime: '09:30 - 22:00' },

    // Day 3 (1/2)
    { id: 301, date: '2025-01-02', time: '08:30', title: '前往安子山', category: 'transport', location: 'Diamond Westlake Suites', note: '🚌 從飯店啟程前往安子山 (Yen Tu)。\n預計車程時間: 3小時 (包車)。', images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800'], transport: '包車', duration: '3小時' },
    { id: 302, date: '2025-01-02', time: '11:30', title: '抵達 Legacy Yên Tử', category: 'accommodation', location: 'Legacy Yen Tu - MGallery', note: '🏨 抵達飯店，放置行李與稍作休息。\n預計停留 0.5 小時。', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800'], rating: 4.8, openTime: '24小時' },
    { id: 303, date: '2025-01-02', time: '12:00', title: '午餐：Tunglam Yên Tử', category: 'food', location: 'Nhà hàng Tùng Lâm', note: '🍽️ 用餐時間為 1.5 小時。', images: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800'], duration: '1.5小時', rating: 4.0, openTime: '10:00 - 21:00' },
    { id: 304, date: '2025-01-02', time: '13:30', title: '纜車第一線 (上行)', category: 'transport', location: 'Yen Tu Cable Car Station', note: '🚠 Hoàng Đàn (山腳) 至 Hoa Yên (華嚴)。\n含排隊與搭乘時間。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Cable_car_to_Yen_Tu.jpg/800px-Cable_car_to_Yen_Tu.jpg'], rating: 4.6, openTime: '05:00 - 20:00' },
    { id: 305, date: '2025-01-02', time: '14:00', title: '華嚴寺 (Chùa Hoa Yên)', category: 'sightseeing', location: 'Chùa Hoa Yên', note: '🛕 預計停留 15分鐘。\n參觀竹林派重要寺廟，這裡風景優美，可以俯瞰山谷。', images: ['https://images.unsplash.com/photo-1565060169194-1191062b0821?q=80&w=800'], rating: 4.6, openTime: '06:00 - 18:00' },
    { id: 306, date: '2025-01-02', time: '14:30', title: '獨頂寺', category: 'sightseeing', location: 'Chùa Một Mái', note: '🛕 預計停留 15分鐘。', images: ['https://images.unsplash.com/photo-1599548455436-1e0e7a468d67?q=80&w=800'], rating: 4.5, openTime: '06:00 - 18:00' },
    { id: 307, date: '2025-01-02', time: '14:45', title: '纜車第二線 (上行)', category: 'transport', location: 'Ga Cáp Treo Một Mái', note: '🚠 Một Mái 至 An Kỳ Sinh/終點。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Cable_car_to_Yen_Tu.jpg/800px-Cable_car_to_Yen_Tu.jpg'] },
    { id: 308, date: '2025-01-02', time: '15:15', title: '陳仁宗佛像', category: 'sightseeing', location: 'Tượng Phật Hoàng Trần Nhân Tông', note: '🙏 預計停留 10分鐘。\n近距離參觀陳仁宗皇帝的巨型佛像 (Tượng Phật Hoàng)。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/T%C6%B0%E1%BB%A3ng_Ph%E1%BA%ADt_Ho%C3%A0ng_Tr%E1%BA%A7n_Nh%C3%A2n_T%C3%B4ng.jpg/600px-T%C6%B0%E1%BB%A3ng_Ph%E1%BA%ADt_Ho%C3%A0ng_Tr%E1%BA%A7n_Nh%C3%A2n_T%C3%B4ng.jpg'], rating: 4.7, openTime: '24小時' },
    { id: 309, date: '2025-01-02', time: '15:45', title: '銅寺 (Chùa Đồng)', category: 'sightseeing', location: 'Chùa Đồng Yên Tử', note: '⛰️ 這是最費體力的路段。\n感受最高處的寧靜與莊嚴，並欣賞壯闊景觀。請放慢腳步，慢慢來。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ch%C3%B9a_%C4%90%E1%BB%93ng_-_Y%C3%AAn_T%E1%BB%AD_2.jpg/800px-Ch%C3%B9a_%C4%90%E1%BB%93ng_-_Y%C3%AAn_T%E1%BB%AD_2.jpg'], rating: 4.8, openTime: '05:00 - 17:00' },
    { id: 310, date: '2025-01-02', time: '16:30', title: '纜車下行', category: 'transport', location: 'Yen Tu Mountain', note: '🚠 第二線 + 第一線 連續搭乘下山。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Cable_car_to_Yen_Tu.jpg/800px-Cable_car_to_Yen_Tu.jpg'] },
    { id: 311, date: '2025-01-02', time: '17:15', title: '返回飯店入住', category: 'accommodation', location: 'Legacy Yen Tu - MGallery', note: '步行回飯店正式辦理入住手續。', images: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800'], rating: 4.8, openTime: '24小時' },
    { id: 312, date: '2025-01-02', time: '18:30', title: '晚餐：Thọ Quang 餐廳', category: 'food', location: 'Thọ Quang Restaurant', note: '🍽️ 飯店內主要餐廳，提供國際美食和越南傳統菜餚，充滿禪意氛圍。', images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800'], rating: 4.5, openTime: '06:00 - 22:00' },
    { id: 313, date: '2025-01-02', time: '21:00', title: '自由活動', category: 'sightseeing', location: 'Legacy Yen Tu - MGallery', note: '🌙 晚餐後，可以在 Legacy Yên Tử 的靜心環境中散步，或在 Thien Quan Lounge 享受一杯茶或飲品。', images: ['https://images.unsplash.com/photo-1596700055977-8c34c898687f?q=80&w=800'] },

    // Day 4 (1/3)
    { id: 401, date: '2025-01-03', time: '11:30', title: '抵達巡洲碼頭', category: 'transport', location: 'Tuan Chau International Marina', note: '🚢 抵達 Tuan Chau harbor，準備登船。', images: ['https://images.unsplash.com/photo-1628045620958-86acbd783935?q=80&w=800'], rating: 4.3, openTime: '24小時' },
    { id: 402, date: '2025-01-03', time: '12:00', title: '搭乘快艇至 Diana Cruise', category: 'transport', location: 'Ha Long Bay', note: '🚤 辦理登船手續，轉搭快艇前往大船。', images: ['https://images.unsplash.com/photo-1621535408544-b593eb429532?q=80&w=800'] },
    { id: 403, date: '2025-01-03', time: '12:30', title: '迎賓與入住', category: 'accommodation', location: 'Diana Cruises', note: '🍹 享用迎賓飲品、聽取安全簡報並辦理入住手續。', images: ['https://images.unsplash.com/photo-1583279868884-297c00e625a9?q=80&w=800'], rating: 4.8, openTime: '24小時' },
    { id: 404, date: '2025-01-03', time: '13:00', title: '遊輪午餐', category: 'food', location: 'Diana Cruises', note: '🍽️ 享用越式海鮮自助餐或套餐，同時遊覽下龍灣壯麗的岩石構造。', images: ['https://images.unsplash.com/photo-1615141982880-1315725fc27f?q=80&w=800'] },
    { id: 405, date: '2025-01-03', time: '13:30', title: '遊覽航行', category: 'sightseeing', location: 'Lan Ha Bay', note: '🚢 繼續航行，經過 Con Vit Islet、Thumb Islet 和 Cat Ba 地區的 Gia Luan Harbor。', images: ['https://images.unsplash.com/photo-1528127220108-1558304b4b3c?q=80&w=800'], duration: '1.5小時', rating: 4.9, openTime: '24小時' },
    { id: 406, date: '2025-01-03', time: '15:00', title: '戶外活動 (明暗洞)', category: 'sightseeing', location: 'Dark & Bright Cave', note: '🛶 駛向 Dark & Bright Cave。\n參加獨木舟（Kayaking）或搭乘竹筏（Bamboo Boat）活動。', images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800'], duration: '1小時', rating: 4.7, openTime: '08:00 - 17:00' },
    { id: 407, date: '2025-01-03', time: '16:00', title: '游泳與休閒', category: 'sightseeing', location: 'Tra Bau', note: '🏊 遊輪駛向 Tra Bau Beach，停泊後可自由環繞遊輪游泳 45 分鐘。', images: ['https://images.unsplash.com/photo-1585863261775-81676df47c8f?q=80&w=800'], duration: '1.5小時', rating: 4.6, openTime: '24小時' },
    { id: 408, date: '2025-01-03', time: '17:30', title: '日落下午茶', category: 'food', location: 'Diana Cruises Sun Deck', note: '🌅 享用下午茶派對（免費新鮮點心、水果），欣賞蘭哈灣日落。可利用 Happy Hours 飲品優惠。', images: ['https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=800'] },
    { id: 409, date: '2025-01-03', time: '18:30', title: '越式烹飪課', category: 'sightseeing', location: 'Diana Cruises Restaurant', note: '👨‍🍳 參加由遊輪主廚指導的烹飪課，學習製作越南傳統菜餚（如春捲）。', images: ['https://images.unsplash.com/photo-1560963689-02e0d37e3352?q=80&w=800'] },
    { id: 410, date: '2025-01-03', time: '19:10', title: '遊輪晚餐', category: 'food', location: 'Diana Cruises Restaurant', note: '🍽️ 在四樓餐廳享用晚餐。', images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800'] },
    { id: 411, date: '2025-01-03', time: '20:30', title: '晚間自由活動', category: 'sightseeing', location: 'Diana Cruises', note: '🎣 晚餐後可參加夜釣小管（一樓）、聽音樂、享用飲品或在五樓的特別房間唱卡拉 OK（需預約）。', images: ['https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=800'] },

    // Day 5 (1/4)
    { id: 501, date: '2025-01-04', time: '06:30', title: '太極拳', category: 'sightseeing', location: 'Diana Cruises Sun Deck', note: '🧘 (自選) 在五樓甲板上進行太極拳，迎接新的一天。', images: ['https://images.unsplash.com/photo-1516912330882-74b88f63564e?q=80&w=800'] },
    { id: 502, date: '2025-01-04', time: '07:00', title: '遊輪早餐', category: 'food', location: 'Diana Cruises', note: '☕ 享用早餐，同時欣賞蘭哈灣早晨的景色。', images: ['https://images.unsplash.com/photo-1525351460196-153deb8a6160?q=80&w=800'] },
    { id: 503, date: '2025-01-04', time: '08:00', title: '觀光 Frog Pond', category: 'sightseeing', location: 'Frog Pond Area', note: '🎬 遊輪駛過 Frog Pond area 觀光，此處為好萊塢電影《金剛》（King Kong）的拍攝地。', images: ['https://images.unsplash.com/photo-1598444390666-4e55e56e0176?q=80&w=800'], rating: 4.5, openTime: '24小時' },
    { id: 504, date: '2025-01-04', time: '09:30', title: '退房', category: 'transport', location: 'Diana Cruises', note: '🧳 回到客艙整理行李，放鬆並完成退房手續。', images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800'] },
    { id: 505, date: '2025-01-04', time: '10:00', title: '自助午餐', category: 'food', location: 'Diana Cruises', note: '🍽️ 1小時自助午餐，同時遊輪駛向碼頭。', images: ['https://images.unsplash.com/photo-1577303935007-0d306ee638cf?q=80&w=800'] },
    { id: 506, date: '2025-01-04', time: '11:00', title: '告別遊輪', category: 'transport', location: 'Tuan Chau International Marina', note: '👋 轉搭接駁船返回巡洲碼頭（Tuan Chau pier）。', images: ['https://images.unsplash.com/photo-1569949381669-ecf31fd74f4c?q=80&w=800'] },
    { id: 507, date: '2025-01-04', time: '12:00', title: '搭車返回河內', category: 'transport', location: 'Tuan Chau Marina', note: '🚌 搭乘豪華轎車（Limousine）返回河內。', images: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800'] },
    { id: 508, date: '2025-01-04', time: '13:50', title: '中途休息', category: 'transport', location: 'Hai Duong Province', note: '🚽 在海陽省（Hai Duong）停留 15 分鐘休息。', images: ['https://images.unsplash.com/photo-1552865942-d3527b137f7a?q=80&w=800'] },
    { id: 509, date: '2025-01-04', time: '15:00', title: '抵達河內市區', category: 'transport', location: 'Hanoi', note: '🏙️ 抵達河內市區。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Hanoi_Old_Quarter.jpg/800px-Hanoi_Old_Quarter.jpg'] },
    { id: 510, date: '2025-01-04', time: '15:30', title: '入住 Wil\'que 西湖酒店', category: 'accommodation', location: 'Wil\'que Westlake Hotel', note: '🏨 辦理入住手續。', images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800'], rating: 4.4, openTime: '24小時' },
    { id: 511, date: '2025-01-04', time: '17:30', title: '老城區漫遊、按摩', category: 'sightseeing', location: 'Hanoi Old Quarter', note: '💆‍♀️ 老城區自由漫步，體驗越式按摩放鬆身心。', images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db48c?q=80&w=800'], rating: 4.5, openTime: '08:00 - 23:00' },

    // Day 6 (1/5)
    { id: 601, date: '2025-01-05', time: '09:30', title: '前往機場', category: 'transport', location: 'Noi Bai International Airport', note: '🧳 收拾行李，準備前往內排機場。', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Noibai_International_Airport_Terminal_2.jpg/800px-Noibai_International_Airport_Terminal_2.jpg'] },
    { id: 602, date: '2025-01-05', time: '13:30', title: '起飛返台', category: 'flight', location: 'Noi Bai International Airport', note: '✈️ 搭機起飛，返回溫暖的家 (台中)。', images: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800'] },
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
    { id: 4, title: 'Pho 10 Ly Quoc Su', note: '河內最知名的河粉店之一，湯頭鮮甜，半生熟牛肉必點。', category: 'food', location: '10 Ly Quoc Su', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pho_Bo_-_Beef_Noodle_Soup.jpg/800px-Pho_Bo_-_Beef_Noodle_Soup.jpg'], subType: '餐廳', priceLevel: '均消 60k', rating: 4.4, openTime: '06:00 - 22:00' },
    { id: 5, title: 'Bun Cha Huong Lien', note: '歐巴馬也吃過的烤肉米線，炭火香氣十足。', category: 'food', location: 'Bun Cha Huong Lien', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bun_Cha.jpg/800px-Bun_Cha.jpg'], subType: '小吃', priceLevel: '均消 100k', rating: 4.2, openTime: '08:00 - 20:30' },
    { id: 6, title: 'Giang Café 蛋咖啡', note: '發源地本店，口感像提拉米蘇般綿密的獨特咖啡。', category: 'food', location: 'Giang Café', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Egg_coffee.jpg/800px-Egg_coffee.jpg'], subType: '咖啡廳', priceLevel: '均消 35k', rating: 4.5, openTime: '07:00 - 22:00' },
    { id: 11, title: 'Tam Vi', note: '米其林一星，提供精緻的越南家庭料理，環境復古優雅。', category: 'food', location: '4B Yen The, Hanoi', images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800'], subType: '餐廳', priceLevel: '均消 400k', rating: 4.6, openTime: '11:00 - 14:00, 17:00 - 22:00' },
    { id: 12, title: 'Duong\'s Restaurant', note: 'Top Chef 參賽主廚開設，精緻越南料理，適合慶祝晚餐。', category: 'food', location: '27 Ngo Huyen, Hanoi', images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800'], subType: '餐廳', priceLevel: '均消 600k', rating: 4.8, openTime: '11:00 - 22:00' },
    { id: 13, title: 'Banh Mi 25', note: '古街人氣最高的法國麵包店，皮脆餡多。', category: 'food', location: '25 Hang Ca, Hanoi', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Banh_mi_sandwich.jpg/800px-Banh_mi_sandwich.jpg'], subType: '小吃', priceLevel: '均消 40k', rating: 4.5, openTime: '07:00 - 21:00' },
    { id: 14, title: 'Cha Ca Thang Long', note: '必吃鱧魚鍋，使用薑黃醃製魚肉，香氣四溢。', category: 'food', location: '6B Duong Thanh, Hanoi', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Cha_Ca_La_Vong.jpg/800px-Cha_Ca_La_Vong.jpg'], subType: '餐廳', priceLevel: '均消 200k', rating: 4.3, openTime: '10:00 - 22:00' },
    { id: 15, title: 'Pizza 4P\'s', note: '越南超人氣日義混血披薩，自製起司非常有名。', category: 'food', location: 'Hanoi', images: ['https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800'], subType: '餐廳', priceLevel: '均消 400k', rating: 4.8, openTime: '11:00 - 22:30' },
    { id: 16, title: 'Xoi Yen', note: '非常有名的糯米飯專賣店，配料豐富(綠豆泥、雞肉絲等)。', category: 'food', location: '35B Nguyen Huu Huan', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Xoi_Ga.jpg/800px-Xoi_Ga.jpg'], subType: '小吃', priceLevel: '均消 50k', rating: 4.1, openTime: '06:00 - 23:30' },
    { id: 17, title: 'Met Vietnamese Restaurant', note: '評價極高的越式餐廳，菜色多樣且服務親切。', category: 'food', location: 'Hanoi Old Quarter', images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800'], subType: '餐廳', priceLevel: '均消 250k', rating: 4.7, openTime: '10:00 - 22:00' },

    // SIGHTSEEING
    { id: 1, title: '火車街咖啡', note: '在鐵軌旁喝咖啡，注意火車經過時間，非常驚險刺激的體驗。', category: 'sightseeing', location: 'Hanoi Train Street', images: ['https://images.unsplash.com/photo-1583492775611-30d06f1d011c?q=80&w=800'], rating: 4.3, openTime: '08:00 - 22:00' },
    { id: 2, title: '昇龍水上木偶劇院', note: '越南最具代表性的傳統藝術表演，建議提前買票。', category: 'sightseeing', location: 'Thang Long Water Puppet Theatre', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Water_puppetry_Hanoi.jpg/800px-Water_puppetry_Hanoi.jpg'], rating: 4.4, openTime: '演出時間詳見官網' },
    { id: 3, title: '聖約瑟夫大教堂', note: '河內小巴黎，仿巴黎聖母院的哥德式建築。', category: 'sightseeing', location: 'St. Joseph\'s Cathedral', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nha_tho_lon_Ha_Noi_01.jpg/800px-Nha_tho_lon_Ha_Noi_01.jpg'], rating: 4.5, openTime: '08:00 - 11:00, 14:00 - 17:00' },
    { id: 21, title: '昇龍皇城', note: '世界文化遺產，見證越南歷代皇朝的歷史遺跡。', category: 'sightseeing', location: 'Imperial Citadel of Thang Long', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Doan_Mon_gate.jpg/800px-Doan_Mon_gate.jpg'], rating: 4.4, openTime: '08:00 - 17:00' },
    { id: 22, title: '火爐監獄', note: '曾關押美軍戰俘，保留許多歷史文物，氣氛莊嚴。', category: 'sightseeing', location: 'Hoa Lo Prison', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Maison_Centrale_Hanoi.jpg/800px-Maison_Centrale_Hanoi.jpg'], rating: 4.6, openTime: '08:00 - 17:00' },
    { id: 23, title: '越南民族學博物館', note: '介紹越南54個民族的文化與建築，戶外展區很有趣。', category: 'sightseeing', location: 'Vietnam Museum of Ethnology', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Vietnam_Museum_of_Ethnology.jpg/800px-Vietnam_Museum_of_Ethnology.jpg'], rating: 4.7, openTime: '08:30 - 17:30 (週一休)' },
    { id: 24, title: '胡志明陵寢', note: '越南國父胡志明的長眠之地，需注意穿著與開放時間。', category: 'sightseeing', location: 'Ho Chi Minh Mausoleum', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lang_Chu_tich_Ho_Chi_Minh.jpg/800px-Lang_Chu_tich_Ho_Chi_Minh.jpg'], rating: 4.5, openTime: '07:30 - 10:30 (週一五休)' },
    { id: 25, title: '龍編橋', note: '橫跨紅河的百年鐵橋，由巴黎鐵塔設計師設計，適合看夕陽。', category: 'sightseeing', location: 'Long Bien Bridge', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Long_Bien_Bridge_Hanoi.jpg/800px-Long_Bien_Bridge_Hanoi.jpg'], rating: 4.6, openTime: '24小時' },
    { id: 26, title: '河內歌劇院', note: '法國殖民時期的建築代表，金黃色外觀非常華麗。', category: 'sightseeing', location: 'Hanoi Opera House', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hanoi_Opera_House.jpg/800px-Hanoi_Opera_House.jpg'], rating: 4.7, openTime: '視演出時間而定' },
    { id: 27, title: '鎮武觀', note: '河內著名的道教寺廟，供奉玄天上帝，有一尊巨大銅像。', category: 'sightseeing', location: 'Quan Thanh Temple', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Quan_Thanh_Temple_Gate.jpg/800px-Quan_Thanh_Temple_Gate.jpg'], rating: 4.4, openTime: '08:00 - 17:00' },

    // SHOPPING
    { id: 7, title: '同春市場', note: '大型室內批發市場，買腰果、果乾、紡織品的好去處。', category: 'shopping', location: 'Dong Xuan Market', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Dong_Xuan_Market_Hanoi.jpg/800px-Dong_Xuan_Market_Hanoi.jpg'], rating: 3.9, openTime: '06:00 - 18:00' },
    { id: 8, title: 'Aeon Mall Long Bien', note: '日系大型購物中心，環境舒適，離市區稍遠。', category: 'shopping', location: 'Aeon Mall Long Bien', images: ['https://images.unsplash.com/photo-1555663784-06f743df0328?q=80&w=800'], rating: 4.6, openTime: '10:00 - 22:00' },
    { id: 31, title: 'Lotte Center', note: '集結百貨、飯店、觀景台於一身，可俯瞰河內夜景。', category: 'shopping', location: 'Lotte Center Hanoi', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Lotte_Center_Hanoi.jpg/600px-Lotte_Center_Hanoi.jpg'], rating: 4.5, openTime: '09:30 - 22:00' },
    { id: 32, title: 'Trang Tien Plaza', note: '河內最古老的高級百貨公司，位於還劍湖旁，品牌眾多。', category: 'shopping', location: 'Trang Tien Plaza', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Trang_Tien_Plaza.jpg/800px-Trang_Tien_Plaza.jpg'], rating: 4.4, openTime: '09:30 - 21:30' },
    { id: 33, title: 'Hang Gai (絲綢街)', note: '專賣絲綢製品、奧黛(Ao Dai)定製，品質較好。', category: 'shopping', location: 'Hang Gai Street', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Old_Quarter_Hanoi.jpg/800px-Old_Quarter_Hanoi.jpg'], rating: 4.2, openTime: '08:00 - 20:00' },
    { id: 34, title: 'Hang Ma (祭祀/裝飾街)', note: '販賣各種節慶裝飾品，色彩繽紛，拍照非常好看。', category: 'shopping', location: 'Hang Ma Street', images: ['https://images.unsplash.com/photo-1549646467-3c94042e616f?q=80&w=800'], rating: 4.5, openTime: '08:00 - 21:00' },
    { id: 35, title: 'Intimex Supermarket', note: '位於還劍湖旁，價格實惠，適合購買咖啡、腰果等伴手禮。', category: 'shopping', location: 'Intimex Supermarket', images: ['https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800'], rating: 4.1, openTime: '07:00 - 22:00' },
    { id: 36, title: '週末夜市', note: '週五至週日晚間限定，從還劍湖延伸至同春市場，熱鬧非凡。', category: 'shopping', location: 'Hanoi Weekend Night Market', images: ['https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800'], rating: 4.3, openTime: '週五至週日 18:00 - 23:00' },
    { id: 37, title: 'Bat Trang 陶瓷村', note: '離市區約30分車程，可體驗手拉胚，購買精美陶瓷。', category: 'shopping', location: 'Bat Trang Ceramic Village', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Gom_Bat_Trang.jpg/800px-Gom_Bat_Trang.jpg'], rating: 4.4, openTime: '08:00 - 17:30' },
    { id: 38, title: 'Collective Memory', note: '有質感的選物店，販賣獨特且具設計感的越南紀念品。', category: 'shopping', location: 'Nha Chung Street', images: ['https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800'], rating: 4.7, openTime: '09:00 - 20:00' },
];

export const CATEGORIES = [
    { label: '景點', value: 'sightseeing', icon: 'fas fa-camera' },
    { label: '美食', value: 'food', icon: 'fas fa-utensils' },
    { label: '購物', value: 'shopping', icon: 'fas fa-shopping-bag' },
    { label: '交通', value: 'transport', icon: 'fas fa-bus' },
    { label: '住宿', value: 'accommodation', icon: 'fas fa-bed' },
    { label: '航班', value: 'flight', icon: 'fas fa-plane' },
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