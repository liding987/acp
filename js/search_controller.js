acp.controller('search_controller', ['$scope', '$http', 'MyService', function($scope, $http, MyService) {
    $scope.address = "7000 Briarcliff Gables Cir NE";
    $scope.city = "Atlanta";
    $scope.state = "GA";
    $scope.country = "";
    $scope.postal_code = "30329";
    $scope.radius = 1000;

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

    $scope.google_place_key;
    $scope.zillow_key;

    $scope.search = function() {
        $scope.getAddress();
        $scope.getZillow();

        setTimeout(function () {
            $scope.getPlaceDetails();
        }, 3000);
    }

    $scope.getAPIkey = function() {
        // get google place key
        var data = {
            'api_name' : "google_place_api"
        }

        $http({
            url: 'php/get_api_key.php',
            method: "POST",
            data: data
        })
        .success(function(data, status, headers, config) {
            console.log(status + ' - get API key');
            $scope.data = data;
        })
        .error(function(data, status, headers, config) {
            console.log('error');
        }).then(function(data, status, headers, config) {
            $scope.google_place_key = $scope.data;
        });

        // get zillow key
        var data = {
            'api_name' : "zillow_api"
        }

        $http({
            url: 'php/get_api_key.php',
            method: "POST",
            data: data
        })
        .success(function(data, status, headers, config) {
            console.log(status + ' - get API key');
            $scope.data = data;
        })
        .error(function(data, status, headers, config) {
            console.log('error');
        }).then(function(data, status, headers, config) {
            $scope.zillow_key = $scope.data;
        });
    }

    $scope.getAPIkey();

    $scope.getAddress = function() {
        var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
        var address = $scope.address + "+" + $scope.city + "+" + $scope.state + "+" + $scope.postal_code;
        address = address.replace(/\s+/g, '+').toLowerCase();
        var api_key = '&key=' + $scope.google_place_key;

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
            for(i = 0; i < json.results.length; i++) {
                $scope.place    = json.results[i].formatted_address;
                $scope.lat      = json.results[i].geometry.location.lat;
                $scope.lng      = json.results[i].geometry.location.lng;
                $scope.place_id = json.results[i].place_id;
            }
            $scope.getNearby();
            $scope.getLocation();
        });
    };

    $scope.getLocation = function() {
        var request = {
            placeId: $scope.place_id
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: $scope.lat, lng: $scope.lng},
            zoom: 15
        });

        var marker = new google.maps.Marker({
            position: {lat: $scope.lat, lng: $scope.lng},
            map: map
        });

        var service = new google.maps.places.PlacesService(map);

        service.getDetails(request, function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
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
        var api_key = '&key=' + $scope.google_place_key;

        $http({
            url: url + place + api_key,
            method: "GET",
            dataType: 'json'
        }).success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        }).then(function(data, status, headers, config) {
            var street_number = $scope.data.result.address_components[0].short_name;
            var street_name   = $scope.data.result.address_components[1].short_name;
            var city          = $scope.data.result.address_components[2].short_name;
            var county        = $scope.data.result.address_components[3].short_name;
            var state         = $scope.data.result.address_components[4].short_name;
            var country       = $scope.data.result.address_components[5].short_name;
            var postal_code   = $scope.data.result.address_components[6].short_name;

            MyService.result.isSet       = true;
            MyService.result.address     = street_number + " " + street_name;
            MyService.result.city        = city;
            MyService.result.county      = county;
            MyService.result.state       = state;
            MyService.result.postal_code = postal_code;
            MyService.result.radius      = $scope.radius;
            MyService.result.price       = $scope.price;
            MyService.result.link        = $scope.link;
            MyService.result.num_gas     = $scope.num_gas;
            MyService.result.num_bank    = $scope.num_bank;
            MyService.result.num_supermarket = $scope.num_supermarket;
            MyService.result.num_restaurant  = $scope.num_restaurant;
            MyService.result.rating      = $scope.rating;
            MyService.result.lat         = $scope.lat;
            MyService.result.lng         = $scope.lng;
            MyService.result.place_id    = $scope.place_id;
        });
    }

    $scope.getNearby = function() {
        var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        var location    = "location=" + $scope.lat +","+ $scope.lng;
        var radius      = "&radius=" + $scope.radius;
        var restaurant  = "&type=restaurant";
        var supermarket = "&type=supermarket";
        var bank        = "&type=bank";
        var gas         = "&type=gas+station";
        var api_key     = '&key=' + $scope.google_place_key;

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
        });

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
        });
    }

    $scope.getZillow = function() {
        var url           = "http://www.zillow.com/webservice/GetSearchResults.htm?";
        var ZWSID         = "zws-id=" + $scope.zillow_key;
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
                $scope.price     = "not available";
            }

            var links         = results.getElementsByTagName("result")[0].childNodes[1];
            var rentzestimate = results.getElementsByTagName("result")[0].childNodes[4];

            try {
                var link    = links.getElementsByTagName("homedetails")[0].childNodes[0].nodeValue;
                $scope.link_name = "Zillow"
                $scope.link = link;
            }
            catch(err) {
                $scope.link_name =  "not available";
            }

            try {
                var amount = rentzestimate.getElementsByTagName("amount")[0].childNodes[0].nodeValue;
                $scope.price = "$" + amount + "+ /mo";
            }
            catch(err) {
                $scope.price = "not available";
            }
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
}]);
