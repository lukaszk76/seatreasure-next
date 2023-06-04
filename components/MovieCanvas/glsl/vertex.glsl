varying vec2 vUv;
uniform float uTime;

void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 1000. * ( 1. / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
}