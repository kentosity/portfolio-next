import type { Renderer } from "./shared";

const vertexSource = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0., 1.); }`;

const fragmentSource = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
uniform float seed;
uniform float intensity;
uniform float pulse;
uniform float variation;
out vec4 outputColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
mat2 rotate(float a) { return mat2(cos(a),-sin(a),sin(a),cos(a)); }
vec3 pigment(float t) {
  vec3 navy = vec3(.018,.055,.17);
  vec3 cobalt = vec3(.045,.23,.82);
  vec3 mint = vec3(.29,.91,.78);
  vec3 paper = vec3(.87,.95,.99);
  vec3 coral = vec3(1.,.34,.19);
  vec3 peach = vec3(1.,.75,.59);
  float p = fract(t) * 6.;
  if(p < 1.) return mix(navy,cobalt,smoothstep(0.,1.,p));
  if(p < 2.) return mix(cobalt,mint,smoothstep(1.,2.,p));
  if(p < 3.) return mix(mint,paper,smoothstep(2.,3.,p));
  if(p < 4.) return mix(paper,peach,smoothstep(3.,4.,p));
  if(p < 5.) return mix(peach,coral,smoothstep(4.,5.,p));
  return mix(coral,navy,smoothstep(5.,6.,p));
}
void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = (uv - .5) * vec2(1.4,1.);
  p = rotate(-.4) * p;
  vec2 hand = (pointer - .5) * vec2(1.4,1.);
  vec2 delta = p - rotate(-.4)*hand;
  float influence = exp(-dot(delta,delta)*7.);
  p += vec2(-delta.y,delta.x) * influence * intensity * 1.5;
  float clock = time * .065 + seed * .001 + variation * .21;
  float wave = exp(-max(pulse,0.)*.65) * sin(length(p)*19.-pulse*3.) * .035;
  p += wave;
  vec2 lens = (p-vec2(.10,.015)-rotate(-.4)*hand*.42)*vec2(1.,1.12);
  float lensDistance = length(lens)-.295;
  float lensMask = 1.-smoothstep(-.004,.004,lensDistance);
  float curvature = sqrt(max(0.,1.-pow(length(lens)/.295,2.)));
  p += lens * lensMask * curvature * (.5 + intensity*.35);
  for(int i=0; i<4; i++) {
    float n = float(i)+1.;
    p += .16/n * vec2(sin(p.y*n*4.+clock+n*1.8),cos(p.x*n*4.-clock+n*1.2));
    p = rotate(.18) * p;
  }
  float field = p.x*2.2 + p.y*.7 + sin(p.y*7.+clock)*.24;
  float bands = field*2.1 + .11*sin(field*30.);
  vec3 color = pigment(bands);
  float relief = sin(field*29.)*.5+.5;
  vec3 normal = normalize(vec3(-dFdx(relief)*resolution.x*.065,-dFdy(relief)*resolution.y*.065,1.));
  float light = max(dot(normal,normalize(vec3(-.5,.8,1.1))),0.);
  color *= .61 + light*.54;
  color += vec3(.75,.88,1.) * pow(max(dot(reflect(normalize(vec3(.4,-.6,-1.)),normal),vec3(0.,0.,1.)),0.),34.)*.44;
  float vein = pow(.5+.5*sin(field*160.),28.) * (1.-smoothstep(.15,.9,fwidth(field)*160.));
  color = mix(color,vec3(.9,.97,1.),vein*.22);
  float rim = exp(-abs(lensDistance)*420.);
  color += rim*vec3(.65,.86,1.)*(.3+.7*smoothstep(-.3,.3,lens.y));
  color *= 1.-exp(-abs(lensDistance+.012)*180.)*.16;
  color += (hash(gl_FragCoord.xy)-.5)*.035;
  color *= 1.-.18*dot(uv-.5,uv-.5);
  outputColor=vec4(color,1.);
}`;

export function createGlass(
  canvas: HTMLCanvasElement,
  seed: number,
): Renderer | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      const message = gl!.getShaderInfoLog(shader);
      gl!.deleteShader(shader);
      throw new Error(message ?? "Shader compilation failed");
    }
    shaders.push(shader);
    return shader;
  }
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error("Glass shader linking failed");
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = Object.fromEntries(
    [
      "resolution",
      "pointer",
      "time",
      "seed",
      "intensity",
      "pulse",
      "variation",
    ].map((name) => [name, gl.getUniformLocation(program, name)]),
  );
  gl.uniform1f(uniforms.seed, seed);
  return {
    draw(frame) {
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, frame.pointer[0], 1 - frame.pointer[1]);
      gl.uniform1f(uniforms.time, frame.time);
      gl.uniform1f(uniforms.intensity, frame.intensity);
      gl.uniform1f(uniforms.pulse, frame.pulse);
      gl.uniform1f(uniforms.variation, frame.variation);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    resize(w, h, ratio) {
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
