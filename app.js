var Mine = {
	canvas: document.getElementById("canvas"),
	maxx: 0,
	maxy: 0,
	mines: 0,
	clicked: 0,
	init: function(nx, ny) {
		this.maxx = nx;
		this.maxy = ny;
		this.mines = 0;
		this.clicked = 0;
		this.canvas.innerHTML = '';
		document.getElementById("error").style.display = 'none';
		document.getElementById("win").style.display = 'none';
		for (i = 0; i < nx; i++) {
			for (j = 0; j < ny; j++) {
				this.canvas.innerHTML += '<input type="button" id="field'+i+j+'" value="  " class="'+this.setMine()+'" onclick="Mine.click('+i+', '+j+');" />';
			}
			this.canvas.innerHTML += '<br />';
		}
	},
	click: function(x, y) {
		this.clicked++;
		if (this.isMine(x, y) || this.clicked - this.maxx*this.maxy == this.maxx) {
			this.endOfGame(x, y);
		} else {
			this.revealField(x, y);
		}
	},
	endOfGame: function(i, j) {
		this.revealField(i, j);
		inputs = document.getElementsByTagName("input");
	    for (var i = 1; i < inputs.length; i++) {
	    	inputs[i].disabled = true;
	    }
		document.getElementById((this.clicked - this.maxx*this.maxy == this.maxx) ? "win" : "error").style.display = 'block';
	},
	setMine: function() {
		if (this.mines < this.maxx) {
			if (Math.floor(Math.random()*100) % 7 == 0) {
				this.mines++;
				return 'mine';
			}
		}
		return 'not-mine';
	}, 
	revealField: function(x, y) {
		if (this.isMine(x, y)) {
			field = document.getElementById('field' + x + y);
			field.value = 'B';
			field.className = 'bomb';
			field.disabled = true;
		} else {
			nearMineCount = 0;
			for (i = -1; i < 2; i++) {
				for (j = -1; j < 2; j++) {
					if (x + i < this.maxx && x + i >= 0 && y + j < this.maxy && y + j >= 0) {
						if (this.isMine(x + i, y + j))
							nearMineCount++;
					}
				}
			}
			field = document.getElementById('field' + x + y);
			field.value = nearMineCount;
			field.className = 'clicked';
			field.disabled = true;
		}
	},
	isMine: function(x, y) {
		return (document.getElementById('field' + x + y).className == 'mine') ? true : false;
	},
}