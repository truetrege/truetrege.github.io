/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "9e32232b585f0fd28b45";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/built/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/app.js")(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(/*! ./game */ "./src/js/game.js");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  // TODO: ДОБАВИТЬ ТЕМЫ !!!!
  var game = new _game2.default({
    ROW: 11,
    COL: 7
  });

  // app init function
  function init() {
    game.init();
    setInterval(main, 100 / 6);
  }

  // main game loop
  function main() {
    game.update();
    game.render();
  };
  // on ready
  init();
};

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('./sw.js').then(function (registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/function (error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}

/***/ }),

/***/ "./src/js/button.js":
/*!**************************!*\
  !*** ./src/js/button.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function Button(name) {
  _classCallCheck(this, Button);

  this.htmlElement = document.createElement('input');
  this.htmlElement.type = 'button';
  this.htmlElement.value = name;
  this.htmlElement.id = arguments.length <= 1 ? undefined : arguments[1];
};

exports.default = Button;

/***/ }),

/***/ "./src/js/elements.js":
/*!****************************!*\
  !*** ./src/js/elements.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var elements = exports.elements = [
/*1x*/
['11', '11'], ['1111'], ['1', '1', '1', '1'],
/*2x3*/
['010', '111'], ['110', '011'], ['011', '110'], ['111', '010'], ['100', '111'], ['001', '111'], ['111', '100'], ['111', '001'],
/*3x2*/
['10', '11', '01'], ['01', '11', '10'], ['10', '10', '11'], ['11', '01', '01'], ['11', '10', '10'], ['01', '01', '11'], ['10', '11', '10'], ['01', '11', '01']];
var maxLengthElements = exports.maxLengthElements = 4;
var sizeElements = exports.sizeElements = [{ w: 1, h: 4 }, { w: 4, h: 1 }, { w: 2, h: 2 }, { w: 2, h: 3 }, { w: 3, h: 2 }];

/***/ }),

/***/ "./src/js/figure.js":
/*!**************************!*\
  !*** ./src/js/figure.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(/*! ./elements */ "./src/js/elements.js");

var _gameField = __webpack_require__(/*! ./gameField */ "./src/js/gameField.js");

var _gameField2 = _interopRequireDefault(_gameField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Figure = function () {
  function Figure(options) {
    _classCallCheck(this, Figure);

    this.numElement = this.randomElement();
    this.fieldFigure = new _gameField2.default(options);
  }

  _createClass(Figure, [{
    key: 'render',
    value: function render() {
      var arr = _elements.elements[this.numElement].concat();

      arr.forEach(function (el, index, array) {
        return array[index] = el.split('');
      });
      this.fieldFigure.init(arr.length, arr[0].length);
      this.fieldFigure.render(arr);
    }
  }, {
    key: 'randomElement',
    value: function randomElement() {
      var num = Math.round(Math.random() * 100);
      if (num > _elements.elements.length - 1) {
        num = this.randomElement(num);
      }
      return num;
    }
  }, {
    key: 'newElement',
    value: function newElement() {
      this.numElement = this.randomElement();
    }
  }, {
    key: 'checkElement',
    value: function checkElement(arrayPlots) {
      //проверка массива из selectedBox на совпадение с текущей фигурой
      if (arrayPlots.length <= _elements.maxLengthElements) {
        //4to to strashnoe tvoritsya?!
        arrayPlots.sort(function (a, b) {
          return a.y === b.y ? a.x - b.x : a.y - b.y;
        });
        var maxRow = -1,
            maxCol = -1,
            minRow = 99,
            minCol = 99;

        arrayPlots.forEach(function (element) {
          maxRow = element.row > maxRow ? element.row : maxRow;
          maxCol = element.col > maxCol ? element.col : maxCol;
          minRow = element.row < minRow ? element.row : minRow;
          minCol = element.col < minCol ? element.col : minCol;
        });

        var ROW = maxRow - minRow + 1;

        var COL = maxCol - minCol + 1;
        var sizeFlag = _elements.sizeElements.some(function (o) {
          return o.h === ROW && o.w === COL;
        });

        if (sizeFlag) {
          var matrixFigure = [];
          for (var i = 0; i < ROW; i++) {
            matrixFigure[i] = [];
            for (var j = 0; j < COL; j++) {
              matrixFigure[i][j] = 0;
            }
          }
          arrayPlots.forEach(function (element) {
            matrixFigure[element.row - minRow][element.col - minCol] = 1;
          });

          matrixFigure.forEach(function (row, index, array) {
            return array[index] = row.join('');
          });

          var hitFlag = true;
          for (var _i = 0; _i < _elements.elements[this.numElement].length; _i++) {
            hitFlag = _elements.elements[this.numElement][_i] === matrixFigure[_i];
            if (!hitFlag) break;
          }
          return hitFlag;
        }
      }

      return false;
    }
  }, {
    key: 'checkInscribeFigure',
    value: function checkInscribeFigure(matrix) {
      /*
      * NEW !!
      * */
      var widthMatrix = matrix[0].length;
      var figure = _elements.elements[this.numElement].concat();
      var widthFigure = figure[0].length;

      matrix.forEach(function (el, ind, array) {
        return array[ind] = el.join('');
      });
      matrix = matrix.join('|');
      figure.forEach(function (el, ind, array) {
        return array[ind] = el.replace(/0/g, '.').replace(/1/g, '0');
      });

      var regularSearchString = figure.join('.{' + (widthMatrix - widthFigure + 1) + '}');
      var indexSearchFigure = matrix.search(regularSearchString);

      return indexSearchFigure >= 0;
    }
  }]);

  return Figure;
}();

exports.default = Figure;

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(/*! ./template */ "./src/js/template.js");

var _template2 = _interopRequireDefault(_template);

var _gameField = __webpack_require__(/*! ./gameField */ "./src/js/gameField.js");

var _gameField2 = _interopRequireDefault(_gameField);

var _history = __webpack_require__(/*! ./history */ "./src/js/history.js");

var _history2 = _interopRequireDefault(_history);

var _figure = __webpack_require__(/*! ./figure */ "./src/js/figure.js");

var _figure2 = _interopRequireDefault(_figure);

var _score = __webpack_require__(/*! ./score */ "./src/js/score.js");

var _score2 = _interopRequireDefault(_score);

var _top = __webpack_require__(/*! ./top */ "./src/js/top.js");

var _top2 = _interopRequireDefault(_top);

var _button = __webpack_require__(/*! ./button */ "./src/js/button.js");

var _button2 = _interopRequireDefault(_button);

var _gameMatrix = __webpack_require__(/*! ./gameMatrix */ "./src/js/gameMatrix.js");

var _gameMatrix2 = _interopRequireDefault(_gameMatrix);

var _theme = __webpack_require__(/*! ./theme */ "./src/js/theme.js");

var _theme2 = _interopRequireDefault(_theme);

var _elements = __webpack_require__(/*! ./elements */ "./src/js/elements.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(options) {
        var _this = this;

        _classCallCheck(this, Game);

        this.stateGame = 0;
        this.nextStateGame = 0;
        this.STATE = {
            TICK: 0,
            UPDATE: 1,
            NEWCOORDS: 2,
            NEW: 3,
            END: 4,
            BACK: 5,
            NEXT: 7,
            COLLAPSE: 8
        };

        this.gameMatrix = new _gameMatrix2.default({
            ROW: options && options.ROW ? options.ROW : 10,
            COL: options && options.COL ? options.COL : 9
        });

        this.MOUSE_DOWN = false;
        this.RENDER = false;
        this.coords = { x: null, y: null };
        this.selectedBox = [];
        //TODO: new Top
        this.score = new _score2.default();
        this.template = new _template2.default();
        this.history = new _history2.default('stateGame');
        this.top = new _top2.default();

        this.field = new _gameField2.default();
        this.figures = [new _figure2.default(), new _figure2.default()];

        this.theme = new _theme2.default({
            field: this.field,
            figures: this.figures,
            template: this.template
        });

        this.buttons = [];
        this.buttons['newGame'] = new _button2.default('Новая игра', 'new');
        this.buttons['back'] = new _button2.default('Назад', 'back');

        var _loop = function _loop(i) {
            if (_this.buttons.hasOwnProperty(i)) {
                _this.buttons[i].htmlElement.addEventListener('click', function (e) {
                    return _this.clickButton(e, i);
                }, false);
            }
        };

        for (var i in this.buttons) {
            _loop(i);
        }
        var self = this;
        this.theme.htmlElement.addEventListener('change', function (e) {
            self.changeTheme(e, this);
        }, false);

        this.field.htmlElement.addEventListener('mousedown', function (e) {
            return _this.downMouse(e, _this);
        }, false);
        this.field.htmlElement.addEventListener('touchstart', function (e) {
            return _this.downMouse(e, _this);
        }, false);
        this.field.htmlElement.addEventListener('touchend', function (e) {
            return _this.upMouse(e, _this);
        }, false);
        this.field.htmlElement.addEventListener('touchmove', function (e) {
            return _this.moveMouse(e, _this);
        }, false);

        this.field.htmlElement.addEventListener('mouseup', function (e) {
            return _this.upMouse(e, _this);
        }, false);
        this.field.htmlElement.addEventListener('mousemove', function (e) {
            return _this.moveMouse(e, _this);
        }, false);
        this.field.htmlElement.addEventListener('mouseover', function (e) {
            return _this.overMouse(e, _this);
        }, false);
        window.addEventListener('resize', function (e) {
            return _this.resizeWindow(e, _this);
        }, false);
    }

    _createClass(Game, [{
        key: 'changeTheme',
        value: function changeTheme(e, select) {
            this.theme.set(select.value);
            this.theme.change();
            this.saveGame();
            this.init();
            this.RENDER = true;
        }
    }, {
        key: 'resizeWindow',
        value: function resizeWindow() {
            this.init();
        }
    }, {
        key: 'downMouse',
        value: function downMouse(e) {
            if (e.touches && e.touches[0]) {
                this.MOUSE_DOWN = true;
                this.coords.x = e.touches[0].pageX;
                this.coords.y = e.touches[0].pageY;
                this.stateGame = this.STATE.UPDATE;
            } else {
                this.MOUSE_DOWN = true;
                this.coords.x = e.x;
                this.coords.y = e.y;
                this.stateGame = this.STATE.UPDATE;
            }
            e.preventDefault();
        }
    }, {
        key: 'upMouse',
        value: function upMouse() {
            this.MOUSE_DOWN = false;
        }
    }, {
        key: 'overMouse',
        value: function overMouse() {
            this.MOUSE_DOWN = false;
        }
    }, {
        key: 'moveMouse',
        value: function moveMouse(e) {
            if (this.MOUSE_DOWN) {
                if (e.touches && e.touches[0]) {
                    this.coords.x = e.touches[0].pageX;
                    this.coords.y = e.touches[0].pageY;
                } else {
                    this.coords.x = e.x;
                    this.coords.y = e.y;
                }
                this.stateGame = this.STATE.UPDATE;
            }
            e.preventDefault();
        }
    }, {
        key: 'clickButton',
        value: function clickButton(e, name) {
            switch (name) {
                case 'newGame':
                    this.stateGame = this.STATE.NEW;
                    break;
                case 'back':
                    this.stateGame = this.STATE.BACK;
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'checkBox',
        value: function checkBox(x, y) {

            var plot = this.field.getPlot(x, y);

            if (plot.col < this.gameMatrix.COL && plot.col >= 0 && plot.row < this.gameMatrix.ROW && plot.row >= 0) {

                var notConic = this.gameMatrix.get(plot.row, plot.col) !== 0;

                if (!notConic) {
                    this.selectedBox.push({ col: plot.col, row: plot.row });
                    if (this.selectedBox.length > _elements.maxLengthElements) {
                        this.selectedBox.shift();
                    }
                    return true;
                }
                return false;
            } else return false;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            if (this.stateGame === this.STATE.BACK) {
                this.backGame();
                this.RENDER = true;
            }

            if (this.stateGame === this.STATE.UPDATE) {
                if (this.checkBox(this.coords.x, this.coords.y)) {
                    this.stateGame = this.STATE.NEWCOORDS;
                }
            }
            if (this.stateGame === this.STATE.NEW) {
                this.newGame();
                this.RENDER = true;
            }
            if (this.stateGame === this.STATE.END) {
                this.endGame();
                this.newGame();
                this.RENDER = true;
            }

            if (this.stateGame === this.STATE.NEWCOORDS) {
                if (this.checkFigures()) {
                    this.selectedBox.forEach(function (el) {
                        return _this2.gameMatrix.set(el.row, el.col, 2);
                    });
                    this.score.update(this.gameMatrix.getCountDeletedBox());
                    this.score.update(4);

                    this.stateGame = this.STATE.NEXT;
                    this.nextStateGame = this.STATE.COLLAPSE;

                    this.selectedBox = [];

                    //this.saveGame();
                    this.MOUSE_DOWN = false;
                } else {
                    this.selectedBox.forEach(function (o) {
                        return _this2.gameMatrix.set(o.row, o.col, 1);
                    });
                }
                this.RENDER = true;
            }
            if (this.stateGame === this.STATE.COLLAPSE) {
                this.gameMatrix.update();
                if (this.checkEndGame()) {

                    this.gameMatrix.update();
                    this.stateGame = this.STATE.NEXT;
                    this.nextStateGame = this.STATE.END;
                }
                this.saveGame();
                this.RENDER = true;
            }
            if (this.stateGame === this.STATE.NEXT) {
                this.stateGame = this.nextStateGame;
                this.nextStateGame = this.STATE.TICK;
                this.RENDER = true;
                return;
            }

            this.stateGame = this.STATE.TICK;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.RENDER) {

                this.field.render(this.gameMatrix.get());
                this.template.render({
                    figures: this.figures,
                    score: this.score,
                    top: this.top
                });
            }
            this.RENDER = false;
        }
    }, {
        key: 'init',
        value: function init() {

            var historyState = this.history.returnState();
            if (historyState) {
                this.gameMatrix.init(historyState.field);
                this.figures.forEach(function (figure, index) {
                    return figure.numElement = historyState.figures[index];
                });
                this.score.set(historyState.score);
                this.theme.init(historyState.theme);
            } else {
                this.gameMatrix.init();
                this.saveGame();
                this.theme.init();
            }
            if (window.screen.width < 640) {
                this.template.mobile = true;
                this.theme.mobile = true;
            } else {
                this.template.mobile = false;
                this.theme.mobile = false;
            }
            this.theme.change();

            this.field.init(this.gameMatrix.ROW, this.gameMatrix.COL);

            this.template.init({
                field: this.field.htmlElement,
                themes: this.theme.htmlElement,
                figures: this.figures,
                score: this.score,
                buttons: this.buttons,
                top: this.top
            });

            this.checkEndGame();
            this.RENDER = true;
        }
    }, {
        key: 'newGame',
        value: function newGame() {

            this.gameMatrix.init();
            this.score.set(0);
            this.figures.forEach(function (figure) {
                return figure.newElement();
            });
            this.history.clearState();
            this.saveGame();
        }
    }, {
        key: 'endGame',
        value: function endGame() {
            this.top.update(this.score.get());
            alert('ИГРА ЗАКОНЧЕНА, ВАШ СЧЕТ:' + this.score.get());
        }
    }, {
        key: 'backGame',
        value: function backGame() {
            var prevStateGame = this.history.returnPrevState();

            if (prevStateGame) {
                this.gameMatrix.init(prevStateGame.field);
                this.score.set(prevStateGame.score);
                this.figures.forEach(function (figure, index) {
                    return figure.numElement = prevStateGame.figures[index];
                });
                this.saveGame();
            }
            this.selectedBox = [];
        }
    }, {
        key: 'checkEndGame',
        value: function checkEndGame() {
            var _this3 = this;

            var flagEndGame = void 0;
            flagEndGame = this.figures.some(function (figure) {
                return figure.checkInscribeFigure(_this3.gameMatrix.get().concat());
            });
            return !flagEndGame;
        }
    }, {
        key: 'checkFigures',
        value: function checkFigures() {
            var _this4 = this;

            this.gameMatrix.clear();
            // TODO: ПОДУМАТЬ КАК ВЫНЕСТИ ЛОГИКУ ИЗ IF'а
            var newIndex = false;
            var figureCoincidence = this.figures.some(function (figure, index) {
                newIndex = index;
                return figure.checkElement(_this4.selectedBox.concat());
            });
            if (figureCoincidence) {
                this.figures[newIndex].newElement();
            }
            return figureCoincidence;
        }
    }, {
        key: 'saveGame',
        value: function saveGame() {
            var figures = [];
            this.figures.forEach(function (figure) {
                return figures.push(figure.numElement);
            });
            this.history.saveState({
                field: this.gameMatrix.get(),
                score: this.score.get(),
                theme: this.theme.get(),
                figures: figures
            });
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),

/***/ "./src/js/gameField.js":
/*!*****************************!*\
  !*** ./src/js/gameField.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameField = function () {
    function GameField() {
        _classCallCheck(this, GameField);

        this.htmlElement = document.createElement('canvas');
        this.context = this.htmlElement.getContext('2d');
        //TODO: МБ ВЫНЕСТИ ЧАСТЬ ЛОГИКИ В КЛАСС BOX????

        this.margin = 1;
        this.boxWidth = 70;
        this.boxHeight = 70;
        this.boxColors = ['#3e3e3e', '#2979FF', '#4DD0E1'];
    }

    _createClass(GameField, [{
        key: 'render',
        value: function render(array) {
            this.context.clearRect(0, 0, parseInt(this.htmlElement.width), parseInt(this.htmlElement.height));
            var positionX = void 0,
                positionY = void 0;

            for (var i = 0; i < array.length; i++) {
                positionX = i * (this.boxHeight + this.margin);
                for (var j = 0; j < array[i].length; j++) {
                    positionY = j * (this.boxWidth + this.margin);
                    this.context.fillStyle = this.boxColors[array[i][j]];
                    this.context.fillRect(positionY, positionX, this.boxWidth, this.boxHeight);
                    this.context.fill();
                }
            }
        }
    }, {
        key: 'init',
        value: function init(ROW, COL) {
            this.htmlElement.width = (this.boxWidth + this.margin) * COL - this.margin;
            this.htmlElement.height = (this.boxHeight + this.margin) * ROW - this.margin;
        }
    }, {
        key: 'getPlot',
        value: function getPlot(x, y) {

            var plot = this.calculatePlotsHtmlElement();
            var scale = { width: 1, height: 1 };
            if (this.htmlElement.width !== this.htmlElement.clientWidth) {
                scale.width = this.htmlElement.width / this.htmlElement.clientWidth;
            }
            if (this.htmlElement.height !== this.htmlElement.clientHeight) {
                scale.height = this.htmlElement.height / this.htmlElement.clientHeight;
            }

            return {
                row: this.getNumBox(y, plot.y, this.boxHeight / scale.height, this.margin),
                col: this.getNumBox(x, plot.x, this.boxWidth / scale.width, this.margin)
            };
        }
    }, {
        key: 'getNumBox',
        value: function getNumBox(plot, marginContainer, sizeBox, margin) {

            var i = 0,
                num = void 0;
            while (i < plot) {
                if (plot - marginContainer > i * sizeBox + i * margin && plot - marginContainer <= i * sizeBox + i * margin + sizeBox) {
                    num = i;
                    break;
                }
                if (plot - marginContainer > i * sizeBox + (i - 1) * margin && plot - marginContainer <= i * sizeBox + i * margin) {
                    num = -1;
                    break;
                }
                i++;
            }
            return num;
        }
    }, {
        key: 'calculatePlotsHtmlElement',
        value: function calculatePlotsHtmlElement() {

            var box = this.htmlElement.getBoundingClientRect();
            var body = document.body;
            var docEl = document.documentElement;
            // const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            // const scrollLeft = window.pageXOffset || docEl.scrollLeft ||
            //     body.scrollLeft;
            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;

            var y = box.top + /*scrollTop*/-clientTop;
            var x = box.left + /*scrollLeft*/-clientLeft;

            return { x: x, y: y };
        }
    }]);

    return GameField;
}();

exports.default = GameField;

/***/ }),

/***/ "./src/js/gameMatrix.js":
/*!******************************!*\
  !*** ./src/js/gameMatrix.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameMatrix = function () {
  function GameMatrix(options) {
    _classCallCheck(this, GameMatrix);

    this.ROW = options && options.ROW ? options.ROW : 10;
    this.COL = options && options.COL ? options.COL : 9;
    this.matrix = [];
  }

  _createClass(GameMatrix, [{
    key: "init",
    value: function init(array) {
      if (array && array instanceof Array && this.checkMatrixSize(array)) {
        this.matrix = array;
      } else {
        this.new();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var deletedIndexes = { row: [], col: [] };
      deletedIndexes.row = this.getIndexDeletedRows(this.matrix);
      deletedIndexes.col = this.getIndexDeletedRows(this.reverseMatrix());

      if (deletedIndexes.row.length === 0 && deletedIndexes.col.length === 0) {} else {

        this.collapseMatrix(deletedIndexes);
      }
    }
  }, {
    key: "get",
    value: function get(row, col) {
      if (col || col === 0 && row || row === 0) {
        return this.matrix[row][col];
      } else if (!col && row) {
        return this.matrix[row];
      } else return this.matrix;
    }
  }, {
    key: "set",
    value: function set(row, col, value) {
      this.matrix[row][col] = value;
    }
  }, {
    key: "clear",
    value: function clear() {
      for (var i = 0; i < this.ROW; i++) {
        for (var j = 0; j < this.COL; j++) {
          this.matrix[i][j] = this.matrix[i][j] === 1 ? 0 : this.matrix[i][j];
        }
      }
    }
  }, {
    key: "getCountDeletedBox",
    value: function getCountDeletedBox() {
      /**
       * TODO: ДУБЛИРУЕТСЯ В UPDATE ПОДУМАТЬ КАК ИСПРАВИТЬ!
       * */
      var deletedIndexes = { row: [], col: [] };
      deletedIndexes.row = this.getIndexDeletedRows(this.matrix);
      deletedIndexes.col = this.getIndexDeletedRows(this.reverseMatrix());

      if (deletedIndexes.row.length === 0 && deletedIndexes.col.length === 0) {
        return 0;
      } else {
        return this.getScoreDeletedBox(deletedIndexes);
      }
    }
  }, {
    key: "getIndexDeletedRows",
    value: function getIndexDeletedRows(matrix) {
      var rows = [];
      matrix.forEach(function (row, index) {
        if (row.every(function (col) {
          return col === 2;
        })) {
          rows.push(index);
        }
      });
      return rows;
    }
  }, {
    key: "getScoreDeletedBox",
    value: function getScoreDeletedBox(deletedIndexes) {
      var score = 0;
      score += deletedIndexes.row.length * this.ROW;
      score += deletedIndexes.col.length * this.COL;
      return score;
    }
  }, {
    key: "collapseRow",
    value: function collapseRow(listRows, countCol, countRow) {
      var _this = this;

      listRows.sort(function (a, b) {
        return b - a;
      });
      listRows.forEach(function (row) {
        return _this.matrix.splice(row, 1);
      });
      listRows.forEach(function (row) {
        var newRow = [];
        for (var i = 0; i < countCol; i++) {
          newRow.push(0);
        }
        if (row <= countRow / 2) {
          _this.matrix.unshift(newRow);
        } else {
          _this.matrix.push(newRow);
        }
      });
    }
  }, {
    key: "collapseMatrix",
    value: function collapseMatrix(deletedIndexes) {

      this.collapseRow(deletedIndexes.row, this.COL, this.ROW);
      this.matrix = this.reverseMatrix();
      this.collapseRow(deletedIndexes.col, this.ROW, this.COL);
      this.matrix = this.reverseMatrix();
    }
  }, {
    key: "new",
    value: function _new() {
      this.matrix = [];
      for (var i = 0; i < this.ROW; i++) {
        this.matrix.push([]);
        for (var j = 0; j < this.COL; j++) {
          this.matrix[i].push(0);
        }
      }
    }
  }, {
    key: "checkMatrixSize",
    value: function checkMatrixSize(array) {
      return array.length === this.ROW && array[0].length === this.COL;
    }
  }, {
    key: "reverseMatrix",
    value: function reverseMatrix() {
      var newArray = [];
      if (this.matrix.every(function (el) {
        return el instanceof Array;
      })) {

        for (var i = 0; i < this.matrix[0].length; i++) {
          newArray.push([]);
          for (var j = 0; j < this.matrix.length; j++) {
            newArray[i].push(this.matrix[j][i]);
          }
        }
      } else {}
      return newArray;
    }
  }]);

  return GameMatrix;
}();

exports.default = GameMatrix;

/***/ }),

/***/ "./src/js/history.js":
/*!***************************!*\
  !*** ./src/js/history.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//JSON.parse(localStorage.getItem("top10"));
//
//localStorage.setItem("top10", JSON.stringify(mass));

var History = function () {
  //TODO: (OPTOINS) && .....
  function History(name, size) {
    _classCallCheck(this, History);

    this.name = name || 'defName';
    this.stateCount = size || 2;
    //TODO: TOP10 ВЫНЕСТИ ЗА STATEGAME!!! ИЛИ ОЧИЩАТЬ КАК ТО ИНАЧЕ?!
  }

  _createClass(History, [{
    key: 'clearState',
    value: function clearState() {
      History.setValue(this.name, 'null');
    }
  }, {
    key: 'saveState',
    value: function saveState(stateGame) {

      var prevState = History.getValue(this.name);
      if (!prevState) {
        prevState = [];
        prevState.push(stateGame);
      } else {
        if (prevState.length >= this.stateCount) {
          prevState.shift();
        }
        prevState.push(stateGame);
      }
      History.setValue(this.name, JSON.stringify(prevState));
    }
  }, {
    key: 'returnPrevState',
    value: function returnPrevState() {
      var state = History.getValue(this.name);
      return state.shift();
    }
  }, {
    key: 'returnState',
    value: function returnState() {
      var state = History.getValue(this.name);
      return state ? state.pop() : false;
    }
  }], [{
    key: 'getValue',
    value: function getValue(name) {

      var value = localStorage.getItem(name);
      if (value) {

        value = JSON.parse(value);
      }
      return value;
    }
  }, {
    key: 'setValue',
    value: function setValue(name, value) {
      localStorage.setItem(name, value);
    }
  }]);

  return History;
}();

exports.default = History;

/***/ }),

/***/ "./src/js/score.js":
/*!*************************!*\
  !*** ./src/js/score.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Score = function () {
  function Score() {
    _classCallCheck(this, Score);

    this.htmlElement = document.createElement('div');
    this.score = 0;
  }

  _createClass(Score, [{
    key: 'update',
    value: function update(plus) {
      this.score += plus;
    }
  }, {
    key: 'get',
    value: function get() {
      return this.score;
    }
  }, {
    key: 'set',
    value: function set(value) {
      this.score = value;
    }
  }, {
    key: 'render',
    value: function render() {
      this.htmlElement.innerHTML = this.get();
    }
  }]);

  return Score;
}();

exports.default = Score;

/***/ }),

/***/ "./src/js/template.js":
/*!****************************!*\
  !*** ./src/js/template.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
    function Template() {
        var _this = this;

        _classCallCheck(this, Template);

        //TODO: вынести в game!!
        this.mobile = false;
        this.endGame = false;
        this.figuresContainer = document.createElement('div');
        this.gameContainer = document.createElement('div');
        this.scoreContainer = document.createElement('div');
        this.topContainer = document.createElement('div');
        this.btnContainer = document.createElement('div');
        this.themeContainer = document.createElement('div');

        this.game = document.createElement('div');
        this.left = document.createElement('div');
        this.center = document.createElement('div');
        this.right = document.createElement('div');

        this.up = document.createElement('div');
        this.mobileGame = document.createElement('div');
        this.modal = document.createElement('div');
        this.mobileSettings = document.createElement('div');

        this.modalBackground = document.createElement('div');
        this.modalWindow = document.createElement('div');
        this.modalHeader = document.createElement('div');
        this.modalClose = document.createElement('div');

        this.mobileGame.className = 'mobile';
        this.up.className = 'up';
        this.modal.className = 'modal';
        this.modalBackground.className = 'modalBG';
        this.modalWindow.className = 'modalWindow';
        this.modalHeader.className = 'modalHeader';
        this.mobileSettings.className = 'mobileSettings';
        this.modalClose.className = 'modalClose';

        this.game.className = 'game';
        this.left.className = 'left';
        this.center.className = 'center';
        this.right.className = 'right';

        this.figuresContainer.className = 'figuresContainer';
        this.gameContainer.className = 'gameContainer';
        this.scoreContainer.className = 'scoreContainer';
        this.topContainer.className = 'topContainer';
        this.btnContainer.className = 'btnContainer';
        this.themeContainer.className = 'themeContainer';

        this.scoreContainer.innerText = 'Счет';
        this.topContainer.innerText = 'TOP10';
        this.themeContainer.innerText = 'THEMES';

        this.mobileSettings.addEventListener('click', function (e) {
            return _this.openDialog(e, _this);
        }, false);
        this.mobileSettings.addEventListener('touch', function (e) {
            return _this.openDialog(e, _this);
        }, false);
        this.modal.addEventListener('click', function (e) {
            return _this.closeDialog(e, _this);
        }, false);
        this.modal.addEventListener('touch', function (e) {
            return _this.closeDialog(e, _this);
        }, false);

        this.modal.appendChild(this.modalBackground);
        this.modal.appendChild(this.modalWindow);
        this.modalWindow.appendChild(this.modalHeader);
        this.modalHeader.appendChild(this.modalClose);
        this.modal.style.display = 'none';
    }

    _createClass(Template, [{
        key: 'openDialog',
        value: function openDialog(e) {
            this.modal.style.display = "flex";
        }
    }, {
        key: 'closeDialog',
        value: function closeDialog(e) {
            if (e.target.className === 'modal' || e.target.className === 'modalClose' || e.target.id === 'new' || e.target.id === 'back') this.modal.style.display = "none";
        }
    }, {
        key: 'init',
        value: function init(options) {
            var _this2 = this;

            this.game.innerHTML = '';
            if (this.mobile) {

                if (this.endGame) {} else {
                    this.game.appendChild(this.mobileGame);
                    this.mobileGame.appendChild(this.up);
                    this.mobileGame.appendChild(this.center);
                    this.mobileGame.appendChild(this.modal);

                    this.up.appendChild(this.figuresContainer);
                    this.up.appendChild(this.scoreContainer);
                    this.up.appendChild(this.mobileSettings);
                    this.center.appendChild(this.gameContainer);
                    this.scoreContainer.innerText = '';

                    this.modalWindow.appendChild(this.topContainer);
                    this.modalWindow.appendChild(this.themeContainer);
                    this.modalWindow.appendChild(this.btnContainer);
                }
            } else {
                this.game.appendChild(this.left);
                this.game.appendChild(this.center);
                this.game.appendChild(this.right);

                this.left.appendChild(this.btnContainer);
                this.left.appendChild(this.topContainer);

                this.right.appendChild(this.scoreContainer);
                this.right.appendChild(this.figuresContainer);
                this.right.appendChild(this.themeContainer);

                this.center.appendChild(this.gameContainer);
                this.scoreContainer.innerText = 'Счет';
            }

            if (options.buttons) {
                for (var i in options.buttons) {
                    if (options.buttons.hasOwnProperty(i)) {
                        this.btnContainer.appendChild(options.buttons[i].htmlElement);
                    }
                }
            }
            if (options.figures) {
                options.figures.forEach(function (figure) {
                    return _this2.figuresContainer.appendChild(figure.fieldFigure.htmlElement);
                });
            }
            if (options.score) {
                this.scoreContainer.appendChild(options.score.htmlElement);
            }
            if (options.top) {
                this.topContainer.appendChild(options.top.htmlElement);
            }
            if (options.field) {
                this.gameContainer.appendChild(options.field);
            }
            if (options.themes) {
                this.themeContainer.appendChild(options.themes);
            }

            document.body.appendChild(this.game);

            // document.body.appendChild(this.btnContainer);
            // document.body.appendChild(this.figuresContainer);
            // document.body.appendChild(this.scoreContainer);
            // document.body.appendChild(this.topContainer);
        }
    }, {
        key: 'render',
        value: function render(options) {
            if (options.score) {

                options.score.render();
            }
            if (options.score) {
                options.figures.forEach(function (figure) {
                    return figure.render();
                });
            }
            if (options.top) {
                options.top.render();
            }
        }
    }]);

    return Template;
}();

exports.default = Template;

/***/ }),

/***/ "./src/js/theme.js":
/*!*************************!*\
  !*** ./src/js/theme.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _themes = __webpack_require__(/*! ./themes */ "./src/js/themes.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = function () {
  function Theme(options) {
    _classCallCheck(this, Theme);

    this.field = options.field;
    this.figures = options.figures;
    this.template = options.template;
    this.mobile = false;

    this.htmlElement = document.createElement('select');
    this.htmlElement.className = 'themeSelect';
  }

  _createClass(Theme, [{
    key: 'init',
    value: function init(theme) {
      this.name = theme || 'default';
      this.htmlElement.innerHTML = '';
      for (var i in _themes.themes) {
        if (_themes.themes.hasOwnProperty(i)) {
          var option = document.createElement('option');

          option.innerHTML = _themes.themes[i].name || i;
          option.value = i;
          if (theme === i) option.selected = true;
          this.htmlElement.appendChild(option);
        }
      }
      this.change();
    }
  }, {
    key: 'change',
    value: function change() {
      var _this = this;

      this.field.margin = _themes.themes[this.name].box.margin;
      this.field.boxWidth = _themes.themes[this.name].box.width;
      this.field.boxHeight = _themes.themes[this.name].box.height;
      this.field.boxColors = _themes.themes[this.name].colors;

      this.figures.forEach(function (figure) {
        figure.fieldFigure.margin = _themes.themes[_this.name].preview.margin;
        figure.fieldFigure.boxWidth = _themes.themes[_this.name].preview.width;
        figure.fieldFigure.boxHeight = _themes.themes[_this.name].preview.height;
        figure.fieldFigure.boxColors = _themes.themes[_this.name].preview.colors || _themes.themes[_this.name].colors;
      });
      this.template.game.className = 'game ' + _themes.themes[this.name].background;

      if (this.mobile) {
        // this.field.boxWidth = 10*window.screen.width/100;
        //
        //  this.field.boxHeight = 10*window.screen.width/100;
        //  this.figures.forEach((figure) => {
        //    figure.fieldFigure.boxWidth = 6*window.screen.width/100;
        //    figure.fieldFigure.boxHeight = 6*window.screen.width/100;
        //  });

      }
    }
  }, {
    key: 'set',
    value: function set(name) {
      this.name = name;
    }
  }, {
    key: 'get',
    value: function get() {
      return this.name;
    }
  }]);

  return Theme;
}();

exports.default = Theme;

/***/ }),

/***/ "./src/js/themes.js":
/*!**************************!*\
  !*** ./src/js/themes.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var themes = exports.themes = {
    default: {
        name: 'default',
        box: {
            margin: 1,
            height: 80,
            width: 80
        },
        preview: {
            margin: 1,
            height: 60,
            width: 60,
            colors: ['#80D8FF00', '#2196F3', '#40c4ff']

        },
        colors: ['#37474F', '#2196F3',
        // '#0091EA',
        '#40c4ff'],
        background: 'default'
    },
    orange: {
        name: 'orange',
        box: {
            margin: 0.5,
            height: 70,
            width: 70
        },
        preview: {
            margin: 0.5,
            height: 60,
            width: 60
        },
        colors: ['#37474F', '#c0b038', '#da7a34'],
        background: 'orange'
    },
    black: {
        name: 'black',
        box: {
            margin: 1,
            height: 70,
            width: 70
        },
        preview: {
            margin: 1,
            height: 60,
            width: 60
        },
        colors: ['#37474F', '#0091EA', '#26C6DA'],
        background: 'black'
    },
    green: {
        name: 'green',
        box: {
            margin: 1,
            height: 70,
            width: 70
        },
        preview: {
            margin: 1,
            height: 60,
            width: 60
        },
        colors: ['#37474F', '#388E3C', '#689F38'],
        background: 'green'
    },
    blue: {
        name: 'blue',
        box: {
            margin: 0.5,
            height: 70,
            width: 70
        },
        preview: {
            margin: 1,
            height: 60,
            width: 60,
            colors: ['#80D8FF00', '#EF5350', '#1976D2']
        },
        colors: ['#37474F', '#EF5350', '#40C4FF'],
        background: 'blue'
    }
};

/***/ }),

/***/ "./src/js/top.js":
/*!***********************!*\
  !*** ./src/js/top.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _history = __webpack_require__(/*! ./history */ "./src/js/history.js");

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Top = function () {
  function Top() {
    _classCallCheck(this, Top);

    this.htmlElement = document.createElement('ol');
    this.history = new _history2.default('TOP', 10);
  }

  _createClass(Top, [{
    key: 'update',
    value: function update(score) {
      var topList = _history2.default.getValue(this.history.name);
      if (!topList || topList.length < this.history.stateCount && !topList.some(function (el) {
        return el === score;
      })) {
        this.history.saveState(score);
        return;
      }
      topList.sort(function (a, b) {
        return b - a;
      });

      if (score > topList.pop() && !topList.some(function (el) {
        return el === score;
      })) {
        this.history.saveState(score);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var topList = _history2.default.getValue(this.history.name);
      if (!topList) {
        return;
      }
      topList.sort(function (a, b) {
        return b - a;
      });
      this.htmlElement.innerHTML = '';

      topList.forEach(function (li) {
        var liHtml = document.createElement('li');
        liHtml.innerHTML = li;
        _this.htmlElement.appendChild(liHtml);
      });
    }
  }]);

  return Top;
}();

exports.default = Top;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map