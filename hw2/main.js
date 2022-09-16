import {
    env,
    adjustContainer,
    checkGuestNum,
    addGuest,
    setHost,
    swapHostGuest,
    clearInput,
    toggleAddParticipant,
    setTime,
} from "./utils.js";

/* event delegation of remove button */
var bindRemoveGuest = function () {
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("remove_button")) {
            var remove_button = e.target;
            remove_button.parentNode.parentNode.remove();
            // You don't have remove button
            env.guestNum -= 1;

            adjustContainer();
            checkGuestNum(env.guestNum);
        }
    });
};

/* set left wrapper to display none */
var bindHostFunc = function () {
    var hostFuncButton = document.getElementById("func_host");
    hostFuncButton.addEventListener("click", () => {
        var left_wrapper = document.querySelector(".left_wrapper");
        var right_wrapper = document.querySelector(".right_wrapper");
        addGuest(env.host_name, env.host_src);

        left_wrapper.style.display = "none";
        left_wrapper.style.width = "0%";
        right_wrapper.style.display = "flex";
        right_wrapper.style.width = "100%";

        var container = document.querySelectorAll(".container");
        Array.from(container).forEach((ele) => {
            ele.style.borderRadius = "5%";
            ele.style.width = "30%";
            ele.style.height = "50%";
        });
        adjustContainer();
        checkGuestNum(env.guestNum);
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
            adjustContainer();
        }
    });
};

/* event delegation of remove button */
var bindAddParticipant = function () {
    // toggle to show and hide tooltip
    toggleAddParticipant();
    // hide tooltip after click uplaod button
    var addButton = document.querySelector("#add");
    addButton.addEventListener("click", function (event) {
        event.preventDefault();
        var name = document.getElementById("input_name").value;
        if (name === "") {
            alert("Please input your name!");
            clearInput();
            return;
        }
        try {
            var src = URL.createObjectURL(document.getElementById("input_img").files[0]);
        } catch {
            alert("Please upload your profile image!");
            clearInput();
            return;
        }
        addGuest(name, src);
        env.guestNum += 1;
        document.querySelector("#add_tooltip").style.visibility = "hidden";
        adjustContainer();
        clearInput();
    });
};

adjustContainer();
bindRemoveGuest();
bindHostFunc();
bindGuestFunc();
bindAddParticipant();
setInterval(setTime, 1);
