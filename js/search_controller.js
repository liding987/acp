angular.module('myApp', ['ngMaterial']).controller('search_controller', function($scope, $http) {
    $scope.apartment = "7000 Briarcliff Gables Cir NE Atlanta GA 30329";

    $scope.address = "7000 Briarcliff Gables Cir NE";
    $scope.city = "Atlanta";
    $scope.state = "GA";
    $scope.country = "";
    $scope.postal_code = "30329";

    $scope.price;
    $scope.link_name;
    $scope.link;
    $scope.num_gas;
    $scope.num_bank;
    $scope.num_supermarket;
    $scope.num_restaurant;

    $scope.rating;
    $scope.review;

    $scope.lat;
    $scope.lng;
    $scope.place_id;
    $scope.reference;

    // $scope.items = [];
    // for (var i = 0; i < 20; i++) {
    //     console.log(i);
    //     $scope.items.push(i);
    // }

    $scope.search = function() {
        $scope.getAddress();
        $scope.getZillow();
    }

    $scope.getAddress = function() {
        var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
        var address = $scope.address + "+" + $scope.city + "+" + $scope.state + "+" + $scope.postal_code;
        address = address.replace(/\s+/g, '+').toLowerCase();
        var api_key = "&key=AIzaSyCTTv7h0qKA3oi8ruS47R1DNIJIgpmvN3g";

        $http({
            url: url + address + api_key,
            method: "GET",
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            var json = $scope.data;
            // console.log(json);
            for(i = 0; i < json.results.length; i++) {
                // console.log($scope.data);
                // console.log(json.results[i].formatted_address);
                $scope.place = json.results[i].formatted_address;
                $scope.lat   = json.results[i].geometry.location.lat;
                $scope.lng   = json.results[i].geometry.location.lng;
                $scope.place_id = json.results[i].place_id;
                // $scope.reference = json.results[i].reference;
            }
            console.log($scope.lat);
            console.log($scope.lng);
            $scope.getNearby();
            $scope.getRating();
            $scope.getPlaceDetails();
        });
    };

    $scope.getRating = function() {
        var request = {
            placeId: $scope.place_id
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: $scope.lat, lng: $scope.lng},
            zoom: 15
        });
        var service = new google.maps.places.PlacesService(map);

        service.getDetails(request, function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(google.maps.places);
                // console.log(place.reviews);
                var extraordinary = google.maps.places.RatingLevel.EXTRAORDINARY;
                var excellent     = google.maps.places.RatingLevel.EXCELLENT;
                var very_good     = google.maps.places.RatingLevel.VERY_GOOD;
                var good          = google.maps.places.RatingLevel.GOOD;
                $scope.rating = (extraordinary * 4 + excellent * 3 + very_good * 2 + good * 1) / 4.8
                $scope.rating = Math.round($scope.rating * 100) / 100
            }
        });
    }

    $scope.getPlaceDetails = function() {
        var url = "https://maps.googleapis.com/maps/api/place/details/json?";
        var place = "placeid=" + $scope.place_id;
        var api_key = "&key=AIzaSyCTTv7h0qKA3oi8ruS47R1DNIJIgpmvN3g";

        $http({
            url: url + place + api_key,
            method: "GET",
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            console.log("getPlaceDetails()");
            console.log($scope.data);
            // console.log($scope.data.result);
            // console.log($scope.data.result.rating);
            // console.log($scope.data.result.reviews);
            // console.log(status);
            // console.log(headers);
        });
    }

    $scope.getNearby = function() {
        var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        // var location    = "location=-33.8670522,151.1957362"
        var location    = "location=" + $scope.lat +","+ $scope.lng;
        console.log(location);
        var radius      = "&radius=1000";
        var restaurant  = "&type=restaurant";
        var supermarket = "&type=supermarket";
        var bank        = "&type=bank";
        var gas         = "&type=gas+station";
        var api_key     = "&key=AIzaSyCTTv7h0qKA3oi8ruS47R1DNIJIgpmvN3g";

        $http({
            url: url + location + radius + restaurant + api_key,
            method: "GET",
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            $scope.num_restaurant = $scope.data.results.length;
            console.log("restaurant: "  + $scope.data.results.length);
        });

        $http({
            url: url + location + radius + supermarket + api_key,
            method: "GET",
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            $scope.num_supermarket = $scope.data.results.length;
            console.log("supermarket: "  + $scope.data.results.length);
        });

        console.log(url + location + radius + bank + api_key);
        $http({
            url: url + location + radius + bank + api_key,
            method: "GET",
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            $scope.num_bank = $scope.data.results.length;
            console.log("bank: "  + $scope.data.results.length);
        });

        $http({
            url: url + location + radius + gas + api_key,
            method: "GET",
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            $scope.num_gas = $scope.data.results.length;
            console.log("gas station: " + $scope.data.results.length);
        });
        // console.log($scope.data);
    }

    $scope.getZillow = function() {
        var url = "http://www.zillow.com/webservice/GetSearchResults.htm?";
        var ZWSID = "zws-id=X1-ZWz1fnfcg506bv_4ok8b";
        // $scope.place = $scope.address.replace(/\s+/g, '+').toLowerCase();
        // var address = "&address=3078+Clairmont+Road+Ne";
        var address       = "&address=" + $scope.address.replace(/\s+/g, '+').toLowerCase();
        var citystatezip  = "&citystatezip=Atlanta%2C+GA";
        var rentzestimate = "&rentzestimate=true";
        $http({
            url: url + ZWSID + address + citystatezip + rentzestimate,
            method: "GET"
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            var parser  = new DOMParser();
            var xmlDoc  = parser.parseFromString($scope.data, "text/xml");

            var results;
            try {
                results = xmlDoc.getElementsByTagName("response")[0].childNodes[0];
            }
            catch(err) {
                $scope.link_name = "not available";
                $scope.price = "not available";
            }

            var links         = results.getElementsByTagName("result")[0].childNodes[1];
            var rentzestimate = results.getElementsByTagName("result")[0].childNodes[4];

            try {
                var link    = links.getElementsByTagName("homedetails")[0].childNodes[0].nodeValue;
                $scope.link_name = "Zillow"
                $scope.link = link;
            }
            catch(err) {
                // $scope.link = "not available";
                $scope.link_name =  "not available";
            }

            try {
                var amount = rentzestimate.getElementsByTagName("amount")[0].childNodes[0].nodeValue;
                $scope.price = "$" + amount + "+ /mo";
            }
            catch(err) {
                $scope.price = "not available";
            }


            // console.log("amount: " + amount);
            // if (amount != "undefined") {
            //     $scope.price = "$" + amount + "+ /mo";
            // } else {
            //     $scope.price = "not available";
            // }

            // if (link != "undefined") {
            //     $scope.link = link;
            // } else {
            //     $scope.link = "not available";
            // }
        });
    }

    $scope.clearFunc = function() {
        $scope.address = "";
        $scope.city = "";
        $scope.state = "";
        $scope.country = "";
        $scope.postal_code = "";

        $scope.rating = "";
        $scope.price = "";
        $scope.num_gas = "";
        $scope.num_bank = "";
        $scope.num_supermarket = "";
        $scope.num_restaurant = "";
        $scope.link_name = "";
        $scope.link = "";
    };
});
