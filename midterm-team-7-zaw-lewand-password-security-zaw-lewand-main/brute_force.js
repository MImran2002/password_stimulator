const fs = require ('fs');
const path = require ('path');

function passwordDuration (pw){
    const pwLength = pw.length
    const pwYear = (64 ** pwLength)*(80*10 ** -3)*(1/60*1/60*1/24*1/365)
    return pwYear;
}
let exist = false
function passwordCompare(compare, pw){
    for (let i = 0; i < compare.length; i++){
        if (compare[i] == pw){
            exist = true
            return exist
        }
    }
}

function dictionaryAttak(pw){
    const filePath = path.join(process.cwd(), "pw.json");
    fs.readFile(filePath, "utf8", (err, data)=>{
        if (err) {
            console.error("Error reading the file", err);
            return;
        }
        const leakedpassword = JSON.parse(data);
        passwordCompare(leakedpassword, pw)
    })
}

let keylog = false
const keyloggerAttack = function(){
    $("#keylogger_attack").removeClass("keylogger_hidden");
    $("#keylogger_attack").addClass("keylogger_active");
    $("#keylogger_btn").click(function(){
    $("#keylogger_attack").addClass("keylogger_hidden");
    $("#keylogger_attack").removeClass("keylogger_active");
    keylog = true
    })
}
let personalInfo = {}
const password = $("#user_password")
const username = $("#user_username")
setTimeout(keyloggerAttack, 4000);
//setTimeout(personalCollection, 15000);

$("input").blur(function(){
    if ($(this).attr("type") === "password" && keylog == true) {
        const keylogValue = $(this).val();
        console.log("Password field blurred. Current value:", keylogValue);
    }
})
$('#personalSubmit').on('click', function(event) {
    event.preventDefault();
    const firstName = $('#first_name').val();
    const dob = $('#dob').val();
    const pob = $('#pob').val();
    const status = $('#status').is(':checked');
    personalInfo = {
        firstName: firstName,
        dob: dob,
        pob: pob,
        status: status
    };
    console.log(personalInfo);
});

$('#generateReport').click( function(){
    const passwordValue = password.val()
    const usernameValue = username.val()
    console.log(passwordDuration(passwordValue))
    const reportContent = `
        Report Generated:
        First Name: ${personalInfo.firstName}
        Date of Birth: ${personalInfo.dob}
        Place of Birth: ${personalInfo.pob}
        Marriage Status: ${personalInfo.status}
        Years to Break: ${passwordDuration(passwordValue)} years
    `;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const dw = document.createElement('a');
    dw.href = url;
    dw.download = 'report.txt'; 
    document.body.appendChild(dw);
    dw.click(); 
    document.body.removeChild(dw); 
    URL.revokeObjectURL(url); 
});



