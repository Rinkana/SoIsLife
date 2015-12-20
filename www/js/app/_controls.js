define(["jquery","three","camera","scene","raycaster","loader"],function($,THREE,camera,scene,raycaster,loader){
    $(document).click(function(){
        document.body.requestPointerLock();
    });

    var controls = new THREE.PointerLockControls(camera)
    scene.add( controls.getObject() );

    controls.enabled = true;

    var movement = {
        forward: false,
        left: false,
        right: false,
        backward:false,
        timer: performance.now(),
        position:{
            x: 0,
            y: 0,
            z: 0
        }
    };

    $(document).on("keydown",function(e){
        switch(e.keyCode){
            case 87: //w
                movement.forward = true;
                break;
            case 65: //a
                movement.left = true;
                break;
            case 83: //s
                movement.backward = true;
                break;
            case 68: //d
                movement.right = true;
                break;
            case 32: //space
                break;
        };
    }).on("keyup",function(e){
        switch(e.keyCode){
            case 87: //w
                movement.forward = false;
                break;
            case 65: //a
                movement.left = false;
                break;
            case 83: //s
                movement.backward = false;
                break;
            case 68: //d
                movement.right = false;
                break;
            case 32: //space
                break;
        };
    });

    var handlePosition = function(){
        var time = performance.now(),
            delta = (time - movement.timer) / 1000;

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;
        console.log((raycaster.intersectObjects( scene.children ).length > 0));

        var onObject = true;

        movement.position.x -=  movement.position.x * 10.0 * delta;
        movement.position.z -=  movement.position.z * 10.0 * delta;
        movement.position.y -=  9.8 * 10.0 * delta;

        if ( movement.forward ) movement.position.z -= 4000.0 * delta;
        if ( movement.backward ) movement.position.z += 4000.0 * delta;
        if ( movement.left ) movement.position.x -= 4000.0 * delta;
        if ( movement.right ) movement.position.x += 4000.0 * delta;

        if(onObject){
            movement.position.y = Math.max( 0, movement.position.y );
        }

        controls.getObject().translateX( movement.position.x * delta );
        controls.getObject().translateY( movement.position.y * delta );
        controls.getObject().translateZ( movement.position.z * delta );

        movement.timer = time;
    };

    return {
        handlePosition:handlePosition,
        controls:controls
    };
});