$(document).ready(function () {

});


function fire_ajax_submit() {
	var nameofevent = $("#nameofevent").val();
	var date = $("#date").val();
	var url = $("#url").val();
	var amount = $("#amount").val();
	var markupStr = $('#summernote').summernote('code');
	console.log(nameofevent);
	
	var Postevent = {};
	Postevent ["name"] = nameofevent;
	Postevent ["description"] = markupStr;
	Postevent ["date"] = date;
	Postevent ["amount"] = amount;
	Postevent ["file"] = url;
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : "/postevent",
		data : JSON.stringify(Postevent),
		dataType : 'json',
		timeout : 100000,
		success : function(data) {
			alert("Event updated");
		},
		error : function(e) {
		},
		done : function(e) {
		}
	});
}