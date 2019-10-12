import enUS from 'antd-mobile/lib/locale-provider/en_US';
import face from './credit/face';
import creditCard from './credit/creditCard';
import personalInfo from './credit/personalInfo';
import proofMaterials from './credit/proofMaterials'
import additionalInfo from './credit/additionalInfo'
import bankAccount from './credit/bankAccount'
import setPassword from './credit/setPassword'
import contact from './credit/contact'
import job from './credit/job'
import pwd from './mine/pwd';
import suggestion from './mine/suggestion';
import help from './mine/help';
import calculator from './calculator/calculator';
import error from './error';

export default {
  ...enUS,
  ...face,
  ...creditCard,
  ...personalInfo,
  ...proofMaterials,
  ...additionalInfo,
  ...bankAccount,
  ...setPassword,
  ...contact,
  ...job,
  ...suggestion,
  ...help,
  ...calculator,
  ...error,
  ...pwd,
  'Home': 'Home',
  'Coupon': 'Coupon',
  'Mine': 'Mine',
  'Video Verification': 'Video Verification',
  'Identity Information': 'Identity Information',
  'Personal Information': 'Personal Information',
  'index.start': 'Getting Started',
  'Feedback': 'MAJU',
  'AdditionalInfo':'Additional Information',
  'ProofMaterials': 'proof Materials',
  'JobProof': 'Job Proof',
  'BankStatement': 'Bank Statement',
  'NPWP': 'NPWP',
  'continue': 'Continue',
  'fillError': 'Please fill {label} correctly.',
  'chooseError': 'Please choose {label} correctly.',
  'Suggestion': 'Suggestion',
  'Help Center': 'Help Center',
  'Language': 'Language',
  'NearByBranches': 'Near By Branches',
  'Credit Card Information': 'Credit Card Information',
  'Upcoming Promotions': 'Upcoming Promotions'
}
