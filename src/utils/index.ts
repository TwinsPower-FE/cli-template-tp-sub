export const FormDataStore1: any = function (
  id: string, // 例：'${用户id}-${表单名称}'
  expire: number = 1000 * 60 * 60 * 24, // 过期时长，单位ms，默认24小时
): any {
  interface Data {
    expireTime: number;
    data: any;
  }

  const localKey = 'FormDataStore';
  const clear = (store: any) => {
    delete store[id];
    localStorage.setItem(localKey, JSON.stringify(store));
  };
  const isExpire = (data: Data): boolean => {
    return data.expireTime < new Date().getTime();
  };
  const set = (value: any = '') => {
    if (value === null) return;
    let result = {
      ...get(true),
      [id]: {
        expireTime: new Date().getTime() + expire,
        data: value,
      },
    };
    localStorage.setItem(localKey, JSON.stringify(result));
  };
  const get = (isAll: boolean = false) => {
    let storeStr = localStorage.getItem(localKey) ?? '{}';
    let store = JSON.parse(storeStr);
    if (isAll === true) return store;

    let data: Data | null = store[id] ?? null;
    if (data === null) return null;
    let expired = isExpire(store[id]);
    expired && clear(store);
    return expired ? null : data.data;
  };
  return { localKey, id, expire, set, get, clear, isExpire };
};
interface Data {
  expireTime: number;
  data: any;
}
export class FormDataStore {
  id: string; // 例：'${用户id}-${表单名称}'
  expire: number; // 过期时长，单位ms，默认24小时
  localKey: string = 'FormDataStore';

  constructor(id: string, expire: number = 1000 * 60 * 60 * 24) {
    this.id = id;
    this.expire = expire;
  }

  clear = (store: any) => {
    delete store[this.id];
    localStorage.setItem(this.localKey, JSON.stringify(store));
  };
  isExpire = (data: Data): boolean => data.expireTime < new Date().getTime();
  set = (value: any = '') => {
    if (value === null) return;
    let result = {
      ...this.get(true),
      [this.id]: {
        expireTime: new Date().getTime() + this.expire,
        data: value,
      },
    };
    localStorage.setItem(this.localKey, JSON.stringify(result));
  };
  get = (isAll: boolean = false) => {
    let storeStr = localStorage.getItem(this.localKey) ?? '{}';
    let store = JSON.parse(storeStr);
    if (isAll === true) return store;

    let data: Data | null = store[this.id] ?? null;
    if (data === null) return null;
    let expired = this.isExpire(store[this.id]);
    expired && this.clear(store);
    return expired ? null : data.data;
  };
}

export function formatDate(
  timestamp: number | string,
  format?: 'all' | 'date' | 'time',
): any {
  if (!isNaN(+timestamp)) timestamp = Number(timestamp);
  let now = new Date(timestamp);
  let {
    yy = now.getFullYear(),
    MM = '',
    dd = '',
    hh = '',
    mm = '',
    ss = '',
  } = {};
  let month = now.getMonth() + 1;
  month >= 10 ? (MM = `${month}`) : (MM = '0' + month); //判断小于10月份的情况
  let day = now.getDate();
  day >= 10 ? (dd = `${day}`) : (dd = '0' + day); //判断小于10日的情况
  let hour = now.getHours();
  hour >= 10 ? (hh = `${hour}`) : (hh = '0' + hour); //判断小于10的时的情况
  let minute = now.getMinutes();
  minute >= 10 ? (mm = `${minute}`) : (mm = '0' + minute); //判断小于10的分的情况
  let second = now.getSeconds();
  second >= 10 ? (ss = `${second}`) : (ss = '0' + second); //判断小于10的秒的情况

  const [date, time] = [`${yy}-${MM}-${dd}`, `${hh}:${mm}:${ss}`];
  return format
    ? {
        all: { date, time },
        date,
        time,
      }[format]
    : `${date} ${time}`;
}
