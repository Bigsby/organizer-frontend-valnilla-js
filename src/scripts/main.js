function handleNavigation(hash) {
    console.log("new hash: " + hash);
}

function setWindowListeners() {
    window.addEventListener("hashchange", (ev) => {
        ev.preventDefault();
        ev.returnValue = "";
        handleNavigation(window.location.hash);
    }, true);
    window.addEventListener("load", () => {
        
    });
}

setWindowListeners();