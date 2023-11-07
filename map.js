const nonce = btoa(Math.random().toString(36).substring(2, 15));

const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
if (cspMeta) {
    cspMeta.content = cspMeta.content.replace('nonce-YourNonceHere', `nonce-${nonce}`);
}

const scriptTag = document.querySelector('script[src*="maps.googleapis.com"]');
if (scriptTag) {
    scriptTag.setAttribute('nonce', nonce);
}



function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var map = new google.maps.Map(document.getElementById('map'), {
                center: userLocation,
                zoom: 18,
                mapTypeId: 'satellite',
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            });

            // Create a custom marker icon
            var customMarkerIcon = {
                url: 'map-marker.png',
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40)
            };

            // Create a custom marker
            var customMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                icon: customMarkerIcon
            });
        });
    } else {
        console.log("Geolocation is not supported by your browser.");
    }
}


