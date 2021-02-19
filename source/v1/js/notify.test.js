import {jest} from '@jest/globals';
import notify from './notify';

test('notif messages', function () {
        console.log = jest.fn();
        //test for starting pomo
        notify(0);
        expect(window.Notification.title.mock.toMatch(/Time to start the next work session!/));
    });

