gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


var tl = gsap.timeline()

function time(){
    var a = 0
    setInterval(function(){
        a += Math.floor(Math.random()*20)
        if(a<50){
            document.querySelector("#loader h1").innerHTML = a+"%"
        }else{
            a = 100
            document.querySelector("#loader h1").innerHTML = a+"%"
        }
    },1000)
}

tl.from("#nav h2,#nav i",{
    y:-8,
    duration:1,
    opacity:0,
    stagger:0.3,
})
tl.from("#page1 h1",{
    delay:1,
    duration: 0.75,
    y:150,
    autoAlpha: 0,
    ease: "power4.out",
    stagger:{
        amount: 1
      },
    scrollTrigger:
    {
        trigger:"#page1>h1,#page1>h2",
        scroller:"#main",
        scrub:2

    }
})
tl.from("#page2>p",{
    y:100,
    opacity:0,
    duration:1,
    delay:0.5,
    stagger:0.3,
    scrollTrigger:
    {
        trigger:"#page2 p",
        scroller:"#main",
        scrub:2

    }
})
gsap.from("#page3 .video",{
    scale:0,
    duration:3,
    rotate:360,
    scrollTrigger:{
        trigger:"#page3 .video",
        scroller:"#main",
        scrub:2

    }
})
tl.from("#page3>h2,#page3>p,#page3>a",{
    y:200,
    opacity:0,
    duration:1,
    delay:0.5,
    stagger:0.3,
    scrollTrigger:
    {
        trigger:"#page3>h2,#page3>p,#page3>a",
        scroller:"#main",
        scrub:2

    }
})
tl.from("#page4>h2,#page4>a",{
    y:200,
    opacity:0,
    duration:1,
    delay:0.5,
    stagger:0.3,
    scrollTrigger:
    {
        trigger:"#page4>h2,#page4>a",
        scroller:"#main",
        scrub:2

    }
})


tl.to("#loader h1",{
    delay:0.5,
    duration:1,
    onStart:time()
})
tl.to("#loader",{
    top:"-100vh",
    delay:0.4,
    duration:1.5
})
