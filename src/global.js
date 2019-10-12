import 'amfe-flexible';
import FastClick from 'libs/fastClick';
// Initialize fastclick
document.addEventListener(
  'DOMContentLoaded',
  () => {
    FastClick.attach(document.body);
  },
  false,
);
