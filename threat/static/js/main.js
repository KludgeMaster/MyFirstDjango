$(document).ready(function() {
  var currentData;

  // hide alert when page is loaded
  $("#refresh").hide();

  // send ajax request upon page load
  $.ajax({
    url: 'http://127.0.0.1:8000/threat/threats',
    dataType: 'json',
    success: function(data){
      currentData = data;
      // fill in the table with retrieved data
      for (var i=0; i<data.length; i++) {
        var dataTr = "<tr id='data" + i + "'>"
        $("#list").append(dataTr);

        var row = $("#data"+i);
        row.append("<td class='date'>" + data[i].date + "</td>");
        row.append("<td class='filename'>" + data[i].filename + "</td>");
        row.append("<td class='action'>" + data[i].action + "</td>");
        row.append("<td class='submittype'>" + data[i].submittype+ "</td>");
        row.append("<td class='rating'>" + data[i].rating + "</td>");
        var rating = data[i].rating;
        
        // assign class depending on the rating
        switch (rating){
          case 'clear':
            row.addClass("success");
            break;
          case 'low-risk':
            row.addClass("info");
            break;
          case 'medium-risk':
            row.addClass("mediumrisk");
            break;
          case 'high-risk':
            row.addClass("warning");
            break;
          case 'malicious':
            row.addClass("danger");
            break;
          default:
            row.addClass("unknown");
        }
      }

      // this is a third party plugin to sort the table
      ///////////////////////////////////////////////////////////////////
      // add parser through the tablesorter addParser method 
      $.tablesorter.addParser({ 
          // set a unique id 
          id: 'ratings', 
          is: function(s) { 
              // return false so this parser is not auto detected 
              return false; 
          }, 
          format: function(s) { 
              // format your data for normalization 
              return s.toLowerCase().replace(/malicious/,4).replace(/high-risk/,3).replace(/medium-risk/,2).replace(/low-risk/,1).replace(/clear/,0); 
          }, 
          // set type, either numeric or text 
          type: 'numeric' 
      }); 
       
      $(function() { 
          $("#myTable").tablesorter({ 
              headers: { 
                  4: { 
                      sorter:'ratings' 
                  } 
              } 
          }); 
      });
      ////////////////////////////////////////////////////////////////////

      // turn on the watcher for the update
      checkUpdate();
    },
    error: function(err) {
      alert("Failed to retrieve data");
    }
  });
  
  // check for updates on the server
  function checkUpdate(){
    $.ajax({
      url: 'http://127.0.0.1:8000/threat/threats',
      dataType: 'json',
      success: function(data){
        // check for update and show or hide alert 
        if( JSON.stringify(data) === JSON.stringify(currentData)) {
          $("#refresh").hide();
        }
        else {
          $("#refresh").show(); 
        } 
      }
    });
    // check for updates every 5 seconds
    setTimeout(checkUpdate, 5000);
  };

  // display only the data within the time-frame
  $("#mySelect").on("change",function(){
    var period = $(this).val();
    var dates = $(".date");
    for ( var i=0; i< dates.length; i++){
      var date = $(dates[i]).text();
      $(dates[i]).parent().removeClass("hidden");
      date = moment(date, "MMM D, YYYY hh:mm:ss");
      switch (period){
        case '24hours':
          var timeToCompare = moment().subtract(24, 'hours');
          break;
        case '7days':
          var timeToCompare = moment().subtract(7, 'days');
          break;
        case '4weeks':
          var timeToCompare = moment().subtract(4, 'weeks');
          break; 
        default:
          $(dates[i]).parent().removeClass("hidden");
      }
      if (timeToCompare && date.isBefore(timeToCompare)){
        $(dates[i]).parent().addClass("hidden");
      }
    }
  });
});