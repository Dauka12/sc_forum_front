import { useStore } from '@/store';
import '@/utils/i18n';
import AppRouter from '@/utils/router';
import { useEffect } from 'react';

function App() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return <AppRouter />;
}

export default App;
