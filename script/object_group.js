/*
 * Piece box
 * shogi@self, Akashic content
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuration
// var co                         = require('./content_config');
// var pi                         = require('./piece');
var wm                         = require('./self/window_manager');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialization
var scene;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function set_scene(sc) { scene = sc;}
module.exports.set_scene = set_scene;

// var objects = function(x, y, w, h, style, f) {
var objects = function(details) {
	var f = (details.f === undefined ? [0, 0, 0, 0] : details.f);
	var style = details.style;
	this.disk_id   = [];
	this.flag      = f;
	this.last_view = wm.view.position;
	var x0_fill    = -1;
	var y0_fill    = 5;
	this.area = new g.E({
		scene: scene,
		x: details.x,
		y: details.y,
		width: details.width,
		height: details.height,
		scaleX: 1,
		scaleY: 1,
		touchable: false,
		tag: {
			type: 'board',
			bw: details.bw,
		},
	});
	this.area.append(
		new g.FilledRect({
			scene: scene,
			cssColor: style.background.cssColor,
			opacity: style.background.opacity,
			x: x0_fill,
			y: y0_fill,
			width: details.width,
			height: details.height - y0_fill
		}));
	scene.append(this.area);
	this.p = scene.children[scene.children.length - 1];
};
module.exports.objects = objects;
objects.prototype.set_piece = function (e1) {
	if (wm.eInE(e1, this.p, this.flag)) return 1;
	return 0;
};

