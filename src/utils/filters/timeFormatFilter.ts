import Vue from 'vue';

export const timeFormatFilter = Vue.filter('timeFormatFilter', (value: number): string => {
  return value < 10 ? `0${value}` : String(value);
});
