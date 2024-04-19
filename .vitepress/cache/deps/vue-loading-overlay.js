import {
  init_vue_runtime_esm_bundler,
  vue_runtime_esm_bundler_exports
} from "./chunk-D3RO7MMV.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-NIBQISYW.js";

// node_modules/vue-loading-overlay/dist/index.js
var require_dist = __commonJS({
  "node_modules/vue-loading-overlay/dist/index.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory((init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports)));
      else if (typeof define === "function" && define.amd)
        define("VueLoading", ["vue"], factory);
      else if (typeof exports === "object")
        exports["VueLoading"] = factory((init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports)));
      else
        root["VueLoading"] = factory(root["Vue"]);
    })(exports, (__WEBPACK_EXTERNAL_MODULE__976__) => {
      return (
        /******/
        (() => {
          "use strict";
          var __webpack_modules__ = {
            /***/
            878: (
              /***/
              (__unused_webpack_module, exports2) => {
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2["default"] = (sfc, props) => {
                  const target = sfc.__vccOpts || sfc;
                  for (const [key, val] of props) {
                    target[key] = val;
                  }
                  return target;
                };
              }
            ),
            /***/
            976: (
              /***/
              (module2) => {
                module2.exports = __WEBPACK_EXTERNAL_MODULE__976__;
              }
            )
            /******/
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          (() => {
            __webpack_require__.d = (exports2, definition) => {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          })();
          (() => {
            __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
          })();
          (() => {
            __webpack_require__.r = (exports2) => {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
          })();
          var __webpack_exports__ = {};
          (() => {
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, {
              Component: () => (
                /* reexport */
                Component
              ),
              LoadingPlugin: () => (
                /* binding */
                LoadingPlugin
              ),
              "default": () => (
                /* binding */
                src
              ),
              useLoading: () => (
                /* reexport */
                useLoading
              )
            });
            var external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_ = __webpack_require__(976);
            ;
            function removeElement(el) {
              var _a;
              if (typeof el.remove !== "undefined") {
                el.remove();
              } else {
                (_a = el.parentNode) == null ? void 0 : _a.removeChild(el);
              }
            }
            function createComponent(component, props, parentContainer) {
              let slots = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
              const vNode = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.h)(component, props, slots);
              const container = document.createElement("div");
              container.classList.add("vld-container");
              parentContainer.appendChild(container);
              (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.render)(vNode, container);
              return vNode.component;
            }
            function hasWindow() {
              return typeof window !== "undefined";
            }
            const MayBeHTMLElement = hasWindow() ? window.HTMLElement : Object;
            ;
            const _hoisted_1 = ["aria-busy"];
            const _hoisted_2 = {
              class: "vl-icon"
            };
            function render(_ctx, _cache, $props, $setup, $data, $options) {
              return (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createBlock)(external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.Transition, {
                name: _ctx.transition
              }, {
                default: (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.withCtx)(() => [(0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.withDirectives)((0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createElementVNode)("div", {
                  tabindex: "0",
                  class: (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.normalizeClass)(["vl-overlay vl-active", {
                    "vl-full-page": _ctx.isFullPage
                  }]),
                  "aria-busy": _ctx.isActive,
                  "aria-label": "Loading",
                  style: (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.normalizeStyle)({
                    zIndex: _ctx.zIndex
                  })
                }, [(0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createElementVNode)("div", {
                  class: "vl-background",
                  onClick: _cache[0] || (_cache[0] = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.withModifiers)(function() {
                    return _ctx.cancel && _ctx.cancel(...arguments);
                  }, ["prevent"])),
                  style: (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.normalizeStyle)(_ctx.bgStyle)
                }, null, 4), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createElementVNode)("div", _hoisted_2, [(0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.renderSlot)(_ctx.$slots, "before"), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.renderSlot)(_ctx.$slots, "default", {}, () => [((0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createBlock)((0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.resolveDynamicComponent)(_ctx.loader), {
                  color: _ctx.color,
                  width: _ctx.width,
                  height: _ctx.height
                }, null, 8, ["color", "width", "height"]))]), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.renderSlot)(_ctx.$slots, "after")])], 14, _hoisted_1), [[external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.vShow, _ctx.isActive]])]),
                _: 3
              }, 8, ["name"]);
            }
            ;
            ;
            const trapFocusMixin = {
              mounted() {
                if (this.enforceFocus) {
                  document.addEventListener("focusin", this.focusIn);
                }
              },
              methods: {
                focusIn(event) {
                  if (!this.isActive)
                    return;
                  if (
                    // Event target is the loading div element itself
                    event.target === this.$el || // Event target is inside the loading div
                    this.$el.contains(event.target)
                  )
                    return;
                  let parent = this.container ? this.container : this.isFullPage ? null : this.$el.parentElement;
                  if (
                    // Always prevent when loading is full screen
                    this.isFullPage || // When a parent exist means loader is running inside a container
                    // When loading is NOT full screen and event target is inside the given container
                    parent && parent.contains(event.target)
                  ) {
                    event.preventDefault();
                    this.$el.focus();
                  }
                }
              },
              beforeUnmount() {
                document.removeEventListener("focusin", this.focusIn);
              }
            };
            ;
            const spinnervue_type_template_id_1ed0a811_hoisted_1 = ["width", "height", "stroke"];
            const spinnervue_type_template_id_1ed0a811_hoisted_2 = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createStaticVNode)('<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite"></animateTransform></path></g></g>', 1);
            const _hoisted_3 = [spinnervue_type_template_id_1ed0a811_hoisted_2];
            function spinnervue_type_template_id_1ed0a811_render(_ctx, _cache, $props, $setup, $data, $options) {
              return (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createElementBlock)("svg", {
                viewBox: "0 0 38 38",
                xmlns: "http://www.w3.org/2000/svg",
                width: _ctx.width,
                height: _ctx.height,
                stroke: _ctx.color
              }, _hoisted_3, 8, spinnervue_type_template_id_1ed0a811_hoisted_1);
            }
            ;
            ;
            const spinnervue_type_script_lang_js = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.defineComponent)({
              name: "spinner",
              props: {
                color: {
                  type: String,
                  default: "#000"
                },
                height: {
                  type: Number,
                  default: 64
                },
                width: {
                  type: Number,
                  default: 64
                }
              }
            });
            ;
            var exportHelper = __webpack_require__(878);
            ;
            ;
            const __exports__ = (0, exportHelper["default"])(spinnervue_type_script_lang_js, [["render", spinnervue_type_template_id_1ed0a811_render]]);
            const spinner = __exports__;
            ;
            const dotsvue_type_template_id_6ecfb4ba_hoisted_1 = ["fill", "width", "height"];
            const dotsvue_type_template_id_6ecfb4ba_hoisted_2 = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createStaticVNode)('<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>', 3);
            const _hoisted_5 = [dotsvue_type_template_id_6ecfb4ba_hoisted_2];
            function dotsvue_type_template_id_6ecfb4ba_render(_ctx, _cache, $props, $setup, $data, $options) {
              return (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createElementBlock)("svg", {
                viewBox: "0 0 120 30",
                xmlns: "http://www.w3.org/2000/svg",
                fill: _ctx.color,
                width: _ctx.width,
                height: _ctx.height
              }, _hoisted_5, 8, dotsvue_type_template_id_6ecfb4ba_hoisted_1);
            }
            ;
            ;
            const dotsvue_type_script_lang_js = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.defineComponent)({
              name: "dots",
              props: {
                color: {
                  type: String,
                  default: "#000"
                },
                height: {
                  type: Number,
                  default: 240
                },
                width: {
                  type: Number,
                  default: 60
                }
              }
            });
            ;
            ;
            ;
            const dots_exports_ = (0, exportHelper["default"])(dotsvue_type_script_lang_js, [["render", dotsvue_type_template_id_6ecfb4ba_render]]);
            const dots = dots_exports_;
            ;
            const barsvue_type_template_id_f81ac1c0_hoisted_1 = ["height", "width", "fill"];
            const barsvue_type_template_id_f81ac1c0_hoisted_2 = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createStaticVNode)('<rect x="0" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="10" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="20" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>', 3);
            const barsvue_type_template_id_f81ac1c0_hoisted_5 = [barsvue_type_template_id_f81ac1c0_hoisted_2];
            function barsvue_type_template_id_f81ac1c0_render(_ctx, _cache, $props, $setup, $data, $options) {
              return (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.openBlock)(), (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.createElementBlock)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 30 30",
                height: _ctx.height,
                width: _ctx.width,
                fill: _ctx.color
              }, barsvue_type_template_id_f81ac1c0_hoisted_5, 8, barsvue_type_template_id_f81ac1c0_hoisted_1);
            }
            ;
            ;
            const barsvue_type_script_lang_js = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.defineComponent)({
              name: "bars",
              props: {
                color: {
                  type: String,
                  default: "#000"
                },
                height: {
                  type: Number,
                  default: 40
                },
                width: {
                  type: Number,
                  default: 40
                }
              }
            });
            ;
            ;
            ;
            const bars_exports_ = (0, exportHelper["default"])(barsvue_type_script_lang_js, [["render", barsvue_type_template_id_f81ac1c0_render]]);
            const bars = bars_exports_;
            ;
            const loaders = {
              Spinner: spinner,
              Dots: dots,
              Bars: bars
            };
            ;
            const Componentvue_type_script_lang_js = (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.defineComponent)({
              name: "VueLoading",
              mixins: [trapFocusMixin],
              props: {
                active: Boolean,
                programmatic: Boolean,
                container: [Object, Function, MayBeHTMLElement],
                isFullPage: {
                  type: Boolean,
                  default: true
                },
                enforceFocus: {
                  type: Boolean,
                  default: true
                },
                lockScroll: Boolean,
                transition: {
                  type: String,
                  default: "fade"
                },
                /**
                 * Allow user to hide the loader
                 */
                canCancel: Boolean,
                /**
                 * Do something on cancel
                 */
                onCancel: {
                  type: Function,
                  default: () => {
                  }
                },
                color: String,
                backgroundColor: String,
                opacity: Number,
                width: Number,
                height: Number,
                zIndex: Number,
                loader: {
                  type: String,
                  default: "spinner"
                }
              },
              components: loaders,
              emits: ["hide", "update:active"],
              data() {
                return {
                  // Don't mutate the prop
                  isActive: this.active
                };
              },
              mounted() {
                document.addEventListener("keyup", this.keyPress);
              },
              methods: {
                /**
                 * Proxy to hide() method.
                 * Gets called by ESC button or when click outside
                 */
                cancel() {
                  if (!this.canCancel || !this.isActive)
                    return;
                  this.hide();
                  this.onCancel.apply(null, arguments);
                },
                /**
                 * Hide and destroy component if it's programmatic.
                 */
                hide() {
                  this.$emit("hide");
                  this.$emit("update:active", false);
                  if (this.programmatic) {
                    this.isActive = false;
                    setTimeout(() => {
                      const parent = this.$el.parentElement;
                      (0, external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_.render)(null, parent);
                      removeElement(parent);
                    }, 150);
                  }
                },
                disableScroll() {
                  if (this.isFullPage && this.lockScroll) {
                    document.body.classList.add("vl-shown");
                  }
                },
                enableScroll() {
                  if (this.isFullPage && this.lockScroll) {
                    document.body.classList.remove("vl-shown");
                  }
                },
                /**
                 * Key press event to hide on ESC.
                 */
                keyPress(event) {
                  if (event.keyCode === 27)
                    this.cancel();
                }
              },
              watch: {
                active(value) {
                  this.isActive = value;
                },
                isActive: {
                  handler(value) {
                    if (value) {
                      this.disableScroll();
                    } else {
                      this.enableScroll();
                    }
                  },
                  immediate: true
                }
              },
              computed: {
                bgStyle() {
                  return {
                    background: this.backgroundColor,
                    opacity: this.opacity
                  };
                }
              },
              beforeUnmount() {
                document.removeEventListener("keyup", this.keyPress);
              }
            });
            ;
            ;
            ;
            const Component_exports_ = (0, exportHelper["default"])(Componentvue_type_script_lang_js, [["render", render]]);
            const Component = Component_exports_;
            ;
            function useLoading() {
              let globalProps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              let globalSlots = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              return {
                show() {
                  let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : globalProps;
                  let slots = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : globalSlots;
                  const forceProps = {
                    programmatic: true,
                    lockScroll: true,
                    isFullPage: false,
                    active: true
                  };
                  const propsData = {
                    ...globalProps,
                    ...props,
                    ...forceProps
                  };
                  let container = propsData.container;
                  if (!propsData.container) {
                    container = document.body;
                    propsData.isFullPage = true;
                  }
                  const mergedSlots = {
                    ...globalSlots,
                    ...slots
                  };
                  const instance = createComponent(Component, propsData, container, mergedSlots);
                  return {
                    hide: instance.ctx.hide
                  };
                }
              };
            }
            ;
            const LoadingPlugin = function(app) {
              let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              let slots = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              const instance = useLoading(props, slots);
              app.config.globalProperties.$loading = instance;
              app.provide("$loading", instance);
            };
            const src = Component;
          })();
          return __webpack_exports__;
        })()
      );
    });
  }
});
export default require_dist();
//# sourceMappingURL=vue-loading-overlay.js.map
