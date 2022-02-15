import * as THREE from "./threejs/three.module.js";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";
import Stats from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/libs/stats.module.js";
const banner = document.getElementById("is_in_zone"),
  div_overlay = document.getElementById("div-overlay"),
  div_overlay_content = document.getElementById("div-overlay-content");
class CharacterControllerProxy {}
class CharacterController {
  constructor(t) {
    this._Init(t);
  }
  _Init(t) {
    (this._params = t),
      (this._decceleration = new THREE.Vector3(-2, -2, -2)),
      (this._acceleration = new THREE.Vector3(100, 60, 100)),
      (this._velocity = new THREE.Vector3(0, 0, 0)),
      (this._position = new THREE.Vector3()),
      (this._input = new KeyboardCharacterControllerInput()),
      this._LoadModels();
  }
  _LoadModels() {
    {
      const t = new THREE.LoadingManager(() => {
        document.getElementById("loading-screen").classList.add("fade-out"),
          div_overlay.classList.add("showing"),
          div_overlay.classList.remove("hidden");
      });
      new FBXLoader(t).load(
        "./static/resources/nice-drone/Drone_WinTer.fbx",
        (t) => {
          t.scale.setScalar(0.03),
            (t.position.x = 50),
            (t.position.y = 10),
            (t.position.z = 0),
            (t.rotation.y = -Math.PI / 2),
            localStorage.setItem("drone_model", JSON.stringify(t)),
            (this._target = t),
            this._params.scene.add(this._target);
        }
      );
    }
  }
  get Position() {
    return this._position;
  }
  get Rotation() {
    return this._target ? this._target.quaternion : new THREE.Quaternion();
  }
  Update(t) {
    let e = this._target.position.x,
      i = this._target.position.z,
      s = !1;
    const a = this._velocity;
    this._params.constraints.forEach((t) => {
      if (
        e < t.x_max &&
        e > t.x_min &&
        i < t.z_max &&
        i > t.z_min &&
        ((s = !0),
        div_overlay.className.includes("showing") ||
          (banner.innerHTML = t.arma_text),
        this._input._keys.enter)
      ) {
        (this._input._keys.enter = !1),
          (this._input._keys.forward = !1),
          (this._input._keys.backward = !1),
          (this._input._keys.left = !1),
          (this._input._keys.right = !1),
          (this._input._keys.rotateLeft = !1),
          (this._input._keys.rotateRight = !1);
        const e = this._target.position.x,
          i = this._target.position.y,
          s = this._target.position.z;
        (a.x = 0),
          (a.y = 0),
          (a.z = 0),
          (this._velocity = a),
          window.open(t.url, "_blank"),
          (this._target.position.x = e),
          (this._target.position.y = i),
          (this._target.position.z = s);
      }
    }),
      (s && !div_overlay.className.includes("showing")) ||
        (banner.innerHTML = "");
    const o = new THREE.Vector3(
      a.x * this._decceleration.x,
      a.y * this._decceleration.y,
      a.z * this._decceleration.z
    );
    o.multiplyScalar(t),
      (o.z = Math.sign(o.z) * Math.min(Math.abs(o.z), Math.abs(a.z))),
      a.add(o);
    const r = this._target,
      n = new THREE.Quaternion(),
      _ = new THREE.Vector3(),
      h = r.quaternion.clone(),
      d = this._acceleration.clone();
    this._input._keys.forward && d.multiplyScalar(2),
      this._input._keys.forward && (a.z += d.z * t),
      this._input._keys.backward && (a.z -= d.z * t),
      this._input._keys.left && (a.x += d.x * t),
      this._input._keys.right && (a.x -= d.x * t);
    this._input._keys.rotateLeft &&
      (_.set(0, 1, 0),
      n.setFromAxisAngle(_, 4 * Math.PI * t * this._acceleration.y * 0.002),
      h.multiply(n)),
      this._input._keys.rotateRight &&
        (_.set(0, 1, 0),
        n.setFromAxisAngle(_, 4 * -Math.PI * t * this._acceleration.y * 0.002),
        h.multiply(n)),
      this._input._keys.reset &&
        ((this._target.position.x = 30),
        (this._target.position.y = 10),
        (this._target.position.z = 0),
        (this._target.rotation.y = -Math.PI / 2),
        (a.x = 0),
        (a.y = 0),
        (a.z = 0)),
      r.quaternion.copy(h),
      new THREE.Vector3().copy(r.position);
    const c = new THREE.Vector3(0, 0, 1);
    c.applyQuaternion(r.quaternion), c.normalize();
    const l = new THREE.Vector3(1, 0, 0);
    l.applyQuaternion(r.quaternion),
      l.normalize(),
      l.multiplyScalar(a.x * t),
      c.multiplyScalar(a.z * t),
      r.position.add(c),
      r.position.add(l),
      this._position.copy(r.position);
  }
}
class KeyboardCharacterControllerInput {
  constructor() {
    this._Init();
  }
  _Init() {
    (this._keys = {
      forward: !1,
      backward: !1,
      left: !1,
      right: !1,
      up: !1,
      down: !1,
      rotateLeft: !1,
      rotateRight: !1,
      reset: !1,
      enter: !1,
    }),
      document.addEventListener("keydown", (t) => this._onKeyDown(t), !1),
      document.addEventListener("keyup", (t) => this._onKeyUp(t), !1);
  }
  _onKeyDown(t) {
    if (!div_overlay.classList.contains("showing"))
      switch (t.keyCode) {
        case 87:
          this._keys.forward = !0;
          break;
        case 65:
          this._keys.left = !0;
          break;
        case 83:
          this._keys.backward = !0;
          break;
        case 68:
          this._keys.right = !0;
          break;
        case 38:
          this._keys.up = !0;
          break;
        case 40:
          this._keys.down = !0;
          break;
        case 37:
          this._keys.rotateLeft = !0;
          break;
        case 39:
          this._keys.rotateRight = !0;
          break;
        case 82:
          this._keys.reset = !0;
          break;
        case 13:
          this._keys.enter = !0;
      }
  }
  _onKeyUp(t) {
    switch (t.keyCode) {
      case 87:
        this._keys.forward = !1;
        break;
      case 65:
        this._keys.left = !1;
        break;
      case 83:
        this._keys.backward = !1;
        break;
      case 68:
        this._keys.right = !1;
        break;
      case 38:
        this._keys.up = !1;
        break;
      case 40:
        this._keys.down = !1;
        break;
      case 37:
        this._keys.rotateLeft = !1;
        break;
      case 39:
        this._keys.rotateRight = !1;
        break;
      case 82:
        this._keys.reset = !1;
        break;
      case 13:
        this._keys.enter = !1;
    }
  }
}
class ThirdPersonCamera {
  constructor(t) {
    (this._params = t),
      (this._camera = t.camera),
      (this._currentPosition = new THREE.Vector3()),
      (this._currentLookat = new THREE.Vector3());
  }
  _CalculateIdealOffset() {
    const t = new THREE.Vector3(0, 20, -50);
    return (
      t.applyQuaternion(this._params.target.Rotation),
      t.add(this._params.target.Position),
      t
    );
  }
  _CalculateIdealLookat() {
    const t = new THREE.Vector3(12, 0, 0);
    return (
      t.applyQuaternion(this._params.target.Rotation),
      t.add(this._params.target.Position),
      t
    );
  }
  Update(t) {
    const e = this._CalculateIdealOffset(),
      i = this._CalculateIdealLookat(),
      s = 1 - Math.pow(0.001, t);
    this._currentPosition.lerp(e, s),
      this._currentLookat.lerp(i, s),
      this._camera.position.copy(this._currentPosition),
      this._camera.lookAt(this._currentLookat);
  }
}
class Arma {
  constructor(t) {
    this._Init(t);
  }
  _Init(t) {
    (this._image_link = t.imgSrc),
      (this._image_width = t.width),
      (this._image_length = t.length),
      (this._image_height = t.height),
      (this._url_to_open = t.url_to_open),
      t.x_position ? (this._arma_x_pos = t.x_position) : (this._arma_x_pos = 0),
      t.y_position ? (this._arma_y_pos = t.y_position) : (this._arma_y_pos = 0),
      t.z_position ? (this._arma_z_pos = t.z_position) : (this._arma_z_pos = 0),
      t.y_position
        ? (this._arma_y_pos = t.y_position)
        : (this._arma_y_pos = this._image_length / 2),
      t.arma_text ? (this._arma_text = t.arma_text) : (this._arma_text = ""),
      t.x_min && t.x_max && t.z_min && t.z_max
        ? ((this.x_min = t.x_min),
          (this.x_max = t.x_max),
          (this.z_min = t.z_min),
          (this.z_max = t.z_max),
          (this._constraint = {
            x_min: this.x_min,
            x_max: this.x_max,
            z_min: this.z_min,
            z_max: this._max,
            url: this._url_to_open,
            arma_text: this._arma_text,
          }))
        : (this._constraint = {
            x_min: this._arma_x_pos - this._image_height / 2,
            x_max: this._arma_x_pos + 3 * this._image_height,
            y_min: this._arma_y_pos - this._image_length / 2,
            y_max: this._arma_y_pos + this._image_length / 2,
            z_min: this._arma_z_pos - this._image_height,
            z_max: this._arma_z_pos + this._image_height,
            url: this._url_to_open,
            arma_text: this._arma_text,
          }),
      t.y_rotation ? (this._arma_y_rot = t.y_rotation) : (this._arma_y_rot = 0),
      t.x_rotation ? (this._arma_x_rot = t.x_rotation) : (this._arma_x_rot = 0),
      t.z_rotation ? (this._arma_z_rot = t.z_rotation) : (this._arma_z_rot = 0);
  }
  AddArma(t) {
    let e = new THREE.BoxGeometry(
        this._image_width,
        this._image_length,
        this._image_height
      ),
      i = [
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(this._image_link),
          side: THREE.DoubleSide,
        }),
      ],
      s = new THREE.Mesh(e, i);
    (s.position.x = this._arma_x_pos),
      (s.position.y = this._arma_y_pos),
      (s.position.z = this._arma_z_pos),
      (s.rotation.x = this._arma_x_rot),
      (s.rotation.y = this._arma_y_rot),
      (s.rotation.z = this._arma_z_rot),
      t.add(s);
  }
  get_constraints_url() {
    return this._constraint;
  }
}
class MAK {
  constructor() {
    this._Initialize();
  }
  _Initialize() {
    (this._myArmas = this._GetMyArmas()),
      (this._arma_objects = []),
      (this._arma_constraints = []),
      (this._gridAndAxis = !0),
      (this._statsEnabled = !0),
      this._stats,
      this._scene,
      this._renderer,
      this._camera,
      this._urlsAndPositions,
      (this._pressed = {}),
      (this._previousRequestedAnimationFrame = null),
      (this._droneIsBlack = !0),
      this._CreateRenderer(),
      this._CreateCamera(),
      this._CreateScene(),
      this._AddLights(),
      this._AddBasicWorld(),
      this._AddWindowResizeFunction(),
      this._AddStats(),
      this._AddArmaObjects(),
      this._LoadDrone(),
      this._RequestAnimationFrame();
  }
  _GetMyArmas() {
    return [
      {
        imgSrc: "./static/resources/images/image.jpg",
        x_position: -250,
        y_position: 20,
        z_position: 300,
        width: null,
        length: 40,
        height: 40,
        imageOnly: !0,
        type: "MEME",
        rotation: null,
        url_to_open: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        arma_text:
          '<h2><FONT COLOR="#FF0000">Press enter to get rick rolled</FONT></h2>',
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
        arma_text:
          '<h2><FONT COLOR="#FF0000">Press enter to see experience</FONT></h2>',
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
        arma_text:
          '<h2><FONT COLOR="#FF0000">Press enter to see projects</FONT></h2>',
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
        arma_text:
          '<h2><FONT COLOR="#FF0000">Press enter to see Education</FONT></h2>',
      },
      {
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
        arma_text:
          '<h2><FONT COLOR="#FF0000">Press enter to see a normal CV</FONT></h2>',
      },
      {
        imgSrc: "./static/resources/images/welcomec.png",
        x_position: 1,
        y_position: 0.1,
        z_position: 0,
        width: null,
        length: 40,
        height: 40,
        z_rotation: Math.PI / 2,
        imageOnly: !0,
        type: "MEME",
        rotation: null,
        url_to_open: "./pages/fullcv",
        arma_text:
          '<h3><FONT COLOR="#FF0000" style="width:75%"><strong>Press Enter to see Old boring CV (The game version is still in development, contains bugs and is not final yet)</strong></FONT></h3>',
      },
    ];
  }
  _CreateRenderer() {
    (this._renderer = new THREE.WebGLRenderer({ antialias: !0 })),
      (this._renderer.shadowMap.enabled = !0),
      (this._renderer.shadowMap.type = THREE.PCFSoftShadowMap),
      this._renderer.setPixelRatio(window.devicePixelRatio),
      this._renderer.setSize(window.innerWidth, window.innerHeight),
      document.body.appendChild(this._renderer.domElement);
  }
  _CreateCamera() {
    (this._camera = new THREE.PerspectiveCamera(60, 1920 / 1080, 1, 1e3)),
      this._camera.position.set(75, 20, 0);
  }
  _CreateScene() {
    this._scene = new THREE.Scene();
  }
  _AddLights() {
    let t = new THREE.DirectionalLight(16777215, 0.001);
    t.position.set(20, 100, 10),
      t.target.position.set(0, 0, 0),
      (t.castShadow = !0),
      (t.shadow.bias = -0.001),
      (t.shadow.mapSize.width = 2048),
      (t.shadow.mapSize.height = 2048),
      (t.shadow.camera.near = 0.1),
      (t.shadow.camera.far = 500),
      (t.shadow.camera.near = 0.5),
      (t.shadow.camera.far = 500),
      (t.shadow.camera.left = 100),
      (t.shadow.camera.right = -100),
      (t.shadow.camera.top = 100),
      (t.shadow.camera.bottom = -100),
      this._scene.add(t);
    let e = new THREE.AmbientLight(16777215, 4);
    this._scene.add(e);
  }
  _AddGridAndAxis() {
    this._gridAndAxis &&
      (this._scene.add(new THREE.GridHelper(1e3, 1e3)),
      this._scene.add(new THREE.AxesHelper()));
  }
  _AddBasicWorld() {
    const t = new THREE.Mesh(
      new THREE.PlaneGeometry(1e3, 1e3, 10, 10),
      new THREE.MeshStandardMaterial({ color: 16577540 })
    );
    (t.castShadow = !1),
      (t.receiveShadow = !0),
      (t.rotation.x = -Math.PI / 2),
      this._scene.add(t);
  }
  _AddStats() {
    (this._stats = Stats()), document.body.appendChild(this._stats.dom);
  }
  _AddWindowResizeFunction() {
    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      !1
    );
  }
  _AddOrbitControls() {
    const t = new OrbitControls(this._camera, this._renderer.domElement);
    t.target.set(0, 20, 0), t.update();
  }
  _OnWindowResize() {
    (this._camera.aspect = window.innerWidth / window.innerHeight),
      this._camera.updateProjectionMatrix(),
      this._renderer.setSize(window.innerWidth, window.innerHeight);
  }
  _AddDrone() {
    let t = "./static/resources/drone/textures/texture_white.jpg";
    this._droneIsBlack &&
      (t = "./static/resources/drone/textures/texture_black.jpg");
    let e = new THREE.TextureLoader().load(t),
      i = new THREE.MeshPhongMaterial({ map: e });
    new OBJLoader().load("./static/resources/drone/3dModel/drone.obj", (t) => {
      t.traverse(function (t) {
        t.isMesh && (t.material = i);
      }),
        (t.position.x = 30),
        (t.position.y = 10),
        (t.position.z = 0),
        (t.rotation.x = 0),
        (t.rotation.y = -Math.PI / 2),
        (t.rotation.z = 0),
        (t.scale.x = 50),
        (t.scale.y = 50),
        (t.scale.z = 50),
        this._scene.add(t);
    });
  }
  _LoadDrone() {
    const t = {
      camera: this._camera,
      scene: this._scene,
      constraints: this._arma_constraints,
    };
    (this._controls = new CharacterController(t)),
      (this._thirdPersonCamera = new ThirdPersonCamera({
        camera: this._camera,
        target: this._controls,
        constraints: this._arma_constraints,
      }));
  }
  _AddArmaObjects() {
    this._myArmas.forEach((t) => {
      let e = new Arma(t);
      this._arma_objects.push(e);
    }),
      this._arma_objects.forEach((t) => {
        t.AddArma(this._scene),
          this._arma_constraints.push(t.get_constraints_url());
      });
  }
  _AddArmas() {}
  _AddArma(t) {
    let e = new THREE.BoxGeometry(t.width, t.length, t.height),
      i = [
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(t.imgSrc),
          side: THREE.DoubleSide,
        }),
      ],
      s = new THREE.Mesh(e, i);
    (s.position.x = t.x_position),
      (s.position.y = t.y_position),
      (s.position.z = t.z_position),
      this._scene.add(s);
  }
  _RequestAnimationFrame() {
    this._stats.update(),
      requestAnimationFrame((t) => {
        null === this._previousRequestedAnimationFrame &&
          (this._previousRequestedAnimationFrame = t),
          this._RequestAnimationFrame(),
          this._renderer.render(this._scene, this._camera);
        try {
          this._Step(t - this._previousRequestedAnimationFrame);
        } catch (t) {}
        this._previousRequestedAnimationFrame = t;
      });
  }
  _Step(t) {
    const e = 0.001 * t;
    this._controls && this._controls.Update(e),
      this._thirdPersonCamera.Update(e);
  }
}
let _APP = null;
window.addEventListener("DOMContentLoaded", () => {
  _APP = new MAK();
});
