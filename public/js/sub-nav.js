$(document).ready(function() {
    $(".sidebar .nav .menu-toggle").click(function(e) {
        e.preventDefault(),
            $li = $(this).parents("li"),
            $li.hasClass("active") ? ($li.find(".fa-ellipsis-v").removeClass("fa-ellipsis-v").addClass("fa-ellipsis-h"),
            $li.removeClass("active")) : ($li.find(".fa-ellipsis-h").removeClass("fa-ellipsis-h").addClass("fa-ellipsis-v"),
            $li.addClass("active")),
            $li.find(".sub-nav").slideToggle(1000)
    });
});