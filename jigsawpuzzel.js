$(document).ready(function () {
    var rows = 4, columns = 4;
    var pieces = "";
    for (var i = 0, top = 0, order = 0; i < rows; i++, top -= 100) {
        for (var j = 0, left = 0; j < columns; j++, left -= 100, order++) {
            pieces += "<div style='background-position:" + left + "px " + top + "px;' class='piece'data - order=" + order + " ></div > ";
        }
    }

    $("#puzzleContainer").html(pieces);
    $("#btnStart").click(function () {
        var pieces = $("#puzzleContainer div");
        pieces.each(function () {
            var leftPosition = Math.floor(Math.random() * 290) + "px";
            var topPosition =
                Math.floor(Math.random() * 290) + "px";
            $(this).addClass("draggablePiece").css({
                position: "absolute",
                left: leftPosition,
                top: topPosition
            })
            $("#pieceContainer").append($(this));

        });
        var emptyString = ""
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                emptyString += "<div style='background-image:none;'class='piece droppableSpace '></div>";
            }
        }
        $("#puzzleContainer").html(emptyString);
        $(this).hide();
        $("#btnReset").show()
        implementLogic()
    });


    $("#btnReset").click(function () {

    });
    function createPieces(withImage) {
        var rows = 4, columns = 4;
        var pieces = "";
        if (withImage) {
            for (var i = 0, top = 0, order = 0; i < rows; i++, top -= 100) {
                for (var j = 0, left = 0; j < columns; j++, left -= 100, order++) {
                    pieces += "<div style='background-position:" + left + "px" + top + "px;'class='piece' data-order=" + order + "></div>";
                }
            }

        }

        return pieces;
    }
    function checkIfPuzzleSolved() {
        if ($("#puzzleContainer .droppedPiece").length != 16) {
            return false;
        }
        for (var k = 0; k < 16; k++) {
            var items = $("#puzzleContainer.droppedPiece:eq(" + k + ")");
            var order = item.data("order");
            if (k != order) {
                $("#pieceContainer").text("Ouch! Try Again");
                return false;
            }
        }
        $("#pieceContainer").text("woow!! Great Job");
        return true;

    }

    function implementLogic() {
        $(".draggablePiece").draggable({
            revert: "invalid",
            start: function () {
                if ($(this).hasClass("droppedPiece")) {
                    $(this).removeClass("droppedPiece");
                    $(this).parents().removeClass("piecePresent")
                }
            }
        });
        $(".droppableSpace").droppable({
            hoverClass: "ui-state-highlight",
            accept: function () {
                return !$(this).hasClass("piecePresent")
            },

            drop: function (event, ui) {
                var draggableElement = ui.draggable;
                var droppedOn = $(this);
                droppedOn.addClass("piecePresent");
                $(draggableElement).addClass("droppedPiece")
                    .css({
                        top: 0,
                        left: 0,
                        position: "relative"
                    }).appendTo(droppedOn);
                checkIfPuzzleSolved();


            }
        });
    }

});