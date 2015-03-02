<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $("p").click(function(){
        $.get( "http://localhost:8081/share/proxy/alfresco/zalu/report/1", function() {
		  alert( "success" );
		})
		  .done(function() {
		    alert( "second success" );
		  })
		  .fail(function() {
		    alert( "error" );
		  })
		  .always(function() {
		    alert( "finished" );
		  });
		 
		// Perform other work here ...
		 
		// Set another completion function for the request above
		jqxhr.always(function() {
		  alert( "second finished" );
		});
    });
});
</script>
</head>
<body>
heell
<p>Click me away!</p>
</body>
</html>