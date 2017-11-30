
        //RENDERER
        var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
      //  renderer.setSize(window.innerWidth, window.innerHeight);

        //CAMERA
        var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 5000);
        // var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);

        //SCENE
        var scene = new THREE.Scene();
 
        //LIGHTS
        var light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

        var light1 = new THREE.PointLight(0xffffff, 0.5);
        scene.add(light1);

        //OBJECT
        var geometry = new THREE.CubeGeometry(200, 50, 200);
        var material = new THREE.MeshLambertMaterial({color: 0xdddddd});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -550);

        scene.add(mesh);


        //RENDER LOOP
        requestAnimationFrame(render);

        function render() {
            mesh.rotation.x = 45;
            mesh.rotation.y = 0;
            mesh.rotation.z = 0;
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
