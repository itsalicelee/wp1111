var env = {
    host_name: "You",
    host_src: "./images/profile0.png",
    guestNum: 5,
};
/* append guest container dom in the right wrapper */
function addGuest(name, src) {
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
    var right_wrapper = document.querySelector(".right_wrapper");
    right_wrapper.insertBefore(container_to_insert, right_wrapper.children[0]);
}

/* set the host to left wrapper and set display to flex */
function setHost(name, src) {
    var left_wrapper = document.querySelector(".left_wrapper");
    var right_wrapper = document.querySelector(".right_wrapper");
    left_wrapper.style.display = "flex";
    left_wrapper.style.width = "65%";
    right_wrapper.style.width = "35%";

    var container = document.querySelectorAll(".container");
    Array.from(container).forEach((ele) => {
        ele.style.borderRadius = "15%";
        ele.style.width = "40%";
        ele.style.height = "20%";
    });
    document.getElementById("img_host").src = src;
    document.getElementById("pin_you").innerHTML = name;
    env.host_src = src;
    env.host_name = name;
    checkGuestNum(env.guestNum);
}
/* swap host and guest */
function swapHostGuest(guestFuncButton) {
    var tempGuest = {
        name: guestFuncButton.parentNode.lastElementChild.innerHTML,
        src: guestFuncButton.parentNode.querySelector(".img__people").src,
    };
    // insert remove button to guest container if you are about to be the host
    if (tempGuest.name === "You") {
        var removeBtn_to_insert = document.createElement("div");
        removeBtn_to_insert.className = "remove";
        removeBtn_to_insert.innerHTML = `<img class="remove_button" src="./images/remove.png" width="25" height="25" />`;
        guestFuncButton.parentNode.insertBefore(removeBtn_to_insert, guestFuncButton.parentNode.children[0]);
    }
    // assign host img and name to guest
    guestFuncButton.parentNode.lastElementChild.innerHTML = env.host_name;
    guestFuncButton.parentNode.querySelector(".img__people").src = env.host_src;
    // assign temp guest to host
    document.getElementById("img_host").src = tempGuest.src;
    document.getElementById("pin_you").innerHTML = tempGuest.name;
    // save current host
    env.host_src = tempGuest.src;
    env.host_name = tempGuest.name;
    // // remove erase button if you are the guest
    if (guestFuncButton.parentNode.lastElementChild.innerHTML === "You") {
        guestFuncButton.parentNode.firstElementChild.remove();
    }
}
/* set you to middle if there is no other guests*/
function checkGuestNum(guestNum) {
    var left_wrapper = document.querySelector(".left_wrapper");
    var right_wrapper = document.querySelector(".right_wrapper");
    if (guestNum === 0 && left_wrapper.style.display !== "none") {
        right_wrapper.style.display = "none";
        left_wrapper.style.width = "100%";
    } else if (guestNum === 0 && right_wrapper.style.display !== "none") {
        right_wrapper.style.width = "100%";
        left_wrapper.style.display = "none";
    }
}

export { env, checkGuestNum, addGuest, setHost, swapHostGuest };
