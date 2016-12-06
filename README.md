# draw-and-load

Add a drawing animation to your webpage when it's loaded.

[Demo Here](https://github.com/tim-zhong/draw-and-load/demo/)
## Installation
Browser
```html
<script src="draw-and-load.js"></script>
```
## Usage
```js
var options = {};
options.selection = document.getElementsByClassName("myclass");
var animation = new DrawingAnimation(options);
animation.go();
```
