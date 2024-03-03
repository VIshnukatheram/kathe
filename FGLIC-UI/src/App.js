import './App.css';
import { Provider } from "react-redux";
import Routing from './layout/Routing';
import { store } from "./store";
import { DataProvider } from './reducers/DataContext';
import { AuthProvider } from './utils/auth';
import { MsalProvider } from "@azure/msal-react";
function App({ instance }) {
  return (
    <MsalProvider instance={instance}>
      <AuthProvider>
        <DataProvider>
          <Provider store={store}>
            <div className="App">
              <Routing />
            </div>
          </Provider>
        </DataProvider>
      </AuthProvider>
    </MsalProvider>
  );
}

export default App;
