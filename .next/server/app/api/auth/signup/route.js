"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/signup/route";
exports.ids = ["app/api/auth/signup/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_anonymous_Downloads_xmas_tree_src_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/signup/route.ts */ \"(rsc)/./src/app/api/auth/signup/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/signup/route\",\n        pathname: \"/api/auth/signup\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/signup/route\"\n    },\n    resolvedPagePath: \"/Users/anonymous/Downloads/xmas-tree/src/app/api/auth/signup/route.ts\",\n    nextConfigOutput,\n    userland: _Users_anonymous_Downloads_xmas_tree_src_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/signup/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnNpZ251cCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFub255bW91cyUyRkRvd25sb2FkcyUyRnhtYXMtdHJlZSUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZhbm9ueW1vdXMlMkZEb3dubG9hZHMlMkZ4bWFzLXRyZWUmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3FCO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veG1hcy10cmVlLXNob3AtMjAyNS8/Y2Y2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvYW5vbnltb3VzL0Rvd25sb2Fkcy94bWFzLXRyZWUvc3JjL2FwcC9hcGkvYXV0aC9zaWdudXAvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvc2lnbnVwL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9zaWdudXBcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvc2lnbnVwL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2Fub255bW91cy9Eb3dubG9hZHMveG1hcy10cmVlL3NyYy9hcHAvYXBpL2F1dGgvc2lnbnVwL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL3NpZ251cC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/signup/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/auth/signup/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./src/lib/supabase.ts\");\n\n\nasync function POST(req) {\n    try {\n        const { name, email, password } = await req.json();\n        if (!name || !email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabaseAdmin.auth.admin.createUser({\n            email,\n            password,\n            user_metadata: {\n                name\n            },\n            email_confirm: true\n        });\n        if (error) {\n            console.error(\"Supabase signup error:\", error);\n            // Check for a specific error, like user already exists\n            if (error.message.includes(\"already exists\")) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"User already exists\"\n                }, {\n                    status: 409\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: error.message\n            }, {\n                status: 500\n            });\n        }\n        const user = data.user;\n        // Also add the user to the public 'users' table\n        const { error: insertError } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabaseAdmin.from(\"users\").insert({\n            id: user.id,\n            name: user.user_metadata.name,\n            email: user.email\n        });\n        if (insertError) {\n            console.error(\"Error inserting user into public table:\", insertError);\n            // If user creation in auth succeeded but public table insert failed,\n            // it's best to delete the auth user to avoid inconsistent state.\n            await _lib_supabase__WEBPACK_IMPORTED_MODULE_1__.supabaseAdmin.auth.admin.deleteUser(user.id);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to create user profile.\"\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            user: {\n                id: user.id,\n                name: user.user_metadata.name,\n                email: user.email\n            }\n        });\n    } catch (e) {\n        console.error(\"Signup route error:\", e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL3NpZ251cC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0Q7QUFDVDtBQUV4QyxlQUFlRSxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUgsSUFBSUksSUFBSTtRQUNoRCxJQUFJLENBQUNILFFBQVEsQ0FBQ0MsU0FBUyxDQUFDQyxVQUFVO1lBQ2hDLE9BQU9OLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBMEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQy9FO1FBQ0EsTUFBTSxFQUFFQyxJQUFJLEVBQUVGLEtBQUssRUFBRSxHQUFHLE1BQU1QLHdEQUFhQSxDQUFDVSxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsVUFBVSxDQUFDO1lBQ2hFUjtZQUNBQztZQUNBUSxlQUFlO2dCQUFFVjtZQUFLO1lBQ3RCVyxlQUFlO1FBQ2pCO1FBRUEsSUFBSVAsT0FBTztZQUNUUSxRQUFRUixLQUFLLENBQUMsMEJBQTBCQTtZQUN4Qyx1REFBdUQ7WUFDdkQsSUFBSUEsTUFBTVMsT0FBTyxDQUFDQyxRQUFRLENBQUMsbUJBQW1CO2dCQUMxQyxPQUFPbEIscURBQVlBLENBQUNPLElBQUksQ0FBQztvQkFBRUMsT0FBTztnQkFBc0IsR0FBRztvQkFBRUMsUUFBUTtnQkFBSTtZQUM3RTtZQUNBLE9BQU9ULHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVDLE9BQU9BLE1BQU1TLE9BQU87WUFBQyxHQUFHO2dCQUFFUixRQUFRO1lBQUk7UUFDbkU7UUFFQSxNQUFNVSxPQUFPVCxLQUFLUyxJQUFJO1FBRXRCLGdEQUFnRDtRQUNoRCxNQUFNLEVBQUVYLE9BQU9ZLFdBQVcsRUFBRSxHQUFHLE1BQU1uQix3REFBYUEsQ0FDL0NvQixJQUFJLENBQUMsU0FDTEMsTUFBTSxDQUFDO1lBQ05DLElBQUlKLEtBQUtJLEVBQUU7WUFDWG5CLE1BQU1lLEtBQUtMLGFBQWEsQ0FBQ1YsSUFBSTtZQUM3QkMsT0FBT2MsS0FBS2QsS0FBSztRQUNuQjtRQUVGLElBQUllLGFBQWE7WUFDZkosUUFBUVIsS0FBSyxDQUFDLDJDQUEyQ1k7WUFDekQscUVBQXFFO1lBQ3JFLGlFQUFpRTtZQUNqRSxNQUFNbkIsd0RBQWFBLENBQUNVLElBQUksQ0FBQ0MsS0FBSyxDQUFDWSxVQUFVLENBQUNMLEtBQUtJLEVBQUU7WUFDakQsT0FBT3ZCLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RGO1FBRUEsT0FBT1QscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFWSxNQUFNO2dCQUFFSSxJQUFJSixLQUFLSSxFQUFFO2dCQUFFbkIsTUFBTWUsS0FBS0wsYUFBYSxDQUFDVixJQUFJO2dCQUFFQyxPQUFPYyxLQUFLZCxLQUFLO1lBQUM7UUFBRTtJQUNyRyxFQUFFLE9BQU9vQixHQUFHO1FBQ1ZULFFBQVFSLEtBQUssQ0FBQyx1QkFBdUJpQjtRQUNyQyxPQUFPekIscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3htYXMtdHJlZS1zaG9wLTIwMjUvLi9zcmMvYXBwL2FwaS9hdXRoL3NpZ251cC9yb3V0ZS50cz9mZjA4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBzdXBhYmFzZUFkbWluIH0gZnJvbSAnQC9saWIvc3VwYWJhc2UnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgaWYgKCFuYW1lIHx8ICFlbWFpbCB8fCAhcGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHMnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5jcmVhdGVVc2VyKHtcbiAgICAgIGVtYWlsLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICB1c2VyX21ldGFkYXRhOiB7IG5hbWUgfSxcbiAgICAgIGVtYWlsX2NvbmZpcm06IHRydWUsIC8vIFNldCB0byB0cnVlIHRvIHNlbmQgYSBjb25maXJtYXRpb24gZW1haWxcbiAgICB9KTtcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignU3VwYWJhc2Ugc2lnbnVwIGVycm9yOicsIGVycm9yKTtcbiAgICAgIC8vIENoZWNrIGZvciBhIHNwZWNpZmljIGVycm9yLCBsaWtlIHVzZXIgYWxyZWFkeSBleGlzdHNcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCdhbHJlYWR5IGV4aXN0cycpKSB7XG4gICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVc2VyIGFscmVhZHkgZXhpc3RzJyB9LCB7IHN0YXR1czogNDA5IH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyID0gZGF0YS51c2VyO1xuXG4gICAgLy8gQWxzbyBhZGQgdGhlIHVzZXIgdG8gdGhlIHB1YmxpYyAndXNlcnMnIHRhYmxlXG4gICAgY29uc3QgeyBlcnJvcjogaW5zZXJ0RXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW5cbiAgICAgIC5mcm9tKCd1c2VycycpXG4gICAgICAuaW5zZXJ0KHtcbiAgICAgICAgaWQ6IHVzZXIuaWQsIFxuICAgICAgICBuYW1lOiB1c2VyLnVzZXJfbWV0YWRhdGEubmFtZSxcbiAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICB9KTtcblxuICAgIGlmIChpbnNlcnRFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5zZXJ0aW5nIHVzZXIgaW50byBwdWJsaWMgdGFibGU6JywgaW5zZXJ0RXJyb3IpO1xuICAgICAgLy8gSWYgdXNlciBjcmVhdGlvbiBpbiBhdXRoIHN1Y2NlZWRlZCBidXQgcHVibGljIHRhYmxlIGluc2VydCBmYWlsZWQsXG4gICAgICAvLyBpdCdzIGJlc3QgdG8gZGVsZXRlIHRoZSBhdXRoIHVzZXIgdG8gYXZvaWQgaW5jb25zaXN0ZW50IHN0YXRlLlxuICAgICAgYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmRlbGV0ZVVzZXIodXNlci5pZCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBjcmVhdGUgdXNlciBwcm9maWxlLicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyB1c2VyOiB7IGlkOiB1c2VyLmlkLCBuYW1lOiB1c2VyLnVzZXJfbWV0YWRhdGEubmFtZSwgZW1haWw6IHVzZXIuZW1haWwgfSB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1NpZ251cCByb3V0ZSBlcnJvcjonLCBlKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1NlcnZlciBlcnJvcicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInN1cGFiYXNlQWRtaW4iLCJQT1NUIiwicmVxIiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJkYXRhIiwiYXV0aCIsImFkbWluIiwiY3JlYXRlVXNlciIsInVzZXJfbWV0YWRhdGEiLCJlbWFpbF9jb25maXJtIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsInVzZXIiLCJpbnNlcnRFcnJvciIsImZyb20iLCJpbnNlcnQiLCJpZCIsImRlbGV0ZVVzZXIiLCJlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/signup/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/supabase.ts":
/*!*****************************!*\
  !*** ./src/lib/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   supabase: () => (/* binding */ supabase),\n/* harmony export */   supabaseAdmin: () => (/* binding */ supabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nconst supabaseUrl = \"https://nyykggssyasvxrtjhhhb.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eWtnZ3NzeWFzdnhydGpoaGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMjM5NDksImV4cCI6MjA3MDU5OTk0OX0.60hkCLL76yg0Bg9-W-le06lHnSwadeU74-xEpRPAqug\";\nconst supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n// Client for browser/client-side operations\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Admin client for server-side operations with elevated privileges\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseServiceKey, {\n    auth: {\n        autoRefreshToken: false,\n        persistSession: false\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supabase);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3N1cGFiYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBY0MsMENBQW9DO0FBQ3hELE1BQU1HLGtCQUFrQkgsa05BQXlDO0FBQ2pFLE1BQU1LLHFCQUFxQkwsUUFBUUMsR0FBRyxDQUFDSyx5QkFBeUI7QUFFaEUsNENBQTRDO0FBQ3JDLE1BQU1DLFdBQVdULG1FQUFZQSxDQUFDQyxhQUFhSSxpQkFBaUI7QUFFbkUsbUVBQW1FO0FBQzVELE1BQU1LLGdCQUFnQlYsbUVBQVlBLENBQUNDLGFBQWFNLG9CQUFvQjtJQUN6RUksTUFBTTtRQUNKQyxrQkFBa0I7UUFDbEJDLGdCQUFnQjtJQUNsQjtBQUNGLEdBQUc7QUFFSCxpRUFBZUosUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3htYXMtdHJlZS1zaG9wLTIwMjUvLi9zcmMvbGliL3N1cGFiYXNlLnRzPzA2ZTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkhO1xuY29uc3Qgc3VwYWJhc2VTZXJ2aWNlS2V5ID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSE7XG5cbi8vIENsaWVudCBmb3IgYnJvd3Nlci9jbGllbnQtc2lkZSBvcGVyYXRpb25zXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG5cbi8vIEFkbWluIGNsaWVudCBmb3Igc2VydmVyLXNpZGUgb3BlcmF0aW9ucyB3aXRoIGVsZXZhdGVkIHByaXZpbGVnZXNcbmV4cG9ydCBjb25zdCBzdXBhYmFzZUFkbWluID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZVNlcnZpY2VLZXksIHtcbiAgYXV0aDoge1xuICAgIGF1dG9SZWZyZXNoVG9rZW46IGZhbHNlLFxuICAgIHBlcnNpc3RTZXNzaW9uOiBmYWxzZVxuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc3VwYWJhc2U7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJzdXBhYmFzZVNlcnZpY2VLZXkiLCJTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIiwic3VwYWJhc2UiLCJzdXBhYmFzZUFkbWluIiwiYXV0aCIsImF1dG9SZWZyZXNoVG9rZW4iLCJwZXJzaXN0U2Vzc2lvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/supabase.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanonymous%2FDownloads%2Fxmas-tree&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();