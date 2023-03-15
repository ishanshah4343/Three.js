import {
    Euler,
    EventDispatcher,
    Raycaster,
    Vector2,
    Vector3
} from "three";

var IndoorControls = function ( camera, domElement ) {

    if ( domElement === undefined ) console.error( 'Please use "renderer.domElement".' );

    this.camera = camera;
    this.domElement = domElement;

    // 相机第一人称旋转的速度
    this.speedRotating = 0.001;
    // 是否启用第一人称旋转动画
    this.rotateAnimate = true;
    // 相机第一人称旋转的阻尼惯性
    this.rotateDamping = 0.1;
    // 相机第一人称旋转的衰减精度
    this.rotatePrecision = 0.1;

    // 相机水平移动的速度（m/s）
    this.speedMoving = 4;
    // 是否启动水平移动动画
    this.moveAnimate = true;
    // 相机水平移动的总时间（s）
    this.moveTime = 1.6;

    // 相机按键移动的速度（m/s）
    this.speedKeyMoving = 2;

    // 捕捉水平移动目标点的三维物体
    this.ground = null;

    var scope = this;

    var euler = new Euler( 0, 0, 0, 'YXZ' );

    var PI_2 = Math.PI / 2;

    var vec = new Vector3();

    // 动画每一帧更新前的时间
    var prevTime = performance.now();

    // 相机是否允许被第一人称旋转
    var canRotate = false;
    // 相机是否正在进行第一人称旋转
    var isRotating = false;
    // 鼠标的实时移动距离
    var movement = new Vector2();
    // 鼠标上一帧的实时移动距离
    var prevMovement = new Vector2();
    // 鼠标的实时位置
    var mouse = new Vector2();
    // 鼠标与相机间的实时射线
    var raycaster = new Raycaster();
    // 鼠标与地面的实时交点信息
    var intersects = [];

    // 相机是否允许被水平移动
    var canMove = false;
    // 相机是否正在进行水平移动
    var isMoving = false;
    // 相机水平移动的目标点
    var target = new Vector3();
    // 相机水平移动的方向向量
    var targetDir = new Vector3();
    // 相机水平移动时到目标点距离的平方
    var targetDis = 0;
    // 匀变速运动时相机运动的总时间
    var targetTime = 0;
    // 匀变速运动时相机的加速度
    var targetAcc = 0;
    // 匀变速运动时相机的实时速度
    var targetSpeed = 0;

    // 相机的按键移动状态
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var moveUp = false;
    var moveDown = false;
    // 相机按键移动的移动方向向量
    var moveDir = new Vector3();

    function onContextMenu( event ) {

        event.preventDefault();

    }

    function onMouseDown( event ) {

        event.preventDefault();

        scope.domElement.focus();

        canRotate = true;
        canMove = true;

    }

    function onMouseMove( event ) {

        // 获取鼠标每一帧的移动量
        if ( canRotate === true ) {

            canMove = false;

            movement.x += event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            movement.y += event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            isRotating = true;

        }

        // 获取鼠标相对于地面的实时交点
        if ( scope.ground ) {

            // 将鼠标位置归一化为设备坐标
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            // 通过相机和鼠标位置更新射线
            raycaster.setFromCamera( mouse, scope.camera );

            // 计算物体和射线的交点信息
            intersects = raycaster.intersectObject( scope.ground, true );

        }

    }

    function onMouseUp( event ) {

        event.preventDefault();

        canRotate = false;

        // 获取水平移动的目标位置和方向
        if ( canMove === true && isMoving === false ) {

            if ( intersects.length === 0 ) return;

            target.copy( intersects[0].point );
            target.y = scope.camera.position.y;

            if ( target.equals( scope.camera.position ) ) return;

            targetDir.subVectors( target, scope.camera.position ).normalize();
            targetDis = target.distanceToSquared( scope.camera.position );

            if ( scope.moveAnimate === true ) {

                // 计算加速度
                targetAcc = 4 * Math.sqrt( targetDis ) / Math.pow( scope.moveTime, 2 );

            }

            isMoving = true;

        }

    }

    function onKeyDown( event ) {

        switch ( event.keyCode ) {

            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 38: // up
                moveUp = true;
                break;

            case 40: // down
                moveDown = true;
                break;

        }

    }

    function onKeyUp( event ) {

        switch ( event.keyCode ) {

            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

            case 38: // up
                moveUp = false;
                break;

            case 40: // down
                moveDown = false;
                break;

        }

    }

    //
    // public methods
    //

    this.connect = function () {

        scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

        scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
        scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
        scope.domElement.addEventListener( 'mouseup', onMouseUp, false );

        scope.domElement.addEventListener( 'keydown', onKeyDown, false );
        scope.domElement.addEventListener( 'keyup', onKeyUp, false );

        // 确保dom元素接收按键
        if ( scope.domElement.tabIndex === - 1 ) scope.domElement.tabIndex = 0;

    };

    this.disconnect = function () {

        scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );

        scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
        scope.domElement.removeEventListener( 'mousemove', onMouseMove, false );
        scope.domElement.removeEventListener( 'mouseup', onMouseUp, false );

        scope.domElement.removeEventListener( 'keydown', onKeyDown, false );
        scope.domElement.removeEventListener( 'keyup', onKeyUp, false );

    };

    this.dispose = function () {

        this.disconnect();

    };

    this.moveForward = function ( distance ) {

        // move forward parallel to the xz-plane
        // assumes camera.up is y-up

        vec.setFromMatrixColumn( scope.camera.matrix, 0 );

        vec.crossVectors( scope.camera.up, vec );

        scope.camera.position.addScaledVector( vec, distance );

    };

    this.moveRight = function ( distance ) {

        vec.setFromMatrixColumn( scope.camera.matrix, 0 );

        scope.camera.position.addScaledVector( vec, distance );

    };

    this.moveUp = function ( distance ) {

        vec.set( 0, 1, 0 );

        scope.camera.position.addScaledVector( vec, distance );

    };

    this.update = function () {

        var time = performance.now();
        var interval = ( time - prevTime ) / 1000;

        // 如果鼠标位置更新，则进行第一人称旋转
        if ( isRotating === true ) {

            if ( movement.equals( new Vector2() ) ) movement.copy( prevMovement );

            euler.setFromQuaternion( scope.camera.quaternion );

            euler.y += movement.x * scope.speedRotating;
            euler.x += movement.y * scope.speedRotating;

            // 限定绕x轴的旋转角度在-180°至180°之间
            euler.x = Math.max( - PI_2, Math.min( PI_2, euler.x ) );

            scope.camera.quaternion.setFromEuler( euler );

            if ( scope.rotateAnimate === true ) {

                // 使鼠标移动量趋近于(0, 0)
                movement.x = movement.x * ( 1 - scope.rotateDamping );
                movement.y = movement.y * ( 1 - scope.rotateDamping );

            } else {

                movement.copy( new Vector2() );

            }

            if ( Math.abs( movement.x ) <= scope.rotatePrecision && Math.abs( movement.y ) <= scope.rotatePrecision ) isRotating = false;

            prevMovement.copy( movement );
            movement.copy( new Vector2() );

        }

        // 如果相机不位于目标点，则进行水平移动
        if ( isMoving === true && target.equals( scope.camera.position ) === false ) {

            var cameraLater = scope.camera.position.clone();

            // 计算相机水平移动后的位置
            if ( scope.moveAnimate === true ) {

                targetTime += interval;

                if ( targetTime < scope.moveTime / 2 ) {

                    targetSpeed += targetAcc * interval;
                    cameraLater.addScaledVector( targetDir, targetSpeed * interval + 0.5 * targetAcc * interval * interval );

                } else {

                    targetSpeed -= targetAcc * interval;
                    cameraLater.addScaledVector( targetDir, targetSpeed * interval - 0.5 * targetAcc * interval * interval );

                }

                // console.log( targetSpeed + ',' + target.distanceTo( scope.camera.position ) );

            } else {

                cameraLater.addScaledVector( targetDir, scope.speedMoving * interval );

            }

            // 判断相机是否距离目标点足够近
            var targetDisLater = target.distanceToSquared( cameraLater );

            if ( targetDisLater >= targetDis ) {

                target.copy( scope.camera.position );
                targetDis = 0;
                targetTime = 0;
                targetSpeed = 0;

                isMoving = false;

            } else {

                scope.camera.position.copy( cameraLater );
                targetDis = targetDisLater;

            }

        }

        // 如果相机没有进行水平移动，则启用按键移动
        if ( isMoving === false ) {

            // 计算按键移动方向
            moveDir.z = Number( moveForward ) - Number( moveBackward );
            moveDir.x = Number( moveRight ) - Number( moveLeft );
            moveDir.y = Number( moveUp ) - Number( moveDown );
            moveDir.normalize();

            // 进行相机的按键移动
            scope.moveForward( moveDir.z * scope.speedKeyMoving * interval );
            scope.moveRight( moveDir.x * scope.speedKeyMoving * interval );
            scope.moveUp( moveDir.y * scope.speedKeyMoving * interval );

        }

        prevTime = time;

    };

    this.connect();

};

IndoorControls.prototype = Object.create( EventDispatcher.prototype );
IndoorControls.prototype.constructor = IndoorControls;

export { IndoorControls };
