const grayscale = {
  grayscale00: 'rgba(255, 255, 255, 1)', // #FFFFFF
  grayscale01: 'rgba(247, 249, 251, 1)', // #F7F9FB
  grayscale02: 'rgba(236, 241, 245, 1)', // #ECF1F5
  grayscale03: 'rgba(215, 225, 235, 1)', // #D7E1EB
  grayscale04: 'rgba(194, 204, 215, 1)', // #C2CCD7
  grayscale05: 'rgba(163, 174, 186, 1)', // #A3AEBA
  grayscale06: 'rgba(119, 131, 144, 1)', // #778390
  grayscale07: 'rgba(86, 97, 108, 1)', // #56616C
  grayscale08: 'rgba(52, 61, 71, 1)', // #343D47
  grayscale09: 'rgba(25, 30, 35, 1)', // #191E23
};

const primary = {
  primaryLight: 'rgba(105, 192, 255, 1)', // #69C0FF
  primaryDefault: 'rgba(222, 245, 241, 1)', // #def5f1
  primaryRaised: 'rgba(9, 109, 217, 1)', // #096DD9
  primaryDark: 'rgba(0, 80, 179, 1)', // #0050B3
  primaryDisabled: 'rgba(213, 228, 242, 1)', // #D5E4F2
};

const secondary = {
  secondaryLight: 'rgba(255, 183, 97, 1)', // #FFB761
  secondaryDefault: 'rgba(254, 153, 32, 1)', // #FE9920
  secondaryRaised: 'rgba(232, 135, 18, 1)', // #E88712
  secondaryDark: 'rgba(203, 113, 4, 1)', // #CB7104
  secondaryDisabled: 'rgba(250, 227, 201, 1)', // #FAE3C9
};

const tertiary = {
  tertiaryLight: 'rgba(255, 131, 160, 1)', // #FF83A0
  tertiaryDefault: 'rgba(239, 71, 111, 1)', // #EF476F
  tertiaryRaised: 'rgba(217, 32, 76, 1)', // #D9204C
  tertiaryDark: 'rgba(170, 13, 50, 1)', // #AA0D32
};

const validation = {
  info: 'rgba(218, 236, 247, 1)', // #DAECF7
  success: 'rgba(82, 196, 26, 1)', // #52C41A
  warning: 'rgba(250, 173, 20, 1)', // #FAAD14
  error: '#EB1722', // #EB1722
};

const others = {
  textLight: grayscale.grayscale08,
  text: grayscale.grayscale09,
  textDisabled: grayscale.grayscale05,
  subtitle: grayscale.grayscale06,
  label: grayscale.grayscale07,
  backgroundLight: grayscale.grayscale00,
  background: grayscale.grayscale01,
  backgroundDark: grayscale.grayscale02,
  border: primary.primaryDefault,
  borderDisabled: grayscale.grayscale03,
  opacity: 'rgba(25, 30, 35, 0.3)', // #191E23
  transparent: 'transparent',
  boxShadow: 'rgba(18, 18, 18, 0.2)',
  inactive: 'rgba(25, 30, 35, 0.6)', // #191E23, opacity 0.6
  lightGrey: 'rgba(246, 246, 246)',
};

// NOTE: these colors are deprecated but still used in components, remove them later
const deprecated = {
  primary: '#458caf',
  primaryActiveOpacity: '#458caf20',
  secondary: '#84E0C3',
  textBlack: 'rgba(0, 0, 0, 0.87)',
  textBlackMuted: 'rgba(0, 0, 0, 0.60)',
  textBlackDisabled: 'rgba(0, 0, 0, 0.33)',
  underlay: 'rgba(0, 0, 0, 0.1)',
  shadow: 'rgba(0, 0, 0, 0.6)',
  dialogBackground: 'rgba(0, 0, 0, 0.9)',
};

const Button = {
  primary: {
    solid: {
      default: {
        border: primary.primaryDefault,
        background: primary.primaryDefault,
        title: grayscale.grayscale09,
      },
      raised: {
        border: primary.primaryRaised,
        background: primary.primaryRaised,
        title: grayscale.grayscale00,
      },
      disabled: {
        border: grayscale.grayscale04,
        background: grayscale.grayscale04,
        title: grayscale.grayscale00,
      },
    },
    outline: {
      default: {
        border: primary.primaryDefault,
        background: grayscale.grayscale00,
        title: primary.primaryDefault,
      },
      raised: {
        border: primary.primaryRaised,
        background: grayscale.grayscale00,
        title: primary.primaryRaised,
      },
      disabled: {
        border: grayscale.grayscale04,
        background: grayscale.grayscale00,
        title: grayscale.grayscale05,
      },
    },
    clear: {
      default: {
        border: others.transparent,
        background: others.transparent,
        title: primary.primaryDefault,
      },
      raised: {
        border: others.transparent,
        background: others.transparent,
        title: primary.primaryRaised,
      },
      disabled: {
        border: others.transparent,
        background: others.transparent,
        title: grayscale.grayscale05,
      },
    },
  },
  secondary: {
    solid: {
      default: {
        border: secondary.secondaryDefault,
        background: secondary.secondaryDefault,
        title: grayscale.grayscale00,
      },
      raised: {
        border: secondary.secondaryRaised,
        background: secondary.secondaryRaised,
        title: grayscale.grayscale00,
      },
      disabled: {
        border: grayscale.grayscale04,
        background: grayscale.grayscale04,
        title: grayscale.grayscale00,
      },
    },
    outline: {
      default: {
        border: secondary.secondaryDefault,
        background: grayscale.grayscale00,
        title: secondary.secondaryDefault,
      },
      raised: {
        border: secondary.secondaryRaised,
        background: grayscale.grayscale00,
        title: secondary.secondaryRaised,
      },
      disabled: {
        border: grayscale.grayscale04,
        background: grayscale.grayscale00,
        title: grayscale.grayscale05,
      },
    },
    clear: {
      default: {
        border: others.transparent,
        background: others.transparent,
        title: secondary.secondaryDefault,
      },
      raised: {
        border: others.transparent,
        background: others.transparent,
        title: secondary.secondaryRaised,
      },
      disabled: {
        border: others.transparent,
        background: others.transparent,
        title: grayscale.grayscale05,
      },
    },
  },
};

const Input = {
  default: {
    border: grayscale.grayscale04,
    background: grayscale.grayscale00,
    label: grayscale.grayscale07,
    value: grayscale.grayscale06,
  },
  active: {
    border: primary.primaryLight,
    background: grayscale.grayscale00,
    label: primary.primaryLight,
    value: grayscale.grayscale09,
  },
  filled: {
    border: grayscale.grayscale05,
    background: grayscale.grayscale00,
    label: grayscale.grayscale07,
    value: grayscale.grayscale09,
  },
  error: {
    border: validation.error,
    background: grayscale.grayscale00,
    label: validation.error,
    value: grayscale.grayscale09,
  },
  disabled: {
    border: grayscale.grayscale03,
    background: grayscale.grayscale01,
    label: grayscale.grayscale07,
    value: grayscale.grayscale05,
  },
};

const Checkbox = {
  unselected: {
    default: {
      border: grayscale.grayscale04,
      background: grayscale.grayscale00,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale09,
    },
    raised: {
      border: grayscale.grayscale04,
      background: grayscale.grayscale00,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale09,
    },
    disabled: {
      border: grayscale.grayscale03,
      background: grayscale.grayscale01,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale05,
    },
  },
  selected: {
    default: {
      border: primary.primaryDefault,
      background: primary.primaryDefault,
      icon: grayscale.grayscale09,
      label: grayscale.grayscale09,
    },
    raised: {
      border: primary.primaryRaised,
      background: primary.primaryRaised,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale09,
    },
    disabled: {
      border: primary.primaryDisabled,
      background: primary.primaryDisabled,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale09,
    },
  },
};

const CheckboxSection = {
  default: {
    border: grayscale.grayscale04,
    background: grayscale.grayscale00,
    label: grayscale.grayscale09,
  },
  raised: {
    border: grayscale.grayscale04,
    background: grayscale.grayscale00,
    label: primary.primaryRaised,
  },
  disabled: {
    border: grayscale.grayscale03,
    background: grayscale.grayscale01,
    label: grayscale.grayscale05,
  },
};

const Switch = {
  unselected: {
    default: {
      background: grayscale.grayscale04,
      circleBorder: grayscale.grayscale00,
      circleBackground: grayscale.grayscale00,
      shadow: others.boxShadow,
    },
    raised: {
      background: grayscale.grayscale04,
      circleBorder: grayscale.grayscale05,
      circleBackground: grayscale.grayscale00,
      shadow: others.boxShadow,
    },
    disabled: {
      background: grayscale.grayscale03,
      circleBorder: grayscale.grayscale01,
      circleBackground: grayscale.grayscale01,
    },
  },
  selected: {
    default: {
      background: primary.primaryDefault,
      circleBorder: grayscale.grayscale00,
      circleBackground: grayscale.grayscale00,
      shadow: others.boxShadow,
    },
    raised: {
      background: primary.primaryRaised,
      circleBorder: grayscale.grayscale00,
      circleBackground: grayscale.grayscale00,
      shadow: others.boxShadow,
    },
    disabled: {
      background: primary.primaryDisabled,
      circleBorder: grayscale.grayscale01,
      circleBackground: grayscale.grayscale01,
    },
  },
};

const ListItem = {
  default: {
    background: grayscale.grayscale00,
    border: grayscale.grayscale04,
    line: grayscale.grayscale03,
    title: grayscale.grayscale09,
    subtitle: grayscale.grayscale06,
    icon: grayscale.grayscale05,
    chevron: grayscale.grayscale05,
  },
  raised: {
    title: primary.primaryRaised,
    chevron: primary.primaryRaised,
  },
};

const TabNavigator = {
  default: {
    active: primary.primaryDefault,
    inactive: grayscale.grayscale03,
  },
  raised: {
    active: primary.primaryDefault,
    inactive: grayscale.grayscale03,
  },
  disabled: {
    active: primary.primaryDefault,
    inactive: grayscale.grayscale03,
  },
};

const Tabs = {
  default: {
    background: grayscale.grayscale00,
    activeText: grayscale.grayscale09,
    inactiveText: others.inactive,
    line: primary.primaryDefault,
  },
  raised: {
    text: primary.primaryRaised,
  },
  disabled: {
    text: grayscale.grayscale05,
  },
};

const LoadingIndicator = {
  primary: primary.primaryDefault,
  secondary: secondary.secondaryDefault,
};

const Header = {
  primary: {
    background: primary.primaryDefault,
    border: primary.primaryDefault,
    title: grayscale.grayscale00,
  },
  light: {
    background: grayscale.grayscale00,
    border: grayscale.grayscale03,
    title: others.text,
  },
};

export const palette = {
  ...grayscale,
  ...primary,
  ...secondary,
  ...tertiary,
  ...validation,
  ...others,
  ...deprecated,
  Button,
  Input,
  Checkbox,
  CheckboxSection,
  Switch,
  ListItem,
  TabNavigator,
  Tabs,
  LoadingIndicator,
  Header,
};
