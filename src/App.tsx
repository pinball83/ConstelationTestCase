import { NavigationWrapper } from './navigation/NavigationWrapper.tsx';
import { ThemeProvider } from './theme/ThemeContext.tsx';

function App() {
  return (
    <ThemeProvider>
      <NavigationWrapper />
    </ThemeProvider>
  );
}

export default App;
