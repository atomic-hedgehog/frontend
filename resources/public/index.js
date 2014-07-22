$(document).ready(function() {

  var trainData = null;

  var trainCellTemplate = function(trainDataItemProperty) {
    return "<td>" + trainDataItemProperty + "</td>";
  };

  var trainRowTemplate = function(trainDataItem) {
    var row = "<tr>";

    //since there's only 4 of these we can call manually.
    row = row + trainCellTemplate(trainDataItem.trainLine);
    row = row + trainCellTemplate(trainDataItem.routeName);
    row = row + trainCellTemplate(trainDataItem.runNumber);
    row = row + trainCellTemplate(trainDataItem.operatorId);

    return row + "</tr>";
  };

  //load json data
  $.ajax({
    url:"exercise.json",    
    success: function (response) {

      trainData = response.data;

      $.each(trainData, function(index, item) {
        $(".body").append(trainRowTemplate(item));
      });
      $("#data").dataTable();
      console.log("success");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("error");
    }
  });
});
