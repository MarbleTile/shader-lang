let golShader;
let prevFrame;

let run = true;

function preload(){
    golShader = loadShader('gol/gol.vert', 'gol/gol.frag');
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
    pixelDensity(1);
    noSmooth();

    prevFrame = createGraphics(width, height);
    prevFrame.pixelDensity(1);
    prevFrame.noSmooth();

    background(0);
    stroke(255);
    shader(golShader);
    golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function draw() {
    if(mouseIsPressed) {
        line(
            pmouseX-width/2,
            pmouseY-height/2,
            mouseX-width/2,
            mouseY-height/2
        );
    }

    if(run){
        prevFrame.image(get(), 0, 0);
        golShader.setUniform('tex', prevFrame);
    
        rect(-width/2, -height/2, width, height);
    }
}

function keyPressed() {
    if(keyCode === 32){
        run = !run;
    }
}
