let map;

$('#submit').on('click', function (event) {
    event.preventDefault();
    let from = $('#from').val()
    let to = $('#to').val()
    console.log(from, to);
    initMap(null, from, to)
})

function initMap(pos, start = '東京駅', end = '名古屋駅') {
    let latitude = 35.1043972;
    let longitude = 136.8721815;
    if (pos) {
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
    };

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 13,
        mapId: 'c54b891cdfcdc998',
    });

    let directionsService = new google.maps.DirectionsService;
    let directionsRenderer = new google.maps.DirectionsRenderer;



    // ルート検索を実行
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        console.log(response.routes[0].legs[0].steps);
        let steps = response.routes[0].legs[0].steps;
        $(".navi ol").empty();
        for (let step of steps) {
            $("<li></li>").html(step.instructions).appendTo('.navi ol')
        }
        if (status === google.maps.DirectionsStatus.OK) {
            // ルート検索の結果を地図上に描画
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(response);
        }
    });
}

function defaultmap() {
    navigator.geolocation.getCurrentPosition(function (pos) {
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: latitude, lng: longitude },
            zoom: 13,
            mapId: 'c54b891cdfcdc998',
        });

    }, function () {

    });
}
