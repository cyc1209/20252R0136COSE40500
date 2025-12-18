#version 140
#extension GL_ARB_compatibility: enable

uniform vec3 lightpos_1, lightpos_2;
uniform float Kd, Ka, Ks; // Material
uniform vec3 Ld, La, Ls, Ld2, La2, Ls2; // Light
uniform float alpha;
uniform vec3 attenuation;
in vec3 gnormal;
in vec3 p;
in float dist, dist2;


uniform int pnum;

out vec4 fColor;


void main() 
{ 
   
        vec3 v = normalize(-p);
        vec3 n = normalize(gnormal);
        vec3 l_1 = normalize(lightpos_1-p);
        vec3 l_2 = normalize(lightpos_2-p);
        vec3 r_1 = normalize(reflect(-l_1,n));
        vec3 r_2 = normalize(reflect(-l_2,n));

        float att_1 = 1.0 / (attenuation.x + attenuation.y * dist + attenuation.z * dist * dist);
        float att_2 = 1.0 / (attenuation.x + attenuation.y * dist2 + attenuation.z * dist2 * dist2);
    
        vec3 ambient_1 = Ka * La;
        vec3 ambient_2 = Ka * La2;

        vec3 diffuse_1 = max(dot(l_1,n),0)* Kd * Ld;
        vec3 diffuse_2 = max(dot(l_2,n),0)* Kd * Ld2;

        vec3 specular_1 = Ks * pow(max(dot(r_1, v), 0.0), alpha) * Ls;
        vec3 specular_2 = Ks * pow(max(dot(r_2, v), 0.0), alpha) * Ls2;
    if(pnum == 0){
        fColor = vec4(ambient_1 + ambient_2 + att_1 * (diffuse_1 + specular_1) + att_2 * (diffuse_2 + specular_2), 1.0);
    }else{
        fColor = vec4(ambient_1 + ambient_2 + (diffuse_1 + specular_1) + (diffuse_2 + specular_2), 1.0);
    }
} 
