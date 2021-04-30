import {crowdnotifier_v3} from '@c4dt/libcrowdnotifier';

const msg = crowdnotifier_v3.NotifyMeAssociatedData.create({version: 1});
console.log(msg.toJSON());
