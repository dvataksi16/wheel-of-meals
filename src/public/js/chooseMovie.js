function choose(){
  const chooseButton = document.querySelector("#choose");
  const savedButton = document.querySelector("#saved");
  const findButton = document.querySelector("#find");
  const decideButton = document.querySelector('#decide');
  const map = document.querySelector("#map");
  const genresDiv = document.querySelector("#filter");

  chooseButton.addEventListener("click", function(evt){
    evt.preventDefault();
    findButton.classList.toggle("hidden");
    decideButton.classList.toggle("hidden");
    map.classList.add("hidden");
    genresDiv.classList.toggle("hidden");
    if(chooseButton.innerHTML === "Back"){
      chooseButton.innerHTML ="Choose Movie"
    }
    else{
        chooseButton.innerHTML = "Back";
    }
  });
  findButton.addEventListener("click", function(evt){
    evt.preventDefault();
    map.classList.toggle("hidden");
  });

}
document.addEventListener('DOMContentLoaded', choose);
