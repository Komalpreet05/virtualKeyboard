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
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard_keys");
        this.elements.keysContainer.appendChild(this._createKeys());


        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key");

        //add to dom
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //use keyboard when clicked textarea
        document.querySelectorAll(".use-keyboard").forEach(e => {
            e.addEventListener("focus", () => {
                this.open(e.value, currentVal => {
                    e.value = currentVal;
                })
            })
        })
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
                    keyElement.classList.add("keyboard_key_special");
                    keyElement.innerHTML = createIconHtml("backspace");
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvents("oninput");
                    })
                    break;

                case "caps":
                    keyElement.classList.add("keyboard_key_wide", "keyboard_key_activeable", "specialCase");
                    keyElement.innerHTML = createIconHtml("keyboard_capslock");
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard_key_active", this.properties.capsLock);
                    })
                    break;


                case "enter":
                    keyElement.classList.add("keyboard_key_wide");
                    keyElement.classList.add("keyboard_key_special");
                    keyElement.innerHTML = createIconHtml("keyboard_return");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvents("oninput");
                    })
                    break;

                case "space":
                    keyElement.classList.add("keyboard_key_extrawide");
                    keyElement.classList.add("keyboard_key_special");
                    keyElement.innerHTML = createIconHtml("space_bar");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvents("oninput");
                    })
                    break;

                case "done":
                    keyElement.classList.add("keyboard_key_wide");
                    keyElement.classList.add("keyboard_key_special");
                    keyElement.innerHTML = createIconHtml("check_circle");
                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvents("onclose");
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

        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
        console.log("Event: " + handlerName);
    },
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }

        console.log("caps toggled");
    },
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },
    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", () => {
    keyboard.init();

})

