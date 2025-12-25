def setup():
	createCanvas(windowWidth, windowHeight, WEBGL);

def draw():
	background(100);
	resetMatrix();
	noStroke();
	deg = PI/180;
	ang = frameCount * deg/2;
	r = 2;
	camera (r*cos(ang),-1,r*sin(ang),0,0,0,0,1,0);
	perspective (PI/7, width/height, 0.01, 1000);
	pointLight (200, 200, 200, 2, -2, 2);
	pointLight (200, 200, 200, 0, -2, 0);
	push();
	for i in range (-5, 6):
		x = i * 0.2;
		for j in range(-5, 6):
		    z = j * 0.2;
		    pop(); push();
		    translate (x,0,z);
		    rotateX((ang%PI)*cos(ang)+i*deg*10)
		    rotateZ(ang+j*deg*5)
		    box (0.2,0.2,0.2)
	pop();