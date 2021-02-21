import {jest} from '@jest/globals';
import {notify} from './notify';

test('notif messages', function () {
        console.log = jest.fn();
        //test for starting pomo
        let o_notif=notify(0);
        expect(o_notif.title.mock.toMatch(/Time to start the next work session!/));
    });

