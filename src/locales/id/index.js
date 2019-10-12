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
import suggestion from './mine/suggestion';
import help from './mine/help';
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
  ...error,
  'Home': 'Home',
  'Coupon': 'Coupon',
  'Mine': 'Mine',
  'Video Verification': 'Video Verification',
  'Identity Information': 'Identity Information',
  'Personal Information': 'Personal Information',
  'index.start': 'Getting Started',
  'Feedback': 'MAJU',
  'AdditionalInfo': 'Additional Information',
  'ProofMaterials': 'proof Materials',
  'JobProof': 'Job Proof',
  'BankStatement': 'Bank Statement',
  'NPWP': 'NPWP',
  'continue': 'Lanjutkan',
  'fillError': 'Silahkan isi {label} dengan benar.',
  'chooseError': 'Silahkan pilih {label} dengan benar.',
  'Suggestion': 'Suggestion',
  'Help Center': 'Help Center',
};
