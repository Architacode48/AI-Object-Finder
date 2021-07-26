objects=[];
    status="";
    
    
    function start(){
        document.getElementById("status").innerHTML="Getting on it right away...";
        archita= ml5.objectDetector('cocossd',modelLoaded );
        
        obj= document.getElementById("inputObject").value;
        console.log(obj);
    }
    function setup() {
        canvas = createCanvas(340,380);
        canvas.center();
       video= createCapture(VIDEO);
       video.hide();
    
    }
    
    function modelLoaded(){
        console.log("Model Loaded");
        status=true;
    }
    
    function gotResult(error,results){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            objects=results;
                }
               
            }
    
    function draw()
    {
        image(video, 0, 0, 380,380);
     if(status != ""){
        archita.detect(video, gotResult);
    
        r= random (255);
        g=random (255);
        b=random (255);
      for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status: Detecting Objects";
    
      percent=floor(objects[i].confidence*100);
      stroke (r,g,b);
      text(objects[i].label+" "+percent+ " %", objects[i].x, objects[i].y);
      noFill();
      stroke (r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if(objects[i].label ==obj){
        video.stop();
        archita.detect(gotResult);
        document.getElementById("list").innerHTML=obj+" found.";
        var synth= window.speechSynthesis;
        utterthis=  new SpeechSynthesisUtterance(obj+"found");
        synth.speak(utterthis); 
        
    }
    else{
        document.getElementById("list").innerHTML=obj+"not found";
    }
     }
    
    }
    }
