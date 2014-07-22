$(document).ready(function() {

  var trainData = null;

  
  var hashify = function(item){
    var hash = "";
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        hash += item[key];
      }
    }

    return hash;
  };

  var mapProperties = function(item, f){
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        item[key] = f(item[key]);
      }
    }

    return item;
  };

  var filterTrainLines = function(data){
    return data.filter(function(item){
      //inArray returns -1 if the item is not present
      return ($.inArray(item.trainLine, ["Metra", "Amtrak", "El"]) > -1);
    });
  };

  var fixMissingData = function(trainDataItem){
    return mapProperties(trainDataItem, function(property) {
      return property === "" ? "unknown" : property;
    });
  }

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

  var uniqueData = function(data) {

    var uniqueData = [];
    var uniqueItems = {};

    $.each(data, function(index, item) {
      uniqueItems[hashify(item)] = item;
    });

    for (var key in uniqueItems) {
      if (uniqueItems.hasOwnProperty(key)) {
        uniqueData.push(uniqueItems[key]);
      }
    }

    return uniqueData;
  };

  $.ajax({
    url:"exercise.json",    
    success: function (response) {
      trainData = uniqueData(filterTrainLines(response.data));
      $.each(trainData, function(index, item) {
        $(".body").append(trainRowTemplate(fixMissingData(item)));
      });
      $("#data").dataTable();
      console.log("success");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("error");
    }
  });
});
