<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$address     = $request->address;
$city        = $request->city;
$state       = $request->state;
$postal_code = $request->postal_code;
$radius      = $request->radius;

$servername = "localhost";
$username   = "root";
$password   = "6462093221";
$dbname     = "acp";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = <<<SQL
    insert into tb_search
    (
        address,
        city,
        state,
        postal_code,
        radius
    )
    values
    (
        "$address",
        "$city",
        "$state",
        "$postal_code",
        "$radius"
    )
SQL;

if ($con->query($sql) === TRUE) {
    echo "Collected the search query";
} else {
    echo "Error: " . $sql . ", " . $con->error;
}

$con->close();
?>
