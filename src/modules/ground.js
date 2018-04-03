define(['constants', 'rotate-to-horizontal'], (C, rotateToHorizontal) => {
  // Note: these constants never change, regardless of the ground instance.
  const width = C.ZONE_SIZE;
  const height = C.ZONE_SIZE;

  // The texture is only loaded once for this class, regardless of the number of instances.
  const texture = new THREE.TextureLoader().load('textures/ground.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(width / 256, height / 256);

  // Flat plane mesh that forms the ground in each zone.
  class Ground {
    constructor(input) {
      const name = input.name;
      const x = input.x || C.GROUND.X;
      const y = input.y || C.GROUND.Y;
      const z = input.z || C.GROUND.Z;

      const mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(width, height),
        new THREE.MeshLambertMaterial({map: texture, side: THREE.FrontSide})
      );
      rotateToHorizontal(mesh);

      mesh.name = name;
      mesh.position.set(x, y, z);

      // Properties used to persist this mesh and recreate it later.
      mesh.persist = {
        n: name,
        c: 'Ground',
        i: {name, x, y, z},
      };
  
      return mesh;
    }
  };

  return Ground;
});
