import { setLocale } from 'umi-plugin-locale';
import zh_CN from './zh-CN';
import en_US from './en-US';
import id_ID from './id-ID';
import store from 'store';

let curLan = window.location.hash.split('?language=').pop();
let osMap = new Map([['en', 'en-US'], ['id', 'id_ID']]);
curLan && store.set('lan', osMap.get(curLan));

// 语言设置
export const setLanguage = () => {
  // const lan = ['en-US', 'id-ID'][0];
  const lan = store.get('lan') || 'en-US';
  const languages = new Map();
  languages
    .set('zh-CN', zh_CN)
    .set('en-US', en_US)
    .set('id-ID', id_ID);
  let currentLan = languages.get(lan);
  setLocale(lan);
  return currentLan;
};
