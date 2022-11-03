import './App.css';
import { setContext } from '@apollo/client/link/context';
import { NewListingProvider } from './utils/GlobalState';

function App() {
  return (
    <NewListingProvider>
      <div >
        Hello World!
      </div>
    </NewListingProvider>
  );
}

export default App;
