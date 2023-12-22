<?php 

    ## Return JSON Encoded String
    header("Content-Type: application/json"); 
    ## For Allow Access to All devices
    header("Access-Control-Allow-Origin: *"); 
    ## For Insert Data Into REST API
    header("Access-Control-Allow-Methods: POST"); 
    ## For Security and Hacking Purpose
    header("Access-Control-Allow-headers: Access-Control-Allow-headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

    ## Database Connection
    include_once("./config.php");
   
    /**
     * For Reading JSON Data
     * Decode into Associative Array
     */
    $data = json_decode(file_get_contents("php://input"), true);

    $student_name =  $data['sname'];
    $student_age =  $data['sage'];
    $student_city =  $data['scity'];

    $sql = "INSERT INTO `students`(`id`, `student_name`, `age`, `city`) VALUES (NULL,'$student_name', $student_age,'$student_city')";
    
    if(mysqli_query($con, $sql)){
        echo json_encode(array(
            "message"=> "Student Record Inserted Successfully!", 
            "status"=> true
        ));
    }else{
        echo json_encode(array(
            "message"=> "Record Not Inserted", 
            "status"=> false
        ));
    }

?>