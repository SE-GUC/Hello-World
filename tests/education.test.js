const functions = require('./education_fn');

test('Education Should be created with the specified description' , async ()=>{
    const desc = 'Education was created successfully';
   expect.assertions(1);
   const response = await functions.createEducational(desc,false);
    expect(response.msg).toBe(desc);
 });
 test('Education Should be deleted ' , async ()=>{
    const desc = 'Profile Successfully deleted';
   expect.assertions(1);
   const response = await functions.deleteEducation(desc,false);
    expect(response.msg).toBe(desc);
 });
 test('trainer must be added' , async ()=>{
    const desc = 'Trainer successfully added';
    const name = 'name test';
    const bio = 'bio Certificate';
   expect.assertions(1);
   const response = await functions.addTrainer(name,bio);
    expect(response.msg).toBe(desc);
 });
 test('Certificates must be added' , async ()=>{
    const desc = 'Certificate successfully added';
    const title = 'Test Certificate';
    // const entity = 'Test Entity';
    const description = 'This is a test Descriptoin';
   expect.assertions(1);
   const response = await functions.addCertificates(title,description)
   console.log(response);
   expect(response.msg).toBe('Certificate successfully added');
 });
 test('cource must be added' , async ()=>{
    const title = 'Test Certificate';
    const price = 'price test';
    const description = 'test Descriptoin';
   expect.assertions(1);
   const response = await functions.addCertificates(title,description,price)
   console.log(response);
   expect(response.msg).toBe('Course successfully added');
 });
 test('trainer program must be added' , async ()=>{
    const desc = 'Training Program successfully added';
    const name = 'name test';
    const bio = 'bio Certificate';
    const trainers='trainers test';
   expect.assertions(1);
   const response = await functions.addTrainer(name,bio,trainers);
    expect(response.msg).toBe(desc);
 });
