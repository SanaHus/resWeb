var grab = false;
var grabData = null;

function clickStage00()  {
  if(!grab) {
    grabData = document.getElementById("p1");
    document.getElementById("p1").remove();
    grab = true;
  }
  else if(grab){
    document.getElementById("stage0").prepend(grabData);
    grabData = null;
    grab = false;
  }
}

  function clickStage01()  {
    if(grab) {
      document.getElementById("stage1").appendChild(grabData);
      grab = false;
    }
    //alert('안녕하세요');
  }

  function clickStage02()  {
    if(grab) {
      document.getElementById("stage2").appendChild(grabData);
      grab = false;
    }
    //alert('안녕하세요');
  }
