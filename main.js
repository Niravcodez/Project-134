song = "";
status = "";
objects = [];

function preload()
{
    song = loadSound("alarm_r.mp3");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Dected Are : " + objects.length;
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                song.stop();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                song.play();
            }

            if(objects.length == 0)
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                song.play();
            }
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}