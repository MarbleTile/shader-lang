#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D tex;
uniform vec2 normalRes;

void main(){
    vec2 uv = vTexCoord;

    uv.y = 1.0 - uv.y;

	red = vec4(1.0, 0.0, 0.0, 1.0);
	green = vec4(0.0, 1.0, 0.0, 1.0);
	blue = vec4(0.0, 0.0, 1.0, 1.0);


	uint red_num;
	uint green_num;
	uint blue_num;


    vec4 col;
    for(float i = -1.0; i < 2.0; i++){
        for(float j = -1.0; j < 2.0; j++){
            if(i == 0.0 && j == 0.0){
                continue;
            }
            float x = uv.x + i * normalRes.x;
            float y = uv.y + j * normalRes.y;

            col = texture2D(tex, vec2(x, y));

			switch(col){
				case red:
					red_num++;
					break;
				case green:
					green_num++;
					break;
				case blue:
					blue_num++;
					break;
			}

        }
    }

    num -= a;

//RULES

    gl_FragColor = color;
}
