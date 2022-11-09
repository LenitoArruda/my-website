var header = document.getElementById('header');
var navigationHeader = document.getElementById('navigation_header');
var content = document.getElementById('content');
var showSideBar = false;

function toggleSidebar(){
    showSideBar = !showSideBar;
    if(showSideBar){
        navigationHeader.style.marginLeft = '-10vw';
        navigationHeader.style.animationName = 'showSidebar';
        content.style.filter = 'blur(2px)';
    }else{
        navigationHeader.style.marginLeft = '-100vw';
        navigationHeader.style.animationName = 'hideSidebar';
        content.style.filter = '';
    }
}

function closeSidebar(){
    if(showSideBar){
        toggleSidebar();
    }
}

window.addEventListener('resize',event => {
    if(window.innerWidth > 768 && showSideBar){
        toggleSidebar();
    }
});