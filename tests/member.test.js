const fun = require('./member_fn')
const Task = require('../models/Task')
const mongoose = require('mongoose');
//  test(`Message Should be 'Member was created successfully'` ,async ()=>{
//      const name = 'TestName';
//      const phone = 911;
//      const email = 'test@tests.com';
//      const age = 21;
//      const skills = 'test,test2';
//      const interests = 'testing,testing2';
//          const youtube = 'https://www.youtube.com/';
//          const twitter = 'https://www.twitter.com/';
//          const instagram = 'https://www.instagram.com/';
//          const facebook = 'https://www.facebook.com/';
//          const linkedin = 'https://www.linkedin.com/';
//      const avatar = 'tst'
//      expect.assertions(1);
//      const response = await fun.createMember(name,phone,age,email,skills,interests,youtube,twitter,instagram,facebook,linkedin,avatar);
//      expect(response.msg).toBe('Member was created successfully');
//  })

 // test(`Message Should be 'Member updated successfully'`, async ()=>{
 //     const name = 'TestName';
 //     const phone = 911;
 //     const email = 'test@tests.com';
 //     const age = 21;
 //         const youtube = 'https://www.youtube.com/';
 //         const twitter = 'https://www.twitter.com/';
 //         const instagram = 'https://www.instagram.com/';
 //         const facebook = 'https://www.facebook.com/';
 //         const linkedin = 'https://www.linkedin.com/';
 //     const avatar = 'tst'
 //    expect.assertions(1);
 //    const response = await fun.updateMember(name,phone,age,email,youtube,facebook,twitter,instagram,linkedin,avatar)
 //    expect(response.msg).toBe('Member updated successfully');})

// test(`Message Should be Skill added successfully`, async ()=>{
//     const skill = 'testskill'
//     expect.assertions(1);
//     const response = await fun.addSkill(skill)
//     expect(response.msg).toBe('Skill added successfully');
//  })

 // test(`Message Should be 'Interest added successfully'`,async()=>{
 //     const interset ='intersetTest'
 //     expect.assertions(1);
 //     const response = await fun.addInterest(interset)
 //     expect(response.msg).toBe('Interest added successfully')
 // })

// test(`Message Should be 'Event added successfully'`, async()=>{
//     const title = 'testTitle';
//     const description = 'testDesc';
//     const location = 'testLocation';
//     expect.assertions(1);
//     const response = await fun.postEvents(title,description,location)
//     expect(response.msg).toBe('Event added successfully')
// })

test(`Messsage Should be 'Certificate added successfully'`,async()=>{
    const title = 'Test Certificate';
    const entity = 'Test Entity';
    const description = 'This is a test Descriptoin';
    expect.assertions(1);
    const response = await fun.postCertificates(title,entity,description)
    expect(response.msg).toBe('Certificate added successfully')
})

