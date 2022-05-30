import { notify } from "../js/notify.js";
import { jest } from '@jest/globals';
import { NotificationBox } from "../js/errorNotificationBox.js";

test("Test Notification API unsupported", () => {
    const f_jsdom_alert = window.alert;
    window.alert = () => {};
    const f_spy = jest.spyOn(window, 'alert');
    const o_notification = window.Notification;
    delete window.Notification;
    notify(1);
    expect(f_spy).toHaveBeenCalledWith("This browser does not support desktop notifications.");
    f_spy.mockRestore();
    window.Notification = o_notification;
    window.alert = f_jsdom_alert;
});


test("Test Nofification permission denied", ()=>{
    const o_jsdom_notification = window.Notification;
    window.Notification = jest.fn();
    window.Notification.permission = "denied";
    window.Notification.requestPermission = jest.fn();

    notify(1);

    expect(window.Notification).not.toHaveBeenCalled();

    window.Notification = o_jsdom_notification;
});

test("Test Nofification ask permission denied", async () => {
    const f_jsdom_alert = window.alert;
    window.alert = jest.fn();
    const o_jsdom_notification = window.Notification;
    window.Notification = jest.fn();
    window.Notification.permission = "default";
    const p_permission = Promise.resolve("denied");
    window.Notification.requestPermission = jest.fn(() => {
        window.Notification.permission = "denied";
        return p_permission;
    });

    notify(1);
    await p_permission;

    expect(window.alert).toHaveBeenCalledWith("Please enable notifications.");
    expect(window.Notification.permission).toMatch("denied");
    expect(window.Notification).not.toHaveBeenCalled();

    window.Notification = o_jsdom_notification;
    window.alert = f_jsdom_alert;
});

describe("Test Nofification ask permission granted Not Safari", ()=> {
    const o_jsdom_notification = window.Notification;
    const f_jsdom_alert = window.alert;
    const p_permission = Promise.resolve("granted");
    
    beforeAll(() => {
        const o_audio = document.createElement("audio");
        o_audio.id = "notifs";
        o_audio.src = "assets/audio/notif_tone.mp3";
        document.body.appendChild(o_audio);

        HTMLAudioElement.prototype.play = jest.fn();
        
        window.alert = jest.fn();

        window.Notification = jest.fn();
        window.Notification.permission = "default";
        window.Notification.requestPermission = jest.fn(() => {
            window.Notification.permission = "granted";
            return p_permission;
        });
    });

    afterAll(()=>{
        window.Notification = o_jsdom_notification;
        window.alert = f_jsdom_alert;        
    })

    test("Next work session", async () => {
        notify(0);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time to start the next work session!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Short Break", async () => {
        notify(1);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a short break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });

    test("Long Break", async () => {
        notify(2);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a long break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Complete", async () => {
        notify(3);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("All tasks completed. Good work!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });



});

describe("Test Nofification ask permission granted Safari", ()=> {
    const o_jsdom_notification = window.Notification;
    const f_jsdom_alert = window.alert;
    const p_permission = Promise.resolve("granted");
    const p_audio = Promise.resolve();
    const s_user_agent = window.navigator.userAgent;
    const f_audio_play = HTMLAudioElement.prototype.play;
    
    beforeAll(() => {
        const o_audio = document.createElement("audio");
        o_audio.id = "notifs";
        o_audio.src = "assets/audio/notif_tone.mp3";
        document.body.appendChild(o_audio);
        
        const o_notif_box = new NotificationBox();
        document.body.appendChild(o_notif_box);

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
            return p_permission;
        });
    });

    afterAll(()=>{
        window.Notification = o_jsdom_notification;
        window.alert = f_jsdom_alert;        
        HTMLAudioElement.prototype.play = f_audio_play;
        window.navigator.userAgent = s_user_agent;
    });

    test("Next work session", async () => {
        notify(0);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time to start the next work session!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Short Break", async () => {
        notify(1);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a short break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });

    test("Long Break", async () => {
        notify(2);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("Time for a long break!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });
    
    test("Complete", async () => {
        notify(3);
        await p_permission;

        expect(window.alert).not.toHaveBeenCalledWith("Please enable notifications.");
        expect(window.Notification.permission).toMatch("granted");
        expect(window.Notification).toHaveBeenCalledWith("All tasks completed. Good work!", { silent: true });
        expect(document.getElementById("notifs").play).toHaveBeenCalled();
    });

});