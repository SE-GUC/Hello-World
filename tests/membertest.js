const fun = require('./member_fn')
const Task = require('../models/Task')
const mongoose = require('mongoose');
 test(`Message Should be 'Member was created successfully'` ,async ()=>{
     const name = 'TestName';
     const phone = 911;
     const email = 'test@tests.com';
     const age = 12;
     const skills = ['tast','tast2'];
     const intersets = ['testing','testing2']
     const social ={
         youtube:'tst',
         twitter:'tst',
         instagram:'tst',
         facebook:'tst',
         linkedin:'tst'
     }
     const avatar = 'tst'
     expect.assertions(1);
     const response = await fun.createMember(name,phone,age,email,skills,intersets,social,avatar);
     expect(response.length).toBe(16);
 })
 test('', async ()=>{
    const name = 'updatetest'
    const phone = 119
    const email = 'update@test.net'
    const age =1
    const social ={
        youtube:'Utst',
        twitter:'Utst',
        instagram:'Utst',
        facebook:'Utst',
        linkedin:'Utst'
    }
    const avatar = 'Utst'
    expect.assertions(1);
    const response = await fun.updateMember(name,phone,phone,age,email,skills,intersets,social,avatar)
    expect(response.msg).toBe('Member updated successfully');})
test('', async ()=>{
    const skill = 'testskill'
    expect.assertions(1);
    const response = await fun.addSkill(skill)
    expect(response.msg).toBe('skill added sucessfully');
 })
 test('',async()=>{
     const interset ='intersetTest'
     expect.assertions(1);
     const response = await fun.addInterest(interset)
     expect(response.msg).toBe('interest added sucessfully')
 })
test('', async()=>{
    const pastEvent = {title:'testTitle',description:'testDesc',location:'testLocation'}
    expect.assertions(1);
    const response = await fun.postEvents(pastEvent)
    expect(response.msg).toBe('Event added sucessfully')
})
test('',async()=>{

})
test('',async()=>{
    const certificate = 'testCertificate'
    expect.assertions(1);
    const response = await fun.postCertificates(certificate)
    expect(response.msg).toBe('Certificate added sucessfully')
})
test('',async()=>{

})
