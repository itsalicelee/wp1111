import { host, addGuest, setHost, swapHostGuest } from "./utils.js";

/* event delegation of remove button */
var bindRemoveGuest = function () {
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("remove_button")) {
            var remove_button = e.target;
            remove_button.parentNode.parentNode.remove();
        }
    });
};

/* set left wrapper to display none */
var bindHostFunc = function () {
    var hostFuncButton = document.getElementById("func_host");
    hostFuncButton.addEventListener("click", () => {
        var left_wrapper = document.querySelector(".left_wrapper");
        var right_wrapper = document.querySelector(".right_wrapper");
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
};

/* event delegation of function button */
var bindGuestFunc = function () {
    document.addEventListener("click", function (e) {
        var left_wrapper = document.querySelector(".left_wrapper");
        if (e.target && e.target.classList.contains("func__guest")) {
            var guestFuncButton = e.target;
            // click normal mode function button
            if (left_wrapper.style.display !== "none") {
                swapHostGuest(guestFuncButton);
            }
            // click together mode function button
            else {
                // pin the host
                setHost(
                    guestFuncButton.parentNode.lastElementChild.innerHTML,
                    guestFuncButton.parentNode.querySelector(".img__people").src
                );
                // remove current host from guest
                guestFuncButton.parentNode.remove();
            }
        }
    });
};

bindRemoveGuest();
bindHostFunc();
bindGuestFunc();
