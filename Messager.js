module.exports = class Messager {
    constructor() { console.log("Class is created.") }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    async msg() {
        await this.sleep(2000);
        return "OK";
    }
};