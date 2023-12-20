<?php 

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    include_once("./config.php");

    // $data = json_decode(file_get_contents("php://input"), true);

    ## Suppose using student name, I am trying to search the student
    // $search_value = $data['search'];

    /**
     * IF USE _GET METHOD on POSTMAN then follow the below instruction
     * USING TERNARY OPERATOR
     */

     $search_value = isset($_GET['search']) ? $_GET['search']: die();


    $q = mysqli_query($con, "SELECT * FROM students WHERE `student_name` LIKE '%$search_value%'") or die("SQL Query Failed");

    if(mysqli_num_rows($q) > 0){
            $r = mysqli_fetch_all($q, MYSQLI_ASSOC);
            echo json_encode($r);
    }else{
        echo json_encode(array(
            "message"=> "No Search Found", 
            "status"=> false)
        );
    }
?>