import appConfig from '../../app.json';

const translations = {
  common: {
    cancel: 'Cancel',
    ok: 'OK',
    email: 'Email address',
    name: 'Name',
    for: 'For',
    phoneNumber: 'Phone number',
    password: 'Password',
    error: 'Error',
    success: 'Success',
    unknownError: 'Unknown error occured',
    yes: 'Yes',
    no: 'No',
    save: 'Save',
  },
  ad: {
    unableOpenSettings: 'Unable to open settings',
    locationDisabled: `Turn on Location Services to allow "${appConfig.displayName}" to determine your location. This is required to add your ad to listing`,
    locationPermissionDenied: 'Location permission denied',
    goToSettings: 'Go to Settings',
    dontUseLocation: `Don't Use Location`,
    locationPermisssionRevoked: 'Location permission revoked by user',
    employmentType: 'Employment type',
    availableFrom: 'Availiable from',
    availableTo: 'Availiable to',
    services: 'Services',
    description: 'Description',
    fixedTerm: 'Fixed-term',
    setHoursWorkingTime: 'Time of day',
    workingTimeNegotiable: 'Negotiable',
    setHoursWorkingTimeSetHours: 'Set hours',
    days: {
      monday: 'Mo',
      tuesday: 'Tu',
      wednesday: 'We',
      thursday: 'Th',
      friday: 'Fr',
      saturday: 'Sa',
      sunday: 'Su',
    },
    overnight: 'Night',
    location: "Location",
    detectLocation: "Detect my location",
    setLocationManually:''

  },
  validation: {
    email: 'Must be a valid email',
    required: 'This field is required',
    nameLength: 'Name must be at least 2 characters long',
    phoneNumber: 'Phone number is not valid',
    phoneNumberMinLength: `Phone number must contain 9 digits`,
    passwordLength: 'Password is too short',
    registrationCodeLength: "Wrong registration code length",
    acceptRequired: 'You need to accept our Terms of Use',
  },
  location:{
    location: "Location",
    clientOrWorker: "Are you looking for Home Help, or you are Home Help?",
    client: 'I am looking for Home Help',
    worker: 'I am Home Help',
    clientEmploymentType: 'I am looking for home help',
    workerEmploymentType: 'I am looking for client',
    yourLocation: 'Your location',
    detectLocation: 'Detect my location or set location manually',

  },
  map: {
    searchOrMoveTheMap:'Search or move the map'
  },
  signIn: {
    signIn: 'Log In',
    signInButton: 'Log In',
    signUpTip: "don't have an account?",
    forgotPassword: 'Forgot password?',
  },
  signUp: {
    signUp: 'Sign Up',
    signUpButton: 'Sign Up',
    accept: 'I accept ',
    termsOfUse: 'Terms of Use',
  },
  registrationCodeSignUp: {
    registrationCodeVeryfication: "Registration code veryfication",
    registrationCode: "Registration code",
    registrationCodeButton: "Submit registration code"
  },
  resetPassword: {
    resetPassword: 'Reset password',
    guide1: 'Provide you email in the field below. We will send you link to reset your password.',
    guide2: 'After setting up new password, sign in with newly set password at the login screen.',
    resetPasswordButtonLabel: 'Reset Password',
    userNotFound: 'No user found for provided email. Make sure to provide email you registered.',
    resetPasswordSuccess:
      'Email with password reset link has been sent. After setting up new password, sign in with newly set password at the login screen.',
  },
  content: {
    list: 'List',
    image: 'Image',
    addAd: 'Add Ad',
    contentList: 'Content List',
    contentImage: 'Content Image',
    contentCreate: 'Content Create',
    addContent: 'Add new content',
  },
  settings: {
    settings: 'Settings',
    signOutTitle: 'Sign out',
    account: 'Account',
    signOutSubtitle: 'After you sign out, you will need to sign in again.',
    signOutAction: 'Sign out',
    signOutDialogTitle: 'Sign out',
    signOutDialogDescription: 'Are you sure you want to sign out?',
  },
  account: {
    account: 'Account',
    consentPhoneNumberVisibility: ' I would like to display my phone number to users',
  },
};

export default translations;
