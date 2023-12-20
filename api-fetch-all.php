<?php 

   header("Content-Type: application/json");
   header("Access-Control-Allow-Origin: *");
   require_once("./config.php");

   $q = mysqli_query($con, "SELECT * FROM students") or die("SQL Query Failed");
   if(mysqli_num_rows($q) > 0){
        $r = mysqli_fetch_all($q, MYSQLI_ASSOC);
        echo json_encode($r);
   }else{
        echo json_encode(array("message"=> "No Record Found", "status"=> false));
   }

?>