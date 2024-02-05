"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {};

const Model = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const objects: THREE.Mesh[] = []; // stores all the objects

    const totalCubes = 4;
    const cubePostions = [
      { x: 5, y: 0 },
      { x: -5, y: 0 },
      { x: -3, y: -2 },
      { x: 3, y: -2 },
    ];
    for (let i = 0; i < totalCubes; i++) {
      // creating cubes
      const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = cubePostions[i].x;
      cube.position.y = cubePostions[i].y;
      scene.add(cube);
      objects.push(cube);
    }

    // creating sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0.75, 0);
    scene.add(sphere);
    objects.push(sphere);

    const animate = () => {
      requestAnimationFrame(animate);

      for (const obj of objects) {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen z-[-1]"
      ></div>
    </>
  );
};

export default Model;
