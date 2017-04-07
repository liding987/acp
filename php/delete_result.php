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
    delete from tb_result
          where result_id = $result_id
SQL;

if ($con->query($sql) === TRUE) {
    echo "Selected result deleted successfully";
} else {
    echo "Error: " . $sql . ", " . $con->error;
}

$con->close();
?>
