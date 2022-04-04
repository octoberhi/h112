prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IuVEjqSHA/model.json',modelLoaded);


function modelLoaded()
{
console.log("model_is_loaded")
}

function check_snapshot()
{
img = document.getElementById("capture_image");
classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
if(error)
{
console.error(error)
}
else {
console.log(results);
document.getElementById("emotion1").innerHTML = results[0].label;
document.getElementById("emotion2").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;

speak();
if(prediction_1 == "amazing")
{
document.getElementById("emoji1").innerHTML = "&#128076;" + "this is amazing";
}
if(prediction_1 == "best")
{
document.getElementById("emoji1").innerHTML = "&#128077;" + "this is the best";
}
if(prediction_1 == "victory")
{
document.getElementById("emoji1").innerHTML = "&#9996;" + "victory at all costs";
}
if(prediction_2 == "amazing")
{
document.getElementById("emoji2").innerHTML = "&#128076;" + "this is amazing";
}
if(prediction_2 == "best")
{
document.getElementById("emoji2").innerHTML = "&#128077;" + "this is the best";
}
if(prediction_2 == "victory")
{
document.getElementById("emoji2").innerHTML = "&#9996;" + "victory at all costs";
}
}
}

function speak()
{
var synth = window.speechSynthesis;
speak_data_1 = " the first prediction is " + prediction_1;
speak_data_2 = " the second prediction is " + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterThis);
}