import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

export let sky = new Sky();

sky.scale.setScalar( 450000 );
let sun = new THREE.Vector3();
const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    //exposure: renderer.toneMappingExposure
};
const uniforms = sky.material.uniforms;
uniforms[ 'turbidity' ].value = effectController.turbidity;
uniforms[ 'rayleigh' ].value = effectController.rayleigh;
uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
const theta = THREE.MathUtils.degToRad( effectController.azimuth );
sun.setFromSphericalCoords( 1, phi, theta );
uniforms[ 'sunPosition' ].value.copy( sun )
