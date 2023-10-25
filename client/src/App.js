import Create from './Components/Create.js'
import View from './Components/View.js'
import Root from './Components/Root.js'


import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="create" element={<Create />}/>
    <Route path="view" element={<View />}/>
  </Route>
));


function App() {
  return(
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
