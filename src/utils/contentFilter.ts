export const filterContent = (content: string): string => {
  const replacements = [
    { from: /Gemini/gi, to: 'ShaktimaanGPT' },
    { from: /I am a multi-modal AI model developed by Google/gi, to: 'I am ShaktimaanGPT' },
    { from: /an AI model developed by Google/gi, to: 'ShaktimaanGPT' },
    { from: /Google's AI model/gi, to: 'ShaktimaanGPT' }
  ];

  return replacements.reduce((text, { from, to }) => 
    text.replace(from, to), content);
};