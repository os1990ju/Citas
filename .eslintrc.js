module.exports = {
 env: {
  browser: true,
  es2020: true,
  node: true
 },
 extends: [
  'plugin:react/recommended',
  'Standard',
  'prettier'
 ],
 parserOptions:{
  ecmaFeatures:{
    jsx:true
  },
  ecmaVersion:11,
  sourceType:'module'
 },
 plugins:['react'], 
 rules:{
  'prettier/prettier': [
    'error',
    {
      'endOfLine': 'off',
    }
  ],
  'react/prop-types': RULES.OFF,
  'react/react-in-jsx-scope': RULES.OFF
 },
 
};
