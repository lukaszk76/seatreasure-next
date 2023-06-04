varying vec2 vUv;
uniform float time;
uniform sampler2D uTexture;
uniform sampler2D uImage;
uniform float uThemeLight;
void main() {

    vec3 colorDark = vec3(39./255.,48./255.,67./255.);
    vec3 colorLight = vec3(255./255.,255./255.,255./255.);
    vec3 color = colorLight;

   if (uThemeLight == 1.0) {
        color = colorDark;
    }
    gl_FragColor = vec4(color, 1.0);


}
