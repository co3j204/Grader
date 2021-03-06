$(function() {
	var saved = {};
	var id;
	var avg = 0;
	$('.nav-tabs').tab();
	//Limit number incorrect to number of questions
	$('#questions').keyup(function() {
		var questions = $('#questions').val();
		$('#incorrect').html('');
		$('#incorrect').attr('max', questions);
	});
	//Toggle the bonus field
	var toggle = false;
	$('#toggle-field label').click(function() {
		toggle = !toggle;
		if(toggle) {
			$('#bonus-field').show('fade');
		} else {
			$('#bonus-field').hide('fade');
		}
	});
	//Select incorrect box when submitted
	$('#submit').click(function() {
		$('#incorrect').select();
	});
	//Key bindings
	$(window).keyup(function(e) {
		if(!$('#incorrect').is(':focus') && !$('#questions').is(':focus') && !$('#bonus').is(':focus')) {
			switch(e.which) {
			case 73:
				$('#incorrect').select();
				break;
			case 81:
				$('#questions').select();
				break;
			case 66:
				$('#bonus').select();
				break;
			case 13:
				$('#questions').blur(function(){
					$('#submit').click();
				}).blur();
				break;
			}
		}
	});
	//When submitted
	$('#submit').click(function() {
		questions = $('#questions').val();
		var incorrect = $('#incorrect').val();
		var bonus = $('#bonus').val();
		var correct = questions - incorrect;
		var percent = per(incorrect, questions, bonus);
		var percentr = Math.round(percent);
		var lettergrade = lg(percent);
		var lettergrader = lg(percentr);
		if(questions.length > 0) {
			$('.tab-content').animate({opacity: 1});
			$('.correct').text(correct);
			$('.questions').text(questions);
			$('#percent').html(percentr).attr("title", percent + "%");
			$('#letter-grade').text(lettergrader).attr("title", lettergrade);
			if(bonus > 0) {
				$('.bonus').html(", and a <strong>bonus of " + bonus + "</strong>");
			}
			if(id > 0) {
				id++;
			} else {
				id = 1;
			}
			saved[id] = [percentr, lettergrader, percent, lettergrade];
			$('#app').append(data(saved[id]));
			avg += percentr;
			$('#avgp').text(avg / id);
			$('#avgl').text(lg(avg / id));
			chart(questions);
		}
	});
	function lg(p) {
		if(p >= 90) {
			return "A";
		} else if(p < 90 && p >= 80) {
			return "B";
		} else if(p < 80 && p >=70) {
			return "C";
		} else if(p < 70 && p >=60) {
			return "D";
		} else if(p < 60) {
			return "F";
		} else {
			return "Error";
		}
	}
	function data(s) {
		return "<tr><td>" + id + "</td><td title=\"" + s[2] + "\">" + s[0] + "</td><td title=\"" + s[3] + "\">" + s[1] + "</td></tr>";
	}
	function chart(q) {
		$('#app2').html('');
		var i = 0;
		while(i<=q) {
			$('#app2').append("<tr><td>" + i +  "</td><td title=\"" + per(i, q, 0) + "\">" + Math.round(per(i, q, 0)) + "</td><td title=\"" + lg(per(i, q, 0)) + "\">" + lg(Math.round(per(i, q, 0))) + "</td></tr>");
			i++;
		}
	}
	function per(inc, ques, bon) {
		var cor = ques - inc;
		cor = cor / ques;
		cor = cor * 100;
		return cor + + bon;
		
	}
	$('.print').click(function() {
		window.print();
	});
});