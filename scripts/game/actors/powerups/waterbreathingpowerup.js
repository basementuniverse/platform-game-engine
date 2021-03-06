Z.waterBreathingPowerup = (function(base) {
	"use strict";
	
	var _powerup = Object.create(base);
	_powerup.create = function(data) {
		var p = base.create.call(
			this,
			data,
			function() {
				Z.player.waterBreathing = true;
			},
			function() {
				Z.player.waterBreathing = Z.content.items["player"].waterBreathing;
			}
		);
		return p;
	};
	_powerup.getData = function() {
		var data = base.getData.apply(this, arguments);
		
		// Only add powerup properties if the values are different to the content type values or
		// if the content type doesn't already specify a value
		// Time
		if (
			this.time && (
				!Z.content.items[this.type].hasOwnProperty("time") ||
				Z.content.items[this.type].time === null ||
				Z.content.items[this.type].time != this.time
			)
		) {
			data.time = this.time;
		}
		return data;
	};
	_powerup.getEmptyData = function(id, type, position) {
		var data = base.getEmptyData.apply(this, arguments);
		data.time = null;		// Will use the value defined in content when null
		return data;
	};
	_powerup.getEditorProperties = function() {
		var properties = base.getEditorProperties.apply(this, arguments);
		
		// Time
		properties.push({
			name: "Time",
			id: "time",
			type: Z.editorPropertyType.number,
			min: 0,
			max: 30,
			round: true
		});
		return properties;
	};
	return _powerup;
}(Z.powerup));