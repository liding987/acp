<?php
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);

$user_id         = $request->user_id;
$address         = $request->address;
$city            = $request->city;
$county          = $request->county;
$state           = $request->state;
$postal_code     = $request->postal_code;
$radius          = $request->radius;
$price           = $request->price;
$link            = $request->link;
$num_gas         = $request->num_gas;
$num_bank        = $request->num_bank;
$num_supermarket = $request->num_supermarket;
$num_restaurant  = $request->num_restaurant;
$rating          = $request->rating;
$lat             = $request->lat;
$lng             = $request->lng;
$place_id        = $request->place_id;

$servername = "localhost";
$username   = "root";
$password   = "6462093221";
$dbname     = "acp";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = <<<SQL
    insert into tb_result
    (
        user_id,
        address,
        city,
        country,
        state,
        postal_code,
        radius,
        price,
        link,
        num_gas,
        num_bank,
        num_supermarket,
        num_restaurant,
        rating,
        lat,
        lng,
        place_id
    )
    values
    (
        $user_id,
        "$address",
        "$city",
        "$county",
        "$state",
        "$postal_code",
        $radius,
        "$price",
        "$link",
        $num_gas,
        $num_bank,
        $num_supermarket,
        $num_restaurant,
        $rating,
        $lat,
        $lng,
        "$place_id"
    )
SQL;

if ($con->query($sql) === TRUE) {
    echo "New result saved successfully";
} else {
    echo "Error: " . $sql . ", " . $con->error;
}

$con->close();
?>
