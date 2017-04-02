<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$user = $request->username;
$pass = $request->password;

$servername = "localhost";
$username   = "root";
$password   = "6462093221";
$dbname     = "acp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = <<<SQL
    select user_id
      from tb_user
     where username = "$user"
       and password = "$pass"
SQL;

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["user_id"];
    }
} else {
    echo -1;
}

$conn->close();
?>
