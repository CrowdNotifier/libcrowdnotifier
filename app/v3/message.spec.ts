import {NotifyMeAssociatedData} from '@c4dt/libcrowdnotifier';

const msg = NotifyMeAssociatedData.create({version: 1});
console.log(msg.toJSON());
