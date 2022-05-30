import { notify } from "../js/notify.js";
import { jest } from '@jest/globals';
import { NotificationBox } from "../js/errorNotificationBox.js";

test("Test Notification API unsupported", () => {
    const jsdomAlert = window.alert;
    window.alert = () => {};
    const spy = jest.spyOn(window, 'alert');
    const notification = window.Notification;
    delete window.Notification;
    notify(1);
    expect(spy).toHaveBeenCalledWith("This browser does not support desktop notifications.");
    spy.mockRestore();
    window.Notification = notification;
    window.alert = jsdomAlert;
});


test("Test Nofification permission denied", ()=>{
    const jsdomNotification = window.Notification;
    window.Notification = jest.fn();
    window.Notification.permission = "denied";
    window.Notification.requestPermission = jest.fn();

    notify(1);

    expect(window.Notification).not.toHaveBeenCalled();

    window.Notification = jsdomNotification;
});

test("Test Nofification ask permission denied", async () => {
    const jsdomAlert = window.alert;
    window.alert = jest.fn();
    const jsdomNotification = window.Notification;
    window.Notification = jest.fn();
    window.Notification.permission = "default";
    const p = Promise.resolve("denied");
    window.Notification.requestPermission = jest.fn(() => {
        window.Notification.permission = "denied";
        return p;
    });

    notify(1);
    await p;

    expect(window.alert).toHaveBeenCalledWith("Please enable notifications.");
    expect(window.Notification.permission).toMatch("denied");
    expect(window.Notification).not.toHaveBeenCalled();

    window.Notification = jsdomNotification;
    window.alert = jsdomAlert;
});

describe("Test Nofification ask permission granted Not Safari", ()=> {
    const jsdomNotification = window.Notification;
    const jsdomAlert = window.alert;
    const jsdomNavigator = window.navigator;
    const p = Promise.resolve("granted");
    
    beforeAll(() => {
        const audio = document.createElement("audio");
        audio.id = "notifs";
        audio.src = "assets/audio/notif_tone.mp3";
        document.body.appendChild(audio);

        HTMLAudioElement.prototype.play = jest.fn();
        
        window.navigator = {
            userAgent: "chrome"
        };
        
        window.alert = jest.fn();

        window.Notification = jest.fn();
        window.Notification.permission = "default";
        window.Notification.requestPermission = jest.fn(() => {
            window.Notification.permission = "granted";
            return p;
        });
    });

    afterAll(()=>{
        window.Notification = jsdomNotification;
        window.alert = jsdomAlert;        
        window.navigator = jsdomNavigator;        
    })

    test("Next work session", async () => {
        notify(0);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time to start the next work session!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Short Break", async () => {
        notify(1);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a short break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });

    test("Long Break", async () => {
        notify(2);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a long break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Complete", async () => {
        notify(3);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("All tasks completed. Good work!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });



});

describe("Test Nofification ask permission granted Safari", ()=> {
    const jsdomNotification = window.Notification;
    const jsdomAlert = window.alert;
    const p = Promise.resolve("granted");
    const p_audio = Promise.resolve();
    const userAgent = window.navigator.userAgent;
    const audio_play = HTMLAudioElement.prototype.play;
    
    beforeAll(() => {
        const audio = document.createElement("audio");
        audio.id = "notifs";
        audio.src = "assets/audio/notif_tone.mp3";
        document.body.appendChild(audio);
        
        const notif_box = new NotificationBox();
        document.body.appendChild(notif_box);

        HTMLAudioElement.prototype.play = jest.fn(() => p_audio);
        
        Object.defineProperty(window.navigator, 'userAgent', ((value) => ({
            get() { return value; },
            set(v) { value = v; }
        })) (window.navigator.userAgent));
        window.navigator.userAgent = "safari";
        window.alert = jest.fn();

        window.Notification = jest.fn();
        window.Notification.permission = "default";
        window.Notification.requestPermission = jest.fn(() => {
            window.Notification.permission = "granted";
            return p;
        });
    });

    afterAll(()=>{
        window.Notification = jsdomNotification;
        window.alert = jsdomAlert;        
        HTMLAudioElement.prototype.play = audio_play;
        window.navigator.userAgent = userAgent;
    });

    test("Next work session", async () => {
        notify(0);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time to start the next work session!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Short Break", async () => {
        notify(1);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a short break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });

    test("Long Break", async () => {
        notify(2);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a long break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Complete", async () => {
        notify(3);
        await p;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("All tasks completed. Good work!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });

});