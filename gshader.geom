//
// Passing example with per-vertex coloring
//

#version 150

layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;

// vertex shader에서 받은 입력
in vec3 normal[];
in vec3 p[];
in float dist[];
in float dist2[];

// fragment shader로 넘길 출력
out vec3 gnormal;

void main() 
{
    // 삼각형의 면 법선(face normal) 계산
    vec3 e1 = p[1] - p[0];
    vec3 e2 = p[2] - p[0];
    vec3 faceNormal = normalize(cross(e1, e2));
    
    // 세 꼭짓점에 동일한 면 법선을 할당
    for(int i = 0; i < 3; i++) 
    {
        gl_Position = gl_in[i].gl_Position;
        
        // 면 법선을 모든 vertex에 동일하게 적용 (flat shading)
        gnormal = faceNormal;
        
        EmitVertex();    
    }
    EndPrimitive();
}