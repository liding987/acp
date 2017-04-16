<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$result_id = $request->result_id;

$servername = "localhost";
$username   = "root";
$password   = "6462093221";
$dbname     = "acp";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = <<<SQL
    select address,
           city,
           state,
           postal_code,
           radius
      from tb_result
     where result_id = $result_id
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
