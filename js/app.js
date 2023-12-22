$(document).ready(function(){
    /**
     * Fetch All Records
     */

    loadTable();
    function loadTable(){
        $("#load-table").html("");
        $.ajax({
            url: "http://localhost/api/api-fetch-all.php",
            type: "GET",
            success: function(data){
                if(data.status == false){
                    $("#load-table").append(`
                        <tr>
                            <td colspan='6' align="center">
                                <p>${data.message}</p>
                            </td>
                        </tr>
                    `);
                }else{
                   $.each(data, function(key, value){
                        $("#load-table").append(`
                            <tr>
                                <td>${key+1}</td>
                                <td>${value.student_name}</td>
                                <td>${value.age}</td>
                                <td>${value.city}</td>
                                <td><button class="edit-btn" data-eid="${value.id}">Edit</button></td>
                                <td><button class="delete-btn" data-id="${value.id}">Delete</button></td>
                            </tr>
                        `);
                   }); 
                }
            }

        });
    }

    /**
     * Fetch Single Records and Show in Modal Box
     */

    $(document).on("click", ".edit-btn", function(){
        $("#modal").show();
        let studentID = $(this).data("eid");
        let obj = {
            "sid": studentID
        }

        let myJSON = JSON.stringify(obj);

        $.ajax({
            url: "http://localhost/api/api-fetch-single.php",
            type: "POST",
            data: myJSON,
            success: function(data){
                $("#edit-id").val(data[0].id);
                $("#edit-name").val(data[0].student_name);
                $("#edit-age").val(data[0].age);
                $("#edit-city").val(data[0].city);
            }
        });

    });

    /**
     * Hide Modal Box
     */

    $(document).on("click", "#close-btn", function(){
        $("#modal").hide();
    });


    /**
     * Success or Error Message Show
     */

    function Message(msg, status){

        if(status == true){
            $("#success-message").html(msg).slideDown();
            $("#error-message").slideUp();

            //Success message hide after 4s
            setTimeout(function(){
                $("#success-message").slideUp();
            }, 4000);

        }else if(status == false){
            $("#error-message").html(msg).slideDown();
            $("#success-message").slideUp();

            //Error message hide after 4s
            setTimeout(function(){
                $("#error-message").slideUp();
            }, 4000);
        }

    }

    /**
     * Function for form data to JSON Object
     */

    function jsonData(targetForm){

        //get data as serialize Array
        var arr = $(targetForm).serializeArray(); 
        let obj = {}; // Object Initialize

        // Convert into JS Object
        for(var a = 0; a<arr.length; a++){

            if(arr[a].value == ""){
                return false;
            }

            obj[arr[a].name] = arr[a].value;
        }
        // Convert into JSON Object
        let json_String = JSON.stringify(obj);

        return json_String;
    }

    /**
     * Insert New Record
     */

    $("#save-button").on("click", function(e){
       e.preventDefault();

        var jsonObj = jsonData("#addForm");

        if(jsonObj == false){
            Message("All Fields are required.", false);
        }else{

            $.ajax({
                url: 'http://localhost/api/api-insert.php',
                type: "POST",
                data: jsonObj,

                success: function(data){
                    Message(data.message, data.status);
                    if(data.status == true){
                        loadTable();
                        $("#addForm").trigger("reset");
                    }
                }
            });

        }
    });

    /**
     * Update Record
     */

    $("#edit-submit").on("click", function(e){
        e.preventDefault();
 
         var jsonObj = jsonData("#edit-form");
 
         if(jsonObj == false){
             Message("All Fields are required.", false);
         }else{
 
             $.ajax({
                 url: 'http://localhost/api/api-update.php',
                 type: "POST",
                 data: jsonObj,
 
                 success: function(data){
                     Message(data.message, data.status);
                     if(data.status == true){
                        $("#modal").hide();
                         loadTable();
                         $("#edit-form").trigger("reset");
                     }
                 }
             });
 
         }
     });

     /**
      * Record Delete
      */

     $(document).on("click", ".delete-btn", function(){
        if(confirm("Do you really want to delete this record?")){
            let studentID = $(this).data("id");
            let obj = {sid: studentID};
            let myJSON = JSON.stringify(obj);

            let row = this;

            $.ajax({
                url: 'http://localhost/api/api-delete.php',
                type: "POST",
                data: myJSON,
                success: function(data){
                    Message(data.message, data.status);
                    if(data.status == true){
                        // loadTable();
                        $(row).closest("tr").fadeOut(100);
                    }
                }
            });
        };
     });



})