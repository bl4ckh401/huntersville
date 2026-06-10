'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const vertexShaderSource = `
    attribute vec2 position;
    varying vec2 v_texCoord;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        v_texCoord = position * 0.5 + 0.5;
    }
`;

const fragmentShaderSource = `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    // Simplex noise for organic movement
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        vec3 m0 = m * ( 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ) );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m0, g);
    }

    void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;

        // Create a deep Kenyan forest/nature palette
        vec3 color1 = vec3(0.106, 0.263, 0.196); // Deep Green (#1b4332)
        vec3 color2 = vec3(0.05, 0.15, 0.1);    // Darker Forest
        vec3 color3 = vec3(0.15, 0.35, 0.25);   // Lighter Moss

        // Layered noise for atmospheric depth
        float n1 = snoise(uv * 2.0 + u_time * 0.05);
        float n2 = snoise(uv * 4.0 - u_time * 0.08 + mouse * 0.5);

        float mixFactor = smoothstep(-1.0, 1.0, n1 + n2 * 0.5);
        vec3 finalColor = mix(color1, color2, mixFactor);
        finalColor = mix(finalColor, color3, smoothstep(0.5, 1.0, n2) * 0.3);

        // Add a slight vignette for focus
        float vignette = smoothstep(1.5, 0.5, length(uv - 0.5));
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
// eslint-disable-next-line @next/next/no-img-element
export default function AboutHero() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
      1.0, -1.0,
      -1.0, 1.0,
      -1.0, 1.0,
      1.0, -1.0,
      1.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    }

    let animationFrameId: number;
    function render(time: number) {
      if (!gl || !canvas) return;
      time *= 0.001;
      resizeCanvasToDisplaySize(canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.useProgram(program);
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      // Cleanup WebGL resources
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <section
      className="relative h-[95dvh] w-full flex items-center justify-center overflow-hidden bg-cover bg-center snap-start md:snap-none"
    >
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQPmKLyO4s5SbOFBt_-ERO8TNxAzeMQXIJUNt2OP1GozIgWpin11pITxC_TvSrk629OOMkwO7qYukNgif7UfUzDyh8Nl6CKBnbY0pzXwwm7mpuHvteKZ_Wey6lgOr6sBIjEV50Y7NmYKbrL_dJakVsdB1i_wJUuv-WPHz1EJfaMIorfyNVEtvhhP2LCxGkBarMWQd9LwyYBaouIb61b-2WPOg2n301ZQmKRUSl60km9cFtT4YhVdVSLpXi7x_uK-NXoaYGrUJG"
        alt="East Africa landscape"
        fill
        priority
        quality={100}
        className="object-cover object-center"
      />
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          width="1280"
          height="1024"
        />
      </div>
      <div className="absolute inset-0 hero-gradient z-10"></div>
      <div className="relative z-10 text-center px-gutter max-w-4xl mx-auto scroll-reveal">
        <span className="font-label-md text-label-md text-primary-fixed uppercase tracking-widest mb-sm block">HuntersVilleTours</span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-md">Our Legacy</h1>
        <p className="font-body-lg text-body-lg text-surface-container max-w-2xl mx-auto">
          Pioneering sustainable, luxury travel experiences across the heart of East Africa for over three decades.
        </p>
      </div>
    </section>
  );
}
