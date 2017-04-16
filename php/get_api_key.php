<?php
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);

$api_name = $request->api_name;


$servername = "localhost";
$username   = "root";
$password   = "6462093221";
$dbname     = "acp";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = <<<SQL
    select key_hash
      from tb_api_key
     where api = "$api_name"
SQL;

$result = $con->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo $row["key_hash"];
    }
} else {
    echo -1;
}

$con->close();
?>
