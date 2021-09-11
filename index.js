let map;

navigator.geolocation.getCurrentPosition(success, fail)
//     function (pos) {
// console.log(pos)
// initMap(pos);
//     },
//     function () {
// console.log("位置情報が取れませんでした")
//     });

function success(position) {
    initMap(position)

}
function fail() {

}

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
    // let from = '東京駅';
    // if(start){
    //     from = start;
    // }
    // let to = '名古屋駅';
    // if(end){
    //     to = end;
    // }

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 13,
        mapId: 'c54b891cdfcdc998',
        // mapTypeId: 'roadmap',
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
        // // 宿題
        // responseの中のsteps配列を繰り返し、中のinstructionsを全件html内liに表示する
        // 
        if (status === google.maps.DirectionsStatus.OK) {
            // ルート検索の結果を地図上に描画
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(response);
        }
    });
}


// // 関数の定義
// function 関数名(プロパティ/仮引数(名前だけを付けておく)){
//     この中に処理
//     プロパティは処理内のみで使用可能
//     return 変数名　戻す時の値(戻り値)
// }
// 使う時
// 関数名(実引数(実際に動いている引数))
// データが返る時は左側に入る(A = B()のA側)