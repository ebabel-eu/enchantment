define(['update-debug-panel', 'zone'], (updateDebugPanel, Zone) => {
  // Animation that keeps getting called to render everything and all changes.
  const animate = (renderer, scene, camera, keyboardControls, statsPanel, currentZone, loadedZones) => {
    statsPanel.begin();
    updateDebugPanel(camera);

    // Test animations, these should be made generic, like a list of everything that needs animating and each item documenting how it should be animated.
    const plainCube = scene.getObjectByName('plain-cube');
    if (plainCube) {
      plainCube.rotation.x += 0.02;
      plainCube.rotation.y += 0.02;
    }
    const wireframeCube = scene.getObjectByName('wireframe-cube');
    if (wireframeCube) {
      wireframeCube.rotation.x += 0.01;
      wireframeCube.rotation.y += 0.01;
    }

    // Keyboard controls make it possible to move around the game (subjective perspective).
    keyboardControls.playerMovement.update();
    keyboardControls.playerMovement.persist();

    // Set the currentZone.
    if (!currentZone) {
      currentZone = new Zone(camera.position.x, camera.position.z, loadedZones);
      loadedZones.push(currentZone.name); // This name is pushed because there was no current zone at all, so this is a brand new zone just created.
      scene.add(currentZone.meshes);
    }

    // Update which zone is the current zone if the player has moved into a zone.
    // Note: that zone should already have been pre loaded into the game, so it should not create its meshes again.
    if (currentZone.isOutsideZone(camera.position.x, camera.position.z)) {
     currentZone = new Zone(camera.position.x, camera.position.z, loadedZones);
     console.log(`[INFO] current zone: ${currentZone.name}.`);
    }

    // Check if the current position of the camera is on one or several edges for the current zone.
    const edges = currentZone.isOnEdge(camera.position.x, camera.position.z);
    const contiguousZones = currentZone.contiguousZones();

    if (edges.isOnNorthEdge) {
      // Check if the zone on the north edge is already created.
      const northEdgeZoneMeshes = scene.getObjectByName(contiguousZones.north.name);
      if (!northEdgeZoneMeshes) {
        const northEdgeZone = new Zone(contiguousZones.north.x, contiguousZones.north.z, loadedZones);
        loadedZones.push(northEdgeZone.name);
        scene.add(northEdgeZone.meshes);
      }
    }

    if (edges.isOnSouthEdge) {
      const southEdgeZoneMeshes = scene.getObjectByName(contiguousZones.south.name);
      if (!southEdgeZoneMeshes) {
        const southEdgeZone = new Zone(contiguousZones.south.x, contiguousZones.south.z, loadedZones);
        loadedZones.push(southEdgeZone.name);
        scene.add(southEdgeZone.meshes);
      }
    }

    if (edges.isOnEastEdge) {
      const eastEdgeZoneMeshes = scene.getObjectByName(contiguousZones.east.name);
      if (!eastEdgeZoneMeshes) {
        const eastEdgeZone = new Zone(contiguousZones.east.x, contiguousZones.east.z, loadedZones);
        loadedZones.push(eastEdgeZone.name);
        scene.add(eastEdgeZone.meshes);
      }
    }

    if (edges.isOnWestEdge) {
      const westEdgeZoneMeshes = scene.getObjectByName(contiguousZones.west.name);
      if (!westEdgeZoneMeshes) {
        const westEdgeZone = new Zone(contiguousZones.west.x, contiguousZones.west.z, loadedZones);
        loadedZones.push(westEdgeZone.name);
        scene.add(westEdgeZone.meshes);
      }
    }

    if (edges.isOnNorthEdge && edges.isOnEastEdge) {
      const northEastEdgeZoneMeshes = scene.getObjectByName(contiguousZones.northEast.name);
      if (!northEastEdgeZoneMeshes) {
        const northEastEdgeZone = new Zone(contiguousZones.northEast.x, contiguousZones.northEast.z, loadedZones);
        loadedZones.push(northEastEdgeZone.name);
        scene.add(northEastEdgeZone.meshes);
      }
    }

    if (edges.isOnSouthEdge && edges.isOnEastEdge) {
      const southEastEdgeZoneMeshes = scene.getObjectByName(contiguousZones.southEast.name);
      if (!southEastEdgeZoneMeshes) {
        const southEastEdgeZone = new Zone(contiguousZones.southEast.x, contiguousZones.southEast.z, loadedZones);
        loadedZones.push(southEastEdgeZone.name);
        scene.add(southEastEdgeZone.meshes);
      }
    }

    if (edges.isOnSouthEdge && edges.isOnWestEdge) {
      const southWestEdgeZoneMeshes = scene.getObjectByName(contiguousZones.southWest.name);
      if (!southWestEdgeZoneMeshes) {
        const southWestEdgeZone = new Zone(contiguousZones.southWest.x, contiguousZones.southWest.z, loadedZones);
        loadedZones.push(southWestEdgeZone.name);
        scene.add(southWestEdgeZone.meshes);
      }
    }

    if (edges.isOnNorthEdge && edges.isOnWestEdge) {
      const northWestEdgeZoneMeshes = scene.getObjectByName(contiguousZones.northWest.name);
      if (!northWestEdgeZoneMeshes) {
        const northWestEdgeZone = new Zone(contiguousZones.northWest.x, contiguousZones.northWest.z, loadedZones);
        loadedZones.push(northWestEdgeZone.name);
        scene.add(northWestEdgeZone.meshes);
      }
    }

    // Render everyting.
    renderer.render(scene, camera);

    // Only code between .begin and .end is measured by statsPanel.
    // This block is therefore last and followed only by requestAnimationFrame.
    statsPanel.end();

    // Last line of animation.
    requestAnimationFrame((timestamp) => animate(renderer, scene, camera, keyboardControls, statsPanel, currentZone, loadedZones));
  }

  return animate;
});
