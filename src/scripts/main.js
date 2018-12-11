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
    getDefault: function () {
        const thisDefault = this.default;
        return this.configs.find(c => c.path === thisDefault);
    },
    getRoute: function (route) {
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

async function handleNavigation(hash) {
    mainContainer.innerHTML = "";
    const config = routes.getRoute(hash.substring(1));
    const template = await window.services.templates.get(config.template);
    
    mainContainer.appendChild(template);
    const vmClassName = config.vm || config.template;
    const vmClass = eval(vmClassName);
    if (vmClass) {
        vm = new vmClass(template, window.services);
        await vm.initialize();
    }
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

    window.services = {};
    window.services.templates = new templateService();
}

initialize();

class vm {
    constructor(container, services) {
        this.container = container;
        this.services = services;
    }

    getService(service) {
        return this.services[service];
    }

    getTemplate(template) {
        return this.services.templates.get(template);
    }

    getElement(query) {
        return this.container.querySelector(query);
    }

    getElements(query) {
        return this.container.querySelectorAll(query);
    }

    async initialize() {
        this.innerInitialize && await this.innerInitialize();
    }
}