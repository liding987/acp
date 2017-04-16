acp.factory('MyService', function() {
    return {
        user: {
            user_id: -1,
            login: false,
            selected_result_id: -1
        },
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
