import Vue from 'vue'
import moment from 'moment'
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

import vi from 'vee-validate/dist/locale/vi.json'

localize('vi', vi)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
extend('after', (value, args) => {
  if (moment(value).isAfter(moment(args[0]))) {
    return true;
  }
  return `Ngày chọn phải lớn hơn ${args[0]}`;
});

extend('afterHourTime', (value, args) => {
  const dateTime = moment(args[0]).format('YYYY-MM-DD');
  var d = new Date();
  var seconds = (d.getSeconds()<10?'0':'') + d.getSeconds();
  const valueCheck = (dateTime + ' ' + value).concat(':' + seconds);
  if (moment(valueCheck).isAfter(moment())) {
    return true;
  }
  return `Giờ hẹn phải muộn hơn giờ hiện tại`;
});
extend('before', (value, args) => {
  console.log('before:', args[0])
  if (moment(value).isBefore(moment(args[0]))) {
    return true;
  }

  return `Ngày chọn phải nhỏ hơn ${args[0]}`;
});
extend('is_not', (value, args) => {
  console.log(value, args)
  if (typeof(args.other) == 'object') {
    if (value.id == args.other.id) {
      return `Phải chọn giá trị khác ${args.other.name}`
    }
    return true
  } else {
    if (value == args.other) {
      return `Nhập sđt khác ${args.other}`
    }
    return true
  }
});
extend('isHour', (value) => {
  const regexHourFomat = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if (regexHourFomat.test(value)) {
    return true;
  }
  return `Giờ hẹn phải đúng định dạng: 09:02, 15:49`;
});
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
