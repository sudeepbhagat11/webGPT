// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import store from './store.ts';
// import { 
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider
// } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import Home  from './screens/Home';
// import Login from './screens/Login';
// import  SignUp  from './screens/SignUp';




// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path = "/" element = {<App />}>
//     <Route index element={<Home />}></Route>
//       <Route path  = "/chat" element={<Chat />}></Route>
//       <Route path  = "/login" element={<Login />}></Route>
//       <Route path  = "/signup" element={<SignUp />}></Route>
      
      
//     </Route>



//   )

// )

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
    


//   <Provider store = {store}>
  
//   <RouterProvider router = {router} />
  
//   </Provider>
//   </React.StrictMode>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './store.ts';
import { 
  BrowserRouter,
 
} from 'react-router-dom';
import { Provider } from 'react-redux';

import axios from 'axios';

axios.defaults.baseURL="http://localhost:3000/";
axios.defaults.withCredentials = true;






ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    


  <Provider store = {store}>
  
  <BrowserRouter>
  <App />
  </BrowserRouter>
  
  </Provider>
  
  </React.StrictMode>,
)


