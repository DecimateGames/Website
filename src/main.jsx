import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Github,
  Globe2,
  Instagram,
  Languages,
  Mail,
  Play,
  Send,
  ShoppingBag,
  Twitter,
  X,
} from "lucide-react";
import {
  FaItchIo,
  FaPlaystation,
  FaSteam,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { SiEpicgames, SiGogdotcom, SiSteamdeck } from "react-icons/si";
import { SiDiscord, SiReddit, SiTiktok, SiYoutube } from "react-icons/si";
import "./styles.css";

const LANGUAGE_KEY = "decimategames.language.v1";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
const SLIDE_DURATION_MS = 10000;

const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "zh", label: "Mandarin Chinese", dir: "ltr" },
  { code: "hi", label: "Hindi", dir: "ltr" },
  { code: "es", label: "Spanish", dir: "ltr" },
  { code: "fr", label: "French", dir: "ltr" },
  { code: "ar", label: "Arabic", dir: "rtl" },
  { code: "bn", label: "Bengali", dir: "ltr" },
  { code: "pt", label: "Portuguese", dir: "ltr" },
  { code: "ru", label: "Russian", dir: "ltr" },
  { code: "ur", label: "Urdu", dir: "rtl" },
  { code: "ja", label: "Japanese", dir: "ltr" },
  { code: "de", label: "German", dir: "ltr" },
  { code: "ko", label: "Korean", dir: "ltr" },
  { code: "tr", label: "Turkish", dir: "ltr" },
  { code: "it", label: "Italian", dir: "ltr" },
];

const TRANSLATIONS = {
  en: {
    language: "Language",
    ourGames: "Our Games",
    trailer: "Trailer",
    contactUs: "Contact us",
    contact: "Contact",
    sendRequestTitle: "Send a request",
    contactIntro:
      "Choose a topic and send the studio a message. For direct email, use the addresses below.",
    topic: "Topic",
    selectTopic: "Select topic",
    yourEmail: "Your email",
    message: "Message",
    messagePlaceholder: "Write your message...",
    sendRequest: "Send Request",
    recaptcha: "reCAPTCHA site key ready: set VITE_RECAPTCHA_SITE_KEY",
    formNote:
      "Your email client should open with the request filled in. Connect this form to a backend before production reCAPTCHA verification.",
    copyright: "Decimate Games 2026 copyright ©",
    topics: ["General", "Support", "Press", "Publishing", "Creator request"],
    statuses: {
      new: "New",
      "coming-soon": "Coming Soon",
      "in-development": "In Development",
      released: "Released",
    },
  },
  zh: {
    language: "语言",
    ourGames: "我们的游戏",
    trailer: "预告片",
    contactUs: "联系我们",
    contact: "联系",
    sendRequestTitle: "发送请求",
    contactIntro: "选择主题并向工作室发送消息。如需直接联系，请使用以下邮箱。",
    topic: "主题",
    selectTopic: "选择主题",
    yourEmail: "你的邮箱",
    message: "消息",
    messagePlaceholder: "写下你的消息...",
    sendRequest: "发送请求",
    recaptcha: "reCAPTCHA 站点密钥已就绪：设置 VITE_RECAPTCHA_SITE_KEY",
    formNote: "你的邮件客户端应会打开并填好请求。上线前请连接后端以验证 reCAPTCHA。",
    copyright: "Decimate Games 2026 版权所有 ©",
    topics: ["一般", "支持", "媒体", "发行", "创作者请求"],
    statuses: { new: "新品", "coming-soon": "即将推出", "in-development": "开发中", released: "已发布" },
  },
  hi: {
    language: "भाषा",
    ourGames: "हमारे गेम",
    trailer: "ट्रेलर",
    contactUs: "संपर्क करें",
    contact: "संपर्क",
    sendRequestTitle: "अनुरोध भेजें",
    contactIntro: "एक विषय चुनें और स्टूडियो को संदेश भेजें। सीधे ईमेल के लिए नीचे दिए पते इस्तेमाल करें।",
    topic: "विषय",
    selectTopic: "विषय चुनें",
    yourEmail: "आपका ईमेल",
    message: "संदेश",
    messagePlaceholder: "अपना संदेश लिखें...",
    sendRequest: "अनुरोध भेजें",
    recaptcha: "reCAPTCHA साइट कुंजी तैयार है: VITE_RECAPTCHA_SITE_KEY सेट करें",
    formNote: "आपका ईमेल क्लाइंट भरे हुए अनुरोध के साथ खुलना चाहिए। उत्पादन से पहले इसे बैकएंड से जोड़ें।",
    copyright: "Decimate Games 2026 कॉपीराइट ©",
    topics: ["सामान्य", "सहायता", "प्रेस", "प्रकाशन", "क्रिएटर अनुरोध"],
    statuses: { new: "नया", "coming-soon": "जल्द आ रहा है", "in-development": "विकास में", released: "रिलीज़" },
  },
  es: {
    language: "Idioma",
    ourGames: "Nuestros juegos",
    trailer: "Tráiler",
    contactUs: "Contáctanos",
    contact: "Contacto",
    sendRequestTitle: "Enviar solicitud",
    contactIntro: "Elige un tema y envía un mensaje al estudio. Para correo directo, usa las direcciones de abajo.",
    topic: "Tema",
    selectTopic: "Seleccionar tema",
    yourEmail: "Tu correo",
    message: "Mensaje",
    messagePlaceholder: "Escribe tu mensaje...",
    sendRequest: "Enviar solicitud",
    recaptcha: "Clave de sitio reCAPTCHA lista: configura VITE_RECAPTCHA_SITE_KEY",
    formNote: "Tu cliente de correo debería abrirse con la solicitud completada. Conecta un backend antes de producción.",
    copyright: "Decimate Games 2026 derechos de autor ©",
    topics: ["General", "Soporte", "Prensa", "Publicación", "Solicitud de creador"],
    statuses: { new: "Nuevo", "coming-soon": "Próximamente", "in-development": "En desarrollo", released: "Lanzado" },
  },
  fr: {
    language: "Langue",
    ourGames: "Nos jeux",
    trailer: "Bande-annonce",
    contactUs: "Nous contacter",
    contact: "Contact",
    sendRequestTitle: "Envoyer une demande",
    contactIntro: "Choisissez un sujet et envoyez un message au studio. Pour un email direct, utilisez les adresses ci-dessous.",
    topic: "Sujet",
    selectTopic: "Choisir un sujet",
    yourEmail: "Votre email",
    message: "Message",
    messagePlaceholder: "Écrivez votre message...",
    sendRequest: "Envoyer la demande",
    recaptcha: "Clé de site reCAPTCHA prête : définissez VITE_RECAPTCHA_SITE_KEY",
    formNote: "Votre client email devrait s'ouvrir avec la demande remplie. Connectez un backend avant la production.",
    copyright: "Decimate Games 2026 copyright ©",
    topics: ["Général", "Support", "Presse", "Édition", "Demande créateur"],
    statuses: { new: "Nouveau", "coming-soon": "Bientôt", "in-development": "En développement", released: "Sorti" },
  },
  ar: {
    language: "اللغة",
    ourGames: "ألعابنا",
    trailer: "العرض",
    contactUs: "اتصل بنا",
    contact: "اتصال",
    sendRequestTitle: "إرسال طلب",
    contactIntro: "اختر موضوعا وأرسل رسالة إلى الاستوديو. للتواصل المباشر استخدم عناوين البريد أدناه.",
    topic: "الموضوع",
    selectTopic: "اختر الموضوع",
    yourEmail: "بريدك الإلكتروني",
    message: "الرسالة",
    messagePlaceholder: "اكتب رسالتك...",
    sendRequest: "إرسال الطلب",
    recaptcha: "مفتاح reCAPTCHA جاهز: عيّن VITE_RECAPTCHA_SITE_KEY",
    formNote: "يجب أن يفتح عميل البريد مع الطلب جاهزا. اربط النموذج بخادم قبل الإنتاج.",
    copyright: "Decimate Games 2026 حقوق النشر ©",
    topics: ["عام", "الدعم", "الصحافة", "النشر", "طلب صانع محتوى"],
    statuses: { new: "جديد", "coming-soon": "قريبا", "in-development": "قيد التطوير", released: "صدر" },
  },
  bn: {
    language: "ভাষা",
    ourGames: "আমাদের গেম",
    trailer: "ট্রেলার",
    contactUs: "যোগাযোগ করুন",
    contact: "যোগাযোগ",
    sendRequestTitle: "অনুরোধ পাঠান",
    contactIntro: "একটি বিষয় বেছে নিয়ে স্টুডিওতে বার্তা পাঠান। সরাসরি ইমেইলের জন্য নিচের ঠিকানাগুলো ব্যবহার করুন।",
    topic: "বিষয়",
    selectTopic: "বিষয় নির্বাচন করুন",
    yourEmail: "আপনার ইমেইল",
    message: "বার্তা",
    messagePlaceholder: "আপনার বার্তা লিখুন...",
    sendRequest: "অনুরোধ পাঠান",
    recaptcha: "reCAPTCHA সাইট কী প্রস্তুত: VITE_RECAPTCHA_SITE_KEY সেট করুন",
    formNote: "আপনার ইমেইল ক্লায়েন্ট পূরণ করা অনুরোধসহ খুলবে। প্রোডাকশনের আগে ব্যাকএন্ড যুক্ত করুন।",
    copyright: "Decimate Games 2026 কপিরাইট ©",
    topics: ["সাধারণ", "সহায়তা", "প্রেস", "প্রকাশনা", "ক্রিয়েটর অনুরোধ"],
    statuses: { new: "নতুন", "coming-soon": "শীঘ্রই আসছে", "in-development": "উন্নয়নে", released: "প্রকাশিত" },
  },
  pt: {
    language: "Idioma",
    ourGames: "Nossos jogos",
    trailer: "Trailer",
    contactUs: "Fale conosco",
    contact: "Contato",
    sendRequestTitle: "Enviar solicitação",
    contactIntro: "Escolha um tópico e envie uma mensagem ao estúdio. Para email direto, use os endereços abaixo.",
    topic: "Tópico",
    selectTopic: "Selecionar tópico",
    yourEmail: "Seu email",
    message: "Mensagem",
    messagePlaceholder: "Escreva sua mensagem...",
    sendRequest: "Enviar solicitação",
    recaptcha: "Chave reCAPTCHA pronta: defina VITE_RECAPTCHA_SITE_KEY",
    formNote: "Seu cliente de email deve abrir com a solicitação preenchida. Conecte a um backend antes da produção.",
    copyright: "Decimate Games 2026 direitos autorais ©",
    topics: ["Geral", "Suporte", "Imprensa", "Publicação", "Pedido de criador"],
    statuses: { new: "Novo", "coming-soon": "Em breve", "in-development": "Em desenvolvimento", released: "Lançado" },
  },
  ru: {
    language: "Язык",
    ourGames: "Наши игры",
    trailer: "Трейлер",
    contactUs: "Связаться",
    contact: "Контакт",
    sendRequestTitle: "Отправить запрос",
    contactIntro: "Выберите тему и отправьте сообщение студии. Для прямой почты используйте адреса ниже.",
    topic: "Тема",
    selectTopic: "Выберите тему",
    yourEmail: "Ваш email",
    message: "Сообщение",
    messagePlaceholder: "Напишите сообщение...",
    sendRequest: "Отправить запрос",
    recaptcha: "Ключ reCAPTCHA готов: задайте VITE_RECAPTCHA_SITE_KEY",
    formNote: "Почтовый клиент должен открыться с заполненным запросом. Перед продакшеном подключите backend.",
    copyright: "Decimate Games 2026 авторские права ©",
    topics: ["Общее", "Поддержка", "Пресса", "Издание", "Запрос автора"],
    statuses: { new: "Новинка", "coming-soon": "Скоро", "in-development": "В разработке", released: "Вышла" },
  },
  ur: {
    language: "زبان",
    ourGames: "ہمارے گیمز",
    trailer: "ٹریلر",
    contactUs: "رابطہ کریں",
    contact: "رابطہ",
    sendRequestTitle: "درخواست بھیجیں",
    contactIntro: "موضوع منتخب کریں اور اسٹوڈیو کو پیغام بھیجیں۔ براہ راست ای میل کے لیے نیچے پتے استعمال کریں۔",
    topic: "موضوع",
    selectTopic: "موضوع منتخب کریں",
    yourEmail: "آپ کا ای میل",
    message: "پیغام",
    messagePlaceholder: "اپنا پیغام لکھیں...",
    sendRequest: "درخواست بھیجیں",
    recaptcha: "reCAPTCHA سائٹ کلید تیار ہے: VITE_RECAPTCHA_SITE_KEY سیٹ کریں",
    formNote: "آپ کا ای میل کلائنٹ بھری ہوئی درخواست کے ساتھ کھلنا چاہیے۔ پروڈکشن سے پہلے بیک اینڈ جوڑیں۔",
    copyright: "Decimate Games 2026 کاپی رائٹ ©",
    topics: ["عام", "سپورٹ", "پریس", "اشاعت", "کریئٹر درخواست"],
    statuses: { new: "نیا", "coming-soon": "جلد آرہا ہے", "in-development": "زیر ترقی", released: "ریلیز" },
  },
  ja: {
    language: "言語",
    ourGames: "ゲーム一覧",
    trailer: "トレーラー",
    contactUs: "お問い合わせ",
    contact: "連絡",
    sendRequestTitle: "リクエスト送信",
    contactIntro: "トピックを選んでスタジオへメッセージを送信してください。直接メールする場合は以下のアドレスをご利用ください。",
    topic: "トピック",
    selectTopic: "トピックを選択",
    yourEmail: "メールアドレス",
    message: "メッセージ",
    messagePlaceholder: "メッセージを書く...",
    sendRequest: "リクエスト送信",
    recaptcha: "reCAPTCHA サイトキー準備済み: VITE_RECAPTCHA_SITE_KEY を設定",
    formNote: "メールクライアントが入力済みリクエストで開きます。本番前にバックエンドへ接続してください。",
    copyright: "Decimate Games 2026 copyright ©",
    topics: ["一般", "サポート", "プレス", "パブリッシング", "クリエイター依頼"],
    statuses: { new: "新作", "coming-soon": "近日公開", "in-development": "開発中", released: "配信中" },
  },
  de: {
    language: "Sprache",
    ourGames: "Unsere Spiele",
    trailer: "Trailer",
    contactUs: "Kontakt",
    contact: "Kontakt",
    sendRequestTitle: "Anfrage senden",
    contactIntro: "Wähle ein Thema und sende dem Studio eine Nachricht. Für direkte E-Mails nutze die Adressen unten.",
    topic: "Thema",
    selectTopic: "Thema wählen",
    yourEmail: "Deine E-Mail",
    message: "Nachricht",
    messagePlaceholder: "Schreibe deine Nachricht...",
    sendRequest: "Anfrage senden",
    recaptcha: "reCAPTCHA-Site-Key bereit: VITE_RECAPTCHA_SITE_KEY setzen",
    formNote: "Dein E-Mail-Client sollte sich mit der ausgefüllten Anfrage öffnen. Vor Produktion Backend verbinden.",
    copyright: "Decimate Games 2026 Urheberrecht ©",
    topics: ["Allgemein", "Support", "Presse", "Publishing", "Creator-Anfrage"],
    statuses: { new: "Neu", "coming-soon": "Demnächst", "in-development": "In Entwicklung", released: "Veröffentlicht" },
  },
  ko: {
    language: "언어",
    ourGames: "게임",
    trailer: "트레일러",
    contactUs: "문의하기",
    contact: "문의",
    sendRequestTitle: "요청 보내기",
    contactIntro: "주제를 선택하고 스튜디오에 메시지를 보내세요. 직접 이메일은 아래 주소를 사용하세요.",
    topic: "주제",
    selectTopic: "주제 선택",
    yourEmail: "이메일",
    message: "메시지",
    messagePlaceholder: "메시지를 작성하세요...",
    sendRequest: "요청 보내기",
    recaptcha: "reCAPTCHA 사이트 키 준비됨: VITE_RECAPTCHA_SITE_KEY 설정",
    formNote: "이메일 클라이언트가 작성된 요청과 함께 열립니다. 프로덕션 전 백엔드에 연결하세요.",
    copyright: "Decimate Games 2026 저작권 ©",
    topics: ["일반", "지원", "프레스", "퍼블리싱", "크리에이터 요청"],
    statuses: { new: "신작", "coming-soon": "출시 예정", "in-development": "개발 중", released: "출시됨" },
  },
  tr: {
    language: "Dil",
    ourGames: "Oyunlarımız",
    trailer: "Fragman",
    contactUs: "Bize ulaşın",
    contact: "İletişim",
    sendRequestTitle: "İstek gönder",
    contactIntro: "Bir konu seçip stüdyoya mesaj gönderin. Doğrudan e-posta için aşağıdaki adresleri kullanın.",
    topic: "Konu",
    selectTopic: "Konu seç",
    yourEmail: "E-postan",
    message: "Mesaj",
    messagePlaceholder: "Mesajını yaz...",
    sendRequest: "İstek gönder",
    recaptcha: "reCAPTCHA site anahtarı hazır: VITE_RECAPTCHA_SITE_KEY ayarla",
    formNote: "E-posta istemcin doldurulmuş istekle açılmalı. Üretimden önce backend bağlayın.",
    copyright: "Decimate Games 2026 telif hakkı ©",
    topics: ["Genel", "Destek", "Basın", "Yayıncılık", "İçerik üretici isteği"],
    statuses: { new: "Yeni", "coming-soon": "Yakında", "in-development": "Geliştiriliyor", released: "Yayınlandı" },
  },
  it: {
    language: "Lingua",
    ourGames: "I nostri giochi",
    trailer: "Trailer",
    contactUs: "Contattaci",
    contact: "Contatto",
    sendRequestTitle: "Invia richiesta",
    contactIntro: "Scegli un argomento e invia un messaggio allo studio. Per email diretta, usa gli indirizzi sotto.",
    topic: "Argomento",
    selectTopic: "Seleziona argomento",
    yourEmail: "La tua email",
    message: "Messaggio",
    messagePlaceholder: "Scrivi il tuo messaggio...",
    sendRequest: "Invia richiesta",
    recaptcha: "Chiave sito reCAPTCHA pronta: imposta VITE_RECAPTCHA_SITE_KEY",
    formNote: "Il client email dovrebbe aprirsi con la richiesta compilata. Collega un backend prima della produzione.",
    copyright: "Decimate Games 2026 copyright ©",
    topics: ["Generale", "Supporto", "Stampa", "Publishing", "Richiesta creator"],
    statuses: { new: "Nuovo", "coming-soon": "In arrivo", "in-development": "In sviluppo", released: "Pubblicato" },
  },
};

const starterGames = [
  {
    id: "shipping-nightmares",
    title: "Shipping Nightmares",
    status: "In Development",
    genre: "Co-op horror",
    release: "TBA",
    cover: "/shipping-nightmares-card.png",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description:
      "A co-op horror game where you and your team scavenge for supplies while surviving relentless horrors in the shadows.",
    tags: ["Co-op", "Horror", "Survival"],
    platforms: ["Windows PC"],
    stores: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "EpicGames", url: "https://store.epicgames.com/" },
    ],
  },
  {
    id: "untitled-project",
    title: "Untitled Project",
    status: "Coming Soon",
    genre: "Unannounced",
    release: "TBA",
    cover: "/default-placeholder-image.png",
    trailer: "https://www.youtube.com/embed/ysz5S6PUM-U",
    description: "We’re cooking something up. Stay tuned !",
    tags: ["Unannounced"],
    platforms: ["Windows PC"],
    stores: [
      { label: "Steam", url: "https://store.steampowered.com/" },
      { label: "EpicGames", url: "https://store.epicgames.com/" },
    ],
  },
];

const EXTRA_TRANSLATIONS = {
  en: {
    gamesNav: "Games",
    releaseLabel: "Release",
    platformsLabel: "Platforms",
    mediaKit: "Media Kit",
    allRightsReserved: "© 2026 Decimate Games. All rights reserved.",
    viewGame: "View {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description:
          "A co-op horror game where you and your team scavenge for supplies while surviving relentless horrors in the shadows.",
        tags: ["Co-op", "Horror", "Survival"],
      },
      "untitled-project": {
        title: "未命名项目",
        description: "We’re cooking something up. Stay tuned !",
        tags: ["Unannounced"],
      },
    },
  },
  zh: {
    gamesNav: "游戏",
    releaseLabel: "发布日期",
    platformsLabel: "平台",
    mediaKit: "媒体资料包",
    allRightsReserved: "© 2026 Decimate Games。保留所有权利。",
    viewGame: "查看 {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "一款合作恐怖游戏，你和队友需要搜寻补给，同时在阴影中躲避无情的恐怖威胁。",
        tags: ["合作", "恐怖", "生存"],
      },
      "untitled-project": {
        title: "अनाम परियोजना",
        description: "我们正在酝酿新作品。敬请期待！",
        tags: ["未公布"],
      },
    },
  },
  hi: {
    gamesNav: "गेम",
    releaseLabel: "रिलीज़",
    platformsLabel: "प्लैटफ़ॉर्म",
    mediaKit: "मीडिया किट",
    allRightsReserved: "© 2026 Decimate Games. सर्वाधिकार सुरक्षित।",
    viewGame: "{title} देखें",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "एक को-ऑप हॉरर गेम जहां आप और आपकी टीम सामान खोजते हैं और अंधेरे में छिपे डरावने खतरों से बचते हैं।",
        tags: ["को-ऑप", "हॉरर", "सर्वाइवल"],
      },
      "untitled-project": {
        title: "Proyecto sin título",
        description: "हम कुछ नया बना रहे हैं। जुड़े रहें!",
        tags: ["अघोषित"],
      },
    },
  },
  es: {
    gamesNav: "Juegos",
    releaseLabel: "Lanzamiento",
    platformsLabel: "Plataformas",
    mediaKit: "Kit de prensa",
    allRightsReserved: "© 2026 Decimate Games. Todos los derechos reservados.",
    viewGame: "Ver {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "Un juego de terror cooperativo donde tú y tu equipo buscan suministros mientras sobreviven a horrores implacables en las sombras.",
        tags: ["Cooperativo", "Terror", "Supervivencia"],
      },
      "untitled-project": {
        title: "Projet sans titre",
        description: "Estamos preparando algo nuevo. ¡Mantente atento!",
        tags: ["Sin anunciar"],
      },
    },
  },
  fr: {
    gamesNav: "Jeux",
    releaseLabel: "Sortie",
    platformsLabel: "Plateformes",
    mediaKit: "Kit média",
    allRightsReserved: "© 2026 Decimate Games. Tous droits réservés.",
    viewGame: "Voir {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "Un jeu d’horreur coopératif où votre équipe fouille des provisions tout en survivant à des menaces implacables dans l’ombre.",
        tags: ["Coop", "Horreur", "Survie"],
      },
      "untitled-project": {
        title: "مشروع بلا عنوان",
        description: "Nous préparons quelque chose. Restez à l’écoute !",
        tags: ["Non annoncé"],
      },
    },
  },
  ar: {
    gamesNav: "الألعاب",
    releaseLabel: "الإصدار",
    platformsLabel: "المنصات",
    mediaKit: "حزمة الوسائط",
    allRightsReserved: "© 2026 Decimate Games. جميع الحقوق محفوظة.",
    viewGame: "عرض {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "لعبة رعب تعاونية تبحث فيها أنت وفريقك عن الإمدادات بينما تحاولون النجاة من أهوال لا ترحم في الظلال.",
        tags: ["تعاوني", "رعب", "نجاة"],
      },
      "untitled-project": {
        title: "শিরোনামহীন প্রকল্প",
        description: "نحن نعمل على شيء جديد. ترقبوا!",
        tags: ["غير معلن"],
      },
    },
  },
  bn: {
    gamesNav: "গেম",
    releaseLabel: "রিলিজ",
    platformsLabel: "প্ল্যাটফর্ম",
    mediaKit: "মিডিয়া কিট",
    allRightsReserved: "© 2026 Decimate Games. সর্বস্বত্ব সংরক্ষিত।",
    viewGame: "{title} দেখুন",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "একটি কো-অপ হরর গেম, যেখানে আপনি ও আপনার দল সরবরাহ খুঁজবেন এবং ছায়ার ভয়ংকর হুমকি থেকে বাঁচবেন।",
        tags: ["কো-অপ", "হরর", "সারভাইভাল"],
      },
      "untitled-project": {
        title: "Projeto sem título",
        description: "আমরা নতুন কিছু তৈরি করছি। অপেক্ষায় থাকুন!",
        tags: ["অঘোষিত"],
      },
    },
  },
  pt: {
    gamesNav: "Jogos",
    releaseLabel: "Lançamento",
    platformsLabel: "Plataformas",
    mediaKit: "Kit de mídia",
    allRightsReserved: "© 2026 Decimate Games. Todos os direitos reservados.",
    viewGame: "Ver {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "Um jogo de terror cooperativo em que você e sua equipe procuram suprimentos enquanto sobrevivem a horrores implacáveis nas sombras.",
        tags: ["Co-op", "Terror", "Sobrevivência"],
      },
      "untitled-project": {
        title: "Проект без названия",
        description: "Estamos preparando algo novo. Fique ligado!",
        tags: ["Não anunciado"],
      },
    },
  },
  ru: {
    gamesNav: "Игры",
    releaseLabel: "Выход",
    platformsLabel: "Платформы",
    mediaKit: "Медиакит",
    allRightsReserved: "© 2026 Decimate Games. Все права защищены.",
    viewGame: "Открыть {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "Кооперативная хоррор-игра, где вы с командой ищете припасы и пытаетесь выжить среди безжалостных ужасов в тенях.",
        tags: ["Кооператив", "Хоррор", "Выживание"],
      },
      "untitled-project": {
        title: "بے نام پراجیکٹ",
        description: "Мы готовим кое-что новое. Следите за новостями!",
        tags: ["Не анонсировано"],
      },
    },
  },
  ur: {
    gamesNav: "گیمز",
    releaseLabel: "ریلیز",
    platformsLabel: "پلیٹ فارمز",
    mediaKit: "میڈیا کٹ",
    allRightsReserved: "© 2026 Decimate Games. جملہ حقوق محفوظ ہیں۔",
    viewGame: "{title} دیکھیں",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "ایک کو-آپ ہارر گیم جہاں آپ اور آپ کی ٹیم سامان تلاش کرتے ہیں اور سائے میں موجود بے رحم خوفناک خطرات سے بچتے ہیں۔",
        tags: ["کو-آپ", "ہارر", "سروائیول"],
      },
      "untitled-project": {
        title: "無題のプロジェクト",
        description: "ہم کچھ نیا بنا رہے ہیں۔ انتظار کریں!",
        tags: ["غیر اعلان شدہ"],
      },
    },
  },
  ja: {
    gamesNav: "ゲーム",
    releaseLabel: "リリース",
    platformsLabel: "プラットフォーム",
    mediaKit: "メディアキット",
    allRightsReserved: "© 2026 Decimate Games. All rights reserved.",
    viewGame: "{title}を見る",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "仲間と物資を集めながら、影に潜む容赦ない恐怖を生き延びる協力型ホラーゲームです。",
        tags: ["協力", "ホラー", "サバイバル"],
      },
      "untitled-project": {
        title: "Unbenanntes Projekt",
        description: "新しい作品を準備中です。続報をお待ちください！",
        tags: ["未発表"],
      },
    },
  },
  de: {
    gamesNav: "Spiele",
    releaseLabel: "Veröffentlichung",
    platformsLabel: "Plattformen",
    mediaKit: "Medienkit",
    allRightsReserved: "© 2026 Decimate Games. Alle Rechte vorbehalten.",
    viewGame: "{title} ansehen",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "Ein Koop-Horrorspiel, in dem du mit deinem Team Vorräte suchst und unerbittliche Schrecken in den Schatten überlebst.",
        tags: ["Koop", "Horror", "Überleben"],
      },
      "untitled-project": {
        title: "제목 없는 프로젝트",
        description: "Wir arbeiten an etwas Neuem. Bleibt dran!",
        tags: ["Nicht angekündigt"],
      },
    },
  },
  ko: {
    gamesNav: "게임",
    releaseLabel: "출시",
    platformsLabel: "플랫폼",
    mediaKit: "미디어 키트",
    allRightsReserved: "© 2026 Decimate Games. 모든 권리 보유.",
    viewGame: "{title} 보기",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "팀과 함께 보급품을 찾고 그림자 속의 집요한 공포에서 살아남는 협동 호러 게임입니다.",
        tags: ["협동", "호러", "생존"],
      },
      "untitled-project": {
        title: "Adsız Proje",
        description: "새로운 것을 준비 중입니다. 기대해 주세요!",
        tags: ["미공개"],
      },
    },
  },
  tr: {
    gamesNav: "Oyunlar",
    releaseLabel: "Çıkış",
    platformsLabel: "Platformlar",
    mediaKit: "Medya kiti",
    allRightsReserved: "© 2026 Decimate Games. Tüm hakları saklıdır.",
    viewGame: "{title} oyununu görüntüle",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "Ekibinle birlikte erzak ararken gölgelerdeki acımasız korkulardan sağ çıkmaya çalıştığın kooperatif bir korku oyunu.",
        tags: ["Kooperatif", "Korku", "Hayatta kalma"],
      },
      "untitled-project": {
        title: "Progetto senza titolo",
        description: "Yeni bir şey hazırlıyoruz. Takipte kalın!",
        tags: ["Duyurulmadı"],
      },
    },
  },
  it: {
    gamesNav: "Giochi",
    releaseLabel: "Uscita",
    platformsLabel: "Piattaforme",
    mediaKit: "Media kit",
    allRightsReserved: "© 2026 Decimate Games. Tutti i diritti riservati.",
    viewGame: "Vedi {title}",
    gameCopy: {
      "shipping-nightmares": {
        title: "Shipping Nightmares",
        description: "Un horror cooperativo in cui tu e la tua squadra cercate provviste mentre sopravvivete a orrori implacabili nelle ombre.",
        tags: ["Co-op", "Horror", "Sopravvivenza"],
      },
      "untitled-project": {
        title: "Progetto senza titolo",
        description: "Stiamo preparando qualcosa di nuovo. Restate sintonizzati!",
        tags: ["Non annunciato"],
      },
    },
  },
};

const RELEASE_VALUES = {
  en: { TBA: "TBA" },
  zh: { TBA: "待定" },
  hi: { TBA: "जल्द घोषित होगा" },
  es: { TBA: "Por anunciar" },
  fr: { TBA: "À annoncer" },
  ar: { TBA: "سيتم الإعلان عنه" },
  bn: { TBA: "ঘোষণা করা হবে" },
  pt: { TBA: "A anunciar" },
  ru: { TBA: "Будет объявлено" },
  ur: { TBA: "اعلان ہونا باقی ہے" },
  ja: { TBA: "未定" },
  de: { TBA: "Wird angekündigt" },
  ko: { TBA: "추후 공개" },
  tr: { TBA: "Duyurulacak" },
  it: { TBA: "Da annunciare" },
};

const PLATFORM_VALUES = {
  en: { "Windows PC": "Windows PC" },
  zh: { "Windows PC": "Windows PC" },
  hi: { "Windows PC": "Windows PC" },
  es: { "Windows PC": "Windows PC" },
  fr: { "Windows PC": "PC Windows" },
  ar: { "Windows PC": "حاسوب Windows" },
  bn: { "Windows PC": "Windows PC" },
  pt: { "Windows PC": "PC Windows" },
  ru: { "Windows PC": "ПК Windows" },
  ur: { "Windows PC": "Windows PC" },
  ja: { "Windows PC": "Windows PC" },
  de: { "Windows PC": "Windows-PC" },
  ko: { "Windows PC": "Windows PC" },
  tr: { "Windows PC": "Windows PC" },
  it: { "Windows PC": "PC Windows" },
};

const GAME_TITLE_TRANSLATIONS = {
  en: {
    "shipping-nightmares": "Shipping Nightmares",
    "untitled-project": "Untitled Project",
  },
  zh: { "untitled-project": "未命名项目" },
  hi: { "untitled-project": "अनाम परियोजना" },
  es: { "untitled-project": "Proyecto sin título" },
  fr: { "untitled-project": "Projet sans titre" },
  ar: { "untitled-project": "مشروع بلا عنوان" },
  bn: { "untitled-project": "শিরোনামহীন প্রকল্প" },
  pt: { "untitled-project": "Projeto sem título" },
  ru: { "untitled-project": "Проект без названия" },
  ur: { "untitled-project": "بے نام پراجیکٹ" },
  ja: { "untitled-project": "無題のプロジェクト" },
  de: { "untitled-project": "Unbenanntes Projekt" },
  ko: { "untitled-project": "제목 없는 프로젝트" },
  tr: { "untitled-project": "Adsız Proje" },
  it: { "untitled-project": "Progetto senza titolo" },
};

function loadGames() {
  return starterGames;
}

function getGameCopy(game, t) {
  const localizedTitle =
    GAME_TITLE_TRANSLATIONS[t.languageCode]?.[game.id] ||
    GAME_TITLE_TRANSLATIONS.en[game.id] ||
    t.gameCopy?.[game.id]?.title;

  return {
    ...game,
    ...(t.gameCopy?.[game.id] || {}),
    title: localizedTitle || game.title,
    tags: t.gameCopy?.[game.id]?.tags || game.tags,
  };
}

function getShortDescription(description) {
  const firstSentence = description.split(".")[0]?.trim();
  return firstSentence ? `${firstSentence}.` : description;
}

function getStoreIcon(label) {
  const value = label.toLowerCase();
  if (value.includes("steam")) return FaSteam;
  if (value.includes("epic")) return SiEpicgames;
  if (value.includes("gog")) return SiGogdotcom;
  if (value.includes("itch")) return FaItchIo;
  return ShoppingBag;
}

function getPlatformIcon(platform) {
  const value = platform.toLowerCase();
  if (value.includes("steam deck")) return SiSteamdeck;
  if (value.includes("windows") || value.includes("pc")) return FaWindows;
  if (value.includes("xbox")) return FaXbox;
  if (value.includes("playstation")) return FaPlaystation;
  return ShoppingBag;
}

function getStatusKey(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function MarqueeText({ children, clipClassName, textClassName, direction = "ltr" }) {
  const clipRef = useRef(null);
  const textRef = useRef(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      const clip = clipRef.current;
      const text = textRef.current;
      if (!clip || !text) return;

      const overflow = Math.max(0, text.scrollWidth - clip.clientWidth);
      setShift(direction === "rtl" ? overflow : -overflow);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children, direction]);

  const moving = Math.abs(shift) > 4;

  return (
    <div
      className={`${clipClassName} ${direction === "rtl" ? "marquee-rtl" : "marquee-ltr"}`}
      ref={clipRef}
    >
      <p
        className={`${textClassName || ""} ${moving ? "marquee-moving" : ""}`.trim()}
        ref={textRef}
        style={{ "--marquee-shift": `${shift}px` }}
      >
        {children}
      </p>
    </div>
  );
}

function App() {
  const [games] = useState(loadGames);
  const visibleGames = games.length ? games : starterGames;
  const [route, setRoute] = useState(window.location.hash || "#home");
  const [trailer, setTrailer] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem(LANGUAGE_KEY) || "en"
  );
  const activeLanguage = LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];
  const t = {
    ...TRANSLATIONS.en,
    ...(TRANSLATIONS[activeLanguage.code] || {}),
    ...EXTRA_TRANSLATIONS.en,
    ...(EXTRA_TRANSLATIONS[activeLanguage.code] || {}),
    languageCode: activeLanguage.code,
    isRtl: activeLanguage.dir === "rtl",
    releaseValues: RELEASE_VALUES[activeLanguage.code] || RELEASE_VALUES.en,
    platformValues: PLATFORM_VALUES[activeLanguage.code] || PLATFORM_VALUES.en,
  };
  const gameRouteMatch = route.match(/^#game\/(.+)$/);
  const selectedGame = gameRouteMatch
    ? visibleGames.find((game) => game.id === decodeURIComponent(gameRouteMatch[1]))
    : null;

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = activeLanguage.code;
    document.documentElement.dir = activeLanguage.dir;
  }, [activeLanguage.code, activeLanguage.dir]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, activeLanguage.code);
  }, [activeLanguage.code]);

  useEffect(() => {
    if (route === "#games" || route === "#home") {
      window.setTimeout(() => {
        document.querySelector(route)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [route]);

  return (
    <>
      <Header language={activeLanguage.code} setLanguage={setLanguage} t={t} />
      {route === "#contact" ? (
        <ContactPage t={t} />
      ) : selectedGame ? (
        <GameDetailPage game={selectedGame} setTrailer={setTrailer} t={t} />
      ) : (
        <main>
          <Storefront games={visibleGames} setTrailer={setTrailer} t={t} />
          <GamesSection games={visibleGames} setTrailer={setTrailer} t={t} />
        </main>
      )}
      <ContactFab t={t} />
      <Footer t={t} />
      {trailer && <TrailerModal game={trailer} onClose={() => setTrailer(null)} />}
    </>
  );
}

function Header({ language, setLanguage, t }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-left">
        <a className="brand" href="#home" aria-label="Decimate Games home">
          <img className="brand-mark" src="/decimate-logo.png" alt="" />
          <span>Decimate Games</span>
        </a>
      </div>
      <nav className="main-nav" aria-label="Main menu">
        <a href="#games">{t.gamesNav}</a>
        <a href="#contact">{t.contact}</a>
      </nav>
      <div className="header-actions">
        <button
          className="top-action"
          type="button"
          aria-label={t.language}
          title={t.language}
          onClick={() => setOpen(!open)}
        >
          <Languages size={18} />
        </button>
        {open && (
          <div className="language-menu">
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                className={item.code === language ? "active" : ""}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function ContactFab({ t }) {
  return (
    <a className="contact-fab" href="#contact" aria-label={t.contactUs} title={t.contactUs}>
      <Mail size={22} />
    </a>
  );
}

function Storefront({ games, setTrailer, t }) {
  const playableGames = games.length ? games : starterGames;
  const [activeIndex, setActiveIndex] = useState(0);
  const normalizedActiveIndex = activeIndex % playableGames.length;
  const activeGame = playableGames[normalizedActiveIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % playableGames.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [normalizedActiveIndex, playableGames.length]);

  return (
    <section id="home" className="storefront">
      <div className="carousel-shell">
        <aside className="carousel-rail" aria-label="Featured games">
          {playableGames.map((game, index) => (
            <button
              key={game.id}
              className={index === normalizedActiveIndex ? "rail-item active" : "rail-item"}
              onClick={() => setActiveIndex(index)}
            >
              <img src={game.cover} alt="" />
              <span>{getGameCopy(game, t).title}</span>
              {index === normalizedActiveIndex && (
                <span
                  className="rail-fill"
                  style={{ "--slide-duration": `${SLIDE_DURATION_MS}ms` }}
                />
              )}
            </button>
          ))}
        </aside>

        <article className="feature-card">
          <GameArtwork game={activeGame} large t={t} />
          <GameOverlay game={activeGame} setTrailer={setTrailer} featured t={t} />
        </article>
      </div>
    </section>
  );
}

function GameArtwork({ game, large = false, t }) {
  const statusKey = getStatusKey(game.status);
  const statusClass = `status-pill status-${statusKey}`;

  return (
    <>
      <div
        className={large ? "artwork feature-media" : "artwork"}
        style={{ backgroundImage: `url(${game.cover})` }}
      />
      <div className="artwork-shade" />
      <span className={statusClass}>{t.statuses[statusKey] || game.status}</span>
      <PlatformMarks platforms={game.platforms} />
    </>
  );
}

function GameOverlay({ game, setTrailer, featured = false, t }) {
  const copy = getGameCopy(game, t);
  const shortDescription = getShortDescription(copy.description);

  return (
    <div className={featured ? "game-overlay featured" : "game-overlay"}>
      <div>
        <h2>{copy.title}</h2>
        {featured && (
          <MarqueeText
            key={`${game.id}-${t.languageCode}`}
            clipClassName="marquee-clip"
            textClassName="marquee-text"
            direction={t.isRtl ? "rtl" : "ltr"}
          >
            {shortDescription}
          </MarqueeText>
        )}
      </div>
      <div className="overlay-actions">
        <button className="trailer-button" onClick={() => setTrailer({ ...game, title: copy.title })}>
          <Play size={17} /> {t.trailer}
        </button>
        <div className="store-actions">
          {game.stores.map((store) => {
            const StoreIcon = getStoreIcon(store.label);
            return (
              <a
                key={`${game.id}-${store.label}`}
                href={store.url}
                target="_blank"
                rel="noreferrer"
                aria-label={store.label}
                title={store.label}
              >
                <StoreIcon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlatformMarks({ platforms }) {
  return (
    <div className="platform-marks">
      {platforms.map((platform) => {
        const PlatformIcon = getPlatformIcon(platform);
        return (
          <span key={platform} aria-label={platform} title={platform}>
            <PlatformIcon size={16} />
          </span>
        );
      })}
    </div>
  );
}

function GamesSection({ games, setTrailer, t }) {
  return (
    <section id="games" className="section">
      <div className="section-heading">
        <h2>{t.ourGames}</h2>
      </div>
      <div className="games-grid">
        {games.map((game) => {
          const copy = getGameCopy(game, t);

          return (
          <article className="game-card" key={game.id}>
            <a
              className="game-card-link"
              href={`#game/${encodeURIComponent(game.id)}`}
              aria-label={t.viewGame.replace("{title}", copy.title)}
            >
              <GameArtwork game={game} t={t} />
            </a>
            <div className="game-card-content">
              <div className="game-card-copy">
                <h2>{copy.title}</h2>
                <MarqueeText
                  clipClassName="card-marquee-clip"
                  textClassName="card-marquee-text"
                  direction={t.isRtl ? "rtl" : "ltr"}
                >
                  {getShortDescription(copy.description)}
                </MarqueeText>
              </div>
              <div className="game-card-actions">
                <button className="trailer-button" type="button" onClick={() => setTrailer({ ...game, title: copy.title })}>
                  <Play size={17} /> {t.trailer}
                </button>
                <div className="store-actions">
                  {game.stores.map((store) => {
                    const StoreIcon = getStoreIcon(store.label);
                    return (
                      <a
                        key={`${game.id}-${store.label}`}
                        href={store.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={store.label}
                        title={store.label}
                      >
                        <StoreIcon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function GameDetailPage({ game, setTrailer, t }) {
  const copy = getGameCopy(game, t);

  return (
    <main className={t.isRtl ? "game-detail-page is-rtl-detail" : "game-detail-page"}>
      <section className="game-detail-layout">
        <article className="game-detail-post">
          <div className="game-detail-media">
            <img src={game.cover} alt="" />
            <div className="detail-tags">
              {(copy.tags || [game.genre]).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="game-detail-copy">
            <h1>{copy.title}</h1>
            <p>
              {copy.description}
            </p>
            <div className="detail-info-row">
              <div className="detail-meta">
                <strong>{t.releaseLabel}</strong>
                <span>{t.releaseValues?.[game.release] || game.release}</span>
              </div>
              <div className="detail-meta">
                <strong>{t.platformsLabel}</strong>
                <span>
                  {game.platforms
                    .map((platform) => t.platformValues?.[platform] || platform)
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className="detail-actions">
              <button className="trailer-button" onClick={() => setTrailer({ ...game, title: copy.title })}>
                <Play size={17} /> {t.trailer}
              </button>
              {game.stores.map((store) => {
                const StoreIcon = getStoreIcon(store.label);
                return (
                  <a
                    key={store.label}
                    href={store.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={store.label}
                    title={store.label}
                  >
                    <StoreIcon size={18} />
                  </a>
                );
              })}
              <a className="press-kit-button" href="mailto:press@decimategames.com">
                {t.mediaKit}
              </a>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

function ContactPage({ t }) {
  const [sent, setSent] = useState(false);
  const topics = useMemo(() => t.topics, [t]);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const topic = data.get("topic");
    const email = data.get("email");
    const message = data.get("message");
    const subject = encodeURIComponent(`Decimate Games ${t.contact}: ${topic}`);
    const body = encodeURIComponent(
      `Topic: ${topic}\nFrom: ${email}\n\n${message}`
    );
    window.location.href = `mailto:contact@decimategames.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main className="contact-page">
      <section className="contact-layout">
        <div className="contact-copy">
          <h1>{t.sendRequestTitle}</h1>
          <p>
            {t.contactIntro}
          </p>
          <div className="email-list">
            <a href="mailto:contact@decimategames.com">contact@decimategames.com</a>
            <a href="mailto:support@decimategames.com">support@decimategames.com</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <label>
            {t.topic}
            <select name="topic" required defaultValue="">
              <option value="" disabled>
                {t.selectTopic}
              </option>
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>
          <label>
            {t.yourEmail}
            <input name="email" type="email" required placeholder="you@example.com" />
          </label>
          <label>
            {t.message}
            <textarea
              name="message"
              required
              rows="7"
              placeholder={t.messagePlaceholder}
            />
          </label>
          <div className="recaptcha-box">
            {RECAPTCHA_SITE_KEY ? (
              <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} />
            ) : (
              <span>{t.recaptcha}</span>
            )}
          </div>
          <button className="primary-button" type="submit">
            <Send size={18} /> {t.sendRequest}
          </button>
          {sent && (
            <p className="form-note">
              {t.formNote}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

function TrailerModal({ game, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Close trailer" onClick={onClose}>
          <X size={20} />
        </button>
        <iframe
          src={game.trailer}
          title={`${game.title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function Footer({ t }) {
  const socials = [
    { icon: Twitter, label: "X", href: "https://x.com/decimate_games" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/decimategames" },
    { icon: SiTiktok, label: "TikTok", href: "https://tiktok.com/@decimategames" },
    { icon: SiReddit, label: "Reddit", href: "https://reddit.com/r/DecimateGames" },
    { icon: SiYoutube, label: "YouTube", href: "https://www.youtube.com/@Decimate_Games" },
    { icon: SiYoutube, label: "Devlogs", href: "https://youtube.com/@decimatedevlogs" },
    { icon: SiDiscord, label: "Discord", href: "https://discord.com/invite/RBHPkSgvyA" },
  ];

  return (
    <footer className="site-footer">
      <div className="social-row">
        {socials.map(({ icon: Icon, label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon size={17} />
          </a>
        ))}
      </div>
      <span>{t.allRightsReserved}</span>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
