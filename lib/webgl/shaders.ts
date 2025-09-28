// Vertex shader - common for all effects
export const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Water ripple fragment shader
export const waterRippleShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScrollY;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  float noise(vec2 p) {
    return sin(p.x * 10.0) * sin(p.y * 10.0);
  }

  void main() {
    vec2 uv = vUv;

    // Create ripple effect
    float ripple1 = sin(distance(uv, vec2(0.5)) * 20.0 - uTime * 2.0 + uScrollY * 0.001) * 0.5 + 0.5;
    float ripple2 = sin(distance(uv, vec2(0.3, 0.7)) * 15.0 - uTime * 1.5) * 0.5 + 0.5;
    float ripple3 = sin(distance(uv, vec2(0.7, 0.3)) * 18.0 - uTime * 1.8) * 0.5 + 0.5;

    // Combine ripples
    float ripples = (ripple1 + ripple2 + ripple3) / 3.0;
    ripples = pow(ripples, 2.0) * uIntensity;

    // Create gradient
    vec3 color = mix(uColor1, uColor2, uv.y);
    color = mix(color, uColor3, ripples);

    // Add subtle noise
    float n = noise(uv * 20.0 + uTime * 0.5) * 0.05;
    color += vec3(n);

    gl_FragColor = vec4(color, 0.95);
  }
`;

// Organic blob fragment shader
export const organicBlobShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScrollY;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Create organic blob movement
    float blob1 = snoise(uv * 3.0 + vec2(uTime * 0.3, uScrollY * 0.0005));
    float blob2 = snoise(uv * 2.0 - vec2(uTime * 0.2, -uTime * 0.15));
    float blob3 = snoise(uv * 4.0 + vec2(-uTime * 0.25, uTime * 0.3));

    float blobs = (blob1 + blob2 * 0.5 + blob3 * 0.25) * uIntensity;
    blobs = smoothstep(-0.2, 0.8, blobs);

    // Create color gradient
    vec3 color = mix(uColor1, uColor2, blobs);
    color = mix(color, uColor3, pow(uv.y, 2.0));

    // Add glow effect
    float glow = exp(-distance(vec2(0.5), uv) * 3.0) * 0.3;
    color += glow * uColor2;

    gl_FragColor = vec4(color, 0.9);
  }
`;

// Flowing sand fragment shader
export const flowingSandShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScrollY;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;

    // Create flowing sand dunes
    float sand1 = noise(vec2(uv.x * 5.0, uv.y * 3.0 - uTime * 0.5));
    float sand2 = noise(vec2(uv.x * 8.0 - uTime * 0.3, uv.y * 6.0));
    float sand3 = noise(vec2(uv.x * 12.0, uv.y * 10.0 - uTime * 0.2 + uScrollY * 0.0003));

    float sandPattern = (sand1 * 0.5 + sand2 * 0.3 + sand3 * 0.2) * uIntensity;
    sandPattern = smoothstep(0.3, 0.7, sandPattern);

    // Create gradient with sand texture
    vec3 color = mix(uColor1, uColor2, sandPattern);
    color = mix(color, uColor3, pow(uv.x + uv.y, 1.5) * 0.5);

    // Add grain texture
    float grain = random(uv * 100.0) * 0.05;
    color += vec3(grain);

    gl_FragColor = vec4(color, 0.92);
  }
`;

// Aurora gradient fragment shader
export const auroraShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScrollY;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * sin(p.x * frequency + uTime * 0.5) * cos(p.y * frequency * 0.8 + uTime * 0.3);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;

    // Create aurora waves
    float aurora1 = fbm(uv * 3.0 + vec2(0.0, -uScrollY * 0.0002));
    float aurora2 = fbm(uv * 4.0 + vec2(uTime * 0.1, 0.0));
    float aurora3 = fbm(uv * 2.0 - vec2(uTime * 0.15, uTime * 0.05));

    float aurora = (aurora1 + aurora2 * 0.7 + aurora3 * 0.5) * uIntensity;
    aurora = smoothstep(-1.0, 1.0, aurora);

    // Create shifting colors
    float hue = aurora * 0.3 + uTime * 0.02 + uv.y * 0.2;
    vec3 color1 = hsv2rgb(vec3(hue, 0.6, 0.9));
    vec3 color2 = hsv2rgb(vec3(hue + 0.1, 0.5, 0.8));

    vec3 color = mix(uColor1, color1, aurora);
    color = mix(color, color2, pow(uv.y, 1.5));
    color = mix(color, uColor3, pow(1.0 - uv.y, 3.0) * 0.3);

    // Add shimmer
    float shimmer = sin(uv.y * 50.0 + uTime * 3.0) * 0.02;
    color += shimmer * uColor2;

    gl_FragColor = vec4(color, 0.85);
  }
`;