$(document).ready(function(){
    /**
     * Fetch All Records
     */

    loadTable();
    function loadTable(){
        $.ajax({
            url: "http://localhost/api/api-fetch-all.php",
            type: "GET",
            success: function(data){
                if(data.status == false){
                    $("#load-table").append("<tr><td colspan='6'><h2>"+ data.message +"</h2></td></tr>");
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

})