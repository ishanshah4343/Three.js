import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {GUI} from 'dat.gui'



//Import Internal Modules
import { OrbitControls } from '../Modules/OrbitControls.js';
import { IndoorControls } from '../Modules/IndoorControls.js';

//Import Internal Files
import {stepsTexture,groundTexture,roomsTexture,blackmarbleTexture,outerwallTexture,floorPlateTexture,sandTexture,concreteshellTexture} from '../JSfiles/material.js'
import { RDModel } from '/modelLoader.js';
import {sky} from '/sky.js'








//Basic Setup

const renderer = new THREE.WebGLRenderer({ antialias: true,alpha : true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled =true;
console.log(renderer.shadowMap)
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.near = 0.01;
scene.add(sky);

const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);
camera.far = 10000;
camera.position.z =5;
camera.position.set(50,50,50)





//Adding Light

//const light = new THREE.DirectionalLight( 0x404040,5 ); // soft white light
//scene.add( light );

const plight = new THREE.PointLight( 0x00FF80, 10, 1 );
plight.castShadow = true;


const directionalLight  = new THREE.DirectionalLight(0x404040,2);
scene.add(directionalLight);
directionalLight.position.set(0,200,50);
directionalLight.position.rotateX = Math.PI/2;
directionalLight.castShadow = true;
directionalLight.target.position.set(0,0,0)
directionalLight.shadow.mapSize = new THREE.Vector2(1024 * 2, 1024 * 2);

console.log(directionalLight.shadow)
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;

directionalLight.shadow.mapSize.x = 1500
directionalLight.shadow.mapSize.y = 1500
directionalLight.shadow.camera.updateProjectionMatrix();


const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
//scene.add(dLightHelper);
//scene.add(dLightShadowHelper);

const hlight = new THREE.HemisphereLight( 0xffffbb, 0x080820,0.05 );
scene.add( hlight );


//Adding Orbit
let orbit = new IndoorControls(camera,renderer.domElement);
orbit.speedKeyMoving = 3;


//Adding Textures


let textureList = [];//Array to add texture
let textureLoader;
const defaultLayer = new THREE.MeshStandardMaterial();
const outerNewLayer = new THREE.MeshStandardMaterial({
    //color : 'red'
});

const stepsLayerTexture = new stepsTexture(textureLoader);
const stepsLayer = new THREE.MeshStandardMaterial({
    
    map:stepsLayerTexture.tilesBaseColor,
    normalMap : stepsLayerTexture.tilesNomral,
    roughnessMap:stepsLayerTexture.tilesRoughness,
    roughness : 0.5,
    aoMap:stepsLayerTexture.tilesambientOcclusion,
    metalnessMap:stepsLayerTexture.tilesMetallic,
    metalness:1
});
stepsLayer.map.minFilter = THREE.LinearFilter;

stepsLayer.map.repeat.x=1.25;
stepsLayer.map.repeat.y=1.25;
stepsLayer.map.wrapS = THREE.RepeatWrapping;
stepsLayer.map.wrapT = THREE.RepeatWrapping;
stepsLayer.map.needsUpdate = true;



const roomsLayerTexture = new roomsTexture(textureLoader);
const roomsMaterial = new THREE.MeshPhysicalMaterial({

    
    map:roomsLayerTexture.tilesBaseColor,
    normalMap : roomsLayerTexture.tilesNomral,
    roughnessMap:roomsLayerTexture.tilesRoughness,
    displacementMap:roomsLayerTexture.tilesHeight,
    metalnessMap:roomsLayerTexture.tilesMetallic,
    metalness:0.5
    

});
roomsMaterial.map.minFilter = THREE.LinearFilter;
roomsMaterial.map.repeat.x=5;
roomsMaterial.map.repeat.y=5;
roomsMaterial.map.wrapS = THREE.RepeatWrapping;
roomsMaterial.map.wrapT = THREE.RepeatWrapping;
roomsMaterial.map.needsUpdate = true;

const concreteShell = new concreteshellTexture(textureLoader);
const concreteshellMaterial = new THREE.MeshPhysicalMaterial({

    
    map:concreteShell.tilesBaseColor,
    normalMap : concreteShell.tilesNomral,
    roughnessMap:concreteShell.tilesRoughness,
    displacementMap:concreteShell.tilesHeight,
    metalnessMap:concreteShell.tilesMetallic,
    metalness:0.5
    

});
concreteshellMaterial.map.minFilter = THREE.LinearFilter;
//concreteshellMaterial.map.repeat.x=2;
//concreteshellMaterial.map.repeat.y=2;
concreteshellMaterial.map.wrapS = THREE.RepeatWrapping;
concreteshellMaterial.map.wrapT = THREE.RepeatWrapping;
concreteshellMaterial.map.needsUpdate = true;


const groundLayerTexture = new groundTexture(textureLoader);
const groundLayer = new THREE.MeshStandardMaterial({
    
    map:groundLayerTexture.tilesBaseColor,
    normalMap : groundLayerTexture.tilesNomral,
    roughnessMap:groundLayerTexture.tilesRoughness,
    roughness : 0.5,
    aoMap:groundLayerTexture.tilesambientOcclusion,
    metalnessMap:groundLayerTexture.tilesMetallic,
    metalness:1
});
groundLayer.map.minFilter = THREE.LinearFilter;
groundLayer.map.repeat.x=20;
groundLayer.map.repeat.y=15;
groundLayer.map.wrapS = THREE.RepeatWrapping;
groundLayer.map.wrapT = THREE.RepeatWrapping;
groundLayer.map.needsUpdate = true;

const floorLayerTexture = new floorPlateTexture(textureLoader);
const floorLayer = new THREE.MeshStandardMaterial({
    
    map:floorLayerTexture.tilesBaseColor,
    normalMap : floorLayerTexture.tilesNomral,
    roughnessMap:floorLayerTexture.tilesRoughness,
    roughness : 0.5,
    aoMap:floorLayerTexture.tilesambientOcclusion,
    metalnessMap:floorLayerTexture.tilesMetallic,
    metalness:1
});
floorLayer.map.minFilter = THREE.LinearFilter;
floorLayer.map.repeat.x=20;
floorLayer.map.repeat.y=15;
floorLayer.map.wrapS = THREE.RepeatWrapping;
floorLayer.map.wrapT = THREE.RepeatWrapping;
floorLayer.map.needsUpdate = true;

const platformLayerTexture = new blackmarbleTexture(textureLoader);
const platformLayer = new THREE.MeshStandardMaterial({
    
    map:platformLayerTexture.tilesBaseColor,
    normalMap : platformLayerTexture.tilesNomral,
    roughnessMap:platformLayerTexture.tilesRoughness,
    roughness : 0.5,
    aoMap:platformLayerTexture.tilesambientOcclusion,
    metalnessMap:platformLayerTexture.tilesMetallic,
    metalness:1
});
platformLayer.map.minFilter = THREE.LinearFilter;
platformLayer.map.repeat.x=1.5;
platformLayer.map.repeat.y=1.5;
platformLayer.map.wrapS = THREE.RepeatWrapping;
platformLayer.map.wrapT = THREE.RepeatWrapping;
platformLayer.map.needsUpdate = true;

const outerwallLayerTexture = new outerwallTexture(textureLoader);
const outerwallLayer = new THREE.MeshStandardMaterial({
    
    map:outerwallLayerTexture.tilesBaseColor,
    normalMap : outerwallLayerTexture.tilesNomral,
    roughnessMap:outerwallLayerTexture.tilesRoughness,
    roughness : 0.5,
    //aoMap:platformLayerTexture.tilesambientOcclusion,
    metalnessMap:outerwallLayerTexture.tilesMetallic,
    metalness:1
});
outerwallLayer.map.minFilter = THREE.LinearFilter;
//platformLayer.map.repeat.x=1.5;
//platformLayer.map.repeat.y=1.5;
//outerwallLayer.map.wrapS = THREE.RepeatWrapping;
//platformLayer.map.wrapT = THREE.RepeatWrapping;
//outerwallLayer.map.needsUpdate = true;



const sandLayerTexture = new sandTexture(textureLoader);
const sandLayer = new THREE.MeshStandardMaterial({
    
    map:sandLayerTexture.tilesBaseColor,
    normalMap : sandLayerTexture.tilesNomral,
    roughnessMap:sandLayerTexture.tilesRoughness,
    roughness : 0.5,
    aoMap:sandLayerTexture.tilesambientOcclusion,
    metalnessMap:sandLayerTexture.tilesMetallic,
    metalness:0
});
sandLayer.map.minFilter = THREE.LinearFilter;
sandLayer.map.repeat.x=10;
sandLayer.map.repeat.y=10;
sandLayer.map.wrapS = THREE.RepeatWrapping;
sandLayer.map.wrapT = THREE.RepeatWrapping;
sandLayer.map.needsUpdate = true;





textureList.push(outerNewLayer,concreteshellMaterial,stepsLayer,groundLayer,stepsLayer,roomsMaterial,platformLayer,
platformLayer,floorLayer,outerwallLayer,concreteshellMaterial,platformLayer,sandLayer,outerNewLayer,concreteshellMaterial,outerNewLayer,outerNewLayer);

//Raycaster
const rayCaster = new THREE.Raycaster();
rayCaster.far = 20;
const rayInt = new THREE.Vector3(0,-1,0);



//Adding Model
let rhinoModel;
let koko;
let model = './3dmodels/UNDERGROUND01.3dm';
rhinoModel = new RDModel();
koko = rhinoModel.createModel(model,scene,textureList);



//GUI

var gui = new GUI();
const selector = gui.add(directionalLight.position,"z",-110,100).name('Rotate Z Axis');
selector.setValue(0);




//
const geometryo = new THREE.BoxGeometry( 1, 1, 1 );
const materialo = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cubeo = new THREE.Mesh( geometryo, materialo );
cubeo.visible = false;
scene.add(cubeo)
cubeo.add(camera)


//



//
document.querySelector("#content").textContent = "Loading";
document.querySelector("#content").style.visibility = "visible";
let raycasternew = new THREE.Raycaster();
let mouse = new THREE.Vector2()
window.addEventListener('dblclick', () => {
    
    for(let i = 0;i<scene.children[39].children.length;i++)
    {
        
        scene.children[39].children[i].visible = true;
    }
    camera.position.set(-71.4,6,0.21)
    camera.lookAt(0,0,0)
    cubeo.remove(camera);
    document.querySelector("#content").style.visibility = "hidden";
    scene.add(camera);
    camera.updateProjectionMatrix();
    //scene.children[39].children[55].visible = true;
   
    
})
window.addEventListener('keypress', (event) => {
    if(event.key == 'r')
    {
        scene.remove(camera)
        cubeo.add(camera)
        camera.position.set(50,50,50)
        camera.lookAt(0,0,0)
        camera.updateProjectionMatrix();
    }
    
})


let plist1 = [];
let plist2 = [];
let plist3 = [];
let plist4 = [];



// Rendering


function animate() {



orbit.update(0.05);

/*for(let i = 0;i<scene.children.length;i++)
{

    if(scene.children[i].type === 'PointLight' && scene.children[i].position.y > 2 )
    {
     plist1.push(scene.children[i])
    }
    else if(scene.children[i].type === 'PointLight' && 0<scene.children[i].position.y < 2 )
    {
     plist2.push(scene.children[i])
    }
    else if(scene.children[i].type === 'PointLight' && scene.children[i].position.y <0 )
    {
     plist3.push(scene.children[i])
    }
}*/
for(let i = 0;i<scene.children.length;i++)
{

    if(scene.children[i].type === 'PointLight' )
    {
     plist4.push(scene.children[i])
    }

}




if(scene.children.length>10)
{
rayCaster.set(camera.position,rayInt);
const intersects = rayCaster.intersectObjects(scene.children[39].children);
document.querySelector("#content").textContent = "Loaded -- DOUBLE CLICK TO ENTER THE BUILDING";
console.log(scene.children[39].children[5].shadow)

//console.log(scene.children[39].children[10].visible)
//console.log(scene.children[41].children)
//console.log(camera.position.distanceTo(plist4[0].position))
//console.log(scene.children[23])

if (intersects.length === 0)
{

    cubeo.rotation.y += 0.02;
    camera.lookAt(0,0,0)
    camera.updateProjectionMatrix();
}
else if (intersects.length !== 0)
{
    if (intersects[0].distance != 1.75)
    {
        
        const vec = new THREE.Vector3();
        vec.x = camera.position.x
        vec.z = camera.position.z
        vec.y = intersects[0].point.y + 1.75
        camera.position.lerp(vec,0.5);
        orbit.update(0.05); 
        
        
    }

    for(let i = 0;i<plist4.length;i++)
    {
        if(camera.position.distanceTo(plist4[i].position)<7)
        {
            plist4[i].visible = true
        }
        else
        {
            plist4[i].visible = false
        }
        
    }
    if(camera.position.y<5 &&camera.position.x>-24)
    {
        hlight.intensity = 0.02
    }
    else if(camera.position.y<5 &&camera.position.x>5)
    {
        hlight.intensity = 0.005
    }
    else
    {
        hlight.intensity = 0.05
    }

}
}
//console.log(camera.position)
directionalLight.position.x = directionalLight.position.z +Math.PI

renderer.render( scene, camera );
requestAnimationFrame( animate );


}
animate();