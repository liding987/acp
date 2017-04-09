<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$user_id = $request->user_id;

$output;
$status;
$perl_script = "perl /var/www/html/perl/generate_results_report.pl -u $user_id";

exec($perl_script, $output, $status);
echo $output[0];
?>
