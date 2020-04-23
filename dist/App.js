;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AddPlayerCard = require('../components/AddPlayerCard.vue');

var _AddPlayerCard2 = _interopRequireDefault(_AddPlayerCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'app',
  components: {
    AddPlayerCard: _AddPlayerCard2.default
  },
  mounted: function mounted() {
    console.log("Is this working?");
    initReveal();
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"reveal",attrs:{"id":"app"}},[_c('div',{staticClass:"slides"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_vm._m(2),_vm._v(" "),_vm._m(3),_vm._v(" "),_vm._m(4),_vm._v(" "),_c('add-player-card',{attrs:{"message":"This is working."}})],1)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"intro",attrs:{"data-background-video":"images/intro.mp4","data-background-color":"#000","data-background-video-muted":"","data-background-video-loop":""}},[_c('div',{staticClass:"title"},[_c('img',{staticStyle:{"margin-top":"7em"},attrs:{"src":"images/covid_catchphrase.png"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"intro",attrs:{"data-background-video":"images/instructions.mp4","data-background-color":"#000","data-background-video-muted":"","data-background-video-loop":""}},[_c('h1',[_vm._v("Headsup!")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{attrs:{"data-background-image":"images/zoom.gif"}},[_c('h1',[_vm._v("Zoom")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('h3',{staticClass:"fragment"},[_vm._v("Two Teams")]),_vm._v(" "),_c('h3',{staticClass:"fragment"},[_vm._v("Alternate scoring")]),_vm._v(" "),_c('h3',{staticClass:"fragment"},[_vm._v("Contestant")]),_vm._v(" "),_c('h3',{staticClass:"fragment"},[_vm._v("2 Minute")]),_vm._v(" "),_c('h1',[_vm._v("Gameplay")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('h1',[_vm._v("Demo")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b745cf2", __vue__options__)
  } else {
    hotAPI.reload("data-v-4b745cf2", __vue__options__)
  }
})()}