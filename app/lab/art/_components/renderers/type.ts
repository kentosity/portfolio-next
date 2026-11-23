import { createSurface, randomFromSeed, tau, type Renderer } from "./shared";

type Vector = [number, number, number];
const vertexSource = `#version 300 es
in vec3 position;
in vec3 normal;
in vec2 uv;
uniform float aspect;
uniform float turn;
uniform vec2 pointer;
uniform float intensity;
out vec3 surfaceNormal;
out vec3 surfacePosition;
out vec2 textureUV;
mat3 rotateX(float a) { return mat3(1.,0.,0.,0.,cos(a),sin(a),0.,-sin(a),cos(a)); }
mat3 rotateY(float a) { return mat3(cos(a),0.,-sin(a),0.,1.,0.,sin(a),0.,cos(a)); }
mat3 rotateZ(float a) { return mat3(cos(a),sin(a),0.,-sin(a),cos(a),0.,0.,0.,1.); }
void main() {
  mat3 rotation = rotateX(.8+(pointer.y-.5)*.5) * rotateY(turn+(pointer.x-.5)*.6) * rotateZ(-.35);
  vec3 p = rotation * (position + normal*(intensity-.55)*.25);
  surfaceNormal = rotation * normal;
  surfacePosition = p;
  textureUV = uv;
  p.z -= 9.2;
  float f = 2.35;
  gl_Position = vec4(p.x*f/aspect,p.y*f,-1.002*p.z-.2002,-p.z);
}`;
const fragmentSource = `#version 300 es
precision highp float;
uniform sampler2D lettering;
in vec3 surfaceNormal;
in vec3 surfacePosition;
in vec2 textureUV;
out vec4 outputColor;
void main() {
  vec3 n=normalize(surfaceNormal);
  vec3 base=texture(lettering,textureUV).rgb;
  float diffuse=max(dot(n,normalize(vec3(-.5,.9,1.6))),0.);
  float shade=.36+diffuse*.67;
  float ao=smoothstep(.25,2.6,length(surfacePosition.xy));
  vec3 color=base*shade*(.78+ao*.22);
  float specular=pow(max(dot(n,normalize(vec3(-.3,.6,2.))),0.),32.);
  color+=vec3(1.,.91,.8)*specular*.16;
  float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5;
  outputColor=vec4(color+grain*.018,1.);
}`;

const backgroundVertexSource = `#version 300 es
in vec2 position;
void main() { gl_Position=vec4(position,0.,1.); }`;

const backgroundFragmentSource = `#version 300 es
precision highp float;
uniform vec2 resolution;
out vec4 outputColor;
void main() {
  vec2 uv=gl_FragCoord.xy/resolution;
  vec2 shadow=(uv-vec2(.52,.16))/vec2(.29,.045);
  float shade=exp(-dot(shadow,shadow)*2.)*.19;
  vec3 color=mix(vec3(.94,.77,.69),vec3(1.,.85,.76),uv.y*.6);
  float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5;
  outputColor=vec4(color-shade+grain*.012,1.);
}`;

function normalize(v: Vector): Vector {
  const length = Math.hypot(...v);
  return v.map((value) => value / length) as Vector;
}

function cross(a: Vector, b: Vector): Vector {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

export function createType(
  canvas: HTMLCanvasElement,
  seed: number,
): Renderer | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  if (!gl) return null;
  const random = randomFromSeed(seed);
  const phase = random() * tau;
  const tubeRadius = 0.49 + random() * 0.06;
  const center = (t: number): Vector => [
    (2 + 0.66 * Math.cos(3 * t)) * Math.cos(2 * t),
    (2 + 0.66 * Math.cos(3 * t)) * Math.sin(2 * t),
    0.85 * Math.sin(3 * t),
  ];
  const vertices: number[] = [];
  const indices: number[] = [];
  const segments = 320;
  const sides = 32;
  for (let segment = 0; segment <= segments; segment++) {
    const t = (segment / segments) * tau;
    const point = center(t);
    const next = center(t + 0.001);
    const tangent = normalize(
      next.map((value, i) => value - point[i]) as Vector,
    );
    const normal = normalize(cross(tangent, [0, 0, 1]));
    const binormal = normalize(cross(tangent, normal));
    for (let side = 0; side <= sides; side++) {
      const angle = (side / sides) * tau;
      const outward = normal.map(
        (value, i) => value * Math.cos(angle) + binormal[i] * Math.sin(angle),
      );
      vertices.push(
        ...point.map((value, i) => value + outward[i] * tubeRadius),
        ...outward,
        (segment / segments) * 4,
        side / sides,
      );
      if (segment < segments && side < sides) {
        const a = segment * (sides + 1) + side;
        const b = a + sides + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }
  const shaders: WebGLShader[] = [];
  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS))
      throw new Error(
        gl!.getShaderInfoLog(shader) ?? "Type shader compilation failed",
      );
    shaders.push(shader);
    return shader;
  }
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error("Type shader linking failed");
  gl.useProgram(program);
  const meshArray = gl.createVertexArray();
  gl.bindVertexArray(meshArray);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );
  for (const [name, size, offset] of [
    ["position", 3, 0],
    ["normal", 3, 12],
    ["uv", 2, 24],
  ] as const) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 32, offset);
  }
  const uniforms = Object.fromEntries(
    ["aspect", "turn", "pointer", "intensity"].map((name) => [
      name,
      gl.getUniformLocation(program, name),
    ]),
  );
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const lettering = createSurface(2048, 1024);
  const ctx = lettering.context;
  ctx.fillStyle = "#1649cb";
  ctx.fillRect(0, 0, 2048, 1024);
  ctx.fillStyle = "#ff633d";
  ctx.fillRect(0, 512, 2048, 512);
  ctx.font = '900 310px "Arial Black", Arial, sans-serif';
  ctx.textAlign = "center";
  ctx.fillStyle = "#e8f5ff";
  ctx.fillText("KENTO IIZUKA", 1024, 380, 1980);
  ctx.fillStyle = "#12378c";
  ctx.fillText("KENTO IIZUKA", 1024, 895, 1980);
  ctx.fillStyle = "#c3e4ef";
  ctx.fillRect(0, 478, 2048, 10);
  ctx.fillRect(0, 500, 2048, 4);
  ctx.fillRect(0, 992, 2048, 10);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    lettering.canvas,
  );
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  const backgroundProgram = gl.createProgram()!;
  gl.attachShader(
    backgroundProgram,
    compile(gl.VERTEX_SHADER, backgroundVertexSource),
  );
  gl.attachShader(
    backgroundProgram,
    compile(gl.FRAGMENT_SHADER, backgroundFragmentSource),
  );
  gl.linkProgram(backgroundProgram);
  if (!gl.getProgramParameter(backgroundProgram, gl.LINK_STATUS))
    throw new Error("Background shader linking failed");
  const backgroundArray = gl.createVertexArray();
  gl.bindVertexArray(backgroundArray);
  const backgroundBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const backgroundPosition = gl.getAttribLocation(
    backgroundProgram,
    "position",
  );
  gl.enableVertexAttribArray(backgroundPosition);
  gl.vertexAttribPointer(backgroundPosition, 2, gl.FLOAT, false, 0, 0);
  const backgroundResolution = gl.getUniformLocation(
    backgroundProgram,
    "resolution",
  );
  return {
    draw({ time, pointer, intensity, pulse, variation }) {
      gl.clear(gl.DEPTH_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);
      gl.useProgram(backgroundProgram);
      gl.bindVertexArray(backgroundArray);
      gl.uniform2f(backgroundResolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.enable(gl.DEPTH_TEST);
      gl.useProgram(program);
      gl.bindVertexArray(meshArray);
      gl.uniform1f(uniforms.aspect, canvas.width / canvas.height);
      gl.uniform1f(
        uniforms.turn,
        0.48 +
          phase * 0.08 +
          time * 0.075 +
          variation * 0.38 +
          Math.exp(-pulse) * Math.sin(pulse * 3) * 0.2,
      );
      gl.uniform2f(uniforms.pointer, ...pointer);
      gl.uniform1f(uniforms.intensity, intensity);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    },
    resize(w, h, ratio) {
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    dispose() {
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteBuffer(backgroundBuffer);
      gl.deleteVertexArray(backgroundArray);
      gl.deleteVertexArray(meshArray);
      gl.deleteTexture(texture);
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      gl.deleteProgram(backgroundProgram);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
