<?php 

    header("Content-Type: application/json"); 
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-headers: Access-Control-Allow-headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

    include_once("./config.php");

    $data = json_decode(file_get_contents("php://input"), true);
    ## Which id to be update
    $sid =  $data['sid'];
    $student_name =  $data['sname'];
    $student_age =  $data['sage'];
    $student_city =  $data['scity'];

    $sql = "UPDATE `students` SET `student_name`='$student_name',`age`='$student_age',`city`='$student_city' WHERE `id`='$sid'";

    if(mysqli_query($con, $sql)){
        echo json_encode(array(
            "message"=> "Record Updated Successfully!", 
            "status"=> true
        ));
    }else{
        echo json_encode(array(
            "message"=> "Record Not Updated", 
            "status"=> false
        ));
    }

?>