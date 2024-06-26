// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
 
const tm = document.querySelector('#footerleftsecond')
setInterval(function(){
  let date = new Date();
  tm.innerHTML = date.toLocaleTimeString();
}, 1000)

function firstPageAnim() {
    var tl = gsap.timeline();
  
    tl.from("#nav", {
      y: "-10",
      opacity: 0,
      duration: 1,
      ease: Expo.easeInOut,
    })
      .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -0.5,
        stagger: 0.2,
      })
      .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.2,
        delay: -0.5,
        ease: Expo.easeInOut,
      });
  }
firstPageAnim(); 

// Add effect on the links:
document.querySelectorAll("a").forEach((elem)=>{

  elem.addEventListener("mouseover",()=>{
      elem.style.textDecoration = "underline";
      elem.style.opacity = ".8";
  })

  elem.addEventListener("mouseleave",()=>{
      elem.style.textDecoration = "none";
      elem.style.opacity = "1";
  })

  elem.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    window.open(this.href, '_blank'); // Open the link in a new tab
  });

  
})

var timeout;
var xscale = 1;
var yscale = 1;

var xprev = 0;
var yprev = 0;
var isOverLink = false;

document.addEventListener("mouseleave", function() {
    document.querySelector("#minicircle").style.opacity = "0";
});

window.addEventListener("mousemove", function(dets) {
    // Check if the cursor is over a link
    if (dets.target.closest('a')) {
        isOverLink = true;
    } else {
        isOverLink = false;
    }

    if (!isOverLink) {
        document.querySelector("#minicircle").style.opacity = "1";
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(dets.clientX, dets.clientY, xscale, yscale);

        timeout = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 5}px) scale(1, 1)`;
        }, 1);
    } else {
        document.querySelector("#minicircle").style.opacity = "0"; // Hide minicircle over links
    }
});

function circleMouseFollower(x, y, xscale, yscale) {
    document.querySelector("#minicircle").style.transform = `translate(${x}px , ${y}px) scale(${xscale}, ${yscale})`;
}
// circleMouseFollower(); 



//Teeno element ko select karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise rotation bhi tez ho jani chahiye. 

document.querySelectorAll(".elem").forEach(function (elem) {  
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {

    elem.querySelectorAll(".secfade").forEach((item)=> {
      item.style.opacity = "0.7";
    });


    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {

    elem.querySelectorAll(".secfade").forEach((item)=> {
      item.style.opacity = ".3";
    });

    document.querySelector("#minicircle").style.display = "none";

    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    
    gsap.to(elem.querySelector("img"), {
      opacity: 1, 
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    }); 
  });
});
