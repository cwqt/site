var canCheck = true;
$("#token").on('keyup', function (e) {
    if (e.keyCode == 13 && canCheck == true) {
      canCheck = false;
      console.log("Authenticating...")
      let token =  $('#token').val();
      console.log(token)
      Authenticate(token)
    }
});

function runAuthResult(status, message) {
  $("#token").fadeOut("fast").promise().done(function() {
    if (status == "success") {
      $('#message').append('<p><b>Success</b></p>');
      setTimeout(function(){
        $('#message').empty()
        $('#message').hide().append('<label class="selectUpload"><input multiple type="file" onchange="onFileSelected(event)"/></label>').fadeIn("fast");
      }, 800); 
    }

    if (status == "error") {
      $('#message').append('<p><b>'+message+'</b></p>');   
    }
  });
}

function Authenticate(token) {
  $.ajax({ 
      // curl --header "Private-Token: <your_access_token>" https://gitlab.example.com/api/v4/projects
      url: 'https://gitlab.com/api/v4/user',
      type: 'GET',
      beforeSend: function(xhr) { 
          xhr.setRequestHeader("PRIVATE-TOKEN", token); 
      },
      data: "{}",
      //VrRjmbDvJxWqvKth4Uwg

      success: function(response) {
        console.log(response);
        runAuthResult("success");
        globalToken = token;
      },

      error: function(request, status, error) {
        console.log(request + ", " + status + ", " + error);
        runAuthResult("error", error);
      },
  })
}

function onFileSelected(event) {
  $(".selectUpload").fadeOut("fast");
  // $("h6").fadeOut("fast");
  // $("br").fadeOut("fast");

  setTimeout(function(){

    Files = [];

    for (i = 0; i < event.target.files.length; i++) {
      selectedFile = event.target.files[i];
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      let file = {};
      file.name = selectedFile.name,
      reader.onload = function(event) {
        file.data = event.target.result;
        Files.push(file);
      } 
    }

    var COUNTER = 0; // gross
    setTimeout(function (){//i don't know how to async lol
      for (i = 0; i < Files.length; i++) {
        let File = Files[i];
        File.extension = "." + File.data.split(';')[0].split('/')[1];
        File.originalName = File.name;
        //generate a unique filename
        let n = window.performance.now();
        File.name = btoa(File.name.replace(/\.[^/.]+$/, "")+n).split("").reverse().join("").substring(0,10);
        $('#message').append('<div id="file-'+i+'" class="file"><p>'+File.originalName+'</p><p>Uploading...</p></div>');    

        setTimeout(function(){
          console.log(File.name);
          //https://gitlab.com/cxss/site id = 11127131
          var API_NEW_POST = 'https://gitlab.com/api/v4/projects/11127131/repository/files/';
          var file_uri = encodeURIComponent(File.name + ".b64")
          $.ajax({
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            url: API_NEW_POST + file_uri,
            type: "POST",
            data: JSON.stringify({
              branch: 'ftp',
              author_email: "m@cass.si",
              author_name: "Cass W",
              content: File.data,
              commit_message: "FTP::Upload "+ File.name,
            }),
        
            beforeSend: function(xhr) {
              xhr.setRequestHeader("PRIVATE-TOKEN", globalToken);
            },
        
            success: function(data) {
              $("#file-"+COUNTER+" p").last().remove();
              $("#file-"+COUNTER).append('<a target="_new" href="https://ftp.cass.si/'+File.name+File.extension+'">https://ftp.cass.si/'+File.name+File.extension+'</a>');
              COUNTER++;
            },
        
            error: function(request, status, error) {
              responseText = jQuery.parseJSON( request.responseText );
              console.log(COUNTER);
              $("#file-"+COUNTER+" p").last().text(error);
              COUNTER++;
            },
          });
        }, 1000*i);
      }
    }, 100);
  }, 600);
}