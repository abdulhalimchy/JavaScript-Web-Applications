var timerId, startTime, timerState=0, elapsedTime=0;

function timerAction()
{
    if (document.activeElement != document.body)
        document.activeElement.blur();  //clear focus on the button

    if(timerState==0)   //Timer is at 00:00:00
    {
        document.getElementById('start-pause-resume').innerHTML="pause";
        timerState=1;
        startTimer();
    }
    else if(timerState==1)  //Timer is running, we can pause timer.
    {
        document.getElementById('start-pause-resume').innerHTML="resume";
        timerState=2;
        pauseTimer();
    }
    else if(timerState==2)  //Timer is paused, we can resume.
    {
        document.getElementById('start-pause-resume').innerHTML="pause";
        timerState=1;
        startTimer();
    }

}

function startTimer()
{
    startTime = new Date();     //From when the timer is started.
    // if (document.activeElement != document.body) document.activeElement.blur();
    updateTimer();
}

function updateTimer()
{
    var currrentTime= new Date();
    var ms=currrentTime-startTime;  // elapsed time in miliseconds
    ms+=elapsedTime;    
    var s=Math.floor(ms/1000);  //seconds
    ms=ms%1000;
    var m=Math.floor(s/60);     //minutes
    s=s%60;
    var h=Math.floor(m/60);     //hours
    m=m%60;
    timer_innterHTML = addLeadingZero1(h)+":"+addLeadingZero1(m)+":"+addLeadingZero1(s);
    document.getElementById('hr-min-sec').innerHTML=timer_innterHTML
    document.getElementById('millis').innerHTML=addLeadingZero2(ms);
    document.getElementById('title').innerHTML=timer_innterHTML
    timerId = setTimeout(updateTimer);
}

function pauseTimer()
{
    clearTimeout(timerId);
    elapsedTime+=new Date()-startTime;  // The time elapsed before pause (in miliseconds).
}

function resetTimer()
{
    document.getElementById('hr-min-sec').innerHTML="00:00:00";
    document.getElementById('millis').innerHTML="000";
    document.getElementById('start-pause-resume').innerHTML="start";
    document.getElementById('title').innerHTML="Stopwatch";
    clearTimeout(timerId);
    timerState=0;
    elapsedTime=0;
    if (document.activeElement != document.body)
        document.activeElement.blur();          //Clear focus on the button 
}


function addLeadingZero1(n)
{
    if(n<10)   // lf the number is a single digit, then add a leading zero.
        n="0"+n;
    return n;
}

function addLeadingZero2(n)
{
    if(n<10)
        n="00"+n;   // Add two leading zero, if n<10. Example: 009
    else if(n<100)
        n="0"+n;  //Add one leading zero, if n<100. Example: 065
    return n;
}


//Spacebar functionality for start, pause, restart
document.onkeypress= function(e){
    if((e || window.event).keyCode === 32){
        timerAction();
    }
}