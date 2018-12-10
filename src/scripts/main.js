const routes = {
    configs: [
        {
            path: "/",
            template: "home"
        },
        {
            path: "/contacts",
            template: "contacts"
        },
        {
            path: "/calendar",
            template: "calendar"
        }
    ],
    default: "/",
    getDefault: function() {
        const thisDefault = this.default;
        return this.configs.find(c => c.path === thisDefault);
    },
    getRoute: function(route){
        let foundConfig = this.getDefault();
        this.configs.forEach(c => {
            if (route.startsWith(c.path)) {
                foundConfig = c;
            }
        });
        return foundConfig;
    }
};
let mainContainer;
const templateCache = {};

function getTemplate(template, callback) {
    const cachedTemplate = templateCache[template];
    if (cachedTemplate) {
        callback(cachedTemplate);
    } else {
        fetch("templates/" + template + ".html").then(response => {
            response.text().then(textResponse => callback(templateCache[template] = textResponse));
        });
    }
}

function handleNavigation(hash) {
    const config = routes.getRoute(hash.substring(1));
    getTemplate(config.template, template => {
        mainContainer.innerHTML = template;
    });
    // mainContainer.innerText = config.template;
}

function initialize() {
    window.addEventListener("hashchange", (ev) => {
        ev.preventDefault();
        ev.returnValue = "";
        handleNavigation(window.location.hash);
    }, true);
    window.addEventListener("load", () => {
        mainContainer = document.querySelector("#mainContainer");
        handleNavigation(window.location.hash);
    });
}

initialize();