import * as THREE from 'https://unpkg.com/three/build/three.module.js';


class roomsTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/Concrete material 8/Concrete material 8_BaseColor.jpeg");
    tilesHeight= this.textureLoader.load("../Textures/Concrete material 8/Concrete material 8_Height.jpeg");
    //tilesambientOcclusion = this.textureLoader.load("../Textures/Concrete material 8/Concrete material 8_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/Concrete material 8/Concrete material 8_Roughness.jpeg");
    tilesNomral = this.textureLoader.load("../Textures/Concrete material 8/Concrete material 8_Normal.jpeg");
    tilesSpecular = this.textureLoader.load("../Textures/Concrete material 8/Concrete material 8_Specular.jpeg");
    tilesMetallic = this.textureLoader.load("../Textures/Concrete material 8/Concrete material 8_metallic.jpeg");
    
}

class concreteshellTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/Concrete material 10/concrete_BaseColor.jpg");
    tilesHeight= this.textureLoader.load("../Textures/Concrete material 10/concrete_Height.jpg");
    tilesambientOcclusion = this.textureLoader.load("../Textures/Concrete material 10/concrete_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/Concrete material 10/concrete_Roughness.jpg");
    tilesNomral = this.textureLoader.load("../Textures/Concrete material 10/concrete_Normal.jpg");
    tilesMetallic = this.textureLoader.load("../Textures/Concrete material 10/concrete_metallic.jpg");

}

class stepsTexture{
    constructor(textureLoader){
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/BrownMarble/Marble 3_BaseColor.jpg");
    tilesHeight= this.textureLoader.load("../Textures/BrownMarble/Marble 3_Height.jpg");
    tilesMetallic= this.textureLoader.load("../Textures/BrownMarble/Marble 3_Metallic.jpg");
    tilesambientOcclusion = this.textureLoader.load("../Textures/BrownMarble/Marble 3_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/BrownMarble/Marble 3_Roughness.jpg");
    tilesNomral = this.textureLoader.load("../Textures/BrownMarble/Marble 3_Normal.jpg");
    //tilesDisplacement = this.textureLoader.load("../Textures/BrownMarble/Marble 3_Displacement.jpg");
}

class graniteTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/Granite_Red_001_SD/Granite_Red_001_BaseColor.jpg");
    tilesHeight= this.textureLoader.load("../Textures/Granite_Red_001_SD/Granite_Red_001_Height.png");
    tilesambientOcclusion = this.textureLoader.load("../Textures/Granite_Red_001_SD/Granite_Red_001_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/Granite_Red_001_SD/Granite_Red_001_Roughness.jpg");
    tilesNomral = this.textureLoader.load("../Textures/Granite_Red_001_SD/Granite_Red_001_Normal.jpg");
}

class blackmarbleTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/BlackMarble/BMarble_BaseColor.jpg");
    tilesHeight= this.textureLoader.load("../Textures/BlackMarble/BMarble_Height.jpg");
    tilesambientOcclusion = this.textureLoader.load("../Textures/BlackMarble/BMarble_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/BlackMarble/BMarble_Roughness.jpg");
    tilesNomral = this.textureLoader.load("../Textures/BlackMarble/BMarble_Normal.jpg");
    tilesMetallic = this.textureLoader.load("../Textures/BlackMarble/BMarble_Metallic.jpg");
}

class floorPlateTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/GroundTexture/Pavement_BaseColor.jpg");
    tilesHeight= this.textureLoader.load("../Textures/GroundTexture/Pavement_Height.jpg");
    tilesambientOcclusion = this.textureLoader.load("../Textures/GroundTexture/Pavement_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/GroundTexture/Pavement_Roughness.jpg");
    tilesNomral = this.textureLoader.load("../Textures/GroundTexture/Pavement_Normal.jpg");
    //tilesDisplacement = this.textureLoader.load("../Textures/GroundTexture/Pavement_Displacement.jpg");
    tilesMetallic = this.textureLoader.load("../Textures/GroundTexture/Pavement_Metallic.jpg");
    
}

class sandTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/SandTexture/Sand_BaseColor.jpg");
    tilesHeight= this.textureLoader.load("../Textures/SandTexture/Sand_Height.jpg");
    tilesambientOcclusion = this.textureLoader.load("../Textures/SandTexture/Sand_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/SandTexture/Sand_Roughness.jpg");
    tilesNomral = this.textureLoader.load("../Textures/SandTexture/Sand_Normal.jpg");
    //tilesDisplacement = this.textureLoader.load("../Textures/Sand/Sand_Displacement.jpg");
    tilesMetallic = this.textureLoader.load("../Textures/SandTexture/Sand_Metallic.jpg");
    
}

class groundTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/PebbleTexture/Pebble_ground_BaseColor.jpg");
    tilesHeight= this.textureLoader.load("../Textures/PebbleTexture/Pebble_ground_Height.jpg");
    tilesambientOcclusion = this.textureLoader.load("../Textures/PebbleTexture/Pebble_ground_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/PebbleTexture/Pebble_ground_Roughness.jpg");
    tilesNomral = this.textureLoader.load("../Textures/PebbleTexture/Pebble_ground_Normal.jpg");
    //tilesDisplacement = this.textureLoader.load("../Textures/PebbleTexture/Pebble_ground_Displacement.jpg");
    tilesMetallic = this.textureLoader.load("../Textures/PebbleTexture/Pebble_ground_Metallic.jpg");
    
}

class outerwallTexture{
    constructor(textureLoader){
        
    }
    textureLoader = new THREE.TextureLoader();
    tilesBaseColor = this.textureLoader.load("../Textures/Brownmarbletexture/Marble 15_BaseColor.jpeg");
    //tilesHeight= this.textureLoader.load("../Textures/Brown-marble-texture 15/Marble 15_Height.jpg");
    //tilesambientOcclusion = this.textureLoader.load("../Textures/Brown-marble-texture 15/Marble 15_AmbientOcclusion.jpg");
    tilesRoughness= this.textureLoader.load("../Textures/Brownmarbletexture/Marble 15_Roughness.jpeg");
    tilesNomral = this.textureLoader.load("../Textures/Brownmarbletexture/Marble 15_Normal.jpeg");
    //tilesDisplacement = this.textureLoader.load("../Textures/Brown-marble-texture 15/Marble 15_Displacement.jpg");
    tilesMetallic = this.textureLoader.load("../Textures/Brownmarbletexture/Marble 15_Metallic.jpeg");
    
}


export {stepsTexture,groundTexture,roomsTexture,blackmarbleTexture,floorPlateTexture,outerwallTexture,sandTexture,concreteshellTexture};