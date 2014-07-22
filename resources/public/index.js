$(document).ready(function() {


  //load json data
  $.ajax({
    url:"exercise.json",    
    success: function (response) {

      trainData = response.data;
      console.log("success");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("error");
      debugger;
    }
  });

  //insert data into table

  $("#data").dataTable();
});
