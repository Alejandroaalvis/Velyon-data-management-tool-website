var tabs = document.querySelectorAll(".lboard_tabs ul li");
var today = document.querySelector(".today");
var month = document.querySelector(".month");
var year = document.querySelector(".year");
var items = document.querySelectorAll(".lboard_item");

tabs.forEach(function(tab){
	tab.addEventListener("click", function(){
		var currenttab = tab.getAttribute("data-li");
		
		tabs.forEach(function(tab){
			tab.classList.remove("active");
		})

		tab.classList.add("active");

		items.forEach(function(item){
			item.style.display = "none";
		})

		if(currenttab == "today"){
			today.style.display = "block";
		}
		else if(currenttab == "month"){
			month.style.display = "block";
		}
		else{
			year.style.display = "block";
		}

	})
})





window.addEventListener("load",()=>{
  const input      = document.getElementById("upload");
  const filewrapper = document.getElementById("filewrapper");

  if (!input) {
    console.warn('Element with id="upload" not found');
    return;
  }

  if (!filewrapper) {
    console.warn('Element with id="filewrapper" not found');
    return;
  }

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName   = file.name;
    const extension  = fileName.split(".").pop().toLowerCase();

    console.log(`Selected file: ${fileName} (${extension})`);
  
  });

});














