<?php
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);

$user_id = $request->user_id;

$servername = "localhost";
$username   = "root";
$password   = "6462093221";
$dbname     = "acp";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = <<<SQL
    select result_id,
           created,
           address,
           city,
           state,
           country,
           postal_code,
           radius,
           price,
           link,
           'Zillow' as link_name,
           num_gas,
           num_bank,
           num_supermarket,
           num_restaurant,
           rating,
           lat,
           lng,
           place_id
      from tb_result
     where user_id = $user_id
SQL;

$result   = $con->query($sql);
$response = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    $jsonData = json_encode($response);
    echo $jsonData;
} else {
    echo -1;
}

$con->close();
?>
