export const introCopy = {
  appName: 'Vlad Stories',
  headlineLines: ['Log in to account and shape your stories', 'driven by choice and emotion'],
  providerButtons: {
    google: 'Log in with Google',
    apple: 'Log in with Apple',
  },
  legalFootnote: 'By signing in, you accept and agree with our conditions.',
  legalLinkLabel: 'Terms of Use and Privacy and Policy',
} as const;

export const introPalette = {
  dark: {
    screen: '#111521',
    title: '#F4F3F8',
    body: '#7C8096',
    footnote: '#656A81',
    legal: '#C95487',
    backgroundGradient: ['#3D1648', '#171A2B', '#111521'],
    pinkGlow: ['rgba(255, 122, 214, 0.28)', 'rgba(255, 122, 214, 0)'],
    blueGlow: ['rgba(88, 104, 255, 0.14)', 'rgba(88, 104, 255, 0)'],
  },
  light: {
    screen: '#F4F1FA',
    title: '#26253A',
    body: '#6D6881',
    footnote: '#7A748D',
    legal: '#B43F76',
    backgroundGradient: ['#F2E9FF', '#ECEAF8', '#F8F4FF'],
    pinkGlow: ['rgba(202, 79, 180, 0.18)', 'rgba(202, 79, 180, 0)'],
    blueGlow: ['rgba(119, 139, 255, 0.1)', 'rgba(119, 139, 255, 0)'],
  },
};
