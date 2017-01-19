function DrawingAnimation(options){
	var drawingDuration = options.drawingDuration || 300;
	var fadingDuration = options.fadingDuration || 100;
	var backgroundColor = options.backgroundColor || "#ffffff";
	var strokeColor = options.strokeColor || "#aaaaaa";
	var strokeWidth = (parseFloat(options.strokeWidth) || 1);
	var selection = options.selection;
	var randomize = options.randomize !== false;	// default as true
	var detectInview = options.detectInview !== false;	// default as true

	var elements = selection;	
	var svg = createSvgElement("svg");
	var rects = [];

	var scrollTop;
	this.svgInit = function(){
		svg = createSvgElement("svg");
		svg.setAttribute("width",window.innerWidth);
		svg.setAttribute("height",window.innerHeight);
		svg.style.position = "fixed";
		svg.style.background = backgroundColor;
		svg.style.top = "0px";
		svg.style.left = "0px";
	}

	this.genRects = function(){
		scrollTop = document.documentElement.scrollTop;
		if (scrollTop < document.body.scrollTop) scrollTop = document.body.scrollTop;

		for(var  i = 0; i < elements.length; i++){
			var el = elements[i];

			var offsetTop  = el.offsetTop;
			var y = offsetTop - scrollTop;
			var x = el.offsetLeft;
			var w = el.offsetWidth;
			var h = el.offsetHeight;
			var perimeter = (w + h) * 2;

			var rect = createSvgElement("rect");
			rect.setAttribute("x",x);
			rect.setAttribute("y",y);
			rect.setAttribute("width",w);
			rect.setAttribute("height",h);
			rect.setAttribute("fill","none");
			rect.setAttribute("stroke",strokeColor);
			rect.setAttribute("stroke-width",strokeWidth);
			rect.stepLength = perimeter / drawingDuration + Math.random() * 1500 / drawingDuration;
			rect.curOffset = perimeter;
			rect.style.strokeDasharray = perimeter + "px";
			rect.style.strokeDashoffset = perimeter + "px";

			rect.step = function(){
				this.curOffset -= this.stepLength;
				if(this.curOffset <= 0) this.curOffset = 0;
				this.style.strokeDashoffset = this.curOffset + "px";
			}

			if(y + h >= 0 || !detectInview) rects.push(rect);
			svg.appendChild(rect);
		}
	}

	this.go = function(){
		this.svgInit();
		this.genRects();
		if(rects.length == 0) return;
		console.log(this);
		var frameCounter = 0;
		var intervalKey = setInterval(function(){
			for(var i = 0; i < rects.length; i++){
				rects[i].step();
			}
			frameCounter++;
			if(frameCounter >= drawingDuration){
				clearInterval(intervalKey);
				setTimeout(loadPage,150);
			}
		},1);
		document.body.appendChild(svg);
	}
	

	function loadPage(){
		rects = [];
		var opacity = 1;
		var counter = 0;
		var intervalKey = setInterval(function(){
			svg.style.opacity = 1 - counter/fadingDuration;
			counter++;
			if(counter >= fadingDuration){
				clearInterval(intervalKey);
				document.body.removeChild(svg);
			}
		},1);
	}

	function createSvgElement(s){
		return document.createElementNS('http://www.w3.org/2000/svg', s);
	}
}
