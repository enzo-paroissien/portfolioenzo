"use client"

import { useEffect, useRef } from "react"

export function BackgroundAnimation() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const glRef = useRef(null)
  const programRef = useRef(null)
  const positionBufferRef = useRef(null)
  const positionLocationRef = useRef(null)
  const resolutionLocationRef = useRef(null)
  const timeLocationRef = useRef(null)
  const mouseLocationRef = useRef(null)
  const startTime = Date.now()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error("WebGL not supported")
      return
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader source with animated gradients
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      
      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        
        return a + b * cos(6.28318 * (c * t + d));
      }
      
      float noise(vec2 p) {
        return sin(p.x * 10.0) * sin(p.y * 10.0);
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 uv0 = uv;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        
        float d = length(uv);
        vec3 col = vec3(0.0);
        
        // Create multiple animated layers
        for(float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          
          d = length(uv) * exp(-length(uv0));
          //d = abs(d);
          vec3 color = palette(length(uv0) + i * 0.4 + u_time * 0.01);
          
          d = sin(d * 4.0 + u_time) / 36.0;
          // d = abs(d);
          
          d = pow(0.005 / d, 1.5);
          
          // Mouse interaction
          vec2 mouseEffect = u_mouse - uv0;
          float mouseDist = length(mouseEffect);
          d *= 1.0 + sin(mouseDist * 10.0 - u_time * 2.0) * 0.1;
          
          col += color * d;
        }
        
        // Add wave distortion
        float wave = sin(uv0.x * 2.0 + u_time) * 0.01;
        col += vec3(wave);
        
        // Add gradient overlay
        vec3 gradient1 = vec3(0.1, 0.2, 0.5);
        vec3 gradient2 = vec3(0.9, 0.1, 0.4);
        vec3 gradientMix = mix(gradient1, gradient2, uv0.y + sin(u_time) * 0.2);
        col = mix(col, gradientMix, 0.3);
        
        gl_FragColor = vec4(col, 1.0);
      }
    `

    // Create and compile shaders
    function createShader(gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    // Create program
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program))
      return
    }

    // Set up geometry (full screen quad)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Handle mouse movement
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001

      const gl = glRef.current
      const program = programRef.current
      const positionBuffer = positionBufferRef.current
      const positionLocation = positionLocationRef.current
      const resolutionLocation = resolutionLocationRef.current
      const timeLocation = timeLocationRef.current
      const mouseLocation = mouseLocationRef.current

      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, currentTime)
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(render)
    }

    glRef.current = gl
    programRef.current = program
    positionBufferRef.current = positionBuffer
    positionLocationRef.current = positionLocation
    resolutionLocationRef.current = resolutionLocation
    timeLocationRef.current = timeLocation
    mouseLocationRef.current = mouseLocation

    animationRef.current = requestAnimationFrame(render)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="shader-container">
      <canvas ref={canvasRef} className="shader-canvas" />
    </div>
  )
}
