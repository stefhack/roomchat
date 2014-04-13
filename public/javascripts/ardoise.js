document.addEventListener("deviceready", function ()
{

    $(".erase").click(function ()
    {
        clear_canvas();
    });

    $("#close-ardoise").click(function ()
    {
        //window.location = "/home/additions.html";
        window.history.back();
    });

    $("#pinceau-size").change(function ()
    {
        width_brush = $(this).val();
    });

    $("#couleur-ardoise button").click(function ()
    {
        color = $(this).css("background-color");
       
    });

    
});


