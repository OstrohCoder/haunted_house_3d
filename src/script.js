import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/addons/objects/Sky.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/textures/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/textures/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/textures/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/textures/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.colorSpace = THREE.SRGBColorSpace

// Wall
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/textures/castle_brick_broken_06_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/textures/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/textures/castle_brick_broken_06_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/textures/roof_slates_02_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/textures/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/textures/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.colorSpace = THREE.SRGBColorSpace

// Bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/textures/leaves_forest_ground_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/textures/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/textures/leaves_forest_ground_nor_gl_1k.jpg')

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

bushColorTexture.colorSpace = THREE.SRGBColorSpace

// Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/textures/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/textures/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/textures/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

graveColorTexture.colorSpace = THREE.SRGBColorSpace

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Path
const pathColorTexture = textureLoader.load('./path/cobblestone_floor_01_1k/textures/cobblestone_floor_01_diff_1k.jpg')
const pathARMTexture = textureLoader.load('./path/cobblestone_floor_01_1k/textures/cobblestone_floor_01_arm_1k.jpg')
const pathNormalTexture = textureLoader.load('./path/cobblestone_floor_01_1k/textures/cobblestone_floor_01_nor_gl_1k.jpg')

pathColorTexture.repeat.set(1, 4)
pathARMTexture.repeat.set(1, 4)
pathNormalTexture.repeat.set(1, 4)

pathColorTexture.wrapS = THREE.RepeatWrapping
pathARMTexture.wrapS = THREE.RepeatWrapping
pathNormalTexture.wrapS = THREE.RepeatWrapping

pathColorTexture.wrapT = THREE.RepeatWrapping
pathARMTexture.wrapT = THREE.RepeatWrapping
pathNormalTexture.wrapT = THREE.RepeatWrapping

pathColorTexture.colorSpace = THREE.SRGBColorSpace

// Wood
const woodColorTexture = textureLoader.load('./wood/weathered_planks_1k/textures/weathered_planks_diff_1k.jpg')
const woodARMTexture = textureLoader.load('./wood/weathered_planks_1k/textures/weathered_planks_arm_1k.jpg')
const woodNormalTexture = textureLoader.load('./wood/weathered_planks_1k/textures/weathered_planks_nor_gl_1k.jpg')

woodColorTexture.colorSpace = THREE.SRGBColorSpace

// Rock
const rockColorTexture = textureLoader.load('./rock/rock_boulder_cracked_1k/textures/rock_boulder_cracked_diff_1k.jpg')
const rockARMTexture = textureLoader.load('./rock/rock_boulder_cracked_1k/textures/rock_boulder_cracked_arm_1k.jpg')
const rockNormalTexture = textureLoader.load('./rock/rock_boulder_cracked_1k/textures/rock_boulder_cracked_nor_gl_1k.jpg')

rockColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2
    })
)

floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

//gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
//gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y += 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementScale: 0.15,
        displacementBias: -0.04
    })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Windows
const windowFrameGeometry = new THREE.BoxGeometry(1.1, 1.3, 0.08)
const windowGlassGeometry = new THREE.PlaneGeometry(0.9, 1.1)
const windowBarVerticalGeometry = new THREE.BoxGeometry(0.06, 1.1, 0.05)
const windowBarHorizontalGeometry = new THREE.BoxGeometry(0.9, 0.06, 0.05)

const woodMaterial = new THREE.MeshStandardMaterial({
    map: woodColorTexture,
    aoMap: woodARMTexture,
    roughnessMap: woodARMTexture,
    metalnessMap: woodARMTexture,
    normalMap: woodNormalTexture
})

const windowGlassMaterial = new THREE.MeshStandardMaterial({
    color: '#222222',
    emissive: '#ff7d46',
    emissiveIntensity: 0,
    roughness: 0.2
})

const windowsData = [
    { x: 2, z: 0, rotation: Math.PI * 0.5 },
    { x: - 2, z: 0, rotation: - Math.PI * 0.5 },
]

for(const windowData of windowsData)
{
    const houseWindow = new THREE.Group()
    houseWindow.position.set(windowData.x, 1.5, windowData.z)
    houseWindow.rotation.y = windowData.rotation

    const windowFrame = new THREE.Mesh(windowFrameGeometry, woodMaterial)
    const windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial)
    windowGlass.position.z = 0.045

    const windowBarVertical = new THREE.Mesh(windowBarVerticalGeometry, woodMaterial)
    const windowBarHorizontal = new THREE.Mesh(windowBarHorizontalGeometry, woodMaterial)
    windowBarVertical.position.z = 0.07
    windowBarHorizontal.position.z = 0.07

    houseWindow.add(windowFrame, windowGlass, windowBarVertical, windowBarHorizontal)
    house.add(houseWindow)
}

// Path
const pathGeometry = new THREE.PlaneGeometry(1.2, 8, 8, 60)
const pathPositions = pathGeometry.attributes.position

for(let i = 0; i < pathPositions.count; i++)
{
    const x = pathPositions.getX(i)
    const y = pathPositions.getY(i)

    const progress = 0.5 - y / 8

    const meander = (Math.sin(y * 1.1) * 0.15 + Math.sin(y * 2.7) * 0.06) * progress
    const widthFactor = 1 + Math.sin(y * 3.1 + 1) * 0.12 + Math.sin(y * 7.3) * 0.06

    const jitter = Math.abs(x) > 0.5 ? (Math.random() - 0.5) * 0.14 : 0

    pathPositions.setX(i, x * widthFactor + meander + jitter)
}

const pathColors = new Float32Array(pathPositions.count * 4)

for(let i = 0; i < pathPositions.count; i++)
{
    const y = pathPositions.getY(i)
    const progress = 0.5 - y / 8
    const alpha = 1 - THREE.MathUtils.smoothstep(progress, 0.6, 1)

    pathColors[i * 4] = 1
    pathColors[i * 4 + 1] = 1
    pathColors[i * 4 + 2] = 1
    pathColors[i * 4 + 3] = alpha
}

pathGeometry.setAttribute('color', new THREE.BufferAttribute(pathColors, 4))

const path = new THREE.Mesh(
    pathGeometry,
    new THREE.MeshStandardMaterial({
        vertexColors: true,
        transparent: true,
        map: pathColorTexture,
        aoMap: pathARMTexture,
        roughnessMap: pathARMTexture,
        metalnessMap: pathARMTexture,
        normalMap: pathNormalTexture
    })
)
path.rotation.x = - Math.PI * 0.5
path.position.set(0, 0.05, 6)
scene.add(path)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++)
{
    // Coordinates
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    if(Math.abs(x) < 1 && z > 0)
        continue

    // Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    // Add to the graves group
    graves.add(grave)
}

// Fence
const fencePostGeometry = new THREE.BoxGeometry(0.15, 1.2, 0.15)
const fenceRailGeometry = new THREE.BoxGeometry(18, 0.1, 0.05)
const fenceFrontRailGeometry = new THREE.BoxGeometry(7.5, 0.1, 0.05)

const fence = new THREE.Group()
scene.add(fence)

for(let i = 0; i < 13; i++)
{
    const offset = - 9 + i * 1.5

    // Back
    const postBack = new THREE.Mesh(fencePostGeometry, woodMaterial)
    postBack.position.set(offset, 0.5, - 9)
    fence.add(postBack)

    // Front
    if(Math.abs(offset) > 0.1)
    {
        const postFront = new THREE.Mesh(fencePostGeometry, woodMaterial)
        postFront.position.set(offset, 0.5, 9)
        fence.add(postFront)
    }

    // Sides
    if(i > 0 && i < 12)
    {
        const postLeft = new THREE.Mesh(fencePostGeometry, woodMaterial)
        postLeft.position.set(- 9, 0.5, offset)

        const postRight = new THREE.Mesh(fencePostGeometry, woodMaterial)
        postRight.position.set(9, 0.5, offset)

        fence.add(postLeft, postRight)
    }
}

for(const railHeight of [0.35, 0.85])
{
    const railBack = new THREE.Mesh(fenceRailGeometry, woodMaterial)
    railBack.position.set(0, railHeight, - 9)

    const railLeft = new THREE.Mesh(fenceRailGeometry, woodMaterial)
    railLeft.position.set(- 9, railHeight, 0)
    railLeft.rotation.y = Math.PI * 0.5

    const railRight = new THREE.Mesh(fenceRailGeometry, woodMaterial)
    railRight.position.set(9, railHeight, 0)
    railRight.rotation.y = Math.PI * 0.5

    const railFrontLeft = new THREE.Mesh(fenceFrontRailGeometry, woodMaterial)
    railFrontLeft.position.set(- 5.25, railHeight, 9)

    const railFrontRight = new THREE.Mesh(fenceFrontRailGeometry, woodMaterial)
    railFrontRight.position.set(5.25, railHeight, 9)

    fence.add(railBack, railLeft, railRight, railFrontLeft, railFrontRight)
}

// Rocks
const rockGeometry = new THREE.DodecahedronGeometry(1)
const rockMaterial = new THREE.MeshStandardMaterial({
    color: '#6e6862',
    map: rockColorTexture,
    aoMap: rockARMTexture,
    roughnessMap: rockARMTexture,
    metalnessMap: rockARMTexture,
    normalMap: rockNormalTexture
})

const rocks = new THREE.Group()
scene.add(rocks)

for(let i = 0; i < 18; i++)
{
    // Coordinates
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 5.5
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    if(Math.abs(x) < 1 && z > 0)
        continue

    // Mesh
    const rockScale = 0.1 + Math.random() * 0.25
    const rock = new THREE.Mesh(rockGeometry, rockMaterial)
    rock.scale.set(rockScale, rockScale * 0.6, rockScale)
    rock.position.set(x, 0.05, z)
    rock.rotation.x = Math.random() * Math.PI
    rock.rotation.y = Math.random() * Math.PI
    rock.rotation.z = Math.random() * Math.PI

    // Add to the rocks group
    rocks.add(rock)
}

// Outhouse
const outhouse = new THREE.Group()
outhouse.position.set(- 4, 0, - 7.8)
outhouse.rotation.y = Math.PI * 0.15
scene.add(outhouse)

const outhouseWalls = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 2, 1.2),
    woodMaterial
)
outhouseWalls.position.y = 1

const outhouseRoof = new THREE.Mesh(
    new THREE.ConeGeometry(1, 0.6, 4),
    roof.material
)
outhouseRoof.position.y = 2 + 0.3
outhouseRoof.rotation.y = Math.PI * 0.25

const outhouseDoor = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1.4, 0.05),
    new THREE.MeshStandardMaterial({ color: '#555555', map: woodColorTexture, normalMap: woodNormalTexture })
)
outhouseDoor.position.set(0, 0.75, 0.61)

outhouse.add(outhouseWalls, outhouseRoof, outhouseDoor)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Scene lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

path.receiveShadow = true
outhouseWalls.castShadow = true
outhouseWalls.receiveShadow = true
outhouseRoof.castShadow = true

for(const rock of rocks.children)
{
    rock.castShadow = true
    rock.receiveShadow = true
}

for(const grave of graves.children)
{
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#04343f', 1, 13)
scene.fog = new THREE.FogExp2('#04343f', 0.1)

/**
 * Audio
 */
const ambientSound = new Audio('./sounds/ambient.mp3')
ambientSound.loop = true
ambientSound.volume = 0.4

window.addEventListener('pointerdown', () =>
{
    ambientSound.play()
}, { once: true })

/**
 * Settings
 */
const settings = {
    ghostSpeed: 1,
    doorLightIntensity: 5,
    doorFlicker: 0.5
}

// Lights
gui.add(ambientLight, 'intensity').min(0).max(2).step(0.001).name('ambientIntensity')
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001).name('directionalIntensity')
gui.add(settings, 'doorLightIntensity').min(0).max(15).step(0.01)
gui.add(settings, 'doorFlicker').min(0).max(1).step(0.01)
gui.add(ghost1, 'intensity').min(0).max(20).step(0.01).name('ghost1Intensity')
gui.add(ghost2, 'intensity').min(0).max(20).step(0.01).name('ghost2Intensity')
gui.add(ghost3, 'intensity').min(0).max(20).step(0.01).name('ghost3Intensity')
gui.add(windowGlassMaterial, 'emissiveIntensity').min(0).max(2).step(0.01).name('windowGlow')

// Colors
gui.addColor(ambientLight, 'color').name('ambientColor')
gui.addColor(directionalLight, 'color').name('directionalColor')
gui.addColor(doorLight, 'color').name('doorLightColor')
gui.addColor(ghost1, 'color').name('ghost1Color')
gui.addColor(ghost2, 'color').name('ghost2Color')
gui.addColor(ghost3, 'color').name('ghost3Color')
gui.addColor(windowGlassMaterial, 'emissive').name('windowColor')
gui.addColor(scene.fog, 'color').name('fogColor')

// Other
gui.add(settings, 'ghostSpeed').min(0).max(5).step(0.01)
gui.add(scene.fog, 'density').min(0).max(0.3).step(0.001).name('fogDensity')
gui.add(ambientSound, 'volume').min(0).max(1).step(0.01).name('soundVolume')

/**
 * Animate
 */
const timer = new Timer()

let ghostTime = 0

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    const deltaTime = timer.getDelta()
    ghostTime += deltaTime * settings.ghostSpeed

    // Ghosts
    const ghost1Angle = ghostTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = -ghostTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = ghostTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Door light flicker
    const doorFlicker = Math.sin(elapsedTime * 10) * Math.sin(elapsedTime * 23.4) * Math.sin(elapsedTime * 37.8)
    const doorFlickerFactor = 1 - settings.doorFlicker * (0.5 + doorFlicker * 0.5) + (Math.random() - 0.5) * settings.doorFlicker * 0.3
    doorLight.intensity = settings.doorLightIntensity * Math.max(0, doorFlickerFactor)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()