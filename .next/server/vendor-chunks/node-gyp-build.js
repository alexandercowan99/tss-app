/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/node-gyp-build";
exports.ids = ["vendor-chunks/node-gyp-build"];
exports.modules = {

/***/ "(action-browser)/./node_modules/node-gyp-build/index.js":
/*!**********************************************!*\
  !*** ./node_modules/node-gyp-build/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const runtimeRequire =  true ? require : 0 // eslint-disable-line\nif (typeof runtimeRequire.addon === 'function') { // if the platform supports native resolving prefer that\n  module.exports = runtimeRequire.addon.bind(runtimeRequire)\n} else { // else use the runtime version here\n  module.exports = __webpack_require__(/*! ./node-gyp-build.js */ \"(action-browser)/./node_modules/node-gyp-build/node-gyp-build.js\")\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9ub2RlLWd5cC1idWlsZC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUIsS0FBeUMsR0FBRyxPQUF1QixHQUFHLENBQU87QUFDcEcsa0RBQWtEO0FBQ2xEO0FBQ0EsRUFBRSxPQUFPO0FBQ1QsRUFBRSxtSUFBK0M7QUFDakQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c3MtYXBwLy4vbm9kZV9tb2R1bGVzL25vZGUtZ3lwLWJ1aWxkL2luZGV4LmpzP2M2ZjkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcnVudGltZVJlcXVpcmUgPSB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyA9PT0gJ2Z1bmN0aW9uJyA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIDogcmVxdWlyZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5pZiAodHlwZW9mIHJ1bnRpbWVSZXF1aXJlLmFkZG9uID09PSAnZnVuY3Rpb24nKSB7IC8vIGlmIHRoZSBwbGF0Zm9ybSBzdXBwb3J0cyBuYXRpdmUgcmVzb2x2aW5nIHByZWZlciB0aGF0XG4gIG1vZHVsZS5leHBvcnRzID0gcnVudGltZVJlcXVpcmUuYWRkb24uYmluZChydW50aW1lUmVxdWlyZSlcbn0gZWxzZSB7IC8vIGVsc2UgdXNlIHRoZSBydW50aW1lIHZlcnNpb24gaGVyZVxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS1neXAtYnVpbGQuanMnKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/node-gyp-build/index.js\n");

/***/ }),

/***/ "(action-browser)/./node_modules/node-gyp-build/node-gyp-build.js":
/*!*******************************************************!*\
  !*** ./node_modules/node-gyp-build/node-gyp-build.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var fs = __webpack_require__(/*! fs */ \"fs\")\nvar path = __webpack_require__(/*! path */ \"path\")\nvar os = __webpack_require__(/*! os */ \"os\")\n\n// Workaround to fix webpack's build warnings: 'the request of a dependency is an expression'\nvar runtimeRequire =  true ? require : 0 // eslint-disable-line\n\nvar vars = (process.config && process.config.variables) || {}\nvar prebuildsOnly = !!process.env.PREBUILDS_ONLY\nvar abi = process.versions.modules // TODO: support old node where this is undef\nvar runtime = isElectron() ? 'electron' : (isNwjs() ? 'node-webkit' : 'node')\n\nvar arch = process.env.npm_config_arch || os.arch()\nvar platform = process.env.npm_config_platform || os.platform()\nvar libc = process.env.LIBC || (isAlpine(platform) ? 'musl' : 'glibc')\nvar armv = process.env.ARM_VERSION || (arch === 'arm64' ? '8' : vars.arm_version) || ''\nvar uv = (process.versions.uv || '').split('.')[0]\n\nmodule.exports = load\n\nfunction load (dir) {\n  return runtimeRequire(load.resolve(dir))\n}\n\nload.resolve = load.path = function (dir) {\n  dir = path.resolve(dir || '.')\n\n  try {\n    var name = runtimeRequire(path.join(dir, 'package.json')).name.toUpperCase().replace(/-/g, '_')\n    if (process.env[name + '_PREBUILD']) dir = process.env[name + '_PREBUILD']\n  } catch (err) {}\n\n  if (!prebuildsOnly) {\n    var release = getFirst(path.join(dir, 'build/Release'), matchBuild)\n    if (release) return release\n\n    var debug = getFirst(path.join(dir, 'build/Debug'), matchBuild)\n    if (debug) return debug\n  }\n\n  var prebuild = resolve(dir)\n  if (prebuild) return prebuild\n\n  var nearby = resolve(path.dirname(process.execPath))\n  if (nearby) return nearby\n\n  var target = [\n    'platform=' + platform,\n    'arch=' + arch,\n    'runtime=' + runtime,\n    'abi=' + abi,\n    'uv=' + uv,\n    armv ? 'armv=' + armv : '',\n    'libc=' + libc,\n    'node=' + process.versions.node,\n    process.versions.electron ? 'electron=' + process.versions.electron : '',\n     true ? 'webpack=true' : 0 // eslint-disable-line\n  ].filter(Boolean).join(' ')\n\n  throw new Error('No native build was found for ' + target + '\\n    loaded from: ' + dir + '\\n')\n\n  function resolve (dir) {\n    // Find matching \"prebuilds/<platform>-<arch>\" directory\n    var tuples = readdirSync(path.join(dir, 'prebuilds')).map(parseTuple)\n    var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0]\n    if (!tuple) return\n\n    // Find most specific flavor first\n    var prebuilds = path.join(dir, 'prebuilds', tuple.name)\n    var parsed = readdirSync(prebuilds).map(parseTags)\n    var candidates = parsed.filter(matchTags(runtime, abi))\n    var winner = candidates.sort(compareTags(runtime))[0]\n    if (winner) return path.join(prebuilds, winner.file)\n  }\n}\n\nfunction readdirSync (dir) {\n  try {\n    return fs.readdirSync(dir)\n  } catch (err) {\n    return []\n  }\n}\n\nfunction getFirst (dir, filter) {\n  var files = readdirSync(dir).filter(filter)\n  return files[0] && path.join(dir, files[0])\n}\n\nfunction matchBuild (name) {\n  return /\\.node$/.test(name)\n}\n\nfunction parseTuple (name) {\n  // Example: darwin-x64+arm64\n  var arr = name.split('-')\n  if (arr.length !== 2) return\n\n  var platform = arr[0]\n  var architectures = arr[1].split('+')\n\n  if (!platform) return\n  if (!architectures.length) return\n  if (!architectures.every(Boolean)) return\n\n  return { name, platform, architectures }\n}\n\nfunction matchTuple (platform, arch) {\n  return function (tuple) {\n    if (tuple == null) return false\n    if (tuple.platform !== platform) return false\n    return tuple.architectures.includes(arch)\n  }\n}\n\nfunction compareTuples (a, b) {\n  // Prefer single-arch prebuilds over multi-arch\n  return a.architectures.length - b.architectures.length\n}\n\nfunction parseTags (file) {\n  var arr = file.split('.')\n  var extension = arr.pop()\n  var tags = { file: file, specificity: 0 }\n\n  if (extension !== 'node') return\n\n  for (var i = 0; i < arr.length; i++) {\n    var tag = arr[i]\n\n    if (tag === 'node' || tag === 'electron' || tag === 'node-webkit') {\n      tags.runtime = tag\n    } else if (tag === 'napi') {\n      tags.napi = true\n    } else if (tag.slice(0, 3) === 'abi') {\n      tags.abi = tag.slice(3)\n    } else if (tag.slice(0, 2) === 'uv') {\n      tags.uv = tag.slice(2)\n    } else if (tag.slice(0, 4) === 'armv') {\n      tags.armv = tag.slice(4)\n    } else if (tag === 'glibc' || tag === 'musl') {\n      tags.libc = tag\n    } else {\n      continue\n    }\n\n    tags.specificity++\n  }\n\n  return tags\n}\n\nfunction matchTags (runtime, abi) {\n  return function (tags) {\n    if (tags == null) return false\n    if (tags.runtime && tags.runtime !== runtime && !runtimeAgnostic(tags)) return false\n    if (tags.abi && tags.abi !== abi && !tags.napi) return false\n    if (tags.uv && tags.uv !== uv) return false\n    if (tags.armv && tags.armv !== armv) return false\n    if (tags.libc && tags.libc !== libc) return false\n\n    return true\n  }\n}\n\nfunction runtimeAgnostic (tags) {\n  return tags.runtime === 'node' && tags.napi\n}\n\nfunction compareTags (runtime) {\n  // Precedence: non-agnostic runtime, abi over napi, then by specificity.\n  return function (a, b) {\n    if (a.runtime !== b.runtime) {\n      return a.runtime === runtime ? -1 : 1\n    } else if (a.abi !== b.abi) {\n      return a.abi ? -1 : 1\n    } else if (a.specificity !== b.specificity) {\n      return a.specificity > b.specificity ? -1 : 1\n    } else {\n      return 0\n    }\n  }\n}\n\nfunction isNwjs () {\n  return !!(process.versions && process.versions.nw)\n}\n\nfunction isElectron () {\n  if (process.versions && process.versions.electron) return true\n  if (process.env.ELECTRON_RUN_AS_NODE) return true\n  return typeof window !== 'undefined' && window.process && window.process.type === 'renderer'\n}\n\nfunction isAlpine (platform) {\n  return platform === 'linux' && fs.existsSync('/etc/alpine-release')\n}\n\n// Exposed for unit tests\n// TODO: move to lib\nload.parseTags = parseTags\nload.matchTags = matchTags\nload.compareTags = compareTags\nload.parseTuple = parseTuple\nload.matchTuple = matchTuple\nload.compareTuples = compareTuples\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9ub2RlLWd5cC1idWlsZC9ub2RlLWd5cC1idWlsZC5qcyIsIm1hcHBpbmdzIjoiQUFBQSxTQUFTLG1CQUFPLENBQUMsY0FBSTtBQUNyQixXQUFXLG1CQUFPLENBQUMsa0JBQU07QUFDekIsU0FBUyxtQkFBTyxDQUFDLGNBQUk7O0FBRXJCO0FBQ0EscUJBQXFCLEtBQXlDLEdBQUcsT0FBdUIsR0FBRyxDQUFPOztBQUVsRztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEtBQXlDLG9CQUFvQixDQUFFO0FBQ25FOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7QUFFZjs7QUFFQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c3MtYXBwLy4vbm9kZV9tb2R1bGVzL25vZGUtZ3lwLWJ1aWxkL25vZGUtZ3lwLWJ1aWxkLmpzPzkwZDMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBvcyA9IHJlcXVpcmUoJ29zJylcblxuLy8gV29ya2Fyb3VuZCB0byBmaXggd2VicGFjaydzIGJ1aWxkIHdhcm5pbmdzOiAndGhlIHJlcXVlc3Qgb2YgYSBkZXBlbmRlbmN5IGlzIGFuIGV4cHJlc3Npb24nXG52YXIgcnVudGltZVJlcXVpcmUgPSB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyA9PT0gJ2Z1bmN0aW9uJyA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIDogcmVxdWlyZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbnZhciB2YXJzID0gKHByb2Nlc3MuY29uZmlnICYmIHByb2Nlc3MuY29uZmlnLnZhcmlhYmxlcykgfHwge31cbnZhciBwcmVidWlsZHNPbmx5ID0gISFwcm9jZXNzLmVudi5QUkVCVUlMRFNfT05MWVxudmFyIGFiaSA9IHByb2Nlc3MudmVyc2lvbnMubW9kdWxlcyAvLyBUT0RPOiBzdXBwb3J0IG9sZCBub2RlIHdoZXJlIHRoaXMgaXMgdW5kZWZcbnZhciBydW50aW1lID0gaXNFbGVjdHJvbigpID8gJ2VsZWN0cm9uJyA6IChpc053anMoKSA/ICdub2RlLXdlYmtpdCcgOiAnbm9kZScpXG5cbnZhciBhcmNoID0gcHJvY2Vzcy5lbnYubnBtX2NvbmZpZ19hcmNoIHx8IG9zLmFyY2goKVxudmFyIHBsYXRmb3JtID0gcHJvY2Vzcy5lbnYubnBtX2NvbmZpZ19wbGF0Zm9ybSB8fCBvcy5wbGF0Zm9ybSgpXG52YXIgbGliYyA9IHByb2Nlc3MuZW52LkxJQkMgfHwgKGlzQWxwaW5lKHBsYXRmb3JtKSA/ICdtdXNsJyA6ICdnbGliYycpXG52YXIgYXJtdiA9IHByb2Nlc3MuZW52LkFSTV9WRVJTSU9OIHx8IChhcmNoID09PSAnYXJtNjQnID8gJzgnIDogdmFycy5hcm1fdmVyc2lvbikgfHwgJydcbnZhciB1diA9IChwcm9jZXNzLnZlcnNpb25zLnV2IHx8ICcnKS5zcGxpdCgnLicpWzBdXG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZFxuXG5mdW5jdGlvbiBsb2FkIChkaXIpIHtcbiAgcmV0dXJuIHJ1bnRpbWVSZXF1aXJlKGxvYWQucmVzb2x2ZShkaXIpKVxufVxuXG5sb2FkLnJlc29sdmUgPSBsb2FkLnBhdGggPSBmdW5jdGlvbiAoZGlyKSB7XG4gIGRpciA9IHBhdGgucmVzb2x2ZShkaXIgfHwgJy4nKVxuXG4gIHRyeSB7XG4gICAgdmFyIG5hbWUgPSBydW50aW1lUmVxdWlyZShwYXRoLmpvaW4oZGlyLCAncGFja2FnZS5qc29uJykpLm5hbWUudG9VcHBlckNhc2UoKS5yZXBsYWNlKC8tL2csICdfJylcbiAgICBpZiAocHJvY2Vzcy5lbnZbbmFtZSArICdfUFJFQlVJTEQnXSkgZGlyID0gcHJvY2Vzcy5lbnZbbmFtZSArICdfUFJFQlVJTEQnXVxuICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgaWYgKCFwcmVidWlsZHNPbmx5KSB7XG4gICAgdmFyIHJlbGVhc2UgPSBnZXRGaXJzdChwYXRoLmpvaW4oZGlyLCAnYnVpbGQvUmVsZWFzZScpLCBtYXRjaEJ1aWxkKVxuICAgIGlmIChyZWxlYXNlKSByZXR1cm4gcmVsZWFzZVxuXG4gICAgdmFyIGRlYnVnID0gZ2V0Rmlyc3QocGF0aC5qb2luKGRpciwgJ2J1aWxkL0RlYnVnJyksIG1hdGNoQnVpbGQpXG4gICAgaWYgKGRlYnVnKSByZXR1cm4gZGVidWdcbiAgfVxuXG4gIHZhciBwcmVidWlsZCA9IHJlc29sdmUoZGlyKVxuICBpZiAocHJlYnVpbGQpIHJldHVybiBwcmVidWlsZFxuXG4gIHZhciBuZWFyYnkgPSByZXNvbHZlKHBhdGguZGlybmFtZShwcm9jZXNzLmV4ZWNQYXRoKSlcbiAgaWYgKG5lYXJieSkgcmV0dXJuIG5lYXJieVxuXG4gIHZhciB0YXJnZXQgPSBbXG4gICAgJ3BsYXRmb3JtPScgKyBwbGF0Zm9ybSxcbiAgICAnYXJjaD0nICsgYXJjaCxcbiAgICAncnVudGltZT0nICsgcnVudGltZSxcbiAgICAnYWJpPScgKyBhYmksXG4gICAgJ3V2PScgKyB1dixcbiAgICBhcm12ID8gJ2FybXY9JyArIGFybXYgOiAnJyxcbiAgICAnbGliYz0nICsgbGliYyxcbiAgICAnbm9kZT0nICsgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLFxuICAgIHByb2Nlc3MudmVyc2lvbnMuZWxlY3Ryb24gPyAnZWxlY3Ryb249JyArIHByb2Nlc3MudmVyc2lvbnMuZWxlY3Ryb24gOiAnJyxcbiAgICB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyA9PT0gJ2Z1bmN0aW9uJyA/ICd3ZWJwYWNrPXRydWUnIDogJycgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJylcblxuICB0aHJvdyBuZXcgRXJyb3IoJ05vIG5hdGl2ZSBidWlsZCB3YXMgZm91bmQgZm9yICcgKyB0YXJnZXQgKyAnXFxuICAgIGxvYWRlZCBmcm9tOiAnICsgZGlyICsgJ1xcbicpXG5cbiAgZnVuY3Rpb24gcmVzb2x2ZSAoZGlyKSB7XG4gICAgLy8gRmluZCBtYXRjaGluZyBcInByZWJ1aWxkcy88cGxhdGZvcm0+LTxhcmNoPlwiIGRpcmVjdG9yeVxuICAgIHZhciB0dXBsZXMgPSByZWFkZGlyU3luYyhwYXRoLmpvaW4oZGlyLCAncHJlYnVpbGRzJykpLm1hcChwYXJzZVR1cGxlKVxuICAgIHZhciB0dXBsZSA9IHR1cGxlcy5maWx0ZXIobWF0Y2hUdXBsZShwbGF0Zm9ybSwgYXJjaCkpLnNvcnQoY29tcGFyZVR1cGxlcylbMF1cbiAgICBpZiAoIXR1cGxlKSByZXR1cm5cblxuICAgIC8vIEZpbmQgbW9zdCBzcGVjaWZpYyBmbGF2b3IgZmlyc3RcbiAgICB2YXIgcHJlYnVpbGRzID0gcGF0aC5qb2luKGRpciwgJ3ByZWJ1aWxkcycsIHR1cGxlLm5hbWUpXG4gICAgdmFyIHBhcnNlZCA9IHJlYWRkaXJTeW5jKHByZWJ1aWxkcykubWFwKHBhcnNlVGFncylcbiAgICB2YXIgY2FuZGlkYXRlcyA9IHBhcnNlZC5maWx0ZXIobWF0Y2hUYWdzKHJ1bnRpbWUsIGFiaSkpXG4gICAgdmFyIHdpbm5lciA9IGNhbmRpZGF0ZXMuc29ydChjb21wYXJlVGFncyhydW50aW1lKSlbMF1cbiAgICBpZiAod2lubmVyKSByZXR1cm4gcGF0aC5qb2luKHByZWJ1aWxkcywgd2lubmVyLmZpbGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhZGRpclN5bmMgKGRpcikge1xuICB0cnkge1xuICAgIHJldHVybiBmcy5yZWFkZGlyU3luYyhkaXIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBbXVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpcnN0IChkaXIsIGZpbHRlcikge1xuICB2YXIgZmlsZXMgPSByZWFkZGlyU3luYyhkaXIpLmZpbHRlcihmaWx0ZXIpXG4gIHJldHVybiBmaWxlc1swXSAmJiBwYXRoLmpvaW4oZGlyLCBmaWxlc1swXSlcbn1cblxuZnVuY3Rpb24gbWF0Y2hCdWlsZCAobmFtZSkge1xuICByZXR1cm4gL1xcLm5vZGUkLy50ZXN0KG5hbWUpXG59XG5cbmZ1bmN0aW9uIHBhcnNlVHVwbGUgKG5hbWUpIHtcbiAgLy8gRXhhbXBsZTogZGFyd2luLXg2NCthcm02NFxuICB2YXIgYXJyID0gbmFtZS5zcGxpdCgnLScpXG4gIGlmIChhcnIubGVuZ3RoICE9PSAyKSByZXR1cm5cblxuICB2YXIgcGxhdGZvcm0gPSBhcnJbMF1cbiAgdmFyIGFyY2hpdGVjdHVyZXMgPSBhcnJbMV0uc3BsaXQoJysnKVxuXG4gIGlmICghcGxhdGZvcm0pIHJldHVyblxuICBpZiAoIWFyY2hpdGVjdHVyZXMubGVuZ3RoKSByZXR1cm5cbiAgaWYgKCFhcmNoaXRlY3R1cmVzLmV2ZXJ5KEJvb2xlYW4pKSByZXR1cm5cblxuICByZXR1cm4geyBuYW1lLCBwbGF0Zm9ybSwgYXJjaGl0ZWN0dXJlcyB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoVHVwbGUgKHBsYXRmb3JtLCBhcmNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodHVwbGUpIHtcbiAgICBpZiAodHVwbGUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHR1cGxlLnBsYXRmb3JtICE9PSBwbGF0Zm9ybSkgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHR1cGxlLmFyY2hpdGVjdHVyZXMuaW5jbHVkZXMoYXJjaClcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wYXJlVHVwbGVzIChhLCBiKSB7XG4gIC8vIFByZWZlciBzaW5nbGUtYXJjaCBwcmVidWlsZHMgb3ZlciBtdWx0aS1hcmNoXG4gIHJldHVybiBhLmFyY2hpdGVjdHVyZXMubGVuZ3RoIC0gYi5hcmNoaXRlY3R1cmVzLmxlbmd0aFxufVxuXG5mdW5jdGlvbiBwYXJzZVRhZ3MgKGZpbGUpIHtcbiAgdmFyIGFyciA9IGZpbGUuc3BsaXQoJy4nKVxuICB2YXIgZXh0ZW5zaW9uID0gYXJyLnBvcCgpXG4gIHZhciB0YWdzID0geyBmaWxlOiBmaWxlLCBzcGVjaWZpY2l0eTogMCB9XG5cbiAgaWYgKGV4dGVuc2lvbiAhPT0gJ25vZGUnKSByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0YWcgPSBhcnJbaV1cblxuICAgIGlmICh0YWcgPT09ICdub2RlJyB8fCB0YWcgPT09ICdlbGVjdHJvbicgfHwgdGFnID09PSAnbm9kZS13ZWJraXQnKSB7XG4gICAgICB0YWdzLnJ1bnRpbWUgPSB0YWdcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ25hcGknKSB7XG4gICAgICB0YWdzLm5hcGkgPSB0cnVlXG4gICAgfSBlbHNlIGlmICh0YWcuc2xpY2UoMCwgMykgPT09ICdhYmknKSB7XG4gICAgICB0YWdzLmFiaSA9IHRhZy5zbGljZSgzKVxuICAgIH0gZWxzZSBpZiAodGFnLnNsaWNlKDAsIDIpID09PSAndXYnKSB7XG4gICAgICB0YWdzLnV2ID0gdGFnLnNsaWNlKDIpXG4gICAgfSBlbHNlIGlmICh0YWcuc2xpY2UoMCwgNCkgPT09ICdhcm12Jykge1xuICAgICAgdGFncy5hcm12ID0gdGFnLnNsaWNlKDQpXG4gICAgfSBlbHNlIGlmICh0YWcgPT09ICdnbGliYycgfHwgdGFnID09PSAnbXVzbCcpIHtcbiAgICAgIHRhZ3MubGliYyA9IHRhZ1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHRhZ3Muc3BlY2lmaWNpdHkrK1xuICB9XG5cbiAgcmV0dXJuIHRhZ3Ncbn1cblxuZnVuY3Rpb24gbWF0Y2hUYWdzIChydW50aW1lLCBhYmkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YWdzKSB7XG4gICAgaWYgKHRhZ3MgPT0gbnVsbCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRhZ3MucnVudGltZSAmJiB0YWdzLnJ1bnRpbWUgIT09IHJ1bnRpbWUgJiYgIXJ1bnRpbWVBZ25vc3RpYyh0YWdzKSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRhZ3MuYWJpICYmIHRhZ3MuYWJpICE9PSBhYmkgJiYgIXRhZ3MubmFwaSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKHRhZ3MudXYgJiYgdGFncy51diAhPT0gdXYpIHJldHVybiBmYWxzZVxuICAgIGlmICh0YWdzLmFybXYgJiYgdGFncy5hcm12ICE9PSBhcm12KSByZXR1cm4gZmFsc2VcbiAgICBpZiAodGFncy5saWJjICYmIHRhZ3MubGliYyAhPT0gbGliYykgcmV0dXJuIGZhbHNlXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbmZ1bmN0aW9uIHJ1bnRpbWVBZ25vc3RpYyAodGFncykge1xuICByZXR1cm4gdGFncy5ydW50aW1lID09PSAnbm9kZScgJiYgdGFncy5uYXBpXG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVUYWdzIChydW50aW1lKSB7XG4gIC8vIFByZWNlZGVuY2U6IG5vbi1hZ25vc3RpYyBydW50aW1lLCBhYmkgb3ZlciBuYXBpLCB0aGVuIGJ5IHNwZWNpZmljaXR5LlxuICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYS5ydW50aW1lICE9PSBiLnJ1bnRpbWUpIHtcbiAgICAgIHJldHVybiBhLnJ1bnRpbWUgPT09IHJ1bnRpbWUgPyAtMSA6IDFcbiAgICB9IGVsc2UgaWYgKGEuYWJpICE9PSBiLmFiaSkge1xuICAgICAgcmV0dXJuIGEuYWJpID8gLTEgOiAxXG4gICAgfSBlbHNlIGlmIChhLnNwZWNpZmljaXR5ICE9PSBiLnNwZWNpZmljaXR5KSB7XG4gICAgICByZXR1cm4gYS5zcGVjaWZpY2l0eSA+IGIuc3BlY2lmaWNpdHkgPyAtMSA6IDFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNOd2pzICgpIHtcbiAgcmV0dXJuICEhKHByb2Nlc3MudmVyc2lvbnMgJiYgcHJvY2Vzcy52ZXJzaW9ucy5udylcbn1cblxuZnVuY3Rpb24gaXNFbGVjdHJvbiAoKSB7XG4gIGlmIChwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMuZWxlY3Ryb24pIHJldHVybiB0cnVlXG4gIGlmIChwcm9jZXNzLmVudi5FTEVDVFJPTl9SVU5fQVNfTk9ERSkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcidcbn1cblxuZnVuY3Rpb24gaXNBbHBpbmUgKHBsYXRmb3JtKSB7XG4gIHJldHVybiBwbGF0Zm9ybSA9PT0gJ2xpbnV4JyAmJiBmcy5leGlzdHNTeW5jKCcvZXRjL2FscGluZS1yZWxlYXNlJylcbn1cblxuLy8gRXhwb3NlZCBmb3IgdW5pdCB0ZXN0c1xuLy8gVE9ETzogbW92ZSB0byBsaWJcbmxvYWQucGFyc2VUYWdzID0gcGFyc2VUYWdzXG5sb2FkLm1hdGNoVGFncyA9IG1hdGNoVGFnc1xubG9hZC5jb21wYXJlVGFncyA9IGNvbXBhcmVUYWdzXG5sb2FkLnBhcnNlVHVwbGUgPSBwYXJzZVR1cGxlXG5sb2FkLm1hdGNoVHVwbGUgPSBtYXRjaFR1cGxlXG5sb2FkLmNvbXBhcmVUdXBsZXMgPSBjb21wYXJlVHVwbGVzXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/node-gyp-build/node-gyp-build.js\n");

/***/ })

};
;