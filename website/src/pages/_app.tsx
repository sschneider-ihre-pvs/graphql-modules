import 'remark-admonitions/styles/infima.css';
import '../../public/style.css';

import { appWithTranslation } from 'next-i18next';

import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import {
  AppSeoProps,
  CombinedThemeProvider,
  DocsPage,
  ExtendComponents,
  handlePushRoute,
} from '@guild-docs/client';
import { FooterExtended, Header, Subheader } from '@theguild/components';

import type { AppProps } from 'next/app';
import Script from 'next/script';

ExtendComponents({
  HelloWorld() {
    return <p>Hello World!</p>;
  },
});

const styles: typeof chakraTheme['styles'] = {
  global: (props) => ({
    body: {
      bg: mode('white', 'gray.850')(props),
    },
  }),
};

const accentColor = '#1CC8EE';

const theme = extendTheme({
  colors: {
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      850: '#1b1b1b',
      900: '#171717',
    },
    accentColor,
  },
  fonts: {
    heading: 'TGCFont, sans-serif',
    body: 'TGCFont, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles,
});

const serializedMdx = process.env.SERIALIZED_MDX_ROUTES;
const mdxRoutes = { data: serializedMdx && JSON.parse(serializedMdx) };

function AppContent(appProps: AppProps) {
  const { Component, pageProps, router } = appProps;
  const isDocs = router.asPath.startsWith('/docs');

  return (
    <>
      <Script async src="https://the-guild.dev/static/crisp.js" />
      <Header accentColor={accentColor} activeLink="/open-source" themeSwitch />
      <Subheader
        activeLink={router.asPath}
        product={{
          title: 'GraphQL Modules',
          description: '',
          image: {
            src: '/assets/subheader-logo.svg',
            alt: 'Docs',
          },
          onClick: (e) => handlePushRoute('/', e),
        }}
        links={[
          {
            children: 'Home',
            title: 'Read about GraphQL Modules',
            href: '/',
            onClick: (e) => handlePushRoute('/', e),
          },
          {
            children: 'Docs & API',
            title: 'View examples',
            href: '/docs',
            onClick: (e) => handlePushRoute('/docs', e),
          },
          {
            children: 'GitHub',
            href: 'https://github.com/Urigo/graphql-modules',
            rel: 'noopener noreferrer',
            target: '_blank',
            title: 'Explore in GitHub',
          },
        ]}
        cta={{
          children: 'Get Started',
          title: 'Start using The Guild Docs',
          href: '/docs',
        }}
      />
      {isDocs ? (
        <DocsPage
          appProps={appProps}
          accentColor={accentColor}
          mdxRoutes={mdxRoutes}
        />
      ) : (
        <Component {...pageProps} />
      )}
      <FooterExtended />
    </>
  );
}

const AppContentWrapper = appWithTranslation(function TranslatedApp(appProps) {
  return <AppContent {...appProps} />;
});

const defaultSeo: AppSeoProps = {
  title: 'GraphQL Modules',
  description: 'Enterprise Grade Tooling for your GraphQL Server',
  logo: {
    url: 'https://www.graphql-modules.com/assets/subheader-logo.png',
    width: 50,
    height: 54,
  },
};

export default function App(appProps: AppProps) {
  return (
    <CombinedThemeProvider
      theme={theme}
      accentColor={accentColor}
      defaultSeo={defaultSeo}
    >
      <AppContentWrapper {...appProps} />
    </CombinedThemeProvider>
  );
}
