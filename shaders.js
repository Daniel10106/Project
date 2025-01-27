﻿var vShader =
	'uniform mat4 uProjectionMatrix;'+
	'uniform mat4 uViewMatrix;'+
	'uniform mat4 uModelMatrix;'+
	'uniform mat4 uNormalMatrix;'+
	'uniform bool uUseNormalMatrix;'+
	''+
	'uniform bool uSelectMode;'+
	'uniform vec3 uSelectColor;'+
	''+
	'uniform vec3 uAmbientColor;'+
	'uniform vec3 uDiffuseColor;'+
	''+
	'uniform vec3 uLightDir;'+
	''+
	'attribute vec3 aXYZ;'+
	'attribute vec2 aST;'+
	'attribute vec3 aColor;'+
	'attribute vec3 aNormal;'+
	''+
	'varying vec3 vST;'+
	'varying vec3 vColor;'+
	''+
	'void main ()'+
	'{'+
	'	mat4 mvMatrix = uViewMatrix * uModelMatrix;'+
	'	gl_Position = uProjectionMatrix * mvMatrix * vec4(aXYZ,1);'+
	'	if (uSelectMode)'+
	'	{'+
	'		vColor = uSelectColor;'+
	'	}'+
	'	else'+
	'	{'+
	'		mat4 nMatrix = uUseNormalMatrix?uNormalMatrix:mvMatrix;'+
	''+
	'   vST = vec3(aST,1);'+
	'		vColor = uAmbientColor*aColor;'+
	''+
	'		vec3 light = normalize(-uLightDir);'+
	'		vec3 normal = vec3(normalize(nMatrix*vec4(aNormal,0)));'+
	'		vColor += aColor*uDiffuseColor*abs(dot(normal,light));'+
	'	}'+
	'}';
	
var fShader =
	'precision mediump float;'+
	'uniform mat3 uTexMatrix;'+
	'uniform sampler2D uSampler;'+
	''+
	'varying vec3 vST;'+
	'varying vec3 vColor;'+
	'void main( )'+
	'{'+
	' vec4 texCol = texture2D(uSampler,(uTexMatrix*vST).st);'+
	'	gl_FragColor = texCol*vec4(vColor,1.0);'+
	'}';
