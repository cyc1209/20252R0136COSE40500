#version 140
#extension GL_ARB_compatibility: enable


attribute vec3 vPosition;
attribute vec3 vNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 lightpos_1, lightpos_2;

out vec3 normal;
out vec3 p;
out float dist, dist2;


void main() 
{

   normal = (transpose(inverse(modelViewMatrix)) * vec4(vNormal, 1.0)).xyz;
   
   p = (modelViewMatrix * vec4(vPosition, 1.0)).xyz;
   dist = length(lightpos_1 - p);
   dist2 = length(lightpos_2 - p);
   
   gl_Position = projectionMatrix * vec4(p, 1.0); 

}


