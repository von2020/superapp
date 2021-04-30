$(document).ready(function(){
    // *Total No* //
    var url = "/dashboard.ejs";
    $.ajax({
      url:url,
      type:'GET',
      dataType: 'json',
      success:function(data){
          if(data){
              $('#totalStaff').html('<h1>'+ data.total_staff +'</h1>');
              $('#totalDepartment').html('<h1>'+ data.total_department +'</h1>');
              $('#totalSubsidiary').html('<h1>'+ data.total_subsidiary +'</h1>');
              $('#totalSupervisors').html('<h1>'+ data.total_supervisor +'</h1>');  
              $('#totalDrivers').html('<h1>'+ data.total_driver +'</h1>');  
              $('#totalVehicles').html('<h1>'+ data.total_vehicle +'</h1>');  
          }               
      }, 
      error:function(data){
    //    alert('Error Retrieving data');
      }
    });

    // *RequestInSubsidiary Chart* //
    var RequestInSubsidiary = function(iteco,softworks,telnet){
        if($('#RequestInSubsidiaryID').length) {
          new Chart($("#RequestInSubsidiaryID"), {
            type: 'bar',
            data: {
              labels: [ "iTECO", "Softworks", "TELNET"],
              datasets: [
                {
                  label: "Subsidiary",
                  backgroundColor: ["#b1cfec","#7ee5e5","#66d1d1"],
                  data: [iteco,softworks,telnet]
                }
              ]
            },
            options: {
              legend: { display: true },
            }
          });
        }
    }
        var url = "../api/Reports/ApiCalls/GeneralManager/totalVehicleRequestSubsidiary.php";
        $.ajax({
          url:url,
          type:'GET',
          dataType: 'json',
          success:function(data){
              if(data){
                let iteco     = data.telnet_vehicle_request_count;
                let softworks = data.softworks_vehicle_request_count;
                let telnet    = data.iteco_vehicle_request_count;
                RequestInSubsidiary(iteco,softworks,telnet);
              }               
          }, 
          error:function(data){
           // alert('Error Retrieving data');
          }
        });
     
 

});