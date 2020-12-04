if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('js/sw.js')
            .then(reg => {
                console.log('registrado', reg);
            }).catch(err => {
                console.log('erro ao registrar', err);
            });
    });
}

function getPermition() {
    console.log('permition');
    Notification.requestPermission(status => {
        console.log('Status da permissão', status);
    })
}

function showNotification() {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration()
            .then(reg => {
                reg.showNotification('OI :)');
            })
    } else {
        alert('Primeiro clique em ATIVAR NOTIFICAÇÕES e conceda a permissão');
    }
}

var theStream;

function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {
        video: true
    };

    getUserMedia(
        constraints,
        function (stream) {
            var mediaControl = document.querySelector('video');
            if ('srcObject' in mediaControl) {
                mediaControl.srcObject = stream;
            } else if (navigator.mozGetUserMedia) {
                mediaControl.mozSrcObject = stream;
            } else {
                mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            theStream = stream;
        },
        function (err) {
            alert('Error: ' + err);
        }
    );
}

function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

function takePhoto() {
    if (!('ImageCapture' in window)) {
        alert('imagem não disponível');
        return;
    }

    if (!theStream) {
        alert('primeiro permita o acesso à camera');
        return;
    }

    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

    theImageCapturer.takePhoto()
        .then(blob => {
            var theImageTag = document.getElementById("imageTag");
            theImageTag.src = URL.createObjectURL(blob);
        })
        .catch(err => alert('Error: ' + err));
}