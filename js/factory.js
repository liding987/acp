// var acp = angular.module('acp');
acp.factory('MyService', function() {
    return {
        result: {
            isSet: false,
            address: '',
            city: '',
            state: '',
            country: '',
            postal_code: '',
            radius: '',
            price: '',
            link_name: '',
            link: '',
            anum_gas: '',
            num_bank: '',
            num_supermarket: '',
            num_restaurant: '',
            rating: '',
            lat: '',
            lng: '',
            place_id: ''
        }
    };
});
