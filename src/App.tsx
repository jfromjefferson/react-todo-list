import { BrowserRouter } from "react-router-dom";
import { ItemProvider } from "./context/item";
import Modal from 'react-modal'
import { Router } from "./Router";

Modal.setAppElement('#root')

export function App() {

  return (
    <ItemProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ItemProvider>
  )
}
