/**
 * SAM TOP TECH — بيانات المنتجات
 * يمكن تعديل هذا الملف بسهولة أو ربطه مع Google Sheets API
 */

const PRODUCTS = {
  router: [
    // Mikrotik
    {n:'hEX lite',code:'RB750r2',br:'Mikrotik',icon:'fa-solid fa-server',p:32,o:null,sp:['5 Port','100Mbps','L4'],b:null},
    {n:'hEX Gigabit',code:'RB750Gr3',br:'Mikrotik',icon:'fa-solid fa-server',p:52,o:null,sp:['5 Gigabit','RouterOS','USB'],b:'best'},
    {n:'hEX S',code:'E60iUGS',br:'Mikrotik',icon:'fa-solid fa-server',p:72,o:null,sp:['5G','SFP','PoE-out'],b:null},
    {n:'hAP ac lite',code:'RB952Ui',br:'Mikrotik',icon:'fa-solid fa-wifi',p:50,o:null,sp:['Dual Band','5P','PoE'],b:null},
    {n:'hAP ac²',code:'RBD52G',br:'Mikrotik',icon:'fa-solid fa-wifi',p:79,o:null,sp:['WiFi ac','5G Port','USB'],b:'hot'},
    {n:'RB5009UG+S+IN',code:'RB5009',br:'Mikrotik',icon:'fa-solid fa-bolt',p:155,o:null,sp:['8P','SFP+','2.5G','HW IPsec'],b:'best'},
    // TP-Link
    {n:'Archer AX23 WiFi 6',code:'AX23',br:'TP-Link',icon:'fa-solid fa-wifi',p:49,o:65,sp:['WiFi 6','AX1800','Dual'],b:'sale'},
    {n:'Archer AX73 WiFi 6',code:'AX73',br:'TP-Link',icon:'fa-solid fa-wifi',p:89,o:119,sp:['WiFi 6','AX5400','6 Ant'],b:null},
    {n:'TL-MR6400 4G LTE',code:'MR6400',br:'TP-Link',icon:'fa-solid fa-signal',p:49,o:65,sp:['4G','WiFi N','SIM'],b:'hot'},
    {n:'Archer MR600 4G+',code:'MR600',br:'TP-Link',icon:'fa-solid fa-signal',p:79,o:99,sp:['Cat6','Dual Band','Dual SIM'],b:null},
    // Totolink
    {n:'N300RT Router',code:'N300RT',br:'Totolink',icon:'fa-solid fa-globe',p:15,o:null,sp:['N300','4 Port','2.4G'],b:null},
    {n:'A720R AC1200',code:'A720R',br:'Totolink',icon:'fa-solid fa-globe',p:22,o:28,sp:['AC1200','Dual Band','5 Port'],b:'hot'},
    {n:'A3002RU AC1200 Gig',code:'A3002RU',br:'Totolink',icon:'fa-solid fa-globe',p:29,o:38,sp:['AC1200','Gigabit','USB 3.0'],b:null},
    {n:'X2000R WiFi 6',code:'X2000R',br:'Totolink',icon:'fa-solid fa-rocket',p:45,o:59,sp:['WiFi 6','AX1500','Gigabit'],b:'new'},
    // D-Link
    {n:'DIR-615 N300',code:'DIR-615',br:'D-Link',icon:'fa-solid fa-network-wired',p:18,o:null,sp:['N300','4 Port','2.4GHz'],b:null},
    {n:'DIR-822 AC1200',code:'DIR-822',br:'D-Link',icon:'fa-solid fa-network-wired',p:32,o:42,sp:['AC1200','Dual Band','4P'],b:'sale'},
    {n:'DIR-842 AC1200 Gig',code:'DIR-842',br:'D-Link',icon:'fa-solid fa-network-wired',p:45,o:55,sp:['AC1200','Gigabit','4P'],b:null},
    {n:'DIR-X1560 WiFi 6',code:'DIR-X1560',br:'D-Link',icon:'fa-solid fa-rocket',p:75,o:95,sp:['WiFi 6','AX1500','Gigabit'],b:'new'},
    // Cisco
    {n:'Cisco RV260 VPN',code:'RV260',br:'Cisco',icon:'fa-solid fa-building',p:185,o:null,sp:['10P','VPN','ACL','VLAN'],b:null},
    {n:'Cisco RV345 Dual WAN',code:'RV345',br:'Cisco',icon:'fa-solid fa-building',p:320,o:null,sp:['Dual WAN','VPN','16U'],b:null},
  ],
  ap: [
    {n:'LHG 5 CPE',code:'RBLHG-5nD',br:'Mikrotik',icon:'fa-solid fa-tower-broadcast',p:39,o:null,sp:['5GHz','24.5dBi','PtP'],b:'best'},
    {n:'LHG 5 ac Gig',code:'RBLHG5acD',br:'Mikrotik',icon:'fa-solid fa-tower-broadcast',p:79,o:null,sp:['5GHz ac','24.5dBi','Gig'],b:null},
    {n:'SXTsq 5 ac',code:'RBSXTsq5ac',br:'Mikrotik',icon:'fa-solid fa-broadcast-tower',p:65,o:null,sp:['5GHz ac','16dBi','Gig'],b:'hot'},
    {n:'wAP ac Outdoor',code:'RBwAPG-5HacD',br:'Mikrotik',icon:'fa-solid fa-globe',p:69,o:null,sp:['Dual Band','Outdoor','Gig'],b:null},
    {n:'CPE210 2.4G 9dBi',code:'CPE210',br:'TP-Link',icon:'fa-solid fa-tower-broadcast',p:22,o:29,sp:['2.4GHz','9dBi','N300'],b:'sale'},
    {n:'CPE510 5G 13dBi',code:'CPE510',br:'TP-Link',icon:'fa-solid fa-tower-broadcast',p:29,o:35,sp:['5GHz','13dBi','N300','IP65'],b:'best'},
    {n:'CPE610 5G 23dBi',code:'CPE610',br:'TP-Link',icon:'fa-solid fa-tower-broadcast',p:49,o:59,sp:['5GHz','23dBi','N300','23km'],b:'hot'},
    {n:'EAP225 Indoor',code:'EAP225',br:'TP-Link',icon:'fa-solid fa-circle-nodes',p:49,o:65,sp:['AC1200','PoE','Omada'],b:null},
    {n:'EAP670 WiFi 6',code:'EAP670',br:'TP-Link',icon:'fa-solid fa-circle-nodes',p:89,o:109,sp:['WiFi 6','AX5400','PoE+'],b:'new'},
    {n:'CP300 5GHz CPE',code:'CP300',br:'Totolink',icon:'fa-solid fa-tower-broadcast',p:22,o:28,sp:['5GHz','13dBi','N300','IP55'],b:'hot'},
    {n:'A702R Indoor AP',code:'A702R',br:'Totolink',icon:'fa-solid fa-circle-nodes',p:19,o:25,sp:['AC1200','Ceiling','PoE'],b:'sale'},
    {n:'WF2533 CPE Outdoor',code:'WF2533',br:'Netis',icon:'fa-solid fa-tower-broadcast',p:18,o:22,sp:['2.4GHz','CPE','N300','IP65'],b:'sale'},
    {n:'WF2471 Indoor AP',code:'WF2471',br:'Netis',icon:'fa-solid fa-circle-nodes',p:15,o:null,sp:['N300','Indoor','PoE'],b:null},
    {n:'NanoStation 5AC Loco',code:'LocoM5-AC',br:'Ubiquiti',icon:'fa-solid fa-satellite',p:89,o:null,sp:['5GHz ac','13dBi','Gig'],b:'hot'},
    {n:'LiteBeam AC Gen2',code:'LBE-5AC-G2',br:'Ubiquiti',icon:'fa-solid fa-broadcast-tower',p:79,o:null,sp:['5GHz ac','23dBi','Gig'],b:'best'},
    {n:'PowerBeam 5AC-620',code:'PBE-5AC-620',br:'Ubiquiti',icon:'fa-solid fa-satellite',p:119,o:null,sp:['5GHz ac','29dBi','PtP'],b:null},
  ],
  switch: [
    {n:'CSS106 PoE+SFP',code:'CSS106',br:'Mikrotik',icon:'fa-solid fa-plug',p:55,o:null,sp:['5P','4×PoE','SFP','SwOS'],b:'hot'},
    {n:'CRS326-24G-2S+RM',code:'CRS326',br:'Mikrotik',icon:'fa-solid fa-bolt',p:185,o:null,sp:['24G','2×SFP+','Rack','L3'],b:'best'},
    {n:'TL-SG105 5-Port',code:'SG105',br:'TP-Link',icon:'fa-solid fa-link',p:14,o:null,sp:['5P','Gigabit','Desktop'],b:null},
    {n:'TL-SG108 8-Port',code:'SG108',br:'TP-Link',icon:'fa-solid fa-link',p:22,o:null,sp:['8P','Gigabit','Desktop'],b:'best'},
    {n:'TL-SG1016D 16-Port',code:'SG1016D',br:'TP-Link',icon:'fa-solid fa-plug',p:45,o:55,sp:['16P','Gigabit','Rack'],b:'sale'},
    {n:'TL-SG1024D 24-Port',code:'SG1024D',br:'TP-Link',icon:'fa-solid fa-plug',p:69,o:85,sp:['24P','Gigabit','Rack'],b:null},
    {n:'TL-SG2428P 24P PoE',code:'SG2428P',br:'TP-Link',icon:'fa-solid fa-plug',p:179,o:219,sp:['24P PoE+','4 SFP','L2+'],b:'sale'},
    {n:'DGS-1005D 5-Port',code:'DGS-1005D',br:'D-Link',icon:'fa-solid fa-link',p:16,o:null,sp:['5P','Gigabit','Desktop'],b:null},
    {n:'DGS-1016D 16-Port',code:'DGS-1016D',br:'D-Link',icon:'fa-solid fa-plug',p:55,o:65,sp:['16P','Gigabit','Rack'],b:'sale'},
    {n:'DGS-1024D 24-Port',code:'DGS-1024D',br:'D-Link',icon:'fa-solid fa-plug',p:79,o:95,sp:['24P','Gigabit','Rack'],b:null},
    {n:'DGS-1210-28P PoE+',code:'DGS-1210-28P',br:'D-Link',icon:'fa-solid fa-plug',p:185,o:225,sp:['24P PoE+','4 SFP','L2 Smart'],b:'new'},
    {n:'ST3116P 16P PoE',code:'ST3116P',br:'Netis',icon:'fa-solid fa-plug',p:39,o:49,sp:['16P','8×PoE','100Mbps'],b:'hot'},
    {n:'ST3124P 24P PoE',code:'ST3124P',br:'Netis',icon:'fa-solid fa-plug',p:55,o:69,sp:['24P','16×PoE','100Mbps'],b:'sale'},
    {n:'UniFi Switch Lite 8',code:'USW-Lite-8',br:'Ubiquiti',icon:'fa-solid fa-spinner',p:109,o:null,sp:['8P','4×PoE','Managed'],b:null},
    {n:'UniFi Switch 24 PoE',code:'USW-24-PoE',br:'Ubiquiti',icon:'fa-solid fa-spinner',p:349,o:null,sp:['24P','PoE+','2 SFP+'],b:'best'},
  ],
  acc: [
    {n:'Cat6 UTP 305m — AMP',code:'Cat6-305',br:'كابلات',icon:'fa-solid fa-cable-car',p:26,o:34,sp:['Cat6','UTP','305m','23AWG'],b:'sale'},
    {n:'Cat6 FTP Shielded 305m',code:'Cat6F-305',br:'كابلات',icon:'fa-solid fa-cable-car',p:34,o:null,sp:['Cat6','FTP','305m','Shield'],b:null},
    {n:'Cat8 S/FTP 305m',code:'Cat8-305',br:'كابلات',icon:'fa-solid fa-cable-car',p:58,o:null,sp:['Cat8','40Gbps','S/FTP','305m'],b:'new'},
    {n:'Patch Cable Cat6 1m',code:'PC-1M',br:'كابلات',icon:'fa-solid fa-circle',p:2,o:null,sp:['Cat6','1M','RJ45×2','Stranded'],b:null},
    {n:'Patch Cable Cat6 3m',code:'PC-3M',br:'كابلات',icon:'fa-solid fa-circle',p:3,o:null,sp:['Cat6','3M','RJ45×2'],b:null},
    {n:'أنتينا Sector 5.8G 120°',code:'ANT-S120',br:'أنتينات',icon:'fa-solid fa-broadcast-tower',p:29,o:39,sp:['120°','14dBi','5.8GHz','RP-SMA'],b:'sale'},
    {n:'أنتينا Panel 5.8G 24dBi',code:'ANT-P24',br:'أنتينات',icon:'fa-solid fa-broadcast-tower',p:32,o:42,sp:['24dBi','5.8GHz','Outdoor'],b:null},
    {n:'أنتينا Omni 2.4G 9dBi',code:'ANT-O9',br:'أنتينات',icon:'fa-solid fa-tower-broadcast',p:12,o:null,sp:['9dBi','2.4GHz','Omni','RP-SMA'],b:null},
    {n:'أنتينا Grid 5.8G 30dBi',code:'ANT-G30',br:'أنتينات',icon:'fa-solid fa-tower-broadcast',p:35,o:null,sp:['30dBi','5.8GHz','Grid','PtP'],b:'new'},
    {n:'PoE Injector 24V Passive',code:'POE-24P',br:'PoE',icon:'fa-solid fa-bolt',p:10,o:null,sp:['24V Passive','Gig','للـ Mikrotik'],b:null},
    {n:'PoE Injector 48V 802.3af',code:'POE-48',br:'PoE',icon:'fa-solid fa-bolt',p:14,o:null,sp:['48V','802.3af','Gig'],b:null},
    {n:'PoE Splitter 5V/12V',code:'POE-SP',br:'PoE',icon:'fa-solid fa-bolt',p:9,o:null,sp:['5V/12V out','100M','للكاميرات'],b:null},
    {n:'PoE Switch 8P Passive',code:'POE-SW8',br:'PoE',icon:'fa-solid fa-plug',p:22,o:28,sp:['8P','Passive 24V','للـ Mikrotik'],b:'sale'},
    {n:'صندوق ODF Fiber 12P',code:'ODF-12',br:'فايبر',icon:'fa-solid fa-lightbulb',p:24,o:30,sp:['12P','SC/LC','Wall/Rack'],b:'sale'},
    {n:'صندوق ODF Fiber 24P',code:'ODF-24',br:'فايبر',icon:'fa-solid fa-lightbulb',p:35,o:null,sp:['24P','SC/LC','Rack 1U'],b:null},
    {n:'Patch Cable Fiber SC-SC 3M',code:'FP-SC3',br:'فايبر',icon:'fa-solid fa-circle-nodes',p:4,o:null,sp:['SC-SC','SM','OS2','3M'],b:null},
    {n:'SFP Module 1G SM 20km',code:'SFP-20',br:'فايبر',icon:'fa-solid fa-circle-nodes',p:18,o:null,sp:['1000Base-LX','SM','20km','LC'],b:null},
    {n:'كريمبر RJ45 احترافي',code:'CRIMP-PRO',br:'أدوات',icon:'fa-solid fa-screwdriver-wrench',p:19,o:25,sp:['RJ45','RJ11','Heavy Duty'],b:null},
    {n:'Patch Panel Cat6 24P',code:'PP-24',br:'أدوات',icon:'fa-solid fa-circle-nodes',p:22,o:null,sp:['24P','Cat6','Rack 1U'],b:null},
    {n:'رزمة RJ45 Cat6 100 حبة',code:'RJ-100',br:'أدوات',icon:'fa-solid fa-circle',p:8,o:null,sp:['Cat6','100P','Gold','8P8C'],b:null},
    {n:'Cable Tester RJ45/RJ11',code:'TESTER',br:'أدوات',icon:'fa-solid fa-magnifying-glass',p:11,o:null,sp:['Cat5/6','RJ45','RJ11','BNC'],b:null},
    {n:'UPS 650VA APC Smart',code:'UPS-650',br:'طاقة',icon:'fa-solid fa-battery-full',p:65,o:79,sp:['650VA','400W','AVR','USB'],b:'sale'},
    {n:'Rack Cabinet 9U Wall',code:'RACK-9U',br:'طاقة',icon:'fa-solid fa-cabinet-filing',p:75,o:null,sp:['9U','Wall Mount','600mm','بلوط'],b:'new'},
    {n:'Power Strip 6 Socket',code:'PWR-6',br:'طاقة',icon:'fa-solid fa-plug',p:12,o:null,sp:['6 Socket','3M','Surge','250V'],b:null},
  ]
};

// أسماء الأقسام للشريط الجانبي
const SECTION_NAMES = {
  router: 'الراوترات والمايكروتك',
  ap: 'اكسس بوينت والمقويات',
  switch: 'المحولات السويتشات',
  acc: 'الاكسسوارات والكابلات'
};

// أيقونات الأقسام
const SECTION_ICONS = {
  router: 'fa-solid fa-server',
  ap: 'fa-solid fa-tower-broadcast',
  switch: 'fa-solid fa-plug',
  acc: 'fa-solid fa-screwdriver-wrench'
};

// العلامات
const BADGE_TEXT = {new:'جديد',sale:'تخفيض',hot:'مطلوب',best:'الأفضل',pop:'شائع'};
const BADGE_CLASS = {new:'b-new',sale:'b-sale',hot:'b-hot',best:'b-best',pop:'b-pop'};

// ماركات قسم الراوترات
const ROUTER_BRANDS = ['Mikrotik','TP-Link','Totolink','D-Link','Cisco'];
const AP_BRANDS = ['Mikrotik','TP-Link','Totolink','Netis','Ubiquiti'];
const SWITCH_BRANDS = ['Mikrotik','TP-Link','D-Link','Netis','Ubiquiti'];
const ACC_CATEGORIES = ['كابلات','أنتينات','PoE','فايبر','أدوات','طاقة'];

// الأسئلة الشائعة
const FAQS = [
  {q:'ما الفرق بين Totolink وTP-Link؟',a:'TP-Link أقوى وأكثر موثوقية وانتشاراً عالمياً، لكن Totolink أرخص وجيد للاستخدام المنزلي البسيط. للـ ISP والشبكات الاحترافية نوصي بـ TP-Link أو Mikrotik.'},
  {q:'هل Netis جيد للاستخدام في اليمن؟',a:'Netis اقتصادي وكافٍ للاستخدام المنزلي والمكاتب الصغيرة. سويتشات PoE من Netis تعمل بشكل ممتاز لتغذية الكاميرات والـ AP. للشبكات الكبيرة نوصي بـ TP-Link أو Mikrotik.'},
  {q:'ما أفضل CPE للـ ISP في اليمن؟',a:'الأكثر استخداماً: TP-Link CPE510 ($29) للمسافات المتوسطة، CPE610 ($49) للمسافات الطويلة، Ubiquiti LiteBeam AC ($79) للأداء العالي. Mikrotik LHG5 ($39) للشبكات التي تعمل بـ RouterOS.'},
  {q:'هل الأسعار بالدولار؟ وكيف ندفع؟',a:'نعم، الأسعار بالدولار الأمريكي. نقبل الدفع نقداً بالريال اليمني حسب سعر الصرف اليومي، أو تحويل بنكي، أو وسطاء الدفع المتاحون في اليمن.'},
  {q:'ما هي مدة الضمان؟',a:'سنتان ضمان على جميع المنتجات الأصلية — إصلاح أو استبدال. بعض الماركات كـ Ubiquiti وMikrotik لها ضمان أطول حسب المنتج.'},
  {q:'هل تتوفر UPS وإكسسوارات الكهرباء؟',a:'نعم، نوفر UPS من APC، ورف Rack 9U، وسلاسل قدرة. راجع قسم الاكسسوارات > طاقة & UPS.'},
  {q:'ما الفرق بين PoE Active و Passive؟',a:'PoE Active (802.3af/at) آمن لأي جهاز يدعم PoE. PoE Passive (24V) خاص بأجهزة Mikrotik الخارجية — لا تستخدمه مع أجهزة غير Mikrotik لأنه قد يتلفها.'},
  {q:'هل تقدمون خصومات للجملة والمشاريع؟',a:'نعم، خصومات تصل إلى 15% للطلبيات الكبيرة. تواصل عبر واتساب @samtopthch_yemen للحصول على عرض سعر مخصص لمشروعك.'},
];

// نصوص الشريط المتحرك
const TICKER_ITEMS = [
  'Mikrotik RB750Gr3 · $52','TP-Link CPE510 · $29','Totolink A720R · $22',
  'D-Link DIR-842 · $45','Netis ST3116P · $39','Ubiquiti LiteBeam AC · $79',
  'Cat6 305m · $26','WiFi 6 · Gigabit · RouterOS','UPS 650VA · $65',
  'SFP Module 20km · $18','@samtopthch_yemen · إب · اليمن',
  'PoE Switch · Patch Panel · ODF Fiber'
];