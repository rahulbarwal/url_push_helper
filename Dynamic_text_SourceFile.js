var txt_boxes_added = 0;
var div_txtBox = null;
var ADD_TXT_HTML = "<div class='col-md-12 padme '>\
                                                <div class='col-md-7'>\
                                                    <input type='text' class='form-control' placeholder='Source File'>\
                                                </div>\
                                                <div class='col-md-3'>\
                                                    <input type='text' class='form-control' placeholder='Comment'>\
                                                </div>\
                                                {0}\
                                            </div>";
var DELETE_HTML = "<div class='col-md-2'>\
                                    <button class='btn ' onclick='delete_this_textBox(event, this);'><span class='glyphicon glyphicon-trash'></span></button>\
                                </div>"
function delete_this_textBox(event, btn){
    $(btn).parent().parent().slideUp();
    event.preventDefault();
}
function Add_Click(event) {
    if (div_txtBox != null){
        txt_boxes_added++;
        //if (bShowDelete)
            //ADD_TXT_HTML.format(DELETE_HTML);
        //else
        //    ADD_TXT_HTML.format("");
        $(div_txtBox).append(ADD_TXT_HTML.format(DELETE_HTML));
    }
}

function validateSourceFiles() {
    //to remove text boxes with no source files
    $(div_txtBox).find("div.padme").each(function () {
        var textboxes = $(this).find("input[type='text']");
        if ($(textboxes[0]).val() == "") {
            $(textboxes[0]).parent().parent().remove();
        }
    });
}

function GetSrcFilesAndComments() {
    var srcFiles = "";
    var srcComments = "";
    var srcCommonComment = $("#sCommitLog").val();
    if (div_txtBox != null) {
        validateSourceFiles();
        $(div_txtBox).find("div.padme").each(function () {
            if ($(this).css("display") != "none") {
                var textboxes = $(this).find("input[type='text']");
                srcFiles += $(textboxes[0]).val() + "\n";
                var comment = $(textboxes[1]).val();
                if (comment == "") {
                    srcComments += srcCommonComment + "\n";
                } else {
                    srcComments += comment + "\n";
                }
            }
        });
        $("#hdn_SourceFiles").val(srcFiles);
        $("#hdn_CommentPerSourceFile").val(srcComments);
    }
}

function main() {
    div_txtBox = $("#section_source_files");
}

$(document).ready(main);
