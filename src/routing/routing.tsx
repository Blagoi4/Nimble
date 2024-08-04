import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ContactCard from '@/components/contact-card';
import { Error } from '@/pages/Error';
import { Main } from '@/pages/Main';
import { Root } from '@/pages/Root';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path='/' element={<Main />} />
      <Route path='/contact/:id' element={<ContactCard />} />
      <Route path='*' element={<Error />} />
    </Route>
  )
);
