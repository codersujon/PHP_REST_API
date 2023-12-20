<?php 
     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     ## DELETE
     header("Access-Control-Allow-Methods: DELETE");
     header("Access-Control-Allow-headers: Access-Control-Allow-headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
     
     ## DB
     include_once("./config.php");

    $data = json_decode(file_get_contents("php://input"), true);

    $student_id =  $data['sid'];

    $sql = "DELETE FROM `students` WHERE `id` = '$student_id'";

    if(mysqli_query($con, $sql)){
        echo json_encode(array(
            "message"=> "Student Record Deleted Successfully.!", 
            "status"=> true
        ));
    }else{
        echo json_encode(array(
            "message"=> "Student Record Not Deleted", 
            "status"=> false
        ));
    }

    /**
     * TODO: Else not working, if give false id, also show success message. need validation
     */


?>