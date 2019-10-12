import { formatMessage as trans, getLocale } from 'umi-plugin-locale';
import md5 from 'blueimp-md5';
import baseConf from '_conf';

/**
 * 逐一验证表单数据
 * @param form type: Object; rc-form
 * @param formItemArr type: Array;  form configs 因表单按照顺序进行校验，所以name要按照顺序配置;
 * @return promise
 * */
export const checkForm = (form, formItemArr) => {
  const { getFieldsValue, validateFields, getFieldError } = form;
  return new Promise((resolve, reject) => {
    const fields = formItemArr && formItemArr.map(item => item.name) || Object.keys(getFieldsValue());
    let breakFlag = false;
    fields.map((item) => {
      if (!breakFlag) {
        validateFields([item], (error) => {
          if (error) {
            let errMsg = getFieldError(item);
            breakFlag = true;
            reject(errMsg);
          }
        });
      }
    });
    if (!breakFlag) {
      resolve(getFieldsValue());
    }
  })
};

/**
 * 日期格式化
 * @param date type: Date
 * @param type string [hm|hms]
 * @return string YYYY-MM-DD, YYYY-MM-DD HH:mm, YYYY-MM-DD HH:mm:ss
 * */
export const formatDate = (date, type = 'default') => {
  if (!date) return '';
  const formatType = new Map();
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() > 8 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
  const day = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;
  const hours = d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`;
  const min = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`;
  const sec = d.getSeconds() > 9 ? d.getMinutes() : `0${d.getSeconds()}`;
  formatType
    .set('default', `${year}-${month}-${day}`)
    .set('hm', `${year}-${month}-${day} ${hours}:${min}`)
    .set('hms', `${year}-${month}-${day} ${hours}:${min}:${sec}`);
  return formatType.get(type);
};

/**
 * 弹框提示错误信息
 * @param type 二选一 ['fillError', 'chooseError']
 * @param label 栏位名称
 * @return string
 * */
export const alertErr = (type, label) => {
  return trans({
    id: type,
  }, { label: trans({ id: label }) });
};

/**
 * 语言国际化
 * @param id type string
 * @return string
 * */
export const i18n = (id) => {
  return trans({ id });
};

/**
 * 获取当前语言标识
 * @return current language
 * */
export const localI18n = () => {
  return getLocale();
};

/**
 * crm 服务数据md5加密
 * @param data
 * @return string md5
 * */
export const md5Data = (data) => {
  return data ? md5(data+baseConf.md5) : md5(baseConf.md5);
};

/**
 * 转换地址数据结构配置
 * @param {Array} source address.json
 * @return {Array} address [{label: '', value: '', children: []}]
 * */
export const convertAddress = (source) => {
  return source.map(item => {
    return {
      label: item.n,
      value: item.n,
      children: [
        ...item.l.map(va => {
          return {
            label: va.n,
            value: va.n,
            children: [
              ...va.l.map(v => {
                return {
                  label: v.n,
                  value: v.n
                }
              })
            ]
          }
        })
      ]
    }
  });
};

/**
 * 金额格式化
 * @param {string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} dec_point 小数点符号
 * @param {string} thousands_sep 千分位符号
 * */
export const formatMoney = (number, decimals = 0, dec_point, thousands_sep) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      let k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  let re = /(-?\d+)(\d{3})/;
  while(re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};

/**
 * 转换 files 格式
 * @param {array} files 文件列表
 * @param {string} field 字段名前缀
 * @param {boolean} replacePrefix 是否替换 base64 前缀
 */
export const files2Payload = (files, field = 'key', replacePrefix = true) => {
  return files.reduce((acc, file, index) => {
    const key = `${field}${index + 1}`;
    const url = file.url || file;
    const imgStr = replacePrefix ? url.replace('data:image/png;base64,', '') : url;
    acc.fileKeys = acc.fileKeys || [];
    acc[key] = imgStr;
    acc.fileKeys.push(key);
    return acc
  }, {})
};

/**
 * 解析婚姻状态印尼语为英文
 * @param {string} status 婚姻状态
 */
export const convertMaritalStatus = (status) => {
  const single = 'BELUM KAWIN';
  const married = 'KAWIMN';
  const divorced = 'CERAI HIDUP';
  const widowed = 'CERAI MATI';
  switch (status) {
    case single:
      return 'Single';
      break;
    case married:
      return 'Married';
      break;
    case divorced:
      return 'Divorced';
      break;
    case widowed:
      return 'Widowed';
      break;
    default:
      return status;
  }
};
