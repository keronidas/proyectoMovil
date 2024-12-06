import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AmbientLight, DirectionalLight, MeshStandardMaterial } from 'three';

@Component({
  selector: 'config-canvas',
  templateUrl: './config-canvas.component.html',
  styleUrls: ['./config-canvas.component.scss'],
})
export class ConfigCanvasComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.canvasContainer) {
      const container = this.canvasContainer.nativeElement;

      // Crear el renderizador
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(this.renderer.domElement);

      // Crear la escena
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('white');  // Fondo blanco

      // Luz ambiental (para iluminar el modelo desde todos los ángulos)
      const ambientLight = new AmbientLight(0x404040, 1); // Luz suave
      this.scene.add(ambientLight);

      // Luz direccional (luz principal que simula la luz del sol)
      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5).normalize();
      this.scene.add(directionalLight);

      // Cámara
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 1, 5);
      this.scene.add(camera);

      // Controles de órbita
      const controls = new OrbitControls(camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.05;
      controls.zoomSpeed = 0.1;
      controls.minPolarAngle = Math.PI / 2.15;  // Limita la rotación hacia arriba
      controls.maxPolarAngle = Math.PI / 2.15;  // Limita la rotación hacia abajo

      controls.minAzimuthAngle = -Math.PI /5;  // Limita la rotación hacia la izquierda
      controls.maxAzimuthAngle = Math.PI / 5;   // Limita la rotación hacia la derecha


      // Cargar el modelo 3D
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/assets/models/phoneRed.glb', // Ruta del modelo
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(2, 2, 2); // Escala el modelo
          model.rotation.x = Math.PI / 2.15; // Ajusta la rotación

          // Ajustar materiales (si es necesario)
          model.traverse((child) => {

          });

          // Añadir el modelo a la escena
          this.scene.add(model);
        },
        (xhr) => {
          console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
          console.error('Error al cargar el modelo:', error);
        }
      );

      // Animar la escena
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        this.renderer.render(this.scene, camera);
      };
      animate();
    }
  }
}
