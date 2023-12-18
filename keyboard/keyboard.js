const keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: "",
        capsLock: false

    },
    init() {
        //create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //setup main elements
        this.elements.main.classList.add("keyboard", "1keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard_keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        //add to dom
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        //creates html for an icon
        const createIconHtml = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard_key_wide");
                    keyElement.innerHTML = createIconHtml("backspace");
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvents("oninput");
                    })
                    break;

                case "caps":
                    keyElement.classList.add("keyboard_key_wide", "keyboard_key_activeable");
                    keyElement.innerHTML = createIconHtml("keyboard_capslock");
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard_key_active", this.properties.capsLock);
                    })
                    break;

                case "enter":
                    keyElement.classList.add("keyboard_key_wide");
                    keyElement.innerHTML = createIconHtml("keyboard_return");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvents("oninput");
                    })
                    break;

                case "space":
                    keyElement.classList.add("keyboard_key_extrawide");
                    keyElement.innerHTML = createIconHtml("space_bar");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvents("oninput");
                    })
                    break;

                case "done":
                    keyElement.classList.add("keyboard_key_wide");
                    keyElement.innerHTML = createIconHtml("check_circle");
                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvents("oninput");
                    })
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvents("oninput");
                    })
                    break;
            }
            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        })
        return fragment;

    },
    _triggerEvents(handlerName) {
        console.log("Event: " + handlerName);
    },
    _toggleCapsLock() {
        console.log("caps toggled");
    },
    open(initialValue, oninput, onclose) { },
    close() {

    }
};

window.addEventListener("DOMContentLoaded", () => {
    keyboard.init();
})


// const Keyboard = {
//     elements: {
//         main: null,
//         keysContainer: null,
//         keys: []
//     },

//     eventHandlers: {
//         oninput: null,
//         onclose: null
//     },

//     properties: {
//         value: "",
//         capsLock: false
//     },

//     init() {
//         // Create main elements
//         this.elements.main = document.createElement("div");
//         this.elements.keysContainer = document.createElement("div");

//         // Setup main elements
//         this.elements.main.classList.add("keyboard", "1keyboard--hidden");
//         this.elements.keysContainer.classList.add("keyboard_keys");
//         this.elements.keysContainer.appendChild(this._createKeys());

//         this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key");

//         // Add to DOM
//         this.elements.main.appendChild(this.elements.keysContainer);
//         document.body.appendChild(this.elements.main);
//     },

//     _createKeys() {
//         const fragment = document.createDocumentFragment();
//         const keyLayout = [
//             "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
//             "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
//             "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
//             "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
//             "space"
//         ];

//         // Creates HTML for an icon
//         const createIconHTML = (icon_name) => {
//             return `<i class="material-icons">${icon_name}</i>`;
//         };

//         keyLayout.forEach(key => {
//             const keyElement = document.createElement("button");
//             const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

//             // Add attributes/classes
//             keyElement.setAttribute("type", "button");
//             keyElement.classList.add("keyboard_key");

//             switch (key) {
//                 case "backspace":
//                     keyElement.classList.add("keyboard_key_wide");
//                     keyElement.innerHTML = createIconHTML("backspace");

//                     keyElement.addEventListener("click", () => {
//                         this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
//                         this._triggerEvent("oninput");
//                     });

//                     break;

//                 case "caps":
//                     keyElement.classList.add("keyboard_key_wide", "keyboard_key_activeable");
//                     keyElement.innerHTML = createIconHTML("keyboard_capslock");

//                     keyElement.addEventListener("click", () => {
//                         this._toggleCapsLock();
//                         keyElement.classList.toggle("keyboard_key_active", this.properties.capsLock);
//                     });

//                     break;

//                 case "enter":
//                     keyElement.classList.add("keyboard_key_wide");
//                     keyElement.innerHTML = createIconHTML("keyboard_return");

//                     keyElement.addEventListener("click", () => {
//                         this.properties.value += "\n";
//                         this._triggerEvent("oninput");
//                     });

//                     break;

//                 case "space":
//                     keyElement.classList.add("keyboard_key_extrawide");
//                     keyElement.innerHTML = createIconHTML("space_bar");

//                     keyElement.addEventListener("click", () => {
//                         this.properties.value += " ";
//                         this._triggerEvent("oninput");
//                     });

//                     break;

//                 case "done":
//                     keyElement.classList.add("keyboard_key_wide", "keyboard_key_dark");
//                     keyElement.innerHTML = createIconHTML("check_circle");

//                     keyElement.addEventListener("click", () => {
//                         this.close();
//                         this._triggerEvent("onclose");
//                     });

//                     break;

//                 default:
//                     keyElement.textContent = key.toLowerCase();

//                     keyElement.addEventListener("click", () => {
//                         this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
//                         this._triggerEvent("oninput");
//                     });

//                     break;
//             }

//             fragment.appendChild(keyElement);

//             if (insertLineBreak) {
//                 fragment.appendChild(document.createElement("br"));
//             }
//         });

//         return fragment;
//     },

//     _triggerEvent(handlerName) {
//         if (typeof this.eventHandlers[handlerName] == "function") {
//             this.eventHandlers[handlerName](this.properties.value);
//         }
//     },

//     _toggleCapsLock() {
//         this.properties.capsLock = !this.properties.capsLock;

//         for (const key of this.elements.keys) {
//             if (key.childElementCount === 0) {
//                 key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
//             }
//         }
//     }
// };

// window.addEventListener("DOMContentLoaded", function () {
//     Keyboard.init();
// });
