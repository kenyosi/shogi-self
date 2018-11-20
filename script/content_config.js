/*
 * Configuration file
 * shogi@self
 * Akashic content
 */
////////////////////////////////////////////////////////////////////////////////////////////
// Constants
var current_time = 0; // set as game.age is zero, replaced with new Date().getTime();

var constant = {
	month_length:     30 * 24 * 60 * 60 * g.game.fps, // 30 * 24 * 60 * 60 second in frame number
	old_time:        -30 * 24 * 60 * 60 * g.game.fps, //
	random_seed_number: current_time,                 // 0 for development
	unit: {x: 32, y: 32, width: 32, height: 32},
	ut1: {x: 68, y: 60, width: 68, height: 60},
	ut2: {x: 32, y: 32, width: 32, height: 32},
};
module.exports.const = constant;

var cs            = [];
var c2            = [];
var i = 0;
while(i < 20) {// [0, 1 * size, 2 * size, ...]
	cs[i] = i * constant.unit.x;
	c2[i] = {x: i * constant.ut2.x, y: i * constant.ut2.y};
	i++;
}

////////////////////////////////////////////////////////////////////////////////////////////
// Board
var board = {
	an: { // algebraic notation
		x: ['9',  '8',  '7',  '6',  '5',  '4',  '3',  '2',  '1'],
		y: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
	},
	size: {x: 9, y: 9},
	cell: {
		size: {x: constant.unit.x, y: constant.unit.y},
		properies:{cssColor: '#eac669' , opacity: 0.5},
	},
	location : {
		x0:     cs[3],
		y0:     cs[0],
		width:  cs[9],
		height: cs[9],
	},
};
module.exports.board = board;

module.exports.status_bar = {
	text: [
		'Testing message'
	],
	x: cs[3],
	y: g.game.height - cs[1],
	width: g.game.width - cs[1 + 3],
	height: cs[1],
	background : {
		off: {cssColor: '#FFFFFF',   opacity: 0.5}
	}
};

var pile_area = {
	background: {cssColor: '#eac669',   opacity: 0.5},
	location : {
		x0:     cs[13] - 0.2 * cs[1],
		y0:     cs[1],
		width:  cs[4],
		height: cs[3]  + 0.5 * cs[1],
	},
};
module.exports.pile_area = pile_area;

////////////////////////////////////////////////////////////////////////////////////////////
// Players
module.exports.players = {
	max_players: 2,
	admin : [true, false, false, false],
	default: [
		{id: '-9999', name: '', head: 'Player1: 参加中', timestamp: constant.old_unix_time, time_warning: 0, player_plate: 0, player_plate_status: 0, login: false, group: 'admin'},
		{id: '-9999', name: '', head: 'Player2: 募集します', timestamp: constant.old_unix_time, time_warning: 0, player_plate: 0, player_plate_status: 0, login: false, group: 'user'},
		{id: '-9999', name: '', head: 'Player3: 募集します', timestamp: constant.old_unix_time, time_warning: 0, player_plate: 0, player_plate_status: 0, login: false, group: 'user'},
		{id: '-9999', name: '', head: 'Player4: 募集します', timestamp: constant.old_unix_time, time_warning: 0, player_plate: 0, player_plate_status: 0, login: false, group: 'user'},
	],
	window_pointer: [
		{text: 'P1', x: cs[15] + 8, y: cs[1] + 14, width: cs[2], height: cs[2], fontSize: 30, textColor: '#005b98',
			arrow:{srcX:  1, srcY: 130, width: 12, height: 12},
		},
		{text: 'P2', x: cs[15] + 8, y: cs[5] + 27, width: cs[2], height: cs[2], fontSize: 30, textColor: '#c9396d',
			arrow:{srcX: 17, srcY: 130, width: 12, height: 12},
		},
		{text: 'P3', x: cs[10] + 8, y: cs[5] + 27, width: cs[2], height: cs[2], fontSize: 30, textColor: '#00ff00',
			arrow:{srcX: 33, srcY: 130, width: 12, height: 12},
		},
		{text: 'P4', x: cs[08] + 8, y: cs[5] + 27, width: cs[2], height: cs[2], fontSize: 30, textColor: '#ff00ff',
			arrow:{srcX: 49, srcY: 130, width: 12, height: 12},
		},
	],
	cell: {
		state: {
			size: {x: 2, y: 2},
			time: 1.0 * g.game.fps,
		},
	},
	item: {
		operating: [
			{cssColor: '#0062ff',   opacity: 1.0}, //P0
			{cssColor: '#ff0000',   opacity: 1.0}, //P1
			{cssColor: '#00ff00',   opacity: 1.0}, //P2
			{cssColor: '#ff00ff',   opacity: 1.0}, //P3
		],
		waiting: [
			{cssColor: '#0062ff',   opacity: 0.5}, //P0
			{cssColor: '#ff0000',   opacity: 0.5}, //P1
			{cssColor: '#00ff00',   opacity: 0.5}, //P2
			{cssColor: '#ff00ff',   opacity: 0.5}, //P3
		],
	},
	time: {
		life:   constant.month_length, // no logout
		warning:    constant.month_length - 40,
	},
};

////////////////////////////////////////////////////////////////////////////////////////////
// Help board
var help_board = {
	height: g.game.height,
	width: g.game.width,
	scroll_height: g.game.height,
	label: {
		cssColor: 'black',
		opacity: 0.60,
	},
	background: {
		cssColor: '#CCCCCC',
		opacity: 0.90,
	},
	text: [
		{x: 20, y:  20, font_size: 16, s: '遊び方'},
		{x: 20, y:  48, font_size: 12, s: '駒はドラッグ&ドロップで置きます'},
		{x: 20, y:  60, font_size: 12, s: 'タップすると白黒反転します'},
		{x: 20, y:  82, font_size: 12, s: 'Player1は配信者さん'},
		{x: 20, y:  94, font_size: 12, s: 'Player2は駒を最初に触った視聴者さんです'},
		{x: 20, y: 106, font_size: 12, s: '右の中央にプレイヤーの最初の2文字を表示します'},
		{x: 20, y: 128, font_size: 12, s: '自分の名前をスワイプすると退席します'},
		{x: 20, y: 140, font_size: 12, s: '3分間駒を動かさないと退席します'},
		{x: 20, y: 162, font_size: 12, s: 'アイコン'},
		{x: 20, y: 174, font_size: 12, s: '[□] 視点移動/固定、[？] ヘルプ表示/非表示'},
		{x: 20, y: 188, font_size: 12, s: ''},
		{x: 20, y: 208, font_size: 12, s: 'このボタンを押すと盤をひっくり返します'},
		{x: 20, y: 210, font_size: 12, s: ''},
	],
};
module.exports.help_board = help_board;

////////////////////////////////////////////////////////////////////////////////////////////
// Piece
var pi = {
	n: 40,
	unselect: {
		background: {cssColor: 'gray',   opacity: 0.0},
	},
	on_board: {srcX: cs[0], opacity: 1.0},
	src_xy: [
		[[cs[0], cs[1]], [cs[0], cs[0]]], // 0, hu
		[[cs[1], cs[1]], [cs[1], cs[0]]], // 1, kyou-shya
		[[cs[2], cs[1]], [cs[2], cs[0]]], // 2, keima
		[[cs[3], cs[1]], [cs[3], cs[0]]], // 3, gin
		[[cs[4], cs[1]], [cs[4], cs[1]]], // 4, kin
		[[cs[5], cs[1]], [cs[5], cs[0]]], // 5, kaku
		[[cs[6], cs[1]], [cs[6], cs[0]]], // 6, hisya
		[[cs[7], cs[1]], [cs[7], cs[1]]], // 7, ou
		[[cs[7], cs[0]], [cs[7], cs[0]]], // 8, gyoku
	],
	piece_index: [
		1,  2,  3,  4,  7,  4,  3,  2,  1,
		6,  5,
		0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,
		5,  6,
		1,  2,  3,  4,  8,  4,  3,  2,  1,
	],
};
module.exports.piece = pi;
var x0 = 3;
var y0 = 0;
var y1 = 1;
var y2 = 2;
var y3 = 6;
var y4 = 7;
var y5 = 8;
var a1 = 180;
var a2 = 0;
var initial_pieces = [
	{x: cs[x0 + 0], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 0]][0][0], srcY:pi.src_xy[pi.piece_index[ 0]][0][1]},
	{x: cs[x0 + 1], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 1]][0][0], srcY:pi.src_xy[pi.piece_index[ 1]][0][1]},
	{x: cs[x0 + 2], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 2]][0][0], srcY:pi.src_xy[pi.piece_index[ 2]][0][1]},
	{x: cs[x0 + 3], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 3]][0][0], srcY:pi.src_xy[pi.piece_index[ 3]][0][1]},
	{x: cs[x0 + 4], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 4]][0][0], srcY:pi.src_xy[pi.piece_index[ 4]][0][1]},
	{x: cs[x0 + 5], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 5]][0][0], srcY:pi.src_xy[pi.piece_index[ 5]][0][1]},
	{x: cs[x0 + 6], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 6]][0][0], srcY:pi.src_xy[pi.piece_index[ 6]][0][1]},
	{x: cs[x0 + 7], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 7]][0][0], srcY:pi.src_xy[pi.piece_index[ 7]][0][1]},
	{x: cs[x0 + 8], y: cs[y0], angle: a1, srcX: pi.src_xy[pi.piece_index[ 8]][0][0], srcY:pi.src_xy[pi.piece_index[ 8]][0][1]},
	{x: cs[x0 + 1], y: cs[y1], angle: a1, srcX: pi.src_xy[pi.piece_index[ 9]][0][0], srcY:pi.src_xy[pi.piece_index[ 9]][0][1]},
	{x: cs[x0 + 7], y: cs[y1], angle: a1, srcX: pi.src_xy[pi.piece_index[10]][0][0], srcY:pi.src_xy[pi.piece_index[10]][0][1]},
	{x: cs[x0 + 0], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[11]][0][0], srcY:pi.src_xy[pi.piece_index[11]][0][1]},
	{x: cs[x0 + 1], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[12]][0][0], srcY:pi.src_xy[pi.piece_index[12]][0][1]},
	{x: cs[x0 + 2], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[13]][0][0], srcY:pi.src_xy[pi.piece_index[13]][0][1]},
	{x: cs[x0 + 3], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[14]][0][0], srcY:pi.src_xy[pi.piece_index[14]][0][1]},
	{x: cs[x0 + 4], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[15]][0][0], srcY:pi.src_xy[pi.piece_index[15]][0][1]},
	{x: cs[x0 + 5], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[16]][0][0], srcY:pi.src_xy[pi.piece_index[16]][0][1]},
	{x: cs[x0 + 6], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[17]][0][0], srcY:pi.src_xy[pi.piece_index[17]][0][1]},
	{x: cs[x0 + 7], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[18]][0][0], srcY:pi.src_xy[pi.piece_index[18]][0][1]},
	{x: cs[x0 + 8], y: cs[y2], angle: a1, srcX: pi.src_xy[pi.piece_index[19]][0][0], srcY:pi.src_xy[pi.piece_index[19]][0][1]},
	{x: cs[x0 + 0], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[20]][0][0], srcY:pi.src_xy[pi.piece_index[20]][0][1]},
	{x: cs[x0 + 1], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[21]][0][0], srcY:pi.src_xy[pi.piece_index[21]][0][1]},
	{x: cs[x0 + 2], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[22]][0][0], srcY:pi.src_xy[pi.piece_index[22]][0][1]},
	{x: cs[x0 + 3], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[23]][0][0], srcY:pi.src_xy[pi.piece_index[23]][0][1]},
	{x: cs[x0 + 4], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[24]][0][0], srcY:pi.src_xy[pi.piece_index[24]][0][1]},
	{x: cs[x0 + 5], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[25]][0][0], srcY:pi.src_xy[pi.piece_index[25]][0][1]},
	{x: cs[x0 + 6], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[26]][0][0], srcY:pi.src_xy[pi.piece_index[26]][0][1]},
	{x: cs[x0 + 7], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[27]][0][0], srcY:pi.src_xy[pi.piece_index[27]][0][1]},
	{x: cs[x0 + 8], y: cs[y3], angle: a2, srcX: pi.src_xy[pi.piece_index[28]][0][0], srcY:pi.src_xy[pi.piece_index[28]][0][1]},
	{x: cs[x0 + 1], y: cs[y4], angle: a2, srcX: pi.src_xy[pi.piece_index[29]][0][0], srcY:pi.src_xy[pi.piece_index[29]][0][1]},
	{x: cs[x0 + 7], y: cs[y4], angle: a2, srcX: pi.src_xy[pi.piece_index[30]][0][0], srcY:pi.src_xy[pi.piece_index[30]][0][1]},
	{x: cs[x0 + 0], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[31]][0][0], srcY:pi.src_xy[pi.piece_index[31]][0][1]},
	{x: cs[x0 + 1], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[32]][0][0], srcY:pi.src_xy[pi.piece_index[32]][0][1]},
	{x: cs[x0 + 2], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[33]][0][0], srcY:pi.src_xy[pi.piece_index[33]][0][1]},
	{x: cs[x0 + 3], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[34]][0][0], srcY:pi.src_xy[pi.piece_index[34]][0][1]},
	{x: cs[x0 + 4], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[35]][0][0], srcY:pi.src_xy[pi.piece_index[35]][0][1]},
	{x: cs[x0 + 5], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[36]][0][0], srcY:pi.src_xy[pi.piece_index[36]][0][1]},
	{x: cs[x0 + 6], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[37]][0][0], srcY:pi.src_xy[pi.piece_index[37]][0][1]},
	{x: cs[x0 + 7], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[38]][0][0], srcY:pi.src_xy[pi.piece_index[38]][0][1]},
	{x: cs[x0 + 8], y: cs[y5], angle: a2, srcX: pi.src_xy[pi.piece_index[39]][0][0], srcY:pi.src_xy[pi.piece_index[39]][0][1]},
];
module.exports.initial_pieces = initial_pieces;

////////////////////////////////////////////////////////////////////////////////////////////
// Window manager

var window = {
	max_prevDelta: cs[2] * cs[2], // per frame
	max_pointers: 16,             // per player
	max_multi_operation: 1,       // per player
};
module.exports.window = window;

var window_icon = {
	zoom:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 0,  srcY: 32, opacity: 0.80},
			on:  {srcX: 32, srcY: 32, opacity: 0.80},
		},
		local: false,
	},
	camera:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 0,  srcY: 0, opacity: 0.80},
			on:  {srcX: 32, srcY: 0, opacity: 0.80},
		},
		local: false,
	},
	login:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 0,  srcY: 32, opacity: 0.80},
			on:  {srcX: 32, srcY: 32, opacity: 0.80},
		},
		local: false,
	},
	admin:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 0,  srcY: 64, opacity: 0.80},
			on:  {srcX: 32, srcY: 64, opacity: 0.80},
		},
		local: false,
	},
	help:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 32, srcY: 96, opacity: 0.80},
			on:  {srcX: 32, srcY: 96, opacity: 0.80},
		},
		local: true,
	},
	restart_game:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 0, srcY: 96, opacity: 0.80},
			on:  {srcX: 0, srcY: 96, opacity: 0.80},
		},
		local: false,
	},
	yes:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 0, srcY: 96, opacity: 0.80},
			on:  {srcX: 0, srcY: 96, opacity: 0.80},
		},
	},
	no:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.80},
			on:  {cssColor: 'yellow',  opacity: 0.80},
		},
		icon:{
			off: {srcX: 32, srcY: 96, opacity: 0.80},
			on:  {srcX: 32, srcY: 96, opacity: 0.80},
		},
	},
	pointer:{
		background:{
			off: {cssColor: '#DDDDDD', opacity: 0.8},
			on:  {cssColor: 'white',  opacity: 0.8},
			operation_off: {cssColor: '#FFFF88', opacity: 0.8},
			operation_on:  {cssColor: '#FFFF00',  opacity: 0.8},
		},
	},
};
module.exports.window_icon = window_icon;
////////////////////////////////////////////////////////////////////////////////////////////
// confirm board
var window_manager_confirm = {
	height: 32 * 3,
	width: 32 * 5,
	label: {
		cssColor: 'black',
		opacity: 1.0,
	},
	background: {
		cssColor: '#CCCCCC',
		opacity: 1.0,
	},
	text: [
		{x: 4, y:  0  + 14, font_size: 12, s: 'Player2、退席します'},
		{x: 4, y:  32 + 2, font_size: 12, s: 'よろしいですか？'},
	],
};
module.exports.window_manager_confirm = window_manager_confirm;

////////////////////////////////////////////////////////////////////////////////////////////
// Comment
var comment = {
	que:{size: 128},
	speed: 2,
	lines: 8,
	y0: cs[8] + 5,
	properies: {
		fontSize: 16,
		cssColor: 'white',
		opacity: 1.0,
		strokeColor: 'black',
		strokeWidth: 0.33
	},
};
module.exports.comment = comment;
////////////////////////////////////////////////////////////////////////////////////////////
// Button
var default_button = {
	cssColor: 'green',
	opacity: 0.5,
};
module.exports.default_button = default_button;

////////////////////////////////////////////////////////////////////////////////////////////
// Fonts
var default_label = {
	fontSize: 12,
	cssColor: default_button.cssColor,
	opacity: default_button.opacity,
};
module.exports.default_label = default_label;

var here_font = new g.DynamicFont({
	game: g.game,
	fontFamily: g.FontFamily.SansSerif,
	fontWeight: 1,
	size: default_label.fontSize,
});
module.exports.default_font = here_font;

var comment_font = new g.DynamicFont({
	game: g.game,
	fontFamily: g.FontFamily.SansSerif,
	fontWeight: 1,
	size: comment.properies.fontSize,
	fontColor: comment.properies.cssColor,
	strokeColor: comment.properies.strokeColor,
	strokeWidth: comment.properies.strokeWidth,
});
module.exports.comment_font = comment_font;
