img = "";
objects=[];
status="";
var obj="";

function start(){
    document.getElementById("status").innerHTML="Getting on it right away...";
    archita= ml5.objectDetector('cocossd',modelLoaded );
    obj= document.getElementById("inputObject").value;
    console.log(obj);
}
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
   video= createCapture(VIDEO);
   video.size(380,380);
   video.hide();

}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    archita.detect(video, gotResult);
}

function draw()
{
    image(video, 0, 0, 380,380);
 if(status != ""){
    r= random (255);
    g=random (255);
    b=random (255);
  for(i=0; i<objects.length; i++){
  percent=floor(objects[i].confidence*100);
  fill (r,g,b);
  document.getElementById("status").innerHTML="Status: Detecting Objects";
  text(objects[i].label+" "+percent+ " %", objects[i].x, objects[i].y);
  noFill();
  stroke (r,g,b);
  rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  document.getElementById("list").innerHTML=objects[i].label +" "+percent+"%" +" , ";
  console.log(objects[i].label +" "+percent+"%" +" , ");
 }
if(objects[i].label ==obj){
    video.stop();
    archita.detect(gotResult);
    document.getElementById("list").innerHTML=obj+"found.";
    synth= window.SpeechSynthesis;
    utterthis=  new SpeechSynthesisUtterance(obj+"found");
    synth.speak(utterthis); 
}else{
    document.getElementById("list").innerHTML=obj+"not found";
}
}
}

function gotResult(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
    objects=results;
        }
       
    }