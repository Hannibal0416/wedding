var carray=new Array();
var root;
var NUM_CIRCLES=300;
var RADIUS=8;
var bHighRes=false;
var bGravity=false;
var bFade=true;
var g;
var g_texture;
var bImagesLoaded=false;
var nGeneralWindX=Math.sin(Math.random()*360)*3;
var nGeneralWindY=Math.cos(Math.random()*360)*3;
var arr_Msg=null;
var nMsgIndex=0;
var arr_ImageLetters=new Array();
var arr_letters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2'];
var ctx = null;
var color = null;
//for(var l=0;l<26;l++){
//	arr_ImageLetters[l]=new Image();
//	arr_ImageLetters[l].src="letters/free-alphabet-clipart-"+arr_letters[l]+".jpg"
//}

function Circle(x,y,r){
	this.x=x;
	this.y=y;
	this.r=r;
	this.destX=-1;
	this.destY=-1;
	this.alpha=0;
	this.vx=Math.random()-.5*5;
	this.vy=Math.random()-.5*5
}

function init(){
	g=$('#born_canvas')[0].getContext("2d");
	g_texture=$('#born_canvas_hidden')[0].getContext("2d");
	
	WIDTH=$("#born_canvas").width();
	HEIGHT=$("#born_canvas").height();
	TEXTURE_WIDTH=$("#born_canvas_hidden").width();
	TEXTURE_HEIGHT=$("#born_canvas_hidden").height();
	for(i=0;i<NUM_CIRCLES;i++)
		carray[i]=new Circle(Math.floor(Math.random()*WIDTH),Math.floor(Math.random()*HEIGHT),RADIUS);
	return setInterval(draw,20)
	
	
}
function setLetter(c){
	var nFound=-1;
	for(var i=0;i<arr_letters.length;i++){
		if(arr_letters[i]==c){
			nFound=i
		}
	}
	var nIndex=0;
	if(nFound>-1){
		g_texture.fillStyle="#000000";
		g_texture.fillRect(0,0,TEXTURE_WIDTH,TEXTURE_HEIGHT);
		g_texture.drawImage(arr_ImageLetters[nFound],0,0);
		var imageData=g_texture.getImageData(0,0,TEXTURE_WIDTH,TEXTURE_HEIGHT);
		var sqWidth=4;
		if(bHighRes)sqWidth=2;
		for(j=0;j<Math.floor(imageData.height);j=j+sqWidth){
			for(i=0;i<Math.floor(imageData.width);i=i+sqWidth){
				var nAvg=0;
				for(ypos=j;ypos<j+sqWidth;ypos++){
					for(xpos=i;xpos<i+sqWidth;xpos++){
						var index=(xpos*4)*imageData.width+(ypos*4);
						var red=imageData.data[index];
						var green=imageData.data[index+1];
						var blue=imageData.data[index+2];
						var alpha=imageData.data[index+3];
						var average=(red+green+blue)/3;
						nAvg+=average/(sqWidth*sqWidth)
					}
				}
				if(nAvg>60&&nIndex<carray.length){
					carray[nIndex].destX=(j+Math.floor(sqWidth/2))*1.5+260;
					carray[nIndex].destY=(i+Math.floor(sqWidth/2))*1.5+130;
					nIndex++
				}
			}
		}
	}
	for(i=nIndex+1;i<carray.length;i++){
		carray[i].destX=-1;
		carray[i].destY=-1
	}
}
function setNextLetter(){
	color = getRandomColor();
	setLetter(arr_Msg[nMsgIndex]);
	nMsgIndex++;
	nMsgIndex=nMsgIndex%arr_Msg.length
}
function clearCircles(){
	nGeneralWindX=Math.sin(Math.random()*360)*10;
	nGeneralWindY=Math.cos(Math.random()*360)*10;
	for(i=0;i<carray.length;i++){
		var nang=Math.random()*360;
		carray[i].vx=Math.sin(nang)*5;
		carray[i].vy=Math.cos(nang)*5;
		carray[i].destX=-1;carray[i].destY=-1
	}
}

function startClearCircles(){
	setInterval(clearCircles,1000)
}

Colors = {};
Colors.names = {
    darkmagenta: "#8b008b",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    magenta: "#ff00ff",
    maroon: "#800000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    yellow: "#ffff00"
}; 
Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
};
function draw(){
 	
	if(!bImagesLoaded){
		bImagesLoaded=imagesLoaded();
		return;
	}
	
	clear();
	
	var i;
	
	for (i=0; i<carray.length; i++)
	{
	var C=carray[i];	
	
	if(C.destX>-1){
		C.x+=(C.destX-C.x)/4+((C.destX-C.x)/90 * C.vx)+nGeneralWindX;
		C.y+=(C.destY-C.y)/4+((C.destY-C.y)/90 * C.vy)+nGeneralWindY;
		C.alpha+=(.1-C.alpha)/2;
	}
	else{		
		C.x+=C.vx+nGeneralWindX;
		C.y+=C.vy+nGeneralWindY;
		if(bGravity)
		C.vy+=1.0;
		if(bFade)
			C.alpha*=(.9+C.alpha)*.98
		if(C.alpha<0)C.alpha=0;
	}
	
	nGeneralWindX*=.9999;
	nGeneralWindY*=.9999;
	
	
	if(C.x<0){C.x=-C.x;C.vx=-C.vx;}
	if(C.y<0){C.y=-C.y;C.vy=-C.vy;};
	if(C.x>WIDTH){C.x=WIDTH-(C.x-WIDTH);C.vx=-C.vx;}
	if(C.y>HEIGHT){C.y=HEIGHT-(C.y-HEIGHT);C.vy=-C.vy*.45;}
	
	
	
	g.globalAlpha=0.5;
	g.beginPath();
	g.fillStyle = color;
	g.arc(C.x, C.y, C.r, 0, Math.PI * 2, true);
	g.closePath();
	g.fill();
		
	}
	

}




function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function imagesLoaded(){
	arr_letters = arr_Msg;
	ctx=document.querySelector('#txtCanvas').getContext('2d');
	ctx.font="90px 'Noto Sans TC'";
	ctx.fillStyle = '#f4b642';
	for(var i=0;i<arr_Msg.length;i++) {
		
		ctx.fillText(arr_Msg[i], 0, 80);
		arr_ImageLetters[i]=new Image();
		arr_ImageLetters[i].src=ctx.canvas.toDataURL();
		ctx.clearRect(0, 0, 100, 100);
	}

	setTimeout(startClearCircles,375);
	setInterval(setNextLetter,500);
	return true
}
function clear(){
	g.globalAlpha=.1;
//	g.fillStyle="rgba(0, 0, 0, 0.01)";
	g.fillStyle="#000000";
	g.fillRect(0,0,WIDTH,HEIGHT)
	g.clearRect(0,0,WIDTH,HEIGHT)
}
function changeMessage(){
	var txtVal=($("#message").val()).toLowerCase();
	arr_Msg=txtVal;
	nMsgIndex=0;
	strMsg=$("#message").val();
	var regNoNumbers=new RegExp("([^a-z ])*","gi");
	strMsg=strMsg.replace(regNoNumbers,"");
	$("#urlText").html("http://www.feedtank.com/labs/html_canvas/?msg="+escape(strMsg))
}
function setHighNumCircles(){
	NUM_CIRCLES=1500;
	bHighRes=true;
	delete carray;
	($("#radio_Low")).attr("checked","false");
	($("#radio_High")).attr("checked","true");
	carray=new Array();
	RADIUS=3;
	for(i=0;i<NUM_CIRCLES;i++)
		carray[i]=new Circle(Math.floor(Math.random()*WIDTH),Math.floor(Math.random()*HEIGHT),RADIUS)
}
function setMinNumCircles(){
	NUM_CIRCLES=300;
	bHighRes=false;
	RADIUS=8;
	($("#radio_Low")).attr("checked","true");
	($("#radio_High")).attr("checked","false");
	delete carray;
	carray=new Array();
	for(i=0;i<NUM_CIRCLES;i++)
		carray[i]=new Circle(Math.floor(Math.random()*WIDTH),Math.floor(Math.random()*HEIGHT),RADIUS)
}
function setGravity(){
	bGravity=!bGravity
}
function setFade(){
	bFade=!bFade
}
//$(document).ready(function(){
//	init()
//});