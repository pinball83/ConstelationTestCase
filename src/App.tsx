import { NavigationWrapper } from './navigation/NavigationWrapper.tsx';
import { ThemeProvider } from './theme/ThemeContext.tsx';

//todo: add zustand for state management and persist favorite vehicles
//todo: add details screen
//todo: add filtering into nav bar
function App() {
  return (
    <ThemeProvider>
      <NavigationWrapper />
    </ThemeProvider>
  );
}

export default App;
