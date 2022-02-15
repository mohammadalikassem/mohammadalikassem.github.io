/* 
THREE.js r107
*/

// UTILITY
import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';
import {WEBGL} from '../../node_modules/three/examples/jsm/WebGL.js';

// THREE
import * as THREE from '../../node_modules/three/build/three.module.js';
import {OrbitControls} from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import {FBXLoader} from '../../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import {BufferGeometryUtils} from '../../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';

// POST PROCESSING
import {EffectComposer} from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from '../../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import {FXAAShader} from '../../node_modules/three/examples/jsm/shaders/FXAAShader.js';
import {ShaderPass} from "../../node_modules/three/examples/jsm/postprocessing/ShaderPass.js";
import {UnrealBloomPass} from '../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js';

// MY FILES
import {myChunks} from './Shaders.js';

// hide overlay
const showOverlay = () => {}


// show overlay with specific content
const hideOverlay = () => {}

const limit_tilt = 0.08;


const inistial_x_position = 15,
    initial_z_position = -15,
    initial_y_position = 1.5;
// my classes

const getMyArmas = () => {
    return [
        {
            imgSrc: "./assets/images/image.jpg",
            x_position: 0,
            y_position: 5,
            z_position: 0,
            width: null,
            length: 5,
            height: 5,
            imageOnly: !0,
            type: "MEME",
            rotation: null,
            url_to_open: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            arma_text: '<h2><FONT COLOR="#FF0000">Press enter to get rick rolled</FONT></h2>'
        },
        {
            imgSrc: "./static/resources/images/Experience.JPG",
            x_position: -250,
            y_position: 20,
            z_position: -300,
            width: null,
            length: 40,
            height: 80,
            imageOnly: !0,
            type: "MEME",
            rotation: null,
            url_to_open: "./pages/fullcv/index.html#experience",
            arma_text: '<h2><FONT COLOR="#FF0000">Press enter to see experience</FONT></h2>'
        },
        {
            imgSrc: "./static/resources/images/projects.png",
            x_position: -250,
            y_position: 20,
            z_position: 150,
            width: null,
            length: 40,
            height: 80,
            imageOnly: !0,
            type: "MEME",
            rotation: null,
            url_to_open: "./pages/fullcv/index.html#projects",
            arma_text: '<h2><FONT COLOR="#FF0000">Press enter to see projects</FONT></h2>'
        },
        {
            imgSrc: "./static/resources/images/education.JPG",
            x_position: -250,
            y_position: 20,
            z_position: -150,
            width: null,
            length: 40,
            height: 80,
            imageOnly: !0,
            type: "MEME",
            rotation: null,
            url_to_open: "./pages/fullcv/index.html#education",
            arma_text: '<h2><FONT COLOR="#FF0000">Press enter to see Education</FONT></h2>'
        }, {
            imgSrc: "./static/resources/images/normalcv.JPG",
            x_position: -250,
            y_position: 20,
            z_position: 0,
            width: null,
            length: 40,
            height: 80,
            imageOnly: !0,
            type: "MEME",
            rotation: null,
            url_to_open: "./pages/fullcv/index.html",
            arma_text: '<h2><FONT COLOR="#FF0000">Press enter to see a normal CV</FONT></h2>'
        }, {
            imgSrc: "./static/resources/images/welcomec.png",
            x_position: 1,
            y_position: .1,
            z_position: 0,
            width: null,
            length: 40,
            height: 40,
            z_rotation: Math.PI / 2,
            imageOnly: !0,
            type: "MEME",
            rotation: null,
            url_to_open: "./pages/fullcv",
            arma_text: '<h3><FONT COLOR="#FF0000" style="width:75%"><strong>Press Enter to see Old boring CV (The game version is still in development, contains bugs and is not final yet)</strong></FONT></h3>'
        }
    ]
}
class KeyboardCharacterControllerInput {
    constructor() {
        this._Init()
    }
    _Init() {
        this._keys = {
            forward: !1,
            backward: !1,
            left: !1,
            right: !1,
            up: !1,
            down: !1,
            translateLeft: !1,
            translateRight: !1,
            reset: !1,
            enter: !1,
            showdebug: !1
        },
        document.addEventListener("keydown", t => this._onKeyDown(t), !1),
        document.addEventListener("keyup", t => this._onKeyUp(t), !1)
    }
    _onKeyDown(t) {
        switch (t.keyCode) {
            case 87:
                this._keys.forward = true;
                break;
            case 65:
                this._keys.left = true;
                break;
            case 83:
                this._keys.backward = true;
                break;
            case 68:
                this._keys.right = true;
                break;
            case 38:
                this._keys.up = true;
                break;
            case 40:
                this._keys.down = true;
                break;
            case 37:
                this._keys.translateLeft = true;
                break;
            case 39:
                this._keys.translateRight = true;
                break;
            case 82:
                this._keys.reset = true;
                break;
            case 13:
                this._keys.enter = true
            case 84:
                this._keys.showdebug = true
        }


    }
    _onKeyUp(t) {
        switch (t.keyCode) {
            case 87:
                this._keys.forward = false;
                break;
            case 65:
                this._keys.left = false;
                break;
            case 83:
                this._keys.backward = false;
                break;
            case 68:
                this._keys.right = false;
                break;
            case 38:
                this._keys.up = false;
                break;
            case 40:
                this._keys.down = false;
                break;
            case 37:
                this._keys.translateLeft = false;
                break;
            case 39:
                this._keys.translateRight = false;
                break;
            case 82:
                this._keys.reset = false;
                break;
            case 13:
                this._keys.enter = false
            case 84:
                this._keys.showdebug = false
        }
    }
}

class CharacterController {
    constructor(t) {
        this._Init(t)
    }
    _Init(t) {
        this._params = t,
        this._target = this._params.target;
        // console.log("Init params", this._params);
        this._decceleration = new THREE.Vector3(-2, -0.1, -2),
        this._acceleration = new THREE.Vector3(20, 0.15, 20),
        this._velocity = new THREE.Vector3(0, 0, 0),
        this._position = new THREE.Vector3,
        this._input = new KeyboardCharacterControllerInput;
    }
    get Position() {
        return this._position
    }
    get Rotation() {
        return this._target ? this._target.quaternion : new THREE.Quaternion
    }
    Update(timeInSeconds) {
        if (!this._target) {
            return;
        }
        const velocity = this._velocity;
        const frameDecceleration = new THREE.Vector3(velocity.x * this._decceleration.x, velocity.y * this._decceleration.y, velocity.z * this._decceleration.z);
        frameDecceleration.multiplyScalar(timeInSeconds);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));

        velocity.add(frameDecceleration);

        const controlObject = this._target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();
        const acc = this._acceleration.clone();
        if (this._input._keys.showdebug) {

            console.log(_R)
        }

        if (this._input._keys.reset) {
            this._resetCharacter()
            this._velocity = new THREE.Vector3(0, 0, 0);
            return
        }

        if (this._input._keys.shift) {
            acc.multiplyScalar(2.0);
        }

        // _R._z = 0;
        if (this._input._keys.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4 * Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        } else if (this._input._keys.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4 * -Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
        // if (_R._x > limit_tilt) {
        //     _R._x = limit_tilt * 0.5
        // }
        // if (_R._x<-limit_tilt){
        //     _R._x = -limit_tilt*0.5
        // }

        // _R._z = 0
        if (this._input._keys.forward) {

            velocity.z += acc.z * timeInSeconds;

            // if (_R._x<limit_tilt ) {
            //     _A.set(1, 0, 0);
            //     _Q.setFromAxisAngle(_A, 0.5 * timeInSeconds);
            //     _R.multiply(_Q);
            // }
        } else if (this._input._keys.backward) {
            velocity.z -= acc.z * timeInSeconds;
            // if (_R._x> - limit_tilt) {
            //     _A.set(1, 0, 0);
            //     _Q.setFromAxisAngle(_A, -0.5 * timeInSeconds);
            //     _R.multiply(_Q);
            // }
        } else {
            // if (_R._x > 0) {
            //     _A.set(1, 0, 0);
            //     _Q.setFromAxisAngle(_A, - 0.01);
            //     _R.multiply(_Q);
            // } else if (_R._x < 0) {
            //     _A.set(1, 0, 0);
            //     _Q.setFromAxisAngle(_A, + 0.01);
            //     _R.multiply(_Q);
            // }

        }

        if (this._input._keys.translateLeft) {
            velocity.x += acc.x * timeInSeconds;
        } else if (this._input._keys.translateRight) {
            velocity.x -= acc.x * timeInSeconds;
        }

        controlObject.quaternion.copy(_R);

        const oldPosition = new THREE.Vector3();
        oldPosition.copy(controlObject.position);
        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(velocity.x * timeInSeconds);
        forward.multiplyScalar(velocity.z * timeInSeconds);

        controlObject.position.add(forward);
        controlObject.position.add(sideways);

        oldPosition.copy(controlObject.position);
        controlObject.position.y = initial_y_position
    }

    _resetCharacter() {
        this._target.position.x = inistial_x_position;
        this._target.position.y = 1.5;
        this._target.position.z = - initial_z_position;
        this._target.rotation.y = -Math.PI / 4
        this._target.rotation.x = 0;
        this._target.rotation.z = 0;
    }
}

class ThirdPersonCamera {
    constructor(t) {
        this._params = t,
        this._camera = t.camera,
        this._currentPosition = new THREE.Vector3();
        this._currentLookat = new THREE.Vector3();
    }
    _CalculateIdealOffset(rotation) {
        const idealOffset = new THREE.Vector3(0, 5, -6);
        idealOffset.applyQuaternion(rotation);
        idealOffset.add(this._params.target.position);
        return idealOffset;
    }
    _CalculateIdealLookat(rotation) {
        const idealLookat = new THREE.Vector3(0, 0, 2);
        idealLookat.applyQuaternion(rotation);
        idealLookat.add(this._params.target.position);
        return idealLookat;

    }
    Update(t) {
        let quaternion = new THREE.Quaternion();
        this._params.target.getWorldQuaternion(quaternion);
        const e = this._CalculateIdealOffset(quaternion),
            i = this._CalculateIdealLookat(quaternion),
            s = 1 - Math.pow(.001, t);
        this._currentPosition.lerp(e, s);
        this._currentLookat.lerp(i, s);
        spotlight.position.copy(this._params.target.position)
        // spotlight.target.position.copy(this._currentLookat)
        spotlight.target.position.copy(i)
        spotlightViewer.position.copy(this._currentPosition)
        spotlightViewer.target.position.copy(this._params.target.position)
        // controlObject.position.z = initial_z_position
        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookat);
    }
}
class Arma {
    constructor(t) {
        this._Init(t)
    }
    _Init(t) {
        this._image_link = t.imgSrc,
        this._image_width = t.width,
        this._image_length = t.length,
        this._image_height = t.height,
        this._url_to_open = t.url_to_open,
        t.x_position ? this._arma_x_pos = t.x_position : this._arma_x_pos = 0,
        t.y_position ? this._arma_y_pos = t.y_position : this._arma_y_pos = 0,
        t.z_position ? this._arma_z_pos = t.z_position : this._arma_z_pos = 0,
        t.y_position ? this._arma_y_pos = t.y_position : this._arma_y_pos = this._image_length / 2,
        t.arma_text ? this._arma_text = t.arma_text : this._arma_text = "",
        t.x_min && t.x_max && t.z_min && t.z_max ? (this.x_min = t.x_min, this.x_max = t.x_max, this.z_min = t.z_min, this.z_max = t.z_max, this._constraint =
            {
            x_min: this.x_min,
            x_max: this.x_max,
            z_min: this.z_min,
            z_max: this._max,
            url: this._url_to_open,
            arma_text: this._arma_text
        }) : this._constraint = {
            x_min: this._arma_x_pos - this._image_height / 2,
            x_max: this._arma_x_pos + 3 * this._image_height,
            y_min: this._arma_y_pos - this._image_length / 2,
            y_max: this._arma_y_pos + this._image_length / 2,
            z_min: this._arma_z_pos - this._image_height,
            z_max: this._arma_z_pos + this._image_height,
            url: this._url_to_open,
            arma_text: this._arma_text
        },
        t.y_rotation ? this._arma_y_rot = t.y_rotation : this._arma_y_rot = 0,
        t.x_rotation ? this._arma_x_rot = t.x_rotation : this._arma_x_rot = 0,
        t.z_rotation ? this._arma_z_rot = t.z_rotation : this._arma_z_rot = 0
    }
    AddArma(t) {
        let e = new THREE.BoxGeometry(this._image_width, this._image_length, this._image_height),
            i = [new THREE.MeshBasicMaterial(
                    {
                        map: (new THREE.TextureLoader).load(this._image_link),
                        side: THREE.SingleSide


                    }
                )],
            s = new THREE.Mesh(e, i);
        createPyramid(this._arma_x_pos - 5, 0, this._arma_z_pos)
        s.position.x = this._arma_x_pos,
        s.position.y = this._arma_y_pos,
        s.position.z = this._arma_z_pos,
        s.rotation.x = this._arma_x_rot,
        s.rotation.y = this._arma_y_rot,
        s.rotation.z = this._arma_z_rot,
        t.add(s)
    }
    get_constraints_url() {
        return this._constraint
    }
}

let canvas = document.getElementById("myCanvas");


class MakCv {
    constructor() {}
}
// Global Variables
let camera0,
    scene0,
    renderer,
    composer,
    clock,
    stats;
let camPos = new THREE.Vector3(0, 1.0, 8);
let textureLoader,
    fbxloader;
let Textures = {};
let Lights = [];
let shadowSettings = {
    ON: false,
    bias: 0.0005
};
let time = 0,
    floor,
    pyramids = [],
    character,
    controls;
let floorSize = new THREE.Vector2(50, 50);
let character_controls;
let character_light;
let spotlight,
    spotlight_target = new THREE.Object3D();
let spotlightViewer,
    spotlight_targetViewer = new THREE.Object3D();
let spotlight_position_offset = {
    x: -0.1,
    y: 0,
    z: -0.15
}
let box;
let third_person_camera;

let my_armas = []

function init() { // Renderer
    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, powerPreference: "high-performance"});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.physicallyCorrectLights = true;

    // Scene
    scene0 = new THREE.Scene();
    scene0.background = new THREE.Color(0x050505);
    scene0.fog = new THREE.Fog(0x050505, 15, 30);

    // Camera
    camera0 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera0.position.copy(camPos);

    // Clock
    clock = new THREE.Clock();

    // Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);


    // Loaders
    textureLoader = new THREE.TextureLoader();
    fbxloader = new FBXLoader()

    // Resize Event
    window.addEventListener("resize", function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera0.aspect = window.innerWidth / window.innerHeight;
        camera0.updateProjectionMatrix();
    }, false);

    // LOADING
    THREE.DefaultLoadingManager.onLoad = function () { // console.log('Loading Complete!');
        setTimeout(function () {

            let x = 1.0;
            let fade = setInterval(function () {
                x -= 1 / 30;
                if (x <= 0.0) {
                    clearInterval(fade);
                    document.getElementById('loading-screen').style.display = 'none';
                }
                document.getElementById('loading-screen').style.opacity = x;
            }, 1000 / 30);
        }, 2000);
    };

    THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
        let percent = (itemsLoaded / itemsTotal * 100).toString() + "%";
        // console.log( percent );
        document.querySelector('.ld-bar-progress').style.width = percent;
    };

    THREE.DefaultLoadingManager.onError = function (url) {
        console.log('There was an error loading ' + url);
    };


    // Inits main functionality
    initControls();
    initTextures();

    initLights();
    createStartingMesh();
    initPostProcessing();


    if (shadowSettings.ON) 
        renderer.shadowMap.needsUpdate = true;
    


    // setInterval(function () { // console.log(renderer.info.render.calls);
    //     if (character) {
    //         console.log("position:", character.position)
    //         console.log("Rotation:", character.rotation)
    //     }
    // }, 1000 / 2);
}

let createStartingMesh = function () {

    loadCharacter();
    createFloor();
    const arma_to_add = getMyArmas()[0]
    const arma1 = new Arma(arma_to_add)
    arma1.AddArma(scene0)
    // createPyramid(-5, 0, -5);
    // createPyramid(10, 0, 10);
}


let loadCharacter = function () {
    fbxloader.load("assets/models/drone.fbx", drone => {
        drone.scale.setScalar(.006),
        drone.position.x = inistial_x_position;
        drone.position.y = 1.5;
        drone.position.z = initial_z_position;
        drone.rotation.y = -Math.PI / 4
        character = drone


        character_controls = new CharacterController({camera: camera0, scene: scene0, constraints: {}, target: character})
        third_person_camera = new ThirdPersonCamera({camera: camera0, target: character})
        // box = new THREE.BoxHelper(character, 0xffff00);
        scene0.add(character)
        // scene0.add(box)
        // var worldAxis = new THREE.AxesHelper(20);
        // scene0.add(worldAxis);

        // console.log({camera0, character})

        spotlight = new THREE.SpotLight(0xffffff, 20);
        spotlight.position.set(0, 5, 0);

        spotlight.castShadow = true;
        spotlight.shadow.bias = 0.00005;
        spotlight.shadow.camera.fov = 50;
        spotlight.angle = Math.PI / 6;

        scene0.add(spotlight);
        scene0.add(spotlight_target)
        spotlight.target = spotlight_target

        spotlightViewer = new THREE.SpotLight(0xffffff, 1);
        spotlightViewer.position.set(0, 5, 0);

        spotlightViewer.castShadow = false;
        spotlightViewer.shadow.camera.fov = 60;


        scene0.add(spotlightViewer);
        scene0.add(spotlight_targetViewer)
        spotlightViewer.target = spotlight_targetViewer


    })


}

let createFloor = function () {

    floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(floorSize.x, floorSize.y), new THREE.MeshStandardMaterial({color: 0x2642D9, metalness: 0.0, bumpMap: Textures.noise2, transparent: true}));

    floor.rotation.x -= 90 * Math.PI / 180;
    scene0.add(floor);
    if (shadowSettings.ON) 
        floor.receiveShadow = true;
    


    floor.material.onBeforeCompile = function (shader) {

        shader.uniforms.uTime = {
            value: time
        };
        shader.uniforms.uNoise = {
            value: Textures.noise2
        };
        shader.uniforms.CR1min = {
            value: 0.5
        };
        shader.uniforms.CR1max = {
            value: 0.66
        };
        shader.uniforms.CR2min = {
            value: 0.5
        };
        shader.uniforms.CR2max = {
            value: 0.9
        };
        shader.uniforms.uNoiseOpacity = {
            value: 0.1
        };


        shader.fragmentShader = `
			uniform float uTime;
			uniform sampler2D uNoise;
			uniform float CR1min;
			uniform float CR1max;
			uniform float CR2min;
			uniform float CR2max;
			uniform float uNoiseOpacity;
			
			uniform sampler2D uReflectionRT;
			
		` + shader.fragmentShader;

        shader.fragmentShader = shader.fragmentShader.replace(`#include <roughnessmap_fragment>`, myChunks.adjusted_roughnessmap_fragment);

        shader.fragmentShader = shader.fragmentShader.replace(`#include <bumpmap_pars_fragment>`, myChunks.adjusted_bumpmap_pars_fragment);

        // floor.userData.shader = shader;
    }

}

let createPyramid = function (x_pos = 0, y_pos = 0, z_pos = 0) {

    let pyramidGeo = new THREE.ConeBufferGeometry(3.5, 4.5, 4);
    let reflectedGeometry = pyramidGeo.clone();

    pyramidGeo.rotateX(Math.PI); // 180 deg
    pyramidGeo.translate(0, 2.5, 0);
    reflectedGeometry.translate(0, -2.5, 0);

    pyramidGeo = BufferGeometryUtils.mergeBufferGeometries([pyramidGeo, reflectedGeometry]);

    let pyramidMat = new THREE.ShaderMaterial({
        defines: {},

        uniforms: {
            diffuse: {
                value: new THREE.Color(0.0, 0.0, 0.0)
            },
            opacity: {
                value: 1.0
            },

            uTime: {
                value: 0.0
            },
            uNoiseVoronoi: {
                value: Textures.voronoi
            },
            uNoisePerlin: {
                value: Textures.noise2
            },
            uTxtMix: {
                value: 0.5
            },
            emissive: {
                value: new THREE.Color(0.0, 0.7, 0.8)
            }, // 0.7 , 0.85
            CR3min: {
                value: 0.4
            },
            CR3max: {
                value: 0.5
            }
        },

        vertexShader: myChunks.my_emission_shader.vertex,
        fragmentShader: myChunks.my_emission_shader.fragment,

        flatShading: true,
        transparent: true
    });
    let normalMat = new THREE.MeshNormalMaterial({});

    let pyramid = new THREE.Mesh(pyramidGeo, pyramidMat);
    pyramid.position.set(x_pos, y_pos, z_pos);
    pyramid.rotation.y += 55 * Math.PI / 180;
    pyramids.push(pyramid)
    scene0.add(pyramid);

    // GLOW
    let glowEffect = new THREE.Sprite(new THREE.SpriteMaterial({
        map: Textures.glow,
        color: new THREE.Color(0.0, 0.9, 1.0),
        blending: THREE.AdditiveBlending,
        opacity: 0.15,
        fog: false
    }));
    glowEffect.scale.set(50, 50, 1);
    scene0.add(glowEffect);
    glowEffect.position.set(x_pos, y_pos, z_pos);
    glowEffect.renderOrder = 0.1;

}

let initControls = function () { //
    controls = new OrbitControls(camera0, canvas);

}

let initTextures = function () {

    textureLoader.setPath('assets/textures/');

    Textures.noise2 = textureLoader.load('noiseTexture2.png');
    Textures.noise2.wrapS = THREE.RepeatWrapping;
    Textures.noise2.wrapT = THREE.RepeatWrapping;
    Textures.noise2.repeat.set(1.85, 2.12); // 2 2
    Textures.noise2.anisotropy = renderer.capabilities.getMaxAnisotropy();

    Textures.voronoi = textureLoader.load('voronoi.jpg');
    Textures.voronoi.wrapS = THREE.RepeatWrapping;
    Textures.voronoi.wrapT = THREE.RepeatWrapping;

    Textures.particle = textureLoader.load('corona.png');
    Textures.glow = textureLoader.load('RoundSoftParticleHalved.png');
}

let initPostProcessing = function () {

    composer = new EffectComposer(renderer);
    renderer.info.autoReset = false;

    // Passes
    let renderPass = new RenderPass(scene0, camera0);
    let fxaaPass = new ShaderPass(FXAAShader);

    // resolution, strength, radius, threshold
    let unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(256, 256), 4.5, 1.0, 0.40);
    // unrealBloomPass.enabled = false;
    unrealBloomPass.exposure = 1.0;


    composer.addPass(renderPass);
    composer.addPass(unrealBloomPass);
    composer.addPass(fxaaPass);


}

let initLights = function () {
    // PYRAMID LIGHT
    // Lights[0] = new THREE.PointLight(0xaaeeff, 0, 0, 2); // int 13
    // Lights[0].position.set(2, 1.5, -8);
    // if (shadowSettings.ON && false) {
    //     Lights[0].castShadow = true;
    //     Lights[0].shadow.bias = shadowSettings.bias;
    // }


    // ORANGE LIGHT
    // let orangeLight = new THREE.PointLight(0xFF2200, 10, 50, 2); // 16.3 dist
    // orangeLight.position.set(30, 20, 30);
    // let pHelper = new THREE.Sprite(new THREE.SpriteMaterial({map: Textures.glow, color: 0xFF2200, opacity: 0.7, fog: false}));
    // pHelper.scale.set(1.0 + 90, 1.0 + 90);
    // pHelper.renderOrder = 0.1;
    // orangeLight.add(pHelper);
    // scene0.add(orangeLight)

    // pHelper.position.set(-15.5, 0.9, -3.0);
    let ambLight = new THREE.AmbientLight(16777215, 0.001);
    scene0.add(ambLight)

    // for (let i = 0; i < Lights.length; i++) {
    //     scene0.add(Lights[i]);
    // }
}
let previous_time = time;

function animate() {
    renderer.info.reset();
    // character && console.log(THREE.Object3D.getWorldQuaternion(character))
    // character && (character_controls.Update(time - previous_time), third_person_camera.Update(time - previous_time));

    previous_time = time
    requestAnimationFrame(animate);


    let delta = clock.getDelta();
    time += 1 / 60;
    pyramids.forEach((pyr) => {
        pyr.rotation.y += 0.0007;
        pyr.material.uniforms.uTime.value = time;
    })


    composer.render(scene0, camera0);
    stats.update();
}

if (WEBGL.isWebGLAvailable() === false) {

    document.body.appendChild(WEBGL.getWebGLErrorMessage());
    console.error("WEBGL IS NOT SUPPORTED");
} else {
    init();
    requestAnimationFrame(animate);
}
