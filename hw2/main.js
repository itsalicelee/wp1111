var host = {
    name: "You",
    src: "./images/profile0.png",
};

var removeButtons = document.getElementsByClassName("remove_button"); // html collections
var guestFuncButtons = document.getElementsByClassName("func__guest"); // html collections

// remove guest container
var bindRemoveGuest = function () {
    Array.from(removeButtons).forEach((remove_button) => {
        remove_button.addEventListener("click", () => {
            remove_button.parentNode.parentNode.remove();
        });
    });
};

// pin guest to main host
Array.from(guestFuncButtons).forEach((guestFuncButton) => {
    guestFuncButton.addEventListener("click", () => {
        // save temp guest
        var tempGuest = {
            name: guestFuncButton.parentNode.lastElementChild.innerHTML,
            src: guestFuncButton.parentNode.querySelector(".img__people").src,
        };
        // insert remove button if you are about to be the host
        if (tempGuest.name === "You") {
            var removeBtn_to_insert = document.createElement("div");
            removeBtn_to_insert.className = "remove";
            removeBtn_to_insert.innerHTML = `<img class="remove_button" src="./images/remove.png" width="25" height="25" />`;
            guestFuncButton.parentNode.insertBefore(removeBtn_to_insert, guestFuncButton.parentNode.children[0]);
        }
        // assign host img and name to guest
        guestFuncButton.parentNode.lastElementChild.innerHTML = host.name;
        guestFuncButton.parentNode.querySelector(".img__people").src = host.src;
        // assign temp guest to host
        document.getElementById("img_host").src = tempGuest.src;
        document.getElementById("pin_you").innerHTML = tempGuest.name;
        // save current host
        host.src = tempGuest.src;
        host.name = tempGuest.name;
        // // remove erase button if you are the guest
        if (guestFuncButton.parentNode.lastElementChild.innerHTML === "You") {
            guestFuncButton.parentNode.firstElementChild.remove();
        }
        bindRemoveGuest();
    });
});
