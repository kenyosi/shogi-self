/*
 * shogi@self
 * Akashic content
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuration
var conf                       = require('./content_config');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialization
var piece                      = require('./piece');
var stack                      = require('./object_group');
var wm                         = require('./self/window_manager');
// var set_inital_locations       = require('set_initial_locations');

var cell_size_array            = [];
var i = 0;
while (i < 20) {
	cell_size_array[i] = i * conf.board.cell.size.x;
	i++;
}

var cell_size_x_m_1            = conf.board.cell.size.x - 1;
var cell_size_y_m_1            = conf.board.cell.size.y - 1;

// var caster_joined              = false;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function main() {
	wm.init();
	var scene = new g.Scene({game: g.game, assetIds:
		['shogi_pieces', 'window_manager_icons', 'help_screen', 'help_screen_solo']
	});
	wm.set_scene(scene);         		      // set window manager in scene
	stack.set_scene(scene);				      // set stack disks in scene
	piece.set_scene(scene);				      // set disks in scene
	scene.loaded.add(function () {
		// Pile areas
		var pile_areas = [];
		var lines_in_pile = 1;
		var dy = 4.0 * cell_size_array[1] + 12;
		var dx = cell_size_array[1];
		var ii = 0;
		var flags = [[1, 0, 0, 0], [0, 1, 0, 0]];
		while(ii < conf.players.max_players * lines_in_pile) {
			var x_rem = ii % lines_in_pile;
			var nx    = (ii - x_rem) / lines_in_pile;
			var details = {
				x: x_rem * dx + conf.pile_area.location.x0 + wm.view.position.x,
				y: nx * dy    + conf.pile_area.location.y0 + wm.view.position.y,
				bw: ii,
				width: conf.pile_area.location.width,
				height: conf.pile_area.location.height,
				style: conf.pile_area,
				f: flags[x_rem],
			};
			pile_areas[ii] = new stack.objects(details);
			ii++;
		}
		piece.set_pile_areas(pile_areas);
		// set_inital_locations.set_stack_objects(pile_areas);

		// Board area
		ii = 0;
		var board_n = conf.board.size.x * conf.board.size.y;
		while (ii < board_n) {
			var xy = indTo2D(ii, conf.board.size.x);
			scene.append(
				createBoard(
					cell_size_array[xy[0]] + conf.board.location.x0 + wm.view.position.x,
					cell_size_array[xy[1]] + conf.board.location.y0 + wm.view.position.y,
					cell_size_x_m_1, cell_size_y_m_1, scene
				)
			);
			++ii;
		}

		ii            = 0;
		while(ii < conf.piece.n) {
			details = conf.initial_pieces[ii];
			// var angle = details.angle;
			details.bw = 0;
			details.width = cell_size_x_m_1;
			details.height = cell_size_y_m_1;
			details.initial_index = ii;
			details.piece_index = conf.piece.piece_index[ii];
			details.piece = {
				scene: scene,
				src: scene.assets['shogi_pieces'],
				opacity: 1.0,
				width: cell_size_x_m_1,
				height: cell_size_y_m_1,
				angle: details.angle,
				srcX: details.srcX,
				srcY: details.srcY,
				srcWidth: details.width,
				srcHeight: details.height,
			};
			details.initial = {
				index: ii,
				piece: conf.piece.piece_index[ii],
			};
			var p = piece.create(details);
			ii++;
		}
		var jj = 0;
		while (jj < conf.players.max_players) {
			piece.last[jj] = p;
			jj++;
		}

		//Store initial disk locations and BW for restarting game

		
		// Create window manager
		scene.setTimeout(function() {wm.create();}, 100);
	});
	g.game.pushScene(scene);
}
module.exports = main;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function indTo2D(ii, dim) {
	var cood = [];
	cood[0] = ii % dim;
	cood[1] = (ii -  cood[0]) / dim;
	return cood;
}

function createBoard(x, y, w, h, scene) {
	return new g.FilledRect({
		scene: scene,
		cssColor: conf.board.cell.properies.cssColor,
		opacity: conf.board.cell.properies.opacity,
		x: x,
		y: y,
		width: w,
		height: h
	});
}
