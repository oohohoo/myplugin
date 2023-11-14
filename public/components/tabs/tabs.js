(function () {
  var tagList = ['Optimus Prime', 'Bumblebee', 'Megatron', 'Ironhide'];
  
  // caching the DOM elements
  var tagListElement = document.getElementById("tagList");
  var newTagElement = document.getElementById("newTag");
  
  // initial render
  tagList_render();
  
  function tagList_render () {
    tagListElement.innerHTML = ''; // equivalent to jQuery's empty()
    tagList.forEach(function (_tag) {
      var temp = '<li>'+ _tag +'<span class="rmTag">&times;</span></li>';
      tagListElement.innerHTML += temp;
    });
  }
  
  // Add new tag on "ENTER" press
  newTagElement.addEventListener('keyup', function (e) {
    // enter keycode 13
    if (e.keyCode == 13) {
      var newTag = newTagElement.value;
      if( newTag.replace(/\s/g, '') !== '' ){
        tagList.push(newTag);
        newTagElement.value = '';
        tagList_render();
      }
    }
  });
  
  // Remove Tag
  tagListElement.addEventListener("click", function(e){
    if(e.target && e.target.nodeName == "SPAN" && e.target.className == "rmTag") {
      var index = Array.from(tagListElement.children).indexOf(e.target.parentNode);
      tagList.splice(index, 1);
      tagList_render();
    }
  });

})();