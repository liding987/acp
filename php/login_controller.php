<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$user = $request->username;
$password = $request->password;

echo $user;
echo "\n";
echo $password;

$servername = "localhost";
$username = "cedrictstallwort";
$password = "";

$con=mysqli_connect($servername, $username, $password);

if (mysqli_connect_errno($con))
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
} else {
  	echo "Successfully Connected MySQL";
}

mysqli_close($con)
?>
