<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$user = $request->username;
$pass = $request->password;

$servername = "localhost";
$username   = "root";
$password   = "6462093221";
$dbname     = "acp";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = <<<SQL
    insert into tb_user
    (
        username,
        password
    )
    values
    (
        "$user",
        "$pass"
    )
SQL;

if ($con->query($sql) === TRUE) {
    echo "New account created successfully";
} else {
    echo "Error: " . $sql . ", " . $con->error;
}

$con->close();
?>
