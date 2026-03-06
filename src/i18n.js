import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'My Blog',
      newPost: 'New Post',
      postTitle: 'Post Title',
      postContent: 'Post Content',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      noPosts: 'No posts yet. Create your first post!',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode'
    }
  },
  ja: {
    translation: {
      title: '私のブログ',
      newPost: '新しい投稿',
      postTitle: '投稿タイトル',
      postContent: '投稿内容',
      save: '保存',
      cancel: 'キャンセル',
      edit: '編集',
      delete: '削除',
      noPosts: 'まだ投稿がありません。最初の投稿を作成してください！',
      darkMode: 'ダークモード',
      lightMode: 'ライトモード'
    }
  },
  zh: {
    translation: {
      title: '我的博客',
      newPost: '新帖子',
      postTitle: '帖子标题',
      postContent: '帖子内容',
      save: '保存',
      cancel: '取消',
      edit: '编辑',
      delete: '删除',
      noPosts: '还没有帖子。创建您的第一篇帖子！',
      darkMode: '深色模式',
      lightMode: '浅色模式'
    }
  },
  es: {
    translation: {
      title: 'Mi Blog',
      newPost: 'Nueva Publicación',
      postTitle: 'Título de la Publicación',
      postContent: 'Contenido de la Publicación',
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      noPosts: '¡Aún no hay publicaciones. Crea tu primera publicación!',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro'
    }
  },
  fr: {
    translation: {
      title: 'Mon Blog',
      newPost: 'Nouveau Message',
      postTitle: 'Titre du Message',
      postContent: 'Contenu du Message',
      save: 'Enregistrer',
      cancel: 'Annuler',
      edit: 'Modifier',
      delete: 'Supprimer',
      noPosts: 'Pas encore de messages. Créez votre premier message!',
      darkMode: 'Mode Sombre',
      lightMode: 'Mode Clair'
    }
  },
  de: {
    translation: {
      title: 'Mein Blog',
      newPost: 'Neuer Beitrag',
      postTitle: 'Beitragstitel',
      postContent: 'Beitragsinhalt',
      save: 'Speichern',
      cancel: 'Abbrechen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      noPosts: 'Noch keine Beiträge. Erstellen Sie Ihren ersten Beitrag!',
      darkMode: 'Dunkler Modus',
      lightMode: 'Heller Modus'
    }
  },
  ta: {
    translation: {
      title: 'என் வலைப்பதிவு',
      newPost: 'புதிய இடுகை',
      postTitle: 'இடுகை தலைப்பு',
      postContent: 'இடுகை உள்ளடக்கம்',
      save: 'சேமி',
      cancel: 'ரத்து செய்',
      edit: 'திருத்து',
      delete: 'நீக்கு',
      noPosts: 'இன்னும் இடுகைகள் இல்லை. உங்கள் முதல் இடுகையை உருவாக்குங்கள்!',
      darkMode: 'இருண்ட பயன்முறை',
      lightMode: 'ஒளி பயன்முறை'
    }
  },
  te: {
    translation: {
      title: 'నా బ్లాగ్',
      newPost: 'కొత్త పోస్ట్',
      postTitle: 'పోస్ట్ శీర్షిక',
      postContent: 'పోస్ట్ కంటెంట్',
      save: 'సేవ్ చేయండి',
      cancel: 'రద్దు చేయండి',
      edit: 'సవరించండి',
      delete: 'తొలగించండి',
      noPosts: 'ఇంకా పోస్ట్‌లు లేవు. మీ మొదటి పోస్ట్‌ను సృష్టించండి!',
      darkMode: 'డార్క్ మోడ్',
      lightMode: 'లైట్ మోడ్'
    }
  },
  bn: {
    translation: {
      title: 'আমার ব্লগ',
      newPost: 'নতুন পোস্ট',
      postTitle: 'পোস্ট শিরোনাম',
      postContent: 'পোস্ট বিষয়বস্তু',
      save: 'সংরক্ষণ করুন',
      cancel: 'বাতিল করুন',
      edit: 'সম্পাদনা করুন',
      delete: 'মুছুন',
      noPosts: 'এখনও কোনো পোস্ট নেই। আপনার প্রথম পোস্ট তৈরি করুন!',
      darkMode: 'ডার্ক মোড',
      lightMode: 'লাইট মোড'
    }
  },
  mr: {
    translation: {
      title: 'माझा ब्लॉग',
      newPost: 'नवीन पोस्ट',
      postTitle: 'पोस्ट शीर्षक',
      postContent: 'पोस्ट सामग्री',
      save: 'जतन करा',
      cancel: 'रद्द करा',
      edit: 'संपादित करा',
      delete: 'हटवा',
      noPosts: 'अद्याप कोणतीही पोस्ट नाही. तुमची पहिली पोस्ट तयार करा!',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड'
    }
  },
  gu: {
    translation: {
      title: 'મારો બ્લોગ',
      newPost: 'નવી પોસ્ટ',
      postTitle: 'પોસ્ટ શીર્ષક',
      postContent: 'પોસ્ટ સામગ્રી',
      save: 'સાચવો',
      cancel: 'રદ કરો',
      edit: 'સંપાદિત કરો',
      delete: 'કાઢી નાખો',
      noPosts: 'હજી સુધી કોઈ પોસ્ટ નથી. તમારી પ્રથમ પોસ્ટ બનાવો!',
      darkMode: 'ડાર્ક મોડ',
      lightMode: 'લાઇટ મોડ'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
