var host = {
    name: "You",
    src: "./images/profile0.png",
};

var removeButtons = document.getElementsByClassName("remove_button"); // html collections
var guestFuncButtons = document.getElementsByClassName("func__guest"); // html collections
var hostFuncButton = document.getElementById("func_host");
var left_wrapper = document.querySelector(".left_wrapper");
var right_wrapper = document.querySelector(".right_wrapper");

// remove guest container
var bindRemoveGuest = function () {
    Array.from(removeButtons).forEach((remove_button) => {
        remove_button.addEventListener("click", () => {
            remove_button.parentNode.parentNode.remove();
        });
    });
};
var addGuest = function (name, src) {
    var container_to_insert = document.createElement("div");
    container_to_insert.className = "container";
    if (name !== "You") {
        container_to_insert.innerHTML = `
         <div id="remove_button1" class="remove">
             <img class="remove_button" src="./images/remove.png" width="25" height="25" />
         </div>`;
    }
    container_to_insert.innerHTML += `
         <div class="mute">
             <img class="inv" src="./images/mute.png" width="25" height="25" />
         </div>
         <img class="func__guest" src="./images/func_guest.png" height="30" width="90" />
         <img class="img__people" src="${src}" width="50%" />
         <span class="name">${name}</span>`;
    right_wrapper.insertBefore(container_to_insert, right_wrapper.children[0]);
    bindFunctionButton();
};

// unpin host
var unpinHost = function () {
    hostFuncButton.addEventListener("click", () => {
        addGuest(host.name, host.src);
        left_wrapper.style.display = "none";
        right_wrapper.style.width = "100%";
        var container = document.querySelectorAll(".container");
        Array.from(container).forEach((ele) => {
            ele.style.borderRadius = "5%";
            ele.style.width = "30%";
            ele.style.height = "50%";
        });
    });
    guestFuncButtons = document.getElementsByClassName("func__guest"); // html collections
    bindFunctionButton();
};

var setHost = function () {
    left_wrapper.style.display = "flex";
    right_wrapper.style.width = "35%";
    var container = document.querySelectorAll(".container");
    Array.from(container).forEach((ele) => {
        ele.style.borderRadius = "15%";
        ele.style.width = "40%";
        ele.style.height = "20%";
    });
    bindFunctionButton();
};
// pin guest to main host
var bindFunctionButton = function () {
    var guestFuncButtons = document.getElementsByClassName("func__guest"); // html collections
    Array.from(guestFuncButtons).forEach((guestFuncButton) => {
        guestFuncButton.addEventListener("click", () => {
            // pin the host  from together mode to normal mode and
            if (left_wrapper.style.display === "none") {
                setHost();
                // save temp guest
                var tempGuest = {
                    name: guestFuncButton.parentNode.lastElementChild.innerHTML,
                    src: guestFuncButton.parentNode.querySelector(".img__people").src,
                };
                // assign temp guest to host
                document.getElementById("img_host").src = tempGuest.src;
                document.getElementById("pin_you").innerHTML = tempGuest.name;
                // save current host
                host.src = tempGuest.src;
                host.name = tempGuest.name;
                // remove duplicate guest
                guestFuncButton.parentNode.remove();
            }
            // normal mode
            else {
                // save temp guest
                var tempGuest = {
                    name: guestFuncButton.parentNode.lastElementChild.innerHTML,
                    src: guestFuncButton.parentNode.querySelector(".img__people").src,
                };
                console.log("host: ", host.name);
                console.log("temp: ", tempGuest.name);
                // insert remove button to guest container if you are about to be the host
                if (tempGuest.name === "You") {
                    var removeBtn_to_insert = document.createElement("div");
                    removeBtn_to_insert.className = "remove";
                    removeBtn_to_insert.innerHTML = `<img class="remove_button" src="./images/remove.png" width="25" height="25" />`;
                    guestFuncButton.parentNode.insertBefore(
                        removeBtn_to_insert,
                        guestFuncButton.parentNode.children[0]
                    );
                }
                if (host.name == tempGuest.name) {
                    guestFuncButton.parentNode.lastElementChild.innerHTML = tempGuest.name;
                    guestFuncButton.parentNode.querySelector(".img__people").src = tempGuest.src;
                    document.getElementById("img_host").src = host.src;
                    document.getElementById("pin_you").innerHTML = host.name;
                } else {
                    // assign host img and name to guest
                    guestFuncButton.parentNode.lastElementChild.innerHTML = host.name;
                    guestFuncButton.parentNode.querySelector(".img__people").src = host.src;
                    // assign temp guest to host
                    document.getElementById("img_host").src = tempGuest.src;
                    document.getElementById("pin_you").innerHTML = tempGuest.name;
                    // save current host
                    host.src = tempGuest.src;
                    host.name = tempGuest.name;
                }

                // // remove erase button if you are the guest
                if (guestFuncButton.parentNode.lastElementChild.innerHTML === "You") {
                    guestFuncButton.parentNode.firstElementChild.remove();
                }
                bindRemoveGuest();
            }
        });
    });
};
bindRemoveGuest();
unpinHost();
