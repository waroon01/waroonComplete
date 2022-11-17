function warooncomplete(textsearch, arr) {

    var curshot;

        
    textsearch.addEventListener("input", function(e) {
        var c, d, i, val = this.value;
        console.log(c,d,i,val)
        exitlist();
        if (!val) { return false;}
        curshot = -1;

        c = document.createElement("DIV");
        c.setAttribute("id", this.id + "warooncomplete-list");
        c.setAttribute("class", "warooncomplete-items");

        this.parentNode.appendChild(c);

        for (i = 0; i < arr.length; i++) {

          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

            d = document.createElement("DIV");

            d.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            d.innerHTML += arr[i].substr(val.length);

            d.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                d.addEventListener("click", function(e) {
                  textsearch.value = this.getElementsByTagName("input")[0].value;

                exitlist();
            });
            c.appendChild(d);
          }
        }
    });

    textsearch.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "warooncomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {

          curshot++;
          /*set:*/
          sendtextActive(x);
        } else if (e.keyCode == 38) { 

          curshot--;
          sendtextActive(x);
        } else if (e.keyCode == 13) {

          e.preventDefault();
          if (curshot > -1) {

            if (x) x[curshot].click();
          }
        }
    });
    function sendtextActive(x) {

      if (!x) return false;

      exitActive(x);
      if (curshot >= x.length) curshot = 0;
      if (curshot < 0) curshot = (x.length - 1);

      x[curshot].classList.add("warooncomplete-active");
    }
    function exitActive(x) {

      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("warooncomplete-active");
      }
    }
    function exitlist(elmnt) {

      var x = document.getElementsByClassName("warooncomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textsearch) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  
  document.addEventListener("click", function (e) {
      exitlist(e.target);
  });
  }
