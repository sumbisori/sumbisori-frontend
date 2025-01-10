/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        h1: ['38px', '57px'], // .h1
        h2: ['32px', '48px'], // .h2
        h3: ['24px', '36px'], // .h3
        h4: ['20px', '30px'], // .h4
        h5: ['18px', '27px'], // .h5
        h6: ['16px', '24px'], // .h6
        'subtitle-1': ['14px', '22px'], // .subtitle-1
        'subtitle-2': ['12px', '18px'], // .subtitle-2
        'paragraph-lg': ['16px', '24px'], // .paragraph-lg
        paragraph: ['14px', '22px'], // .paragraph
        'paragraph-sm': ['12px', '18px'], // .paragraph-sm
        caption: ['12px', '18px'], // .caption
        code: ['14px', '22px'], // <code>
      },
      colors: {
        'charcoal-gray': '#525152',
        gray: {
          '000': '#FFFFFF', // $gray-000
          '050': '#F7F7FA', // $gray-050
          100: '#F0F0F5', // $gray-100
          200: '#E8E8EE', // $gray-200
          300: '#E1E1E8', // $gray-300
          400: '#CDCED6', // $gray-400
          500: '#A9ABB8', // $gray-500
          600: '#858899', // $gray-600
          700: '#525463', // $gray-700
          800: '#3E404C', // $gray-800
          900: '#2B2D36', // $gray-900
          950: '#252730', // $gray-950
          surface: '#F1F1F3', // $gray-layout
          card: '#F7F6F9', // $gray-card
          'card-border': '#F2F2F4', // $gray-card-border
        },
        red: {
          '050': '#FEF1F1', // $red-050
          100: '#FDD8DB', // $red-100
          200: '#FBB7BB', // $red-200
          300: '#F9959C', // $red-300
          400: '#F7737C', // $red-400
          500: '#F5535E', // $red-500
          600: '#EC323E', // $red-600
          700: '#D91C29', // $red-700
          800: '#AE1E27', // $red-800
          900: '#8F1E26', // $red-900
        },
        cyan: {
          '050': '#F3FBFC', // $cyan-050
          100: '#D5F1F6', // $cyan-100
          200: '#A6E3ED', // $cyan-200
          300: '#7ED9E7', // $cyan-300
          400: '#52CDE0', // $cyan-400
          500: '#1EBAD2', // $cyan-500
          600: '#1FA8BD', // $cyan-600
          700: '#2095A7', // $cyan-700
          800: '#217E8C', // $cyan-800
          900: '#23707B', // $cyan-900
        },
        pink: {
          '050': '#FEF1F5', // $pink-050
          100: '#FCD5E2', // $pink-100
          200: '#F9B8CF', // $pink-200
          300: '#F79CBB', // $pink-300
          400: '#F580A8', // $pink-400
          500: '#F26394', // $pink-500
          600: '#E9447D', // $pink-600
          700: '#DD2766', // $pink-700
          800: '#B72457', // $pink-800
          900: '#8C2246', // $pink-900
        },
        green: {
          '050': '#F4FAF9', // $green-050
          100: '#E3F2EF', // $green-100
          200: '#AEE0D4', // $green-200
          300: '#71D0BA', // $green-300
          400: '#36BF9F', // $green-400
          500: '#00A881', // $green-500
          600: '#048F6F', // $green-600
          700: '#08785E', // $green-700
          800: '#0A614D', // $green-800
          900: '#0B5141', // $green-900
        },
        grape: {
          '050': '#FBF2FD', // $grape-050
          100: '#F4DBFA', // $grape-100
          200: '#E9B8F5', // $grape-200
          300: '#E09DF1', // $grape-300
          400: '#D579EC', // $grape-400
          500: '#CC5DE8', // $grape-500
          600: '#BD41DC', // $grape-600
          700: '#A82DC8', // $grape-700
          800: '#892CA0', // $grape-800
          900: '#712A83', // $grape-900
        },
        lime: {
          '050': '#F8FCF3', // $lime-050
          100: '#E9F6D5', // $lime-100
          200: '#D3ECAC', // $lime-200
          300: '#BCE382', // $lime-300
          400: '#ADDE63', // $lime-400
          500: '#8FD327', // $lime-500
          600: '#7CB526', // $lime-600
          700: '#6D9C26', // $lime-700
          800: '#5E8424', // $lime-800
          900: '#4F6D22', // $lime-900
        },
        violet: {
          '050': '#F4F1FE', // $violet-050
          100: '#E2D9FC', // $violet-100
          200: '#C8B8FA', // $violet-200
          300: '#B29BF8', // $violet-300
          400: '#9C7FF5', // $violet-400
          500: '#8662F3', // $violet-500
          600: '#744CEB', // $violet-600
          700: '#5B2EE0', // $violet-700
          800: '#4B25C1', // $violet-800
          900: '#412499', // $violet-900
        },
        yellow: {
          '050': '#FFF8E1', // $yellow-050
          100: '#FFECB3', // $yellow-100
          200: '#FFE082', // $yellow-200
          300: '#FFD54F', // $yellow-300
          400: '#FFCA28', // $yellow-400
          500: '#FFC107', // $yellow-500
          600: '#F5AC00', // $yellow-600
          700: '#EB9300', // $yellow-700
          800: '#E07E00', // $yellow-800
          900: '#D66B00', // $yellow-900
        },
        blue: {
          '050': '#F0F6FF', // $blue-050
          100: '#DCEAFE', // $blue-100
          200: '#BAD5FD', // $blue-200
          300: '#97BFFC', // $blue-300
          400: '#74AAFB', // $blue-400
          500: '#5094FA', // $blue-500
          600: '#317EF2', // $blue-600
          700: '#1D6CE0', // $blue-700 primary
          800: '#1959B8', // $blue-800
          900: '#1A4B93', // $blue-900
        },
        orange: {
          '050': '#FFF7F0', // $orange-050
          100: '#FEE9D7', // $orange-100
          200: '#FBC08D', // $orange-200
          300: '#FAA55C', // $orange-300
          400: '#F99239', // $orange-400
          500: '#F57D14', // $orange-500
          600: '#DC6B09', // $orange-600
          700: '#B35809', // $orange-700
          800: '#984A06', // $orange-800
          900: '#7A3C05', // $orange-900
        },
        primary: '#1D6CE0', // $primary
        secondary: '#FAA55C', // $secondary
      },
      boxShadow: {
        DEFAULT: '0 0.125rem 0.625rem rgba(0, 0, 0, 0.2)', // $shadow
        sm: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.2)', // $shadow-sm
        lg: '0 0.25rem 1rem rgba(0, 0, 0, 0.2)', // $shadow-lg
        xl: '0 1rem 2rem rgba(0, 0, 0, 0.2)', // $shadow-xl
      },
      spacing: {
        '0': '0', // $spacer-0
        xs: '0.25rem', // $spacer-xs
        sm: '0.5rem', // $spacer-sm
        md: '1rem', // $spacer-md
        lg: '1.5rem', // $spacer-lg
        xl: '3rem', // $spacer-xl
      },
    },
  },
  plugins: [],
};
