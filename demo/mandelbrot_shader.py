vertSrc = """
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
"""

fragSrc = """
precision highp float;
uniform vec2 p;
uniform float r;
const int numIterations = 500;
varying vec2 vTexCoord;

void main() {
  vec2 c = p + gl_FragCoord.xy * r;
  vec2 z = c;
  float n = 0.0;

  for (int i = numIterations; i > 0; i--) {
    if (z.x * z.x + z.y * z.y > 4.0) {
      n = float(i) / float(numIterations);
      break;
    }
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
  }

  gl_FragColor = vec4(
    0.5 - cos(n * 17.0) / 2.0,
    0.5 - cos(n * 13.0) / 2.0,
    0.5 - cos(n * 23.0) / 2.0,
    1.0
  );
}
"""

def setup() :
  createCanvas(500, 400, WEBGL);

  # Create a p5.Shader object.
  mandelbrot = createShader(vertSrc, fragSrc);

  # Compile and apply the p5.Shader object.
  shader(mandelbrot);

  # Set the shader uniform p to an array.
  # p is the center point of the Mandelbrot image.
  mandelbrot.setUniform('p', [-0.74364388703, 0.13182590421]);

  # Set the shader uniform r to 0.005.
  # r is the size of the image in Mandelbrot-space.
  mandelbrot.setUniform('r', 0.001);

  # Style the drawing surface.
  noStroke();

  # Add a plane as a drawing surface.
  plane(500, 500);

  describe('A black fractal image on a magenta background.');
