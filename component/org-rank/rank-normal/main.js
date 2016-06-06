'use strict';
/**
 * 可以使用extends方法覆盖下列方法
 * init(data) // 初始化方法
 * _renderData(data) // 渲染数据方法
 * _bindEvent() //事件绑定
 */

var Component = require('comBase');
var scrollLoad = require('scrollload');

var tpl = require('./index.tpl');

var component = new Component($('#rankNormal'), tpl);

component.extends({

	_bindEvent: function() {
		var self = this;
		var curCount = 0;

		scrollLoad(300, function(count) {
			if (count > curCount) {
				curCount = count;
				self._loadMoreComment(count);
			}
		});
	},


	_loadMoreComment: function(count) {
		$.localAjax({
			url: '../mock/more-rank.json',
			method: 'get',
			dataType: 'json',
			data: {
				count: count
			},
			done: function(data) {
				_renderComment(data.result);
				// self._bindEvent(data.result);
			},
			fail: function(msg) {
				dialog.init();
			}
		});

		function _renderComment(data) {

			var $el = $('#rankNormal');
			console.log(data.rankList);
			console.log(tpl({
				data: data.rankList
			}));
			if (data.rankList.length) {
				$el.append(tpl({
					data: data.rankList
				}));
			}
		}
	}

});

module.exports = component;