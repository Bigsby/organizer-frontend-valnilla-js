class templateService {
    constructor() {
        this.templateCache = {};
    };

    wrapTemplate(html) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        return wrapper;
    }

    get(template) {
        return new Promise((resolve) => {
            const cachedTemplate = this.templateCache[template];
            if (cachedTemplate) {
                resolve(this.wrapTemplate(cachedTemplate));
            } else {
                fetch("templates/" + template + ".html").then(response => {
                    response.text().then(textResponse => resolve(this.wrapTemplate(this.templateCache[template] = textResponse)));
                });
            }
        });
    }
}