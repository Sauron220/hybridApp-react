export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './home', title: 'Home' },
      { path: '/coupon', component: './coupon', title: 'Coupon' },
      { path: '/mine',
        routes: [
          { path: '/mine', component: './mine', title: 'Mine' },
          { path: '/mine/help', component: './mine/help', title: 'Mine' },
          { path: '/mine/help/list', component: './mine/help/list', title: 'Mine' },
          { path: '/mine/help/type', component: './mine/help/type', title: 'Mine' },
          { path: '/mine/help/search', component: './mine/help/search', title: 'Mine' },
          { path: '/mine/help/:id', component: './mine/help/$id.js', title: 'Mine' },
          { path: '/mine/suggestion/feedback', component: './mine/suggestion', title: 'Suggestion' },
          { path: '/mine/language', component: './mine/language', title: 'Language' },
          { path: '/mine/passwordManagement', component: './mine/passwordManagement', title: 'Password Management' },
          { path: '/mine/passwordManagement/resetLogin', component: './mine/passwordManagement/resetLogin', title: 'resetLogin' },
          { path: '/mine/passwordManagement/resetTransaction', component: './mine/passwordManagement/resetTransaction', title: 'resetTransaction' },
          { path: '/mine/passwordManagement/personInfo', component: './mine/passwordManagement/personInfo', title: 'resetTransaction' },
        ]
      },
      { path: '/credit',
        routes: [
          { path: '/credit/face', component: './credit/face', title: 'Video Verification' },
          { path: '/credit/idCard', component: './credit/idCard', title: 'Identity Information' },
          { path: '/credit/personal', component: './credit/personalInfo', title: 'Personal Information' },
          { path: '/credit/job', component: './credit/job', title: 'Job Information' },
          { path: '/credit/bankAccount', component: './credit/bankAccount', title: 'Bank Account Information' },
          { path: '/credit/setPassword', component: './credit/setPassword', title: 'Set Transaction Password' },
          { path: '/credit/contact', component: './credit/contact', title: 'Contact Information' },
          { path: '/credit/proofMaterials', component: './credit/proofMaterials', title: 'ProofMaterials' },
          { path: '/credit/bankStatement', component: './credit/bankStatement', title: 'BankStatement' },
          { path: '/credit/jobProof', component: './credit/jobProof', title: 'JobProof' },
          { path: '/credit/NPWP', component: './credit/NPWP', title: 'NPWP' },
          { path: '/credit/additionalInfo', component: './credit/additionalInfo', title: 'AdditionalInfo' },
          { path: '/credit/creditCard', component: './credit/creditCard', title: 'Credit Card Information' },
          { path: '/credit/feedback', component: './credit/feedback', title: 'Feedback' },
        ]
      },
      { path: '/nearbybranches', component: './nearbybranches', title: 'NearByBranches' },
      { path: '/iframe', component: './iframe', title: '' },
      { path: '/activity',
        routes:  [
          { path: '/activity/promotions', component: './activity/promotions', title: 'Upcoming Promotions' },
          { path: '/activity/calculator', component: './activity/calculator', title: 'Calculator' }
        ]
      },
    ],
  },
];
