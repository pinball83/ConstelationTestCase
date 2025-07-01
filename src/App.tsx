import { NavigationWrapper } from "./navigation/NavigationWrapper.tsx";
import {ThemeProvider} from "./theme/ThemeContext.tsx";


//todo: add details screen
//todo: add filtering
function App() {

    return (
        <ThemeProvider>
            <NavigationWrapper />
        </ThemeProvider>
    );
}

export default App;
