$(document).ready(function() {
    $(".sidebar .nav .menu-toggle").click(function(e) {
        e.preventDefault(),
            $li = $(this).parents("li"),
            $li.hasClass("active") ? ($li.removeClass("active")) : ($li.addClass("active")),
            $li.find(".sub-nav").slideToggle(350)
    });
});