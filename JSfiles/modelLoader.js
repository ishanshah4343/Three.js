import {Rhino3dmLoader} from 'three/examples/jsm/loaders/3DMLoader.js';
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

class RDModel{
    construcor()
    {}
    
    createModel(location,scene,list,light){
        const loader = new Rhino3dmLoader();
        this.scene = scene;
        loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/' );
        loader.load(location,
        function ( object ) {
            
            for(let i = 0;i<object.children.length;i++){
                
                
                if(object.children[i].type ==="Mesh")
                {
                    object.children[i].material = list[object.children[i].userData.attributes.layerIndex]
                    //console.log(object.children[i].userData.attributes.layerIndex)
                }

                if(object.children[i].userData.attributes.layerIndex == 15)
                {
                    var position = new THREE.Vector3();
                    object.children[i].geometry.computeBoundingBox();
                    var bbox = object.children[i].geometry.boundingBox;
                    let plight = new THREE.PointLight( 0xFDFD96, 2, 10 );
                    plight.castShadow = true;
                    position = bbox.max ;
                    position.multiplyScalar( 0.001 )
                    plight.position.set(position.y,position.z+0.01,position.x);
                    scene.add(plight);
                    plight.visible = false;
                    //console.log(plight.position)
                    plight.rotation.z = -1.5707963268
                    plight.rotation.x = -1.5707963268
                }

                /*if(object.children[i].userData.attributes.layerIndex == 6 )
                {
                    object.children[i].visible = false;
                    let groundMirror = new Reflector( object.children[i].geometry, {
                        //materail:tilesBaseColor,
                        clipBias: 0.1,
                        textureWidth: window.innerWidth * window.devicePixelRatio,
                        textureHeight: window.innerHeight * window.devicePixelRatio,
                        //color: 0xFF0000,
                        recursion: 500, 
                    } );
                    scene.add(groundMirror);
                    groundMirror.scale.set(0.001,0.001,0.001)
                    groundMirror.rotation.z = -1.5707963268
                    groundMirror.rotation.x = -1.5707963268

                }*/

            }

            
            
            scene.add(object);
            object.scale.set(0.001,0.001,0.001);
            object.rotation.z = -1.5707963268
            object.rotation.x = -1.5707963268
            object.receiveShadow = true;
        }
    )
    }
}

export{RDModel};