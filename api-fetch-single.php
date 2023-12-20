<?php 

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    include_once("./config.php");

    ## For Reading JSON Data and Decode into Associative Array
    $data = json_decode(file_get_contents("php://input"), true);


    $student_id = $data['sid'];

    $q = mysqli_query($con, "SELECT * FROM students WHERE id = '$student_id'") or die("SQL Query Failed");
    if(mysqli_num_rows($q) > 0){
            $r = mysqli_fetch_all($q, MYSQLI_ASSOC);
            echo json_encode($r);
    }else{
            echo json_encode(array("message"=> "No Record Found", "status"=> false));
    }

?>