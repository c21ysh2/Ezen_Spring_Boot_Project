// --------------------------------------------------GPS---------------------------------------------------
const weatherDiv = document.getElementById('weather');
const weather1Div = document.getElementById('weather1');
const weather2Div = document.getElementById('weather2');
const weather3Div = document.getElementById('weather3');

// 위치 정보 요청 함수
function getLocation() {
    // Geolocation API 지원 여부 확인
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML =
            "Geolocation is not supported by this browser.";
    }
}

// 위치 정보를 성공적으로 받아온 경우 실행되는 함수
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // 위치 정보를 HTML 요소에 표시
    var locationElement = document.getElementById("weather1");
    locationfunc(latitude, longitude);
    airvisualFunc(latitude,longitude);
    mapXY(latitude, longitude);
}

// 위치 정보를 받아오는 도중 오류가 발생한 경우 실행되는 함수
function showError(error) {
    var locationElement = document.getElementById("location");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationElement.innerHTML =
                "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationElement.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            locationElement.innerHTML =
                "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            locationElement.innerHTML = "An unknown error occurred.";
            break;
    }
    locationfunc(33.2541205, 126.560076);
    airvisualFunc(33.2541205,126.560076);
    mapXY(33.2541205, 126.560076);
}

// 페이지 로드 시 위치 정보 요청
window.onload = getLocation;

// --------------------------------------------------지도---------------------------------------------------

function mapXY(x, y) {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
            level: 8, // 지도의 확대 레벨
        };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(x, y);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    var geocoder = new kakao.maps.services.Geocoder();

    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 초기에 지도 중심 좌표에 대한 주소정보를 표시합니다
    displayInitialInfo(markerPosition);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

                var content = '<div class="bAddr">' +
                    '<span class="title">법정동 주소정보</span>' +
                    detailAddr +
                    '</div>';
                // 마커를 클릭한 위치에 표시합니다
                marker.setPosition(mouseEvent.latLng);
                console.log(mouseEvent.latLng);

                // locationfunc(latitude, longitude);
                console.log(mouseEvent.latLng.La);
                console.log(mouseEvent.latLng.Ma);
                locationfunc(mouseEvent.latLng.Ma, mouseEvent.latLng.La);

                marker.setMap(map);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        });
    });

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 초기에 마커 위치에 대한 주소정보를 표시하는 함수
    function displayInitialInfo(position) {
        searchDetailAddrFromCoords(position, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

                var content = '<div class="bAddr">' +
                    '<span class="title">법정동 주소정보</span>' +
                    detailAddr +
                    '</div>';

                // 마커를 처음 위치에 표시합니다
                marker.setPosition(position);

                // 마커의 좌표를 infowindow에 표시합니다
                var markerLat = position.getLat();
                var markerLng = position.getLng();

                // locationfunc 호출 예제
                locationfunc(markerLng, markerLat);

                // 인포윈도우에 처음 위치에 대한 법정동 상세 주소정보를 표시합니다
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        });
    }

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var infoDiv = document.getElementById('centerAddr');

            for(var i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    // weather3Div.textContent = result[i].address_name;

                    infoDiv.innerHTML = result[i].address_name;

                    break;
                }
            }
        }
    }
}

// --------------------------------------------------위도 경도변환---------------------------------------------------

var RE = 6371.00877; // 지구 반경(km)
var GRID = 5.0; // 격자 간격(km)
var SLAT1 = 30.0; // 투영 위도1(degree)
var SLAT2 = 60.0; // 투영 위도2(degree)
var OLON = 126.0; // 기준점 경도(degree)
var OLAT = 38.0; // 기준점 위도(degree)
var XO = 43; // 기준점 X좌표(GRID)
var YO = 136; // 기1준점 Y좌표(GRID)

// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
function dfs_xy_conv(code, v1, v2) {
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn =
        Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
        Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    var rs = {};
    if (code == "toXY") {
        rs["lat"] = v1;
        rs["lng"] = v2;
        var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
        ra = (re * sf) / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
        rs["x"] = v1;
        rs["y"] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) -ra;
        var alat = Math.pow((re * sf) / ra, 1.0 / sn);
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
            theta = 0.0;
        } else {
            if (Math.abs(yn) <= 0.0) {
                theta = Math.PI * 0.5;
                if (xn < 0.0) -theta;
            } else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs["lat"] = alat * RADDEG;
        rs["lng"] = alon * RADDEG;
    }
    return rs;
}

// --------------------------------------------------미세먼지 ---------------------------------------------------
function airvisualFunc(x, y) {
    console.log("airvisualFunc");
    const apiKey = "c206ebed-5875-47c9-adee-a2235d91c32d"; // 여기에 자신의 OpenWeatherMap API 키를 입력하세요
    const url = `http://api.airvisual.com/v2/nearest_city?lat=${x}&lon=${y}&rad=500&key=${apiKey}`;
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // 데이터에서 필요한 정보를 추출하여 콘솔에 출력
            if (data.status === "success" && data.data) {
                const city = data.data.city;
                const state = data.data.state;
                const country = data.data.country;
                const coordinates = data.data.location.coordinates;
                const currentPollution = data.data.current.pollution;
                const currentWeather = data.data.current.weather;

                console.log(`City: ${city}`);
                console.log(`State: ${state}`);
                console.log(`Country: ${country}`);
                console.log(`Coordinates: [${coordinates[0]}, ${coordinates[1]}]`);
                console.log(`Air Quality Index (US): ${currentPollution.aqius}`);
                console.log(`Main Pollutant (US): ${currentPollution.mainus}`);
                console.log(`Air Quality Index (CN): ${currentPollution.aqicn}`);
                console.log(`Main Pollutant (CN): ${currentPollution.maincn}`);
                console.log(`Temperature: ${currentWeather.tp}°C`);
                console.log(`Pressure: ${currentWeather.pr} hPa`);
                console.log(`Humidity: ${currentWeather.hu}%`);
                console.log(`Wind Speed: ${currentWeather.ws} m/s`);
                console.log(`Wind Direction: ${currentWeather.wd}°`);
                console.log(`Icon: ${currentWeather.ic}`);

                const spanElement = document.createElement('span');
                let color;
                if (currentPollution.aqius <= 50) {
                    spanElement.textContent = '좋음';
                    spanElement.style.color = 'green'; // 좋음 - 초록색
                } else if (currentPollution.aqius <= 100) {
                    spanElement.textContent = '보통';
                    spanElement.style.color = 'orange'; // 보통 - 주황색
                } else {
                    spanElement.textContent = '나쁨';
                    spanElement.style.color = 'red'; // 나쁨 - 빨간색
                }
                // weather2Div에 <span> 요소를 추가합니다.
                weather2Div.appendChild(document.createTextNode('미세먼지 지수 : '));
                weather2Div.appendChild(spanElement);

            } else {
                console.error("Failed to fetch data or data is incomplete");
            }
        })
        .catch((error) =>
            console.error("Error fetching airvisualFunc data:", error)
        );
}

// --------------------------------------------------단기예보 ---------------------------------------------------
function locationfunc(xxx, yyy) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 1을 더한 후 두 자리 수로 맞춤
    const date = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");

    const formattedDate = `${year}${month}${date}`;

    var baseDate = formattedDate;
    if(hour < '06'){
        baseDate =  `${year}${month}${date-1}`;
    }

    console.log("locationfunc");
    var rs = dfs_xy_conv("toXY", xxx, yyy);

    const apiKey = "pT92G96xAGF0VK2U3O0kj%2BmVmHumwJTe08EgnL98rAQTQQxeaqyiD85Sx9nrgex5BOEZp81ZKdK3a1llX6TMfw%3D%3D"; // 여기에 자신의 OpenWeatherMap API 키를 입력하세요
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=0500&nx=${rs.x}&ny=${rs.y}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // 필요한 데이터 추출
            console.log(data);
            const items = data.response.body.items.item;

            // fcstTime의 데이터 필터링
            const filteredItems = items.filter(item => item.fcstDate === formattedDate)
                .filter(item => item.fcstTime.substring(0, 2) === hour);

            console.log("filteredItems:", filteredItems);

            // 필요한 카테고리 데이터 추출
            const popData = filteredItems.find(item => item.category === 'POP');
            const skyData = filteredItems.find(item => item.category === 'SKY');
            const tmpData = filteredItems.find(item => item.category === 'TMP');
            const ptyData = filteredItems.find(item => item.category === 'PTY');

            // 강수 형태에 따라 문자열 결정
            var ptyString = "";
            var ptyImg = "";
            if (ptyData) {
                if (ptyData.fcstValue === "0") {
                    if (skyData.fcstValue === "1") {
                        ptyString = "맑음";
                        ptyImg = "sun.png";
                    }
                    else if (skyData.fcstValue === "3") {
                        ptyString = "구름많음";
                        ptyImg = "manyCloud.png";
                    }
                    else if (skyData.fcstValue === "4") {
                        ptyString = "흐림";
                        ptyImg = "cloud.png";
                    }
                } else if (ptyData.fcstValue === "1") {
                    ptyString = "비";
                    ptyImg = "rain.png";
                }
                else if (ptyData.fcstValue === "2") {
                    ptyString = "비/눈";
                    ptyImg = "rainSnow.png";
                }
                else if (ptyData.fcstValue === "3") {
                    ptyString = "눈";
                    ptyImg = "snow.png";
                }
                else if (ptyData.fcstValue === "5") {
                    ptyString = "빗방울";
                    ptyImg = "littleRain.png";
                }
                else if (ptyData.fcstValue === "6") {
                    ptyString = "빗방울눈날림";
                    ptyImg = "littleRainSnow.png";
                }
                else if (ptyData.fcstValue === "7") {
                    ptyString = "눈날림";
                    ptyImg = "littleSnow.png";
                }
            }
            // 문자발송을 위한 데이터 전송함수 호출
            sendDataToServer(tmpData.fcstValue);

            // 기존 내용을 지웁니다.
            while (weather1Div.firstChild) {
                weather1Div.removeChild(weather1Div.firstChild);
            }

            const weather1 = document.getElementById("weather1");

            const parseDate = `${year}년 ${month}월 ${date}일`;

            var imgElement = document.createElement('img'); // <img> 요소를 생성합니다.
            imgElement.src = "./img/" + ptyImg; // 이미지 URL을 설정합니다.
            imgElement.alt = '날씨이미지'; // alt 속성을 설정합니다.

            weather1Div.appendChild(imgElement);

            // 기존 내용을 지웁니다.
            // weather1Div.textContent = '';

            // 필요한 요소를 생성합니다.
            var ptyStringElement = document.createElement('p');
            ptyStringElement.textContent = ptyString;

            var parseDateElement = document.createElement('p');
            parseDateElement.textContent = parseDate;

            var temperatureElement = document.createElement('p');
            temperatureElement.textContent = `온도: ${tmpData.fcstValue}`;

            var popElement = document.createElement('p');
            popElement.textContent = `강수확률: ${popData.fcstValue}`;

            var hourElement = document.createElement('p');
            hourElement.textContent = `${hour}시 기준`;

// 생성한 요소를 weather1Div에 추가합니다.
            weather1Div.appendChild(ptyStringElement);
            weather1Div.appendChild(parseDateElement);
            weather1Div.appendChild(temperatureElement);
            weather1Div.appendChild(popElement);
            weather1Div.appendChild(hourElement);

        })
        .catch((error) =>
            console.error("Error fetching weather data:", error)
        );
}

// 회원가입 스크립트
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("addressNotes").value = extraAddr;

            } else {
                document.getElementById("addressNotes").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('addressZipcode').value = data.zonecode;
            document.getElementById("addressStreet").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("addressDetail").focus();
        }
    }).open();
}

function checkUserId(){
    let userId = document.getElementById('userId').value;
    if(userId.trim() ===''){
        alert('아이디를 입력하세요.');
        return;
    }

    // userIdInfo 요소 찾기
    let userIdInfoElement = document.getElementById('userIdInfo');
    if (userIdInfoElement) {
        userIdInfoElement.innerHTML = '';  // 요소가 존재하면 innerHTML 설정
    } else {
        console.error('userIdInfo 요소를 찾을 수 없습니다.');
        return;
    }

    // userIdError 요소 찾기
    let userIdErrorElement = document.getElementById('userIdError');
    if (userIdErrorElement) {
        userIdErrorElement.innerHTML = '';  // 요소가 존재하면 innerHTML 설정
    } else {
        console.error('userIdError 요소를 찾을 수 없습니다.');
        return;
    }

    console.log(userId);
    $.ajax({
        type: 'GET',
        url: '/user/checkUserId',
        data: {userId: userId},
        success: function(response) {
            if(response.available){
                document.getElementById('userIdInfo').innerHTML='사용가능한 아이디 입니다.';
            } else {
                document.getElementById('userIdError').innerHTML='이미 사용 중인 아이디입니다.';
            }
        },
        error : function(xhr, status, error){
            console.error('Ajax 요청 실패' + status+ ', '+error);
        }
    });

}
function validateForm(){
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("passwordConfirm").value;


    if(password !== confirmPassword){
        document.getElementById("passwordNotMatch").innerHTML="비밀번호가 일치하지 않습니다.";


    } else {
        document.getElementById("passwordNotMatch").innerHTML="";
        document.getElementById("passwordCheck").innerHTML="비밀번호가 일치합니다.";

    }

}

function checkUserEmail(){
    let email = document.getElementById("email").value;

    if(email.trim() ===''){
        alert('이메일을 입력하세요');
        return;
    }
    let userEmailInfo = document.getElementById('userEmailInfo');
    if (userEmailInfo) {
        userEmailInfo.innerHTML = '';  // 요소가 존재하면 innerHTML 설정
    } else {
        console.error('userEmailInfo 요소를 찾을 수 없습니다.');
        return;
    }
    let userEmailError = document.getElementById('userEmailError');
    if (userEmailError) {
        userEmailError.innerHTML = '';  // 요소가 존재하면 innerHTML 설정
    } else {
        console.error('userIdError 요소를 찾을 수 없습니다.');
        return;
    }

    $.ajax({
        type: 'GET',
        url: '/user/checkUserEmail',
        data: {email: email},
        success: function(response) {
            if(response.available){
                document.getElementById('userEmailInfo').innerHTML='사용가능한 이메일 입니다.';
            } else {
                document.getElementById('userEmailError').innerHTML='이미 사용 중인 이메일입니다.';

            }
        },
        error : function(xhr, status, error){
            console.error('Ajax 요청 실패' + status+ ', '+error);
        }
    });

}

// 문자 발송을 위한 스크립트
let userId
$(document).ready(function() {

    let token = $("meta[name='_csrf']").attr("content");
    let header = $("meta[name='_csrf_header']").attr("content");
    userId = $("meta[name='user-id']").attr("content");
    console.log(userId);
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});
// 서버로 데이터를 전송하는 함수
function sendDataToServer(data){
    // AJAX 를 이용하여 서버로 데이터 전송
    $.ajax({
        type: 'POST',
        url: '/user/send',
        contentType: 'application/json',
        data: JSON.stringify({
            value: data,
            userId: userId
        }),
        success: function(response){
            console.log('Data send successfully', response);
        },
        error: function(error){
            console.error('Error sending data:', error);
        }
    });
}
