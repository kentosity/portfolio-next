import { height, width, type Renderer } from "./shared";

type PaperLayers = {
  background: HTMLCanvasElement;
  rings: HTMLCanvasElement[];
  heart: HTMLCanvasElement;
};

const vertexSource = `#version 300 es
in vec2 position;
uniform vec2 center;
uniform vec2 size;
uniform float angle;
out vec2 uv;
void main() {
  vec2 p=(position-.5)*size;
  p=mat2(cos(angle),sin(angle),-sin(angle),cos(angle))*p+center;
  gl_Position=vec4(p.x/700.-1.,1.-p.y/500.,0.,1.);
  uv=position;
}`;
const fragmentSource = `#version 300 es
precision highp float;
uniform sampler2D sheet;
in vec2 uv;
out vec4 outputColor;
void main() {
  vec4 color=texture(sheet,uv);
  if(color.a < .001) discard;
  outputColor=color;
}`;

export function createPaperStage(
  canvas: HTMLCanvasElement,
  layers: PaperLayers,
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
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS))
      throw new Error(
        gl!.getShaderInfoLog(shader) ?? "Paper shader compilation failed",
      );
    shaders.push(shader);
    return shader;
  }
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error("Paper shader linking failed");
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = Object.fromEntries(
    ["center", "size", "angle"].map((name) => [
      name,
      gl.getUniformLocation(program, name),
    ]),
  );
  const textures = [layers.background, ...layers.rings, layers.heart].map(
    (image) => {
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return texture;
    },
  );
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  function drawLayer(
    index: number,
    x: number,
    y: number,
    w: number,
    h: number,
    angle = 0,
  ) {
    gl!.bindTexture(gl!.TEXTURE_2D, textures[index]);
    gl!.uniform2f(uniforms.center, x, y);
    gl!.uniform2f(uniforms.size, w, h);
    gl!.uniform1f(uniforms.angle, angle);
    gl!.drawArrays(gl!.TRIANGLES, 0, 6);
  }

  return {
    draw({ time, pointer, intensity, pulse, variation }) {
      drawLayer(0, width / 2, height / 2, width, height);
      const breath = Math.sin(time * 0.42) * 0.008;
      const opening = Math.exp(-pulse * 0.65) * Math.sin(pulse * 2.2) * 0.075;
      layers.rings.forEach((_, index) => {
        const depth = (index + 1) / layers.rings.length;
        const scale =
          1 +
          (intensity - 0.5) * depth * 0.12 +
          breath * depth +
          opening * depth;
        const angle =
          Math.sin(time * 0.12 + index * 0.17) * 0.012 +
          variation * 0.15 * depth;
        drawLayer(
          index + 1,
          755 - depth * 24 + (pointer[0] - 0.5) * depth * 45,
          500 - depth * 16 + (pointer[1] - 0.5) * depth * 40,
          960 * scale,
          960 * scale * (1 - (pointer[1] - 0.5) * 0.07),
          angle,
        );
      });
      drawLayer(
        textures.length - 1,
        731 + (pointer[0] - 0.5) * 45,
        484 + (pointer[1] - 0.5) * 40,
        120,
        120,
      );
    },
    resize(w, h, ratio) {
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    dispose() {
      textures.forEach((texture) => gl.deleteTexture(texture));
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
